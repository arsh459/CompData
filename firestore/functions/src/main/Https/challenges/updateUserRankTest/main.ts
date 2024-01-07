import { getLevelByNumber_transaction } from "../../../../models/Level/getRelevantLevel";
import {
  getRanksInFPRange_transaction,
  getUserRankV2ByUID_transaction,
  getRanksWithMoreFP_transaction,
  saveUserRanks_transaction,
} from "../../../../models/Rounds/getUserRankV2";
import { UserRankV2 } from "../../../../models/Rounds/interface";
import { addRankToUsers, rankUsers } from "../seed/rankUsers";
import * as admin from "firebase-admin";
import { getFormattedDateForUnixWithTZ } from "../../../PubSub/activityTracker/utils";

export const mainUserRankFunc = async (
  transaction: admin.firestore.Transaction,
  uid: string,
  fp: number,
  updatedAt: number,
  // levelId: string,
  test: boolean,
  onSuccess: () => Promise<void>,
) => {
  // fp range of users to reshuffle
  const { start, end, rank } = await getFPRangeToReRank(
    transaction,
    uid,
    fp,
    // levelId,
  );

  console.log("FETCHED START, END", start, end);

  if (rank && typeof start === "number" && typeof end === "number") {
    const level = await getLevelByNumber_transaction(transaction, rank.lvl);

    const levelId = level?.id;
    console.log("FETCHED LEVEL", level?.id, level?.lvlNumber, level?.title);

    if (!levelId) {
      return false;
    }

    const ranksInDB = await getRanksInFPRange_transaction(
      transaction,
      start,
      end,
      levelId,
    );

    console.log("ranks in range in db", ranksInDB.length);

    const updatedRanks = getRanksWithUpdatedDebugRank(
      ranksInDB,
      uid,
      fp,
      true,
      updatedAt,
    );
    console.log("updatedRanks", updatedRanks.length);

    const updatedRanksForUsers = rankUsers(updatedRanks);
    console.log("updatedRanksForUsers", updatedRanksForUsers.length);

    // get minFP
    if (updatedRanksForUsers.length) {
      const minRank = await getMinRank(transaction, ranksInDB, levelId);
      console.log("minRank", minRank);
      const reRanked = addRankToUsers(minRank, updatedRanksForUsers, true);
      console.log("reRanked", reRanked.length);

      if (!test) {
        await saveUserRanks_transaction(transaction, reRanked, levelId);
        console.log("SAVED");
        await onSuccess();
      }

      return true;
    }
  }

  return false;
};

const getFPRangeToReRank = async (
  transaction: admin.firestore.Transaction,
  uid: string,
  fp: number,
  // levelId: string,
) => {
  const rank = await getUserRankV2ByUID_transaction(transaction, uid);

  if (rank) {
    const currentFP = rank.fp;
    const postFP = currentFP + fp > 0 ? currentFP + fp : 0;

    console.log("user CurrentFP", currentFP);
    console.log("user postFP", postFP);
    console.log();

    if (postFP > currentFP) {
      // FP has increased
      return {
        start: currentFP,
        end: postFP,
        rank,
      };
    } else {
      // fp has reduced
      return {
        end: currentFP,
        start: postFP,
        rank,
      };
    }
  } else {
    console.log("USER RANK NOT FOUND");
  }

  return {};
};

const updateDebugRank = (
  rank: UserRankV2,
  fp: number,
  unix: number,
): UserRankV2 => {
  // const date = format(new Date(unix), "yyyy-MM-dd");
  console.log(
    "updating rank",
    rank.name,
    "fp",
    fp,
    "unix",
    unix,
    "tz",
    rank.tz,
  );
  const date = getFormattedDateForUnixWithTZ(
    unix,
    rank.tz ? rank.tz : "Asia/Kolkata",
  );

  console.log("date", date);

  const previousFPObj = rank.fpObj ? rank.fpObj : {};

  return {
    ...rank,
    fp: rank.fp + fp > 0 ? rank.fp + fp : 0,
    fpObj: {
      ...previousFPObj,
      [date]:
        previousFPObj[date] && previousFPObj[date] + fp > 0
          ? previousFPObj[date] + fp
          : 0,
      // [date]: {
      //   ...(rank.fpObj && rank.fpObj[date] ? rank.fpObj : {}),
      // }
    },
    // totalFP: rank.totalFP + fp > 0 ? rank.totalFP + fp : 0,
  };
};

export const getRanksWithUpdatedDebugRank = (
  ranks: UserRankV2[],
  uid: string,
  fp: number,
  consoleData: boolean,
  unix: number,
) => {
  const updatedRanks: UserRankV2[] = [];
  for (const rank of ranks) {
    if (consoleData) {
      console.log(
        "OLD Rank:",
        rank.rank,
        ` ${rank.fp}FP`,
        ` lvl${rank.lvl}`,
        " Name:",
        rank.name,
      );
    }

    if (rank.uid === uid) {
      const updatedRank = updateDebugRank(rank, fp, unix);
      console.log("UPDATED:", updatedRank.name, ` ${updatedRank.fp}FP`);
      updatedRanks.push(updatedRank);
    } else {
      updatedRanks.push(rank);
    }
  }

  return updatedRanks;
};

const getMinRank = async (
  transaction: admin.firestore.Transaction,
  ranksInDB: UserRankV2[],
  levelId: string,
) => {
  // top of rank
  const minFPInRange = ranksInDB[0].fp;

  console.log();
  console.log("min rank with FP", minFPInRange);
  console.log();

  // get rankObj just before
  const ranksBeforeFP = await getRanksWithMoreFP_transaction(
    transaction,
    levelId,
    minFPInRange,
    1,
  );

  if (ranksBeforeFP.length) {
    return ranksBeforeFP[0].rank + 1;
  }

  return 1;
};
