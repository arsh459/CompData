import { getUserById } from "../../../../models/User/Methods";
import { getAllAchievmentPaths } from "../../../../models/User/roadmap";
import { addAchieversToRoadmap } from "../achiever/addAchievers";
import { saveAchievers } from "../achiever/saveUtils";
import { handleRoadmapUpdateToUser } from "../path/createUtils";

export const mainAddAchieversToUser = async (
  uid: string,
): Promise<{ status: boolean; reason?: string }> => {
  // get user
  const user = await getUserById(uid);
  if (user) {
    // get achievement path data
    const monthItemsSaved = await getAllAchievmentPaths(user.uid, "asc");

    // mark completed
    const { monthItems, completedTargets } = await handleRoadmapUpdateToUser(
      user,
      monthItemsSaved,
    );

    const { achieversToAdd, achieversToRemove, totalTargets } =
      await addAchieversToRoadmap(user.uid, user, monthItems);

    await saveAchievers(
      user.uid,
      achieversToAdd,
      achieversToRemove,
      totalTargets,
      completedTargets,
    );
  } else {
    return {
      status: false,
      reason: "User not present with uid",
    };
  }

  return {
    status: true,
  };
};
