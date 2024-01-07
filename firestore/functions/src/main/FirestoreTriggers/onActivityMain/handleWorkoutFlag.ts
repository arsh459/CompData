import { Activity } from "../../../models/Activity/Activity";
import * as admin from "firebase-admin";

export const handleActivityFlag = async (activity: Activity) => {
  if (activity.source === "task" && activity.calories) {
    await admin
      .firestore()
      .collection("users")
      .doc(activity.authorUID)
      .update({ [`waMessageStatus.oneWorkoutDone`]: true });
  } else if (activity.source === "nutrition" && activity.calories) {
    await admin
      .firestore()
      .collection("users")
      .doc(activity.authorUID)
      .update({ [`waMessageStatus.oneNutritionDone`]: true });
  }

  if (activity.stepsActive) {
    await admin
      .firestore()
      .collection("users")
      .doc(activity.authorUID)
      .update({ [`waMessageStatus.stepsDone`]: true });
  }
};

export const handleSakhiInteraction = async (uid: string) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({ [`waMessageStatus.triedSakhi`]: true });
};

export const handleBootcampInvite = async (uid: string) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .update({ [`waMessageStatus.bootcamp`]: true });
};
