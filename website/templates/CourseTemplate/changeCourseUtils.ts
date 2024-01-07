import { db } from "@config/firebase";
import { RecommendationConfig, UserInterface } from "@models/User/User";
import { getStartTime } from "@modules/ProPlanModule/utils";
import { doc, updateDoc } from "firebase/firestore";

export const getButtonStatus = (
  type: "workout" | "nutrition",
  badgeId?: string,
  user?: UserInterface
): {
  buttonText?: string;
  action?: "GO_TO_PLAN" | "START_PLAN" | "START_PLAN_AND_PIN" | "CHANGE_PLAN";
} => {
  const badgeStartTime = getStartTime(user, badgeId, type);

  const pinnedDietId = user?.nutritionBadgeId;
  const pinnedBadgeId = user?.badgeId;

  // console.log("type", type);

  if (type === "workout") {
    return handleWorkoutStatus(pinnedBadgeId, badgeId, badgeStartTime);
  } else {
    return handleWorkoutStatus(pinnedDietId, badgeId, badgeStartTime);
  }
};

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

export const pinWorkout = async (uid: string, badgeId: string) => {
  await updateDoc(doc(db, "users", uid), {
    badgeId: badgeId,
    badgeIdEnrolled: badgeId,
  });
};

export const startAndPinWorkout = async (uid: string, badgeId: string) => {
  const recObj: RecommendationConfig = {
    start: Date.now(),
    baseTier: 0,
  };

  await updateDoc(doc(db, "users", uid), {
    badgeId: badgeId,
    badgeIdEnrolled: badgeId,
    [`recommendationConfig.start`]: recObj.start,
    [`recommendationConfig.badgeConfig.${badgeId}.start`]: recObj.start,
    [`recommendationConfig.baseTier`]: recObj.baseTier,
  });
};
