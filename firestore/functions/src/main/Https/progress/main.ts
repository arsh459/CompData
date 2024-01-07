import { Activity } from "../../../models/Activity/Activity";
import { getUserActivitiesCaloriesV2 } from "../../../models/Activity/getUtils";
import { getUserById } from "../../../models/User/Methods";
import { NutritionConsumption } from "../../../models/User/User";
import { getTimezone } from "../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
import { addNutritionFactsToRec } from "../../FirestoreTriggers/onBadgeProgressUpdate/badgeDayUpdateV3";
import { getFormattedDateForUnixWithTZ } from "../../PubSub/activityTracker/utils";
import { getRecsForDate } from "../taskGenerator/getterSetter";
import * as admin from "firebase-admin";

export const mainProgressReconcile = async (uid: string): Promise<boolean> => {
  const user = await getUserById(uid);

  if (!user) {
    return false;
  }

  const tz = getTimezone(user);
  const actsI = await getUserActivitiesCaloriesV2(uid);
  const acts = actsI.sort(
    (x, y) =>
      -((x.createdOn ? x.createdOn : 0) - (y.createdOn ? y.createdOn : 0)),
  );

  const actBuckets = batchActivitiesOnDate(acts, tz);
  let cals: number = 0;

  for (const date of Object.keys(actBuckets)) {
    console.log();
    console.log();
    console.log("DATE", date);
    const actsOnDate = actBuckets[date];

    for (const todayAct of actsOnDate) {
      cals += todayAct.calories ? todayAct.calories : 0;
      console.log(todayAct.activityName, todayAct.calories, cals);
    }

    console.log();
    console.log("TOTAL:", Math.round(cals / 300));
    // console.log("TOTAL CREDIT DB:", user.fpCredit);
    // console.log("TOTAL DEBIT  DB:", user.fpDebit);
    // console.log(
    //  "TOTAL:",
    //  (user.fpCredit ? user.fpCredit : 0) - (user.fpDebit ? user.fpDebit : 0),
    // );
    console.log("");

    const actTaskMap = batchActivitiesOnTask(actsOnDate);
    const pastRecs = await getRecsForDate(uid, date);

    console.log("date", date);

    for (const rec of pastRecs) {
      let doneFP: number = 0;
      let nutrition: NutritionConsumption | undefined = undefined;
      for (const taskRec of rec.tasks) {
        if (actTaskMap[taskRec.id]) {
          const relevantActsOnDate = actTaskMap[taskRec.id];
          const actSum = relevantActsOnDate.reduce(
            (acc, item) => acc + (item.calories ? item.calories : 0),
            0,
          );

          for (const relevantAct of relevantActsOnDate) {
            if (relevantAct.macros) {
              nutrition = addNutritionFactsToRec(
                relevantAct.macros,
                nutrition,
                relevantAct.totalKcalConsumed,
              );
            }
          }

          const fp = Math.round(actSum / 300);
          doneFP += fp;

          console.log("taskId", rec.type, rec.id, taskRec.id, fp, doneFP);
        }
      }

      // update recommendation update
      await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("dayRecommendations")
        .doc(rec.id)
        .update({
          doneFP: doneFP,
          ...(nutrition ? { consumedNutrition: nutrition } : {}),
        });

      console.log();
    }
  }

  return true;
};

const batchActivitiesOnDate = (acts: Activity[], tz: string) => {
  const actBuckets: { [date: string]: Activity[] } = {};
  for (const act of acts) {
    if (act.createdOn) {
      const formatted = getFormattedDateForUnixWithTZ(act.createdOn, tz);

      if (actBuckets[formatted]) {
        actBuckets[formatted].push(act);
      } else {
        actBuckets[formatted] = [act];
      }
    }
  }

  return actBuckets;
};

const batchActivitiesOnTask = (acts: Activity[]) => {
  const actTaskBuckets: { [taskId: string]: Activity[] } = {};
  for (const act of acts) {
    if (act.taskId) {
      if (actTaskBuckets[act.taskId]) {
        actTaskBuckets[act.taskId].push(act);
      } else {
        actTaskBuckets[act.taskId] = [act];
      }
    }
  }

  return actTaskBuckets;
};
