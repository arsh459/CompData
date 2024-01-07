import { updateOne } from "../../utils/firestore/fetchOne";

export const updateUserLevel = async (
  uid: string,
  userLevelV2?: number,
  totalFitPointsV2?: number,
  activeFitPointsV2?: number,
  progressV2?: number,
  teamWins?: number,
  individualWins?: number,
) => {
  await updateOne("users", uid, {
    userLevelV2: userLevelV2 ? userLevelV2 : 0,
    totalFitPointsV2: totalFitPointsV2 ? totalFitPointsV2 : 0,
    activeFitPointsV2: activeFitPointsV2 ? activeFitPointsV2 : 0,
    ...(progressV2 ? { progressV2: progressV2 } : {}),
    ...(individualWins ? { wins: individualWins } : {}),
    ...(teamWins ? { teamWins: teamWins } : {}),
  });
};

export const updateUserLevelV2 = async (
  uid: string,
  dayPointObj: { [uid: string]: number },
  dayCalObj: { [uid: string]: number },
  userLevelV2: number,
  activeFitPointsV2: number,
  progressV2: number,
) => {
  await updateOne("users", uid, {
    userLevelV2: userLevelV2 ? userLevelV2 : 0,
    activeFitPointsV2: activeFitPointsV2 ? activeFitPointsV2 : 0,
    ...(progressV2 ? { progressV2: progressV2 } : { progressV2: 0 }),
    dayPointObj,
    dayCalObj,
  });
};
