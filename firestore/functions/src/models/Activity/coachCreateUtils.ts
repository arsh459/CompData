import { Activity, CoachRank, UserRank } from "./Activity";
import * as admin from "firebase-admin";
import { UserInterface } from "../User/User";
import { getKPIValue } from "./createUtils";
import { getAllUserRanksForCoach } from "./getUtils";
import { judgeCriterion } from "../sbEvent/sbEvent";
import {
  createDayStringCalorieObject_Coach,
  createDayStringPointObject_Coach,
} from "../Prizes/getStreakPrize";
import { CloudinaryMedia } from "../sbEvent/CloudinaryMedia";
import { updateCoachRankV2 } from "./coachCreateUtilsV2";
// import { getUserEventActivities } from "./getUtils";

export const getCoachForActivity = (
  coachObjs: CoachRank[],
  coachUID: string,
) => {
  const filteredRanks = coachObjs.filter((item) => item.uid === coachUID);

  if (filteredRanks.length) {
    return filteredRanks[0];
  }

  return undefined;
};

export const checkCoachTransformations = (
  judgeCrit: judgeCriterion,
  calCriterion: number,
  totalCalories?: number,
  prevTotalCalories?: number,
  nowStreaks?: number,
  prevStreaks?: number,
) => {
  if (judgeCrit === "calories") {
    return checkTransformation(calCriterion, totalCalories, prevTotalCalories);
  } else {
    return checkStreakTransformation(nowStreaks, prevStreaks);
  }
};

export const checkTransformation = (
  calCriterion: number,
  totalCalories?: number,
  prevTotalCalories?: number,
) => {
  if (prevTotalCalories && totalCalories) {
    if (totalCalories >= calCriterion && prevTotalCalories < calCriterion) {
      return 1;
    } else if (
      totalCalories < calCriterion &&
      prevTotalCalories >= calCriterion
    ) {
      return -1;
    } else {
      return 0;
    }
  } else if (totalCalories) {
    if (totalCalories >= calCriterion) {
      return 1;
    }
  }

  return 0;
};

export const checkStreakTransformation = (
  nowStreaks?: number,
  prevStreaks?: number,
) => {
  if (nowStreaks && prevStreaks) {
    return nowStreaks - prevStreaks;
  } else if (nowStreaks) {
    return nowStreaks;
  } else if (!nowStreaks && prevStreaks) {
    return -prevStreaks;
  }

  return 0;
};

export const createNewCoachObj = (
  userRank: UserRank,
  coach: UserInterface,
  numTransformations: number,
): CoachRank => {
  return {
    rank: -1,
    uid: coach.uid,

    numTransformations: numTransformations,
    totalCalories: userRank.totalCalories,
    totalFitPoints: userRank.totalFitPoints,

    coachEventId: userRank.coachEventId,
    ...(userRank.coachCohortId
      ? { coachCohortId: userRank.coachCohortId }
      : {}),

    ...(userRank.dayCalObj ? { dayCalObj: userRank.dayCalObj } : {}),
    ...(userRank.weekCalMin ? { weekCalMin: userRank.weekCalMin } : {}),
    ...(userRank.weekCalObj ? { weekCalObj: userRank.weekCalObj } : {}),

    updatedOn: Date.now(),

    prizes: [],
    teamName: userRank.teamName,
    teamKey: userRank.teamKey,

    ...(coach.name ? { authorName: coach.name } : {}),
    ...(coach.profileImage ? { authorImg: coach.profileImage } : {}),
  };
};

export const createNewCoachObj_reconcile = (
  uid: string,
  numTransformations: number,
  totalCalories: number,
  totalFitPoints: number,
  coachEventId: string,
  dayCalObj: { [day: string]: number },
  weekCalMin: { [week: string]: number },
  weekCalObj: { [week: string]: number },
  coachName?: string,
  profileImage?: CloudinaryMedia,
): CoachRank => {
  return {
    rank: -1,
    uid,
    updatedOn: Date.now(),

    totalCalories,
    numTransformations,
    totalFitPoints,
    coachEventId,
    dayCalObj,
    weekCalMin,
    weekCalObj,

    prizes: [],

    teamName: "",
    teamKey: "",

    ...(coachName ? { authorName: coachName } : {}),
    ...(profileImage ? { authorImg: profileImage } : {}),
  };
};

const getCoachTransformations_reconcile = (
  judgeCrit: judgeCriterion,
  calCriterion: number,
  totalCalories?: number,
  nowStreaks?: number,
) => {
  if (judgeCrit === "calories" && totalCalories) {
    return Math.floor(totalCalories / calCriterion);
  } else if (judgeCrit === "streak" && nowStreaks) {
    return nowStreaks;
  }

  return 0;
};

export const updateCoachRankObjWithUserRanks = (
  userRank: UserRank,
  author: UserInterface,
  newTransformation: number,
  //   coach: UserInterface,
  rankObj?: CoachRank,
): CoachRank => {
  // console.log(
  //   "updating newTransformation",
  //   newTransformation,
  //   rankObj ? "Exists" : "New coach",
  // );
  if (rankObj) {
    return {
      ...rankObj,
      totalCalories: getKPIValue(rankObj.totalCalories, userRank.totalCalories),
      lastTotalCalories: rankObj.totalCalories,
      totalFitPoints: getKPIValue(
        rankObj.totalFitPoints,
        userRank.totalFitPoints,
      ),

      ...(typeof rankObj.numTransformations === "number"
        ? { numTransformations: rankObj.numTransformations + newTransformation }
        : { numTransformations: newTransformation }),
      //   coachKey: coach.userKey ? coach.userKey : "",
      updatedOn: Date.now(),

      ...(author.name ? { authorName: author.name } : {}),
      ...(author.profileImage ? { authorImg: author.profileImage } : {}),
    };
  } else {
    return createNewCoachObj(userRank, author, newTransformation);
  }
};

export const updateCoachRankObj = async (
  newActivity: Activity,
  userRank: UserRank,
  author: UserInterface,
  newTransformation: number,
  parentId: string,
  calCriterion: number,
  judgeCrit: judgeCriterion,
  after: number,
  dayCalObj: { [day: string]: number },
  weekCalMin: { [week: string]: number },
  weekCalObj: { [week: string]: number },
  rankObj?: CoachRank,
): Promise<CoachRank | undefined> => {
  if (rankObj) {
    return {
      ...rankObj,
      totalCalories: getKPIValue(rankObj.totalCalories, newActivity.calories),
      totalFitPoints: getKPIValue(
        rankObj.totalFitPoints,
        newActivity.fitPoints,
      ),

      dayCalObj: dayCalObj,
      weekCalMin: weekCalMin,
      weekCalObj: weekCalObj,

      ...(rankObj.numTransformations
        ? { numTransformations: rankObj.numTransformations + newTransformation }
        : { numTransformations: newTransformation }),
      //   coachKey: coach.userKey ? coach.userKey : "",
      updatedOn: Date.now(),

      ...(author.name ? { authorName: author.name } : {}),
      ...(author.profileImage ? { authorImg: author.profileImage } : {}),
    };
  } else {
    return await reconcileCoach(
      parentId,
      userRank.coachCommunityId,
      author,
      calCriterion,
      judgeCrit,
      after,
    );
    // return createNewCoachObj(userRank, author, newTransformation);
  }
};

export const reconcileCoachV3 = (
  eventId: string,
  coachCommunityId: string,
  coach: UserInterface,
  after: number,
  coachEventId: string,
  teamName: string,
  teamKey: string,
  userRanks: UserRank[],
  numActivitiesToCount: number,
  // sprints: SprintObject[],
  // rounds: RoundObject[],
) => {
  const {
    dayPointObj,
    weekPointObj,
    dayCalObj,
    weekCalObj,
    monthCalObj,
    monthPointObj,
    sortedCoachActivityPts,
    // taskMap,
  } = createDayStringPointObject_Coach(userRanks, numActivitiesToCount);

  // if (coach.uid === "blvJ95rzEUSMGoxQ6e4N5BAcCZ43") {
  //   console.log("coach");
  //   console.log(coach.kpiScoresV2);

  //   throw new Error("HI");
  // }

  return updateCoachRankV2(
    coach,
    coachEventId,
    dayPointObj,
    weekPointObj,
    dayCalObj,
    weekCalObj,
    monthCalObj,
    monthPointObj,
    teamName,
    teamKey,
    sortedCoachActivityPts,
  );
};

export const reconcileCoachV2 = async (
  eventId: string,
  coachCommunityId: string,
  coach: UserInterface,
  after: number,
  coachEventId: string,
  teamName: string,
  teamKey: string,
  numActivitiesToCount: number,
  // sprints: SprintObject[],
  // rounds: RoundObject[],
) => {
  const userRanks = await getAllUserRanksForCoach(eventId, coachCommunityId);
  const {
    dayPointObj,
    weekPointObj,
    dayCalObj,
    weekCalObj,
    monthCalObj,
    monthPointObj,
    sortedCoachActivityPts,
    // taskMap,
  } = createDayStringPointObject_Coach(userRanks, numActivitiesToCount);

  // if (coach.uid === "blvJ95rzEUSMGoxQ6e4N5BAcCZ43") {
  //   console.log("coach");
  //   console.log(coach.kpiScoresV2);

  //   throw new Error("HI");
  // }

  return updateCoachRankV2(
    coach,
    coachEventId,
    dayPointObj,
    weekPointObj,
    dayCalObj,
    weekCalObj,
    monthCalObj,
    monthPointObj,
    teamName,
    teamKey,
    sortedCoachActivityPts,
  );
};

export const reconcileCoach = async (
  eventId: string,
  coachCommunityId: string,
  author: UserInterface,
  calCriterion: number,
  judgeCrit: judgeCriterion,
  after: number,
): Promise<CoachRank | undefined> => {
  const userRanks = await getAllUserRanksForCoach(eventId, coachCommunityId);

  const { dayCalObj, weekCalMin, weekCalObj } =
    createDayStringCalorieObject_Coach(userRanks, after);

  const sumTotalCalories = Object.values(dayCalObj).reduce((a, b) => a + b, 0);
  const sumTotalMinCals = Object.values(weekCalMin).reduce((a, b) => a + b, 0);

  // console.log("userRanks", userRanks.length);

  const numTrans = getCoachTransformations_reconcile(
    judgeCrit,
    calCriterion,
    sumTotalCalories,
    sumTotalMinCals,
  );

  const newRank = createNewCoachObj_reconcile(
    author.uid,
    numTrans,
    sumTotalCalories,
    0,
    eventId,
    dayCalObj,
    weekCalMin,
    weekCalObj,
    author.name,
    author.profileImage,
  );

  // let rankObj: CoachRank | undefined = undefined;

  // for (const usrRank of userRanks) {
  // console.log("judgeCrit", judgeCrit);
  // console.log(
  //   "trans here",
  //   checkCoachTransformations(
  //     judgeCrit,
  //     calCriterion,
  //     usrRank.totalCalories,
  //     undefined,
  //     usrRank.scoreMinCal,
  //     undefined,
  //     // usrRank.numStreaks,
  //   ),
  // );
  //   rankObj = updateCoachRankObjWithUserRanks(
  //     usrRank,
  //     author,
  //     checkCoachTransformations(
  //       judgeCrit,
  //       calCriterion,
  //       usrRank.totalCalories,
  //       undefined,
  //       usrRank.scoreMinCal,
  //       undefined,
  //       // usrRank.numStreaks,
  //     ),
  //     rankObj,
  //   );
  // }

  // if (rankObj) {
  //   return {
  //     ...rankObj,
  //     dayCalObj: dayCalObj,
  //     weekCalMin: weekCalMin,
  //     weekCalObj: weekCalObj,
  //   };
  // }

  return newRank;
};

export const filterUsersForCoach = (
  userRanks: UserRank[],
  coachUID?: string,
) => {
  if (coachUID)
    return userRanks.filter((item) => item.coachCommunityId === coachUID);

  return [];
};

export const updateActivityInRankObj_ActivityUpdate = async (
  eventId: string,
  prev: UserRank,
  now: UserRank,
  author: UserInterface,
  newTransformation: number,
  calCriterion: number,
  judgeCrit: judgeCriterion,
  after: number,
  dayCalObj: { [day: string]: number },
  weekCalMin: { [week: string]: number },
  weekCalObj: { [week: string]: number },
  coachRank?: CoachRank,
): Promise<CoachRank | undefined> => {
  if (coachRank) {
    return {
      ...coachRank,
      totalCalories: getKPIValue(
        coachRank.totalCalories,
        now.totalCalories,
        prev.totalCalories,
      ),
      lastTotalCalories: coachRank.totalCalories,
      totalFitPoints: getKPIValue(
        coachRank.totalFitPoints,
        now.totalCalories,
        prev.totalCalories,
      ),

      dayCalObj: dayCalObj,
      weekCalMin: weekCalMin,
      weekCalObj: weekCalObj,

      ...(coachRank.numTransformations
        ? {
            numTransformations:
              coachRank.numTransformations + newTransformation,
          }
        : { numTransformations: newTransformation }),

      updatedOn: Date.now(),
      ...(author.name ? { authorName: author.name } : {}),
      ...(author.profileImage ? { authorImg: author.profileImage } : {}),
    };
  } else {
    return await reconcileCoach(
      eventId,
      now.coachCommunityId,
      author,
      calCriterion,
      judgeCrit,
      after,
    );
  }
};

export const saveRankedCoaches = async (
  coaches: CoachRank[],
  eventId: string,
) => {
  for (const coachRank of coaches) {
    // console.log(
    //   "coachRank",
    //   coachRank.authorName,
    //   coachRank.monthCalObj,
    //   coachRank.monthlyRank,
    // );
    await admin
      .firestore()
      .collection("sbEvents")
      .doc(eventId)
      .collection("coachRanks")
      .doc(`rank-${coachRank.uid}`)
      .set(coachRank, { merge: true });
  }
};
