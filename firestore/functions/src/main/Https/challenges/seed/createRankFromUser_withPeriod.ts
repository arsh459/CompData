import { UserInterface } from "../../../../models/User/User";
import { getActivitiesInRange } from "../../../../models/Activity/getUtils";
import {
  UserRankV2,
  fpObjInterface,
  fpStrategy,
} from "../../../../models/Rounds/interface";
import { addRankToUsers, rankUsers } from "./rankUsers";
import { getUserFP } from "./createRankFromUser";
import { getFormattedDateForUnixWithTZ } from "../../../PubSub/activityTracker/utils";
import { getTimezone } from "../../../FirestoreTriggers/onActivityUpdateV2/dateBucket";

export const createRankForUser_withPeriod = async (
  user: UserInterface,
  roundStart: number,
  fpStrategyValue: fpStrategy,
  initLevel?: number,
): Promise<UserRankV2 | undefined> => {
  if (user.challengeJoined) {
    const { start, end } = getQueryPeriod(user.challengeJoined, roundStart);
    // console.log("start", start, end);
    const tz = getTimezone(user);

    const { finalFpObj, fp } = await getFPInPeriod(user.uid, start, end, tz);

    console.log(
      `${user.name} | Start: ${getFormattedDateForUnixWithTZ(
        start,
        tz,
      )} - End: ${getFormattedDateForUnixWithTZ(end, tz)} | ${fp}FP`,
    );
    console.log("finalFpObj", finalFpObj);

    return {
      uid: user.uid,
      // fp: getUserFP(user),
      tz,
      fp: fpStrategyValue === "periodFP" ? fp : getUserFP(user),
      fpObj: finalFpObj,
      rank: -1,
      name: user.name ? user.name : "New Player",
      lvl: initLevel ? initLevel : user.userLevelV2 ? user.userLevelV2 : 1,
      ...(user.profileImage ? { img: user.profileImage } : {}),
    };
  }

  return undefined;
};

export const getQueryPeriod = (challengJoin: number, roundStart: number) => {
  return {
    end: Date.now(),
    start: roundStart > challengJoin ? roundStart : challengJoin,
  };
};

const getFPInPeriod = async (
  uid: string,
  start: number,
  end: number,
  tz: string,
) => {
  //   const q = admin.firestore().collection("users");

  const acts = await getActivitiesInRange(uid, start, end);
  // console.log("FETCHED ACTS", acts.length);

  let calories: number = 0;
  const fpObj: fpObjInterface = {};
  for (const act of acts) {
    // console.log("act", act);
    const calVal = act.calories ? act.calories : 0;
    calories += calVal;

    const dt = act.createdOn
      ? getFormattedDateForUnixWithTZ(act.createdOn, tz)
      : "";

    if (dt && !fpObj[dt]) {
      fpObj[dt] = calVal;
    } else if (dt && fpObj[dt]) {
      fpObj[dt] += calVal;
    }
  }

  const finalFpObj: fpObjInterface = {};
  for (const key of Object.keys(fpObj)) {
    const calValTotal = fpObj[key];
    finalFpObj[key] = Math.round(calValTotal / 300);
  }

  // console.log("finalFpObj", finalFpObj);
  // throw new Error("HI");

  const fp = Math.round(calories / 300);
  return { fp, finalFpObj };

  //
  // .doc(uid)
  // .collection("activities")
  // .where("createdOn", ">=", start)
  // .where("createdOn", "<=", end)
  // .aggregate();
};

export const createRanksFromUserArrV2 = async (
  users: UserInterface[],
  roundStart: number,
  fpStrategyValue: fpStrategy,
) => {
  const ranks: { [lvl: string]: UserRankV2[] } = {};
  for (const user of users) {
    const newRank = await createRankForUser_withPeriod(
      user,
      roundStart,
      fpStrategyValue,
      undefined,
    );
    // console.log("newRank", user.name, "lvl", newRank?.lvl);
    if (newRank) {
      if (ranks[newRank.lvl]) {
        ranks[newRank.lvl].push(newRank);
      } else {
        ranks[newRank.lvl] = [newRank];
      }
    }
  }

  const finalRanks: { [lvl: string]: UserRankV2[] } = {};
  for (const lvl of Object.keys(ranks)) {
    const lvlRanks = ranks[lvl];

    const rankedUserArray = rankUsers(lvlRanks);
    const usersWithRank = addRankToUsers(1, rankedUserArray, true);

    finalRanks[lvl] = usersWithRank;
  }

  return finalRanks;
};
