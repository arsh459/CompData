import { getLevelByNumber } from "../../../../models/Level/getRelevantLevel";
import {
  getAllUserRanksV2ByFP,
  saveUserRanks,
} from "../../../../models/Rounds/getUserRankV2";
import { addRankToUsers } from "../seed/rankUsers";

export const refreshMain = async (
  level: number,
): Promise<{ status: boolean; reason?: string }> => {
  const levelObj = await getLevelByNumber(level);
  if (levelObj) {
    const userRanks = await getAllUserRanksV2ByFP("desc", levelObj.id);
    const updatedWithRanks = addRankToUsers(1, userRanks, true);
    await saveUserRanks(updatedWithRanks, levelObj.id);

    return { status: true };
  }
  return {
    status: false,
    reason: "level obj not present",
  };
};
