import { getUserById } from "../../../../models/User/Methods";
import {
  getAllAchievmentPaths,
  // getCurrentMonthAchievementPaths,
  saveGoalAchievementPath,
} from "../../../../models/User/roadmap";
import { handleProgressUpdate } from "./handleProgressUpdate";
import { updateAchieversInDB } from "./saveUtils";

export const progressUpdateWrapper = async (uid: string) => {
  const user = await getUserById(uid);

  if (user) {
    const monthItems = await getAllAchievmentPaths(user.uid, "asc");

    const {
      monthItemsUp,
      achieversToUpdate,
      nowWon,
      nowLost,
      completedTargets,
    } = await handleProgressUpdate(user, monthItems);
    await saveGoalAchievementPath(uid, monthItemsUp);
    await updateAchieversInDB(
      achieversToUpdate,
      nowWon,
      nowLost,
      user,
      completedTargets,
    );
  }
};

// export const progressUpdateWrapperForKPI = async (uid: string, )
