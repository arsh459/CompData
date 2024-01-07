// import { BadgeSummaryPerf } from "@hooks/program/useBadgeProgress";
import {
  advanceBadge,
  agilityBadge,
  beginnerBadge,
  boxingBadge,
  intermediateBadge,
  pecfestBadge,
  strenthFemaleBadge,
  strenthMaleBadge,
} from "@constants/imageKitURL";
import { Badge, badgeTypes } from "@models/Prizes/Prizes";

export const getFPProg = (fpDone: number | undefined, fp: number) => {
  if (fp) {
    return (fpDone ? fpDone : 0) / fp;
  }

  return 0;
};

export const getFPString = (fpDone: number | undefined, fp: number) => {
  if (fp) {
    return `${fpDone ? fpDone : 0}/${fp}`;
  }

  return "0/0";
};

export const getWorkoutProg = (
  nbWorkoutsDone: number | undefined,
  nbWorkouts: number
) => {
  if (nbWorkouts) {
    return (nbWorkoutsDone ? nbWorkoutsDone : 0) / nbWorkouts;
  }

  return 0;
};

export const getWorkoutString = (
  nbWorkoutsDone: number | undefined,
  nbWorkouts: number
) => {
  if (nbWorkouts) {
    return `${nbWorkoutsDone ? nbWorkoutsDone : 0}/${nbWorkouts}`;
  }

  return "0/0";
};

export const getBadgeStats = (badge?: Badge) => {
  const remSummary = {
    fp: 0,
    nbWorkouts: 0,
  };

  badge &&
    badge?.workoutLevels &&
    badge?.workoutLevels.map((item) => {
      remSummary.nbWorkouts += item.nbWorkouts;
      remSummary.fp += item.nbFitpoints;
    });

  return remSummary;
};

export const getBadgeUrl = (badgeId?: badgeTypes) => {
  switch (badgeId) {
    case "beginner":
      return beginnerBadge;
    case "advance":
      return advanceBadge;
    case "intermediate":
      return intermediateBadge;
    case "agility":
      return agilityBadge;
    case "strength_male":
      return strenthMaleBadge;
    case "strength_female":
      return strenthFemaleBadge;
    case "boxing_style":
      return boxingBadge;
    case "pecfest_olympics":
      return pecfestBadge;

    default:
      return undefined;
  }
};
