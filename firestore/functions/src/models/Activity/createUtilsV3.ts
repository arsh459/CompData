import { getStreakPrizeV3 } from "../Prizes/getStreakPrizeV3";
import { getUserLevelPts } from "../Prizes/userLevelPts";
import { RoundObject, SprintObject } from "../sbEvent/sbEvent";
import { UserInterface } from "../User/User";
import { UserRank } from "./Activity";

export const updateActivityInRankObjV3 = async (
  user: UserInterface,
  after: number,
  // before: number,
  daysElapsed: number,
  eventId: string,
  coachEventId: string,
  fitPointTh: number,
  teamName: string,
  teamKey: string,
  activityAfter: number,
  activityBefore: number,
  sprints: SprintObject[],
  rounds: RoundObject[],
  // refresh: "LAST_ROUND_ONLY" | "ALL",

  rankObj: UserRank,
  coachUID: string,
  sprintId: string,
  filteredState?: boolean,
): Promise<{ userRank: UserRank; actReads: number } | undefined> => {
  //   console.log("user", user.name);
  const {
    dayFitPoints,
    totalFPoints,
    weekFitPoints,
    totalCalories,
    weekCalObj,
    dayCals,
    monthPointObj,
    monthCalObj,
    actReads,
    allUserActivities,
    monthUserWithActs,
  } = await getStreakPrizeV3(
    user.uid,
    after,
    // before,
    fitPointTh,
    daysElapsed,
    activityAfter,
    activityBefore,
    sprints,
    rounds,
    eventId,
    sprintId,
    rankObj.dayCalObj ? rankObj.dayCalObj : {},
    rankObj.dayPointObj ? rankObj.dayPointObj : {},
    rankObj.monthActPts ? rankObj.monthActPts : {},
    filteredState,
  );

  // console.log("HERE");

  const { userLevel, progressV2 } = await getUserLevelPts(
    user.uid,
    allUserActivities,
    user.dayCalObj ? user.dayCalObj : {},
    user.dayPointObj ? user.dayPointObj : {},
    user.userLevelV2 ? user.userLevelV2 : 0,
    activityAfter,
    activityBefore,
    sprintId,
    rankObj.monthActPts ? rankObj.monthActPts : {},
  );

  // console.log("userLevel", userLevel, "progressV2", progressV2);
  // console.log("userLevel", userLevel, "progressV2", progressV2);
  // console.log("month", monthTaskObj);

  // if (user.uid === "lHhuSVKMAZbj86xg8m6ubZqKdUj2") {
  //   throw new Error("hI");
  // }

  return {
    userRank: {
      ...rankObj,
      fitPointsV2: totalFPoints,
      weekPointObj: weekFitPoints,
      dayPointObj: dayFitPoints,
      totalCalories: totalCalories,
      weekCalObj: weekCalObj,
      dayCalObj: dayCals,

      // monthTaskPts: monthTaskObj, // add month taskPts
      monthPointObj: monthPointObj, //untrusted
      monthActPts: monthUserWithActs, // untrusted
      monthCalObj: monthCalObj,
      teamName: teamName,
      progressV2: progressV2 ? progressV2 : 0,
      teamKey,
      userLevelV2: userLevel ? userLevel : 0,
      ...(coachEventId ? { coachEventId: coachEventId } : {}),
      updatedOn: Date.now(),
      coachCommunityId: coachUID,
      gender: user.gender ? user.gender : "notSpecified",
    },
    actReads,
  };
};
