import {
  getAllUsersByLevel,
  updateUserLevel,
} from "../../../../models/User/Methods";

export const levelUpdateMain = async (): Promise<{
  status: boolean;
  reason: string;
}> => {
  // fetch all users Ranks in challenge
  const levelUsers = await getAllUsersByLevel();

  // fetch all level definitions
  let i: number = 1;
  for (const levelUser of levelUsers) {
    if (levelUser.userLevelV2 && levelUser.userLevelV2 > 1) {
      await updateUserLevel(levelUser.uid, 1);
    }

    console.log(
      `${i}/${levelUsers.length} | ${levelUser.name} | LvL${levelUser.userLevelV2} | FP Credit${levelUser.fpCredit}FP`,
    );

    i++;
  }

  // split leaderboard basis levels
  // get qualifiers for each leaderboard
  // calculate user levels

  // update user levels

  return {
    status: true,
    reason: "",
  };
};

/**
 * 1 -
 * 2 -
 * 3 -
 *
 *
 *
 * 45 - Promotion zone (For Below) | Demotion Zone (For Below)
 *
 *
 *
 */
