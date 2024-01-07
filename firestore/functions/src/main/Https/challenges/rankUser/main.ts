import { getLevelByNumber } from "../../../../models/Level/getRelevantLevel";
import {
  getLastRank,
  getRanksInFPRange,
  getUserRankV2ByUID,
  saveUserRanks,
} from "../../../../models/Rounds/getUserRankV2";
import { UserRankV2 } from "../../../../models/Rounds/interface";
import {
  addChallengeJoinedToUser,
  getUserById,
} from "../../../../models/User/Methods";
import { createRankForUser } from "../seed/createRankFromUser";
import { addRankToUsers } from "../seed/rankUsers";

export const rankUserMain = async (uid: string) => {
  const previousRank = await getUserRankV2ByUID(uid);
  console.log("Previous RANK", previousRank?.name);
  if (previousRank) {
    return true;
  }

  const user = await getUserById(uid);
  const levelObj = await getLevelByNumber(1);

  console.log("LEVEL", levelObj?.lvlNumber);

  if (user && levelObj) {
    if (user.gender === "male") {
      return false;
    }

    const newUserRank = createRankForUser(user, 1);
    console.log(
      "NEW USER",
      user.name,
      ` ${newUserRank.fp}FP`,
      ` ${newUserRank.lvl}lvl`,
    );

    const ranksInDB = await getRanksInFPRange(0, newUserRank.fp, levelObj.id);
    console.log("Ranks Before user:", ranksInDB.length);

    const lastRankNumber = await getRankForNewUser(ranksInDB, levelObj.id);
    console.log("lastRankNumber", lastRankNumber);

    if (lastRankNumber) {
      const reRanked = addRankToUsers(
        lastRankNumber,
        [newUserRank, ...ranksInDB],
        true,
      );
      await saveUserRanks(reRanked, levelObj.id);
      await addChallengeJoinedToUser(uid, Date.now());

      return true;
    }
  }

  return false;
};

const getRankForNewUser = async (ranksInDB: UserRankV2[], levelId: string) => {
  if (ranksInDB.length) {
    return ranksInDB[0].rank;
  }

  console.log("no ranks in db");

  //
  const lastRank = await getLastRank(levelId);
  console.log("lastRank", lastRank?.name);

  return lastRank?.rank ? lastRank?.rank + 1 : 1;
};
