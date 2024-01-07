import * as admin from "firebase-admin";
import { Activity } from "../../../models/Activity/Activity";

export const refreshActivitiesWithPosts = async () => {
  const activities = await admin
    .firestore()
    .collectionGroup("activities")
    // .limit(10)
    .get();

  let i: number = 0;
  for (const act of activities.docs) {
    const activity = act.data() as Activity;

    if (
      activity.taskId &&
      activity.source !== "terra" &&
      activity.activityName !== "Terra" &&
      !activity.postRef &&
      activity.calories
    ) {
      console.log(
        i,
        activity.activityName,
        activity.createdOn,
        activity.date,
        activity.calories,
      );

      i++;
    }

    // add saved tag
  }
};
