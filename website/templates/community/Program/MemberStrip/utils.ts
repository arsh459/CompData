import { leaderboardWeekTypes } from "@hooks/community/useCommunityParams";
import { CoachRank, UserRank } from "@models/Activities/Activity";
import axios from "axios";

export const reconcileCoachesCall = async (id: string) => {
  await axios({
    url: "/api/reconcile/reconcileCoachesV2",
    method: "POST",
    params: {
      eventId: id,
    },
  });
};

export const reconcileUsersCall = async (id: string) => {
  await axios({
    url: "/api/reconcile/reconcileUsersV2",
    method: "POST",
    params: {
      eventId: id,
    },
  });
};

export const reconcilePrizesCall = async (id: string) => {
  await axios({
    url: "/api/reconcile/reconcilePrizesV2",
    method: "POST",
    params: {
      eventId: id,
    },
  });
};

export const reconcileLevelsCall = async () => {
  await axios({
    url: "/api/reconcile/refreshUserLevels",
    method: "POST",
    params: {
      // eventId: id,
    },
  });
};

export const getRank = (
  userRank: UserRank | CoachRank | undefined,
  leaderboardWeek?: string,
  currentMonth?: string
): number => {
  // console.log("leaderboardWeek", leaderboardWeek);
  // console.log("currentMonth", currentMonth);
  if (
    leaderboardWeek === "overall" &&
    userRank?.monthlyRank &&
    currentMonth &&
    userRank.monthlyRank[currentMonth]
  ) {
    return userRank.monthlyRank[currentMonth];
  }

  if (
    leaderboardWeek &&
    userRank?.weeklyRank &&
    userRank?.weeklyRank[leaderboardWeek]
  ) {
    return userRank?.weeklyRank[leaderboardWeek];
  }

  if (userRank?.rank) {
    return userRank.rank;
  }

  // console.log("HEREE", userRank?.monthlyRank);

  return 0;
};

export const getCals = (
  userRank: UserRank | CoachRank,
  leaderboardWeek: leaderboardWeekTypes | undefined,
  currentWeek: string
) => {
  if (leaderboardWeek === "current" && userRank.weekCalObj) {
    // console.log(userRank.authorName, userRank.weekCalObj);
    return userRank.weekCalObj[currentWeek]
      ? userRank.weekCalObj[currentWeek]
      : 0;
  }

  return userRank.totalCalories;
};

export const getLastCals = (
  userRank: UserRank | CoachRank,
  leaderboardWeek: leaderboardWeekTypes | undefined
) => {
  if (leaderboardWeek === "current") {
    // console.log(userRank.authorName, userRank.weekCalObj);
    return 0;
  }

  return userRank.lastTotalCalories;
};

export const getCalMin = (
  userRank: UserRank,
  leaderboardWeek: leaderboardWeekTypes | undefined,
  currentWeek: string
) => {
  if (leaderboardWeek === "current" && userRank.weekCalMin) {
    // console.log(userRank.authorName, userRank.weekCalObj);
    return userRank.weekCalMin[currentWeek]
      ? userRank.weekCalMin[currentWeek]
      : 0;
  }

  return userRank.scoreMinCal;
};

export const getPointsToShow = (
  userRank: UserRank | CoachRank,
  leaderboardWeek: string | undefined,
  // currentWeek: string,
  leaderboardMonth: string | undefined
) => {
  if (
    leaderboardWeek === "overall" &&
    leaderboardMonth &&
    userRank.monthPointObj &&
    userRank.monthPointObj[leaderboardMonth]
  ) {
    return userRank.monthPointObj[leaderboardMonth];
  }

  if (
    userRank.weekPointObj &&
    leaderboardWeek &&
    userRank.weekPointObj[leaderboardWeek]
  ) {
    // console.log(userRank.authorName, userRank.weekCalObj);
    return userRank.weekPointObj[leaderboardWeek];
  }

  return 0;
};

export const getTransformations = (
  coachRank: CoachRank,
  leaderboardWeek: leaderboardWeekTypes | undefined,
  currentWeek: string
) => {
  if (leaderboardWeek === "current" && coachRank.weekCalMin) {
    // console.log(userRank.authorName, userRank.weekCalObj);
    return coachRank.weekCalMin[currentWeek]
      ? coachRank.weekCalMin[currentWeek]
      : 0;
  }

  return coachRank.numTransformations ? coachRank.numTransformations : 0;
};
