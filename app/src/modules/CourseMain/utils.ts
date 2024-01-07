import { BadgeConfig } from "@models/User/User";
import { getStartTime } from "@modules/Nutrition/V2/DaySelector/provider/utils";

const handleWorkoutStatus = (
  pinnedBadgeId?: string,
  viewingBadgeId?: string,
  badgeStartTime?: number
): {
  buttonText?: string;
  action?: "GO_TO_PLAN" | "START_PLAN" | "START_PLAN_AND_PIN" | "CHANGE_PLAN";
} => {
  if (viewingBadgeId) {
    if (!pinnedBadgeId) {
      return {
        buttonText: "Start Plan",
        action: "START_PLAN_AND_PIN",
      };
    } else if (pinnedBadgeId === viewingBadgeId && !badgeStartTime) {
      return {
        buttonText: "Start Plan",
        action: "START_PLAN_AND_PIN",
      };
    } else if (pinnedBadgeId === viewingBadgeId && badgeStartTime) {
      return {
        buttonText: "Go to Plan",
        action: "GO_TO_PLAN",
      };
    } else if (pinnedBadgeId !== viewingBadgeId && badgeStartTime) {
      // badge was started before
      return {
        buttonText: "Start Plan",
        action: "CHANGE_PLAN",
      };
    } else if (pinnedBadgeId !== viewingBadgeId && !badgeStartTime) {
      // badge has not started
      return {
        buttonText: "Start Plan",
        action: "START_PLAN",
      };
    }
  }

  return {};
};

export const getButtonStatus = (
  type: "workout" | "nutrition",
  badgeId?: string,
  start?: number,
  nutritionStart?: number,
  badgeConfig?: { [badgeId: string]: BadgeConfig },
  pinnedBadgeId?: string,
  pinnedDietId?: string
): {
  buttonText?: string;
  action?: "GO_TO_PLAN" | "START_PLAN" | "START_PLAN_AND_PIN" | "CHANGE_PLAN";
} => {
  const badgeStartTime = getStartTime(
    badgeConfig,
    badgeId,
    type,
    start,
    nutritionStart
    // badgeConfig,
    // badgeId,
    // type
  );

  if (type === "workout") {
    return handleWorkoutStatus(pinnedBadgeId, badgeId, badgeStartTime);
  } else {
    return handleWorkoutStatus(pinnedDietId, badgeId, badgeStartTime);
  }
};
