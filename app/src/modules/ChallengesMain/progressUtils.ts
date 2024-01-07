import { dailyRewardUserState } from "@hooks/rounds/useDailyRewardProgress";
import { dayRecommendation } from "@models/User/User";
import {
  dayTaskProgress,
  tkProgressInterface,
} from "@providers/user/store/useUserStore";

export const getRecProgress = (
  date: string,
  recCache: { [id: string]: dayRecommendation },
  badgeId?: string
) => {
  if (badgeId && recCache[`${badgeId}-${date}`]) {
    const recObj = recCache[`${badgeId}-${date}`];

    if (recObj.doneFP) {
      return recObj.doneFP / (recObj.taskFP ? recObj.taskFP : 1);
    }
  }

  return 0;
};

export const getOverallProgress = (
  date: string,
  progressCache: { [id: string]: tkProgressInterface },
  dailyRewardStatus: dailyRewardUserState,
  badgeId?: string,
  nutritionBadgeId?: string,
  challengeDayProgress?: dayTaskProgress
): { total: number; done: number; progress: number } => {
  let totalDone: number = 0;
  let total: number = 0;

  // if (dailyRewardStatus === "unknown") {
  //   return { total: 1, done: 0, progress: 0 };
  // }

  if (badgeId) {
    const wkProgress: tkProgressInterface | undefined =
      progressCache[`${badgeId}-${date}`];
    totalDone += wkProgress?.done ? wkProgress.done : 0;
    total += wkProgress?.total ? wkProgress?.total : 0;

    // console.log("wkProgress", wkProgress);
    // console.log("totalDone", totalDone);
    // console.log("total", total);
  }

  if (nutritionBadgeId) {
    const dtProgress: tkProgressInterface | undefined =
      progressCache[`${nutritionBadgeId}-${date}`];
    totalDone += dtProgress?.done ? dtProgress.done : 0;
    total += dtProgress?.total ? dtProgress?.total : 0;

    // console.log("dtProgress", dtProgress);
    // console.log("totalDone", totalDone);
    // console.log("total", total);
  }

  // if (dailyRewardStatus === "claimed") {
  //   totalDone++;
  // }
  // total++;

  if (challengeDayProgress && challengeDayProgress[date]) {
    const dayMap = challengeDayProgress[date];
    for (const tkId of Object.keys(dayMap)) {
      const indProg = dayMap[tkId];
      if (indProg) {
        totalDone += indProg.done;
        total += indProg.target;
      }

      // console.log("indProg", indProg);
    }
  }

  // console.log("totalDone", totalDone);
  // console.log("total", total);

  // if (roundBadgeIds) {
  //   for (const newBadgeId of roundBadgeIds) {
  //     const challengeProgress: tkProgressInterface | undefined =
  //       progressCache[`${newBadgeId}-${date}`];

  //     totalDone += challengeProgress?.done ? challengeProgress.done : 0;
  //     total += challengeProgress?.total ? challengeProgress?.total : 0;

  //     console.log("challengeProgress", challengeProgress);
  //     console.log("totalDone", totalDone);
  //     console.log("total", total);
  //   }
  // }

  return {
    total,
    done: totalDone,
    progress: totalDone / (total ? total : 1),
  };
};
