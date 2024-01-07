import {
  clearAllRanks,
  getAllUserRanksV2,
} from "../../../../models/Rounds/getUserRankV2";

export const mainClearFunc = async () => {
  const allRanks = await getAllUserRanksV2("desc");

  await clearAllRanks(allRanks, true);
};
