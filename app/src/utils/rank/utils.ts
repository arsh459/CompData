import { CoachRank, UserRank } from "@models/Activity/Activity";
import { getCurrentPlayerPts } from "@modules/HomeScreen/NewHome/utils";
// import { API_BASE_URL } from "react-native-dotenv";

export type leaderboardWeekTypes = "overall" | "current";

// export const reconcileCoachesCall = async (id: string) => {
//   await axios({
//     url: `${API_BASE_URL}/api/reconcile/reconcileCoachesV2`,
//     method: "POST",
//     params: {
//       eventId: id,
//     },
//   });
// };

// export const reconcileUsersCall = async (id: string) => {
//   await axios({
//     url: `${API_BASE_URL}/api/reconcile/reconcileUsersV2`,
//     method: "POST",
//     params: {
//       eventId: id,
//     },
//   });
// };

// export const reconcilePrizesCall = async (id: string) => {
//   await axios({
//     url: `${API_BASE_URL}/api/reconcile/reconcilePrizesV2`,
//     method: "POST",
//     params: {
//       eventId: id,
//     },
//   });
// };

// export const reconcileLevelsCall = async () => {
//   await axios({
//     url: `${API_BASE_URL}/api/reconcile/refreshUserLevels`,
//     method: "POST",
//     params: {
//       // eventId: id,
//     },
//   });
// };

// const sortR;

export const getSortedTeamRanks = (userRanks: UserRank[], sprintId: string) => {
  return userRanks.sort(
    (a, b) =>
      getCurrentPlayerPts(b, sprintId).fps -
      getCurrentPlayerPts(a, sprintId).fps
  );
};

export const getMyRank = (
  userRanks: UserRank[],
  sprintId: string,
  uid: string
) => {
  const sorted = getSortedTeamRanks(userRanks, sprintId);

  let i: number = 1;
  for (const sortRank of sorted) {
    if (sortRank.uid === uid) {
      return i;
    }

    i++;
  }

  return userRanks.length;
};

export const getRank = (
  userRank: UserRank | CoachRank | undefined,
  leaderboardWeek?: string,
  currentMonth?: string
): number => {
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

  return 0;
};

export const getCals = (
  userRank: UserRank | CoachRank,
  leaderboardWeek: leaderboardWeekTypes | undefined,
  currentWeek: string
) => {
  if (leaderboardWeek === "current" && userRank.weekCalObj) {
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
    return coachRank.weekCalMin[currentWeek]
      ? coachRank.weekCalMin[currentWeek]
      : 0;
  }

  return coachRank.numTransformations ? coachRank.numTransformations : 0;
};
