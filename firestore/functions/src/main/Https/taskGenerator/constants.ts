import { Badge } from "../../../models/Prizes/Badges";
import { UserInterface } from "../../../models/User/User";
import { getDayStartIST } from "../../PubSub/activityTracker/utils";
import { getPreviousDayRecsBetween } from "./getterSetter";
import { getTierDays } from "./main";

export type coaches = "arja" | "manish" | "varun" | "greesha" | "mix";

export const GREESHA_UID = "tw2b3klNtDcKbASqnoNSWXrUxoh2";
export const ARJA_UID = "1Xgo2Pr8zrOF7y7e565gB4SwQQl1";
export const GREESHA_PCOS = "d3b54de8-ac46-431c-b174-ab3351729413";

/// ARJA BADGES
export const ARJA_BEGINEER = "2f237d4a-b46f-41ca-864e-abba66afd8f5";
export const SOCIALBOAT_BEGINNER = "b36f6018-73d0-46b2-b230-29020060ea70";
export const PV_SINDHU = "47e708aa-5045-473d-9abd-456df478d17a";
export const MARY_KOM = "911d0f8a-feea-4e00-9635-55c9bc8a423b";
export const BOOTCAMP_YOGA = "b0368502-1452-4fb3-bcc7-d466e57391e5";
export const BOOTCAMP_ARJA = "a6f748dc-3ba1-4257-b5f2-bb47837e0100";
export const BOOTCAMP_DIET = "13d4b642-5f76-4f77-8cf3-e565ba9f23ff";
/// ARJA BADGES

export const PANDYA = "cf7add71-e2cf-4a1d-9378-2ba6c6188799";
export const KOHLI = "85c13380-a744-4d9f-bb66-25ec7bcc9f46";
export const KIRSTEN_JUMP_ROPE = "00c40004-26c0-4bf2-916a-144e25422394";
// export const MANISH_UID = "";
// export const VARUN_UID = "";
export const KIRSTEN = "w64md9HyvLa6VovlMlMQKD4l6Oh1";
// export const KIRSTEN_WORKOUTS = "";
// export const TIER_CUTOFF = 0.25;

// greesha
// tier 0, tier 1, tier 2, tier 1, tier 2
// d0..d7,

// mix
// arja 0, arja 1, arja 2, varun, manish

const getTierDayProgress = async (
  uid: string,
  toMonitorBadgeId: string,
  days: number[],
) => {
  const now = Date.now();
  const nowStart = getDayStartIST(now);
  const now_15 = nowStart - 15 * 24 * 60 * 60 * 1000;

  const prevTasks = await getPreviousDayRecsBetween(uid, now_15, nowStart);
  let done: number = 0;
  let total: number = 0;

  for (const tk of prevTasks) {
    if (tk.badgeId === toMonitorBadgeId && days.includes(tk.day)) {
      total += tk.taskFP;
      done += tk.doneFP ? tk.doneFP : 0;
    }
  }

  if (total) {
    return done / total;
  }

  return 0;
};

export const shouldTierIncrease = async (
  uid: string,
  toMonitorBadgeId: string,
  tierMap: { [dayString: string]: number },
  tierToCheck: number,
  tierCutoff: number,
) => {
  const days = getTierDays(tierMap, tierToCheck);

  // console.log("days", days);

  const score = await getTierDayProgress(uid, toMonitorBadgeId, days);

  // console.log("score", score);

  const sortedDays = days.sort((x, y) => x - y);

  // console.log("sortedDays", sortedDays);

  if (score >= tierCutoff) {
    return { status: true, badgeDay: sortedDays[sortedDays.length - 1] };
  }

  return { status: false, badgeDay: sortedDays[0] };
};

export const getTierDay = async (
  uid: string,
  currentBadge: Badge,
  tierToCheck: number,
) => {
  const tierInc = await shouldTierIncrease(
    uid,
    currentBadge.id,
    currentBadge.tierMap ? currentBadge.tierMap : {},
    tierToCheck,
    currentBadge.tierCutoff ? currentBadge.tierCutoff : 0,
  );

  // console.log("tierInc", tierInc);

  if (tierInc.status) {
    return {
      badgeId: currentBadge.myNextBadgeId,
      badgeDay: tierInc.badgeDay,
    };
  } else {
    return {
      badgeId: currentBadge.id,
      badgeDay: tierInc.badgeDay,
    };
  }
};

export const getNextBadgeId = async (
  uid: string,
  currentBadge: Badge,
  tierToCheck: number,
  primaryWorkoutCoach?: string,
): Promise<{ badgeId?: string; badgeDay?: number }> => {
  const tierInc = await shouldTierIncrease(
    uid,
    currentBadge.id,
    currentBadge.tierMap ? currentBadge.tierMap : {},
    tierToCheck,
    currentBadge.tierCutoff ? currentBadge.tierCutoff : 0,
  );

  if (tierInc.status && primaryWorkoutCoach && currentBadge.myNextBadgeId) {
    return {
      badgeId: currentBadge.myNextBadgeId,
      badgeDay: 0,
    };
  } else if (tierInc.status && currentBadge.nextBadgeId) {
    return {
      badgeId: currentBadge.nextBadgeId,
      badgeDay: 0,
    };
  } else {
    return {
      badgeId: currentBadge.id,
      badgeDay: 0,
    };
  }
};

export const getRecommendationConfig = (user?: UserInterface) => {
  return user?.recommendationConfig;
};

export const getStartTime = (
  user?: UserInterface,
  badgeId?: string,
  type?: "workout" | "nutrition",
) => {
  console.log("badgeId", badgeId);
  console.log("user", user?.recommendationConfig?.badgeConfig);

  if (user && badgeId) {
    if (
      user.recommendationConfig?.badgeConfig &&
      user.recommendationConfig.badgeConfig[badgeId] &&
      user.recommendationConfig.badgeConfig[badgeId].start
    ) {
      console.log("returning BADGE START");
      return user.recommendationConfig.badgeConfig[badgeId].start;
    }

    if (
      type === "nutrition" &&
      user.recommendationConfig &&
      user.recommendationConfig.nutritionStart
    ) {
      console.log("returning NUTRITION START");
      return user.recommendationConfig.nutritionStart;
    }

    if (
      user.recommendationConfig &&
      user.recommendationConfig.start &&
      user.badgeId === badgeId
    ) {
      console.log("returning WORKOUT START");
      return user.recommendationConfig.start;
    }
  }

  return undefined;
};
