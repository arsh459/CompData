import { Activity } from "../../../models/Activity/Activity";
import { getUserActivityAfter } from "../../../models/Activity/getUtils";
import { UserInterface, goalObj } from "../../../models/User/User";
import {
  getDayStartIST,
  getFormattedDateForUnix,
} from "../../PubSub/activityTracker/utils";
import { v4 as uuid } from "uuid";
import { getUserById } from "../../../models/User/Methods";
import * as admin from "firebase-admin";

export const updateUserKPIs = async (uid: string) => {
  // now time
  const now = Date.now();

  // now start
  const dayStart = getDayStartIST(now);

  const user = await getUserById(uid);

  if (user) {
    // getAllActivities for today
    const activities = await getUserActivityAfter(uid, dayStart, now);

    // update goalObj
    const newGoalObj = createGoalObj(
      user.dailyFPTarget ? user.dailyFPTarget : 35,
      activities,
      dayStart,
    );

    await saveGoalObj(uid, newGoalObj);
  }
};

export const getTodaysGoal = async (uid: string, date: string) => {
  const prevDoc = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("dailyGoals")
    .where("date", "==", date)
    .get();

  if (prevDoc.docs.length) {
    return prevDoc.docs[0].data() as goalObj;
  }

  return undefined;
};

export const updateGoalObj = async (
  user: UserInterface,
  nowFP: number,
  prevFP: number,
  newWorkout: boolean,
  date: string,
  unix: number,
) => {
  // read 1
  const prevDoc = await admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .collection("dailyGoals")
    .where("date", "==", date)
    .get();

  // WRITE 1
  if (prevDoc.docs.length) {
    const previousDoc = prevDoc.docs[0].data() as goalObj;
    console.log("READ DAILY GOAL", 1, -prevFP + nowFP);
    await admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("dailyGoals")
      .doc(previousDoc.id)
      .update({
        targetFP: user.dailyFPTarget ? user.dailyFPTarget : 35,
        achievedFP: admin.firestore.FieldValue.increment(-prevFP + nowFP),
        nbWorkouts: admin.firestore.FieldValue.increment(newWorkout ? 1 : 0),
      });

    console.log("WRITE DAILY GOAL", 1);
  } else {
    const newGoalObj: goalObj = {
      id: uuid(),
      date,
      unix: unix,

      targetFP: user.dailyFPTarget ? user.dailyFPTarget : 35,
      nbWorkouts: 1,
      achievedFP: nowFP,
    };

    console.log("WRITE DAILY GOAL", 1, nowFP);

    await admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("dailyGoals")
      .doc(newGoalObj.id)
      .set(newGoalObj);
  }
};

const saveGoalObj = async (uid: string, newGoalObj: goalObj) => {
  const prevDoc = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("dailyGoals")
    .where("date", "==", newGoalObj.date)
    .get();

  // console.log("prev", prevDoc.docs[0].data());

  if (prevDoc.docs.length) {
    for (const doc of prevDoc.docs) {
      const prevGoal = doc.data() as goalObj;
      await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("dailyGoals")
        .doc(prevGoal.id)
        .update({
          ...newGoalObj,
          id: prevGoal.id,
        });
    }
  } else {
    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("dailyGoals")
      .doc(newGoalObj.id)
      .set(newGoalObj);
  }
};

const createGoalObj = (
  targetFp: number,
  activities: Activity[],
  start: number,
): goalObj => {
  const baseObj = createDummyGoalObj(targetFp, start);
  for (const act of activities) {
    const fp = Math.round(act.calories ? act.calories : 0) / 300;

    baseObj.nbWorkouts += 1;
    baseObj.achievedFP += fp;
  }

  return baseObj;
};

const createDummyGoalObj = (targetFP: number, unix: number): goalObj => {
  return {
    targetFP,
    achievedFP: 0,
    unix,
    id: uuid(),
    date: getFormattedDateForUnix(unix),
    nbWorkouts: 0,
  };
};
