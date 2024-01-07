import {
  Achiever,
  achieverProgress,
} from "../../../../models/awards/interface";
import { AchievementPathDataItemStatusType } from "../../../../models/User/User";

const awardWonUpdate = (
  achiever: Achiever,
  progress?: achieverProgress,
  totalCount?: number,
  mainLabel?: string,
): Achiever => {
  // add achieved award
  return {
    ...achiever,
    awardStatus: "WON",
    unlockOn: Date.now(),
    ...(progress ? { progress: progress } : {}),
    ...(totalCount ? { totalCount } : {}),
    ...(mainLabel ? { mainLabel } : {}),
  };
};

const awardLostUpdate = (
  achiever: Achiever,
  progress?: achieverProgress,
  totalCount?: number,
  mainLabel?: string,
): Achiever => {
  // add achieved award
  const interim: Achiever = {
    ...achiever,
    awardStatus: "TARGET",
    ...(progress ? { progress: progress } : {}),
    ...(totalCount ? { totalCount } : {}),
    ...(mainLabel ? { mainLabel } : {}),
  };

  const { unlockOn: _, ...rest } = interim;
  return rest;
};

export const handleAchieverAward = (
  achiever: Achiever,
  newState: AchievementPathDataItemStatusType,
  progressText: string,
  progress?: achieverProgress,
  totalCount?: number,
  mainLabel?: string,
  unlockedOn?: number,
): { updatedAchiever: Achiever; type: "justWon" | "justLost" | "none" } => {
  achiever.subtitle = progressText;

  if (newState === "DONE" && achiever.awardStatus !== "WON") {
    return {
      updatedAchiever: awardWonUpdate(
        achiever,
        progress,
        totalCount,
        mainLabel,
      ),
      type: "justWon",
    };
  } else if (newState !== "DONE" && achiever.awardStatus === "WON") {
    return {
      updatedAchiever: awardLostUpdate(
        achiever,
        progress,
        totalCount,
        mainLabel,
      ),
      type: "justLost",
    };
  }

  // console.log("totalCount", totalCount);
  // console.log("mainLabel", mainLabel);

  return {
    updatedAchiever: {
      ...achiever,
      ...(progress ? { progress: progress } : {}),
      ...(totalCount ? { totalCount } : {}),
      ...(mainLabel ? { mainLabel } : {}),
      ...(unlockedOn ? { unlockOn: unlockedOn } : {}),
    },

    type: "none",
  };
};
