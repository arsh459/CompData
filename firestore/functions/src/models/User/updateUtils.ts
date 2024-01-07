import * as admin from "firebase-admin";
import { AchievementPathData, UserInterface } from "./User";

export const updateUserRoadmapProgress = async (
  user: UserInterface,
  achievementPaths: AchievementPathData[],
) => {
  try {
    const count = { totalGoal: 0, doneGoal: 0 };

    for (const path of achievementPaths) {
      if (path.items?.length) {
        for (const item of path.items) {
          count.totalGoal++;
          item.status === "DONE" && count.doneGoal++;
        }
      }
    }

    if (count.totalGoal && count.doneGoal) {
      const progressStep = 1 / count.totalGoal;
      const roadmapProgress = count.doneGoal * progressStep;

      await admin
        .firestore()
        .collection("users")
        .doc(user.uid)
        .update({ roadmapProgress });
    }
  } catch (error) {
    console.log("error in updateUserRoadmapProgress", error);
  }
};
