import { getStreakPrizeV2 } from "../Prizes/getStreakPrizeV2";
import { RoundObject, SprintObject } from "../sbEvent/sbEvent";
import { UserInterface } from "../User/User";
import { UserRank } from "./Activity";

export const updateActivityInRankObjV2 = async (
  user: UserInterface,
  after: number,
  // before: number,
  daysElapsed: number,
  eventId: string,
  coachEventId: string,
  communityId: string,
  fitPointTh: number,
  teamName: string,
  teamKey: string,
  activityAfter: number,
  activityBefore: number,
  sprints: SprintObject[],
  rounds: RoundObject[],
  // refresh: "LAST_ROUND_ONLY" | "ALL",

  rankObj?: UserRank,
): Promise<UserRank | undefined> => {
  // console.log("user", user.name);
  const {
    dayFitPoints,
    totalFPoints,
    weekFitPoints,
    totalCalories,
    weekCalObj,
    dayCals,
    monthPointObj,
    monthCalObj,
  } = await getStreakPrizeV2(
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
  );

  if (rankObj) {
    return {
      ...rankObj,
      fitPointsV2: totalFPoints,
      weekPointObj: weekFitPoints,
      dayPointObj: dayFitPoints,
      totalCalories: totalCalories,
      weekCalObj: weekCalObj,
      dayCalObj: dayCals,
      monthPointObj: monthPointObj,
      monthCalObj: monthCalObj,
      progressV2: user.progressV2 ? user.progressV2 : 0,
      teamName: teamName,
      teamKey,
      userLevelV2: user.userLevelV2 ? user.userLevelV2 : 0,
      ...(coachEventId ? { coachEventId: coachEventId } : {}),
      updatedOn: Date.now(),
    };
  } else {
    return {
      rank: -1,
      communityRank: -1,
      uid: user.uid,
      coachCommunityId: communityId,
      coachEventId: coachEventId,
      eventId: eventId,
      teamName: teamName,
      teamKey,

      fitPointsV2: totalFPoints,
      weekPointObj: weekFitPoints,
      monthActPts: {}, // reconciled. Will be fixed in update
      dayPointObj: dayFitPoints,
      totalCalories: totalCalories,
      progressV2: user.progressV2 ? user.progressV2 : 0,
      weekCalObj: weekCalObj,
      dayCalObj: dayCals,
      monthPointObj: monthPointObj,
      monthCalObj: monthCalObj,
      userLevelV2: user.userLevelV2 ? user.userLevelV2 : 0,

      updatedOn: Date.now(),

      prizes: [],
      numActivities: 0,

      ...(user.name ? { authorName: user.name } : {}),
      ...(user.profileImage ? { authorImg: user.profileImage } : {}),
      gender: user.gender ? user.gender : "notSpecified",
    };
  }
};
