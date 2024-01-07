import { Activity } from "../../../models/Activity/Activity";
import { getTask } from "../../../models/Task/getUtils";
import { UserInterface } from "../../../models/User/User";
import { getAllPreviousDayRecs } from "../../Https/taskGenerator/getterSetter";
import * as admin from "firebase-admin";
import { badgeDayUpdateV3 } from "./badgeDayUpdateV3";
import { getTimezone } from "../onActivityUpdateV2/dateBucket";
// import { getProgValuesForTkList } from "./userRecProgress";

export const handleUserRecommendationProgress = async (
  user: UserInterface,
  nowFP: number,
  prevFP: number,
  now: Activity,
  dateBucket: string,
) => {
  // for non steps task only
  if (now.taskId && !now.stepsActive) {
    // 1 READ
    const task = await getTask(now.taskId);
    console.log("task", task?.name, task?.id, task?.fitPoints);
    if (task?.taskType === "nutrition" && user.nutritionBadgeId) {
      await badgeDayUpdateV3(
        user.uid,
        dateBucket,
        "nutrition",
        getTimezone(user),
      );

      // await updateRecProgressInc(
      //   user.uid,
      //   dateBucket,
      //   "nutrition",
      //   now.taskId,
      //   nowFP,
      //   prevFP,
      //   user.nutritionBadgeId,
      // );
      console.log("nutrition updated");
    } else if (
      task?.taskType === "workout" &&
      user.badgeId &&
      prevFP !== nowFP // update if prevFP and now FP have changed for workout
    ) {
      await updateRecProgressInc(
        user.uid,
        dateBucket,
        "workout",
        now.taskId,
        nowFP,
        prevFP,
        user.badgeId,
      );
      console.log("workout updated");
    }
  }
};

const updateRecProgressInc = async (
  uid: string,
  date: string,
  type: "workout" | "nutrition",
  taskId: string,
  nowFP: number,
  prevFP: number,
  badgeId: string,
) => {
  // 1 READ
  console.log("date", uid, date, type, uid);
  const pastRecs = await getAllPreviousDayRecs(uid, date, type);

  for (const rec of pastRecs) {
    console.log("rec", rec);

    if (rec.badgeId === badgeId || rec.overrideBadgeId === badgeId)
      for (const taskRec of rec.tasks) {
        // if fp update for a task on day
        if (taskId === taskRec.id) {
          await admin
            .firestore()
            .collection("users")
            .doc(uid)
            .collection("dayRecommendations")
            .doc(rec.id)
            .update({
              doneFP: admin.firestore.FieldValue.increment(-prevFP + nowFP),
            });

          console.log("WRITE REC UPDATE", taskRec.id, -prevFP + nowFP);

          // break;
        }
      }

    // 1 WRITE
    // await admin
    //   .firestore()
    //   .collection("users")
    //   .doc(uid)
    //   .collection("dayRecommendations")
    //   .doc(rec.id)
    //   .update({
    //     doneFP: admin.firestore.FieldValue.increment(-prevFP + nowFP),
    //   });
  }
};
