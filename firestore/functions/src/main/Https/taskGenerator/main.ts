import { TEAM_ALPHABET_GAME } from "../../../constants/challenge";

import { Badge } from "../../../models/Prizes/Badges";

import {
  Day,
  dayMap,
  // dayRecommendation,
  UserInterface,
} from "../../../models/User/User";
import {
  getNextBadgeId,
  getTierDay,
  // shouldTierIncrease,
} from "./constants";
import {
  // getDayStartIST,
  getFormattedDateForUnix,
} from "../../PubSub/activityTracker/utils";
import {
  // createDayRecommendationList,
  getPreviousDayRecs,
  // saveDayRecommendationList,
} from "./getterSetter";
import { getBadge } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";
import {
  getDayStartForTz,
  getTimezone,
} from "../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
import { getLiveTaskDay } from "./getLiveTaskDay";

const getDayAndTier = (badge: Badge, dayToCheck: number) => {
  if (badge.workoutLevels) {
    return badge.workoutLevels?.filter((item) => item.day === dayToCheck);
  }

  return [];
};

const getBadgeFromMap = async (
  badgeId: string,
  badges: { [badgeId: string]: Badge },
) => {
  const idToCheck = badgeId.trim();
  if (badges[idToCheck]) {
    return { badges, badge: badges[idToCheck] };
  } else {
    const badge = await getBadge(idToCheck, TEAM_ALPHABET_GAME);
    if (badge)
      return { badges: { ...badges, [idToCheck]: badge }, badge: badge };
  }

  return { badges };
};

export const getTierDays = (
  tierMap: { [dayString: string]: number },
  tier: number,
) => {
  const dayArray: number[] = [];

  for (const dayString of Object.keys(tierMap)) {
    // if tier is right
    if (tierMap[dayString] === tier) {
      const bounds = dayString.split("_");
      if (bounds.length === 2) {
        for (
          let j: number = parseInt(bounds[0]);
          j < parseInt(bounds[1]);
          j++
        ) {
          dayArray.push(j);
        }
      }
    }

    // if (tierMap[parseInt(day)] === tier) {
    //   dayArray.push(parseInt(day));
    // }
  }

  return dayArray;
};

const getWKLevelTier = (badge: Badge, day: number) => {
  if (badge.tierMap) {
    for (const dayString of Object.keys(badge.tierMap)) {
      const bounds = dayString.split("_");
      if (bounds.length === 2) {
        if (day >= parseInt(bounds[0]) && day < parseInt(bounds[1])) {
          return badge.tierMap[dayString];
        }
      }
    }
  }

  return 0;
};

const getWorkoutLevels = (badge: Badge, day: number) => {
  const wkLevelsForDay = getDayAndTier(badge, day);
  const wkLevelsForPrev = getDayAndTier(badge, day - 1);

  return {
    levelsToday: wkLevelsForDay,
    levelsYesterday: wkLevelsForPrev,
    tierToday: getWKLevelTier(badge, day),
    tierYesterday: getWKLevelTier(badge, day - 1),
  };
};

type checkStatus =
  | "SAME_BADGE_SAME_TIER"
  | "SAME_BADGE_NEXT_TIER"
  | "LIVE_BADGE_ID"
  | "BADGE_RECALCULATE";

interface checkInterface {
  status: checkStatus;
  badgeId: string;
  badges: { [badgeId: string]: Badge };
  currentBadge: Badge;
  tierToday: number;
  tierYesterday: number;
}

export const checkIfTasksExistOnBadge = async (
  badgeId: string,
  day: number,
  // previousDayNumber: number,
  badges: { [badgeId: string]: Badge },
): Promise<checkInterface> => {
  // console.log("resp", badgeId);
  const resp = await getBadgeFromMap(badgeId, badges);

  // console.log("resp", resp.badge?.name);

  if (resp.badge) {
    if (resp.badge.liveBadge) {
      return {
        status: "LIVE_BADGE_ID",
        badgeId: resp.badge.id,
        badges: resp.badges,
        currentBadge: resp.badge,
        tierToday: -1,
        tierYesterday: -1,
      };
    }

    const { levelsToday, tierToday, tierYesterday } = getWorkoutLevels(
      resp.badge,
      day,
    );

    // console.log("levelsToday", levelsToday.length);
    // console.log("tierToday", tierToday);
    // console.log("tierYesterday", tierYesterday);

    if (tierToday === tierYesterday && levelsToday.length) {
      return {
        status: "SAME_BADGE_SAME_TIER",
        badgeId: resp.badge.id,
        badges: resp.badges,
        currentBadge: resp.badge,
        tierToday,
        tierYesterday,
      };
    } else if (levelsToday.length && tierToday !== tierYesterday) {
      return {
        status: "SAME_BADGE_NEXT_TIER",
        tierToday,
        tierYesterday,
        badges: resp.badges,
        badgeId: resp.badge.id,
        currentBadge: resp.badge,
      };
    } else {
      return {
        status: "BADGE_RECALCULATE",
        badges: resp.badges,
        badgeId: resp.badge.id,
        currentBadge: resp.badge,
        tierToday,
        tierYesterday,
      };
    }
  }

  throw new Error("Badge Id not present");
};

export const getBadgeIdDayV2 = async (
  uid: string,
  expectedBadgeId: string, // arja
  expectedDay: number, // 35
  badges: { [badgeId: string]: Badge },
  userDayStart: number,
  timezone: string,
  primaryWorkoutCoach?: string,

  // tierScores: { [tier: number]: number },
  // dayCoach: string,
): Promise<{
  badgeId?: string;
  badgeDay?: number;
  badges: { [badgeId: string]: Badge };
}> => {
  const resp = await checkIfTasksExistOnBadge(
    expectedBadgeId,
    expectedDay,
    badges,
  );

  // resp.badgeId === null

  if (resp.status === "LIVE_BADGE_ID") {
    return {
      badges: resp.badges,
      badgeId: resp.badgeId,
      badgeDay: await getLiveTaskDay(resp.badgeId, userDayStart, timezone),
    };
  }

  // same badge same tier
  else if (resp.status === "SAME_BADGE_SAME_TIER") {
    return {
      badgeId: resp.badgeId,
      badgeDay: expectedDay,
      badges: resp.badges,
    };
  } else if (resp.status === "SAME_BADGE_NEXT_TIER") {
    const { badgeId, badgeDay } = await getTierDay(
      uid,
      resp.badges[resp.badgeId],
      resp.tierYesterday,
    );

    return {
      badgeId,
      badgeDay,
      badges: resp.badges,
    };
  } else if (resp.status === "BADGE_RECALCULATE") {
    const { badgeId, badgeDay } = await getNextBadgeId(
      uid,
      resp.badges[resp.badgeId],
      resp.tierYesterday,
      primaryWorkoutCoach,
    );

    return {
      badgeId,
      badgeDay,
      badges: resp.badges,
    };
  }

  throw new Error("Check edge case here 1");
};

export const getToday = (user: UserInterface) => {
  const now = Date.now();

  const tz = getTimezone(user);
  const nowStart = getDayStartForTz(tz, now);

  return {
    now,
    nowStart,
  };
};

export const isDayRestDay = (workoutDays: Day[], dayNumber: number) => {
  const dayVal = dayMap[dayNumber];

  if (dayVal && workoutDays.includes(dayVal)) {
    return false;
  }

  return true;
};

const getDatesForRecs = async (
  uid: string,
  nowStart: number,
  num: number,
  currentBadgeId: string,
  todayDayNumber: number,
  badges: { [badgeId: string]: Badge },
  workoutDays: Day[],
  timezone: string,
  primaryWorkoutCoach?: string,
  startToday?: boolean,
) => {
  const dateList: {
    unix: number;
    date: string;
    badgeId?: string;
    day?: number;
    restDay?: boolean;
  }[] = [];
  let badgesMap = { ...badges };

  const initValue = startToday ? 0 : 1;
  let badgeIdToTrack: string = currentBadgeId;
  let dayNoToTrack: number = todayDayNumber - 1;
  for (let i: number = initValue; i <= num; i++) {
    const tomorrow = nowStart + i * 24 * 60 * 60 * 1000;

    const tomorrow_dt = getFormattedDateForUnix(tomorrow, "YYYY-MM-DD");
    const newDayNumber = dayNoToTrack + 1;

    // console.log("badgeIdToTrack", badgeIdToTrack);
    // console.log("dayNoToTrack", dayNoToTrack);
    // console.log("tomorrow", tomorrow);
    // console.log("tomorrow_dt", tomorrow_dt);
    // console.log("newDayNumber", newDayNumber);
    // console.log("new Date(tomorrow)", new Date(tomorrow));

    const day = new Date(tomorrow_dt).getDay();

    // console.log("day", day);

    const restDay = isDayRestDay(workoutDays, day);
    // console.log("restDay", restDay);
    if (restDay) {
      dateList.push({
        unix: tomorrow,
        date: tomorrow_dt,
        restDay: true,
        badgeId: badgeIdToTrack,
        day: dayNoToTrack,
      });
    } else {
      const resp = await getBadgeIdDayV2(
        uid,
        badgeIdToTrack,
        newDayNumber,
        badgesMap,
        tomorrow,
        timezone,
        primaryWorkoutCoach,
      );

      // update badges
      badgesMap = resp.badges;

      if (resp.badgeId && typeof resp.badgeDay === "number") {
        dateList.push({
          unix: tomorrow,
          badgeId: resp.badgeId,
          day: resp.badgeDay,
          date: tomorrow_dt,
        });

        // update day and badgeId
        dayNoToTrack = resp.badgeDay;
        badgeIdToTrack = resp.badgeId;
      } else {
        dateList.push({
          unix: tomorrow,
          date: tomorrow_dt,
        });
      }
    }

    // console.log("");
    // console.log("");

    // dateList.push([tomorrow, tomorrow_dt, newDayNumber]);
  }

  return dateList;
};

export const getCurrentBadgeAndDay = async (
  uid: string,
  nowStart: number,
  timeStart: number,
  baseBadgeId: string,
  type: "workout" | "nutrition",
  dayCount: number,
  startFromBeginning?: boolean,
) => {
  if (startFromBeginning) {
    return {
      currentBadgeId: baseBadgeId,
      todayDayNumber: 0,
      startTime: timeStart,
      daysToRun: dayCount,
    };
  }

  const todaysRec = await getPreviousDayRecs(
    uid,
    getFormattedDateForUnix(nowStart, "YYYY-MM-DD"),
    type,
    baseBadgeId,
  );

  console.log(
    todaysRec?.date,
    "BadegId: ",
    todaysRec?.badgeId,
    "Day: ",
    todaysRec?.day,
  );

  // should not be a manual entry
  if (todaysRec?.badgeId && typeof todaysRec.day === "number") {
    return {
      currentBadgeId: todaysRec.badgeId,
      todayDayNumber: todaysRec.day,
      startTime: nowStart,
      daysToRun: dayCount,
    };
  } else {
    const daysToConsider =
      Math.ceil((Date.now() - timeStart) / (24 * 60 * 60 * 1000)) + 3;

    return {
      currentBadgeId: baseBadgeId,
      todayDayNumber: 0,
      startTime: timeStart,
      daysToRun: daysToConsider,
    };
  }
};

export const mainTaskGeneratorV2_dep = async (
  user: UserInterface,
  workoutDays: Day[],
  primaryWorkoutCoach: string,
  startToday: boolean,
  start: number,
  badgeId: string,
  dayCount: number,
  type: "workout" | "nutrition",
  timezone: string,
  recreate?: boolean,
  ignoreManual?: boolean,
) => {
  // const user = await getUserById(uid);
  // const resp = getRecommendationConfig(user);

  // console.log("user", user?.name);
  // console.log("resp", resp);

  // if base badge is present & recommendations have started
  if (start && badgeId) {
    const { nowStart } = getToday(user);

    // console.log("now Start", nowStart);

    const { todayDayNumber, currentBadgeId, startTime, daysToRun } =
      await getCurrentBadgeAndDay(
        user.uid,
        nowStart,
        start,
        badgeId,
        type,
        dayCount,
        recreate,
      );

    // console.log("currentBadgeId", currentBadgeId);

    let badges: { [badgeId: string]: Badge } = {};

    const dtSubObj = await getDatesForRecs(
      user.uid,
      startTime,
      daysToRun,
      currentBadgeId,
      todayDayNumber,
      badges,
      workoutDays,
      timezone,
      primaryWorkoutCoach,
      startToday,
    );

    // const recs: { [date: string]: dayRecommendation } = {};
    for (const dt of dtSubObj) {
      // update badge store

      // badgeId we were able to predict
      if (dt.badgeId && typeof dt.day === "number") {
        // const newObj = await createDayRecommendationList(
        //   user.uid,
        //   dt.badgeId,
        //   dt.day,
        //   dt.date,
        //   dt.unix,
        //   type,
        //   undefined,
        //   undefined,
        //   dt.restDay,
        // );
        // recs[dt.date] = newObj;
        // console.log(
        //   "date:",
        //   dt.date,
        //   dt.restDay ? "REST" : "WORK",
        //   dt.badgeId ? "BADGE PRESENT" : "BADGE ABSENT",
        //   "day:",
        //   dt.day,
        //   "Tasks:",
        //   newObj.tasks.length,
        // );
        // console.log("newObj", newObj);
      }
    }

    // await saveDayRecommendationList(
    //   recs,
    //   user.uid,
    //   type,
    //   badgeId,
    //   ignoreManual,
    // );

    return true;
  }

  return false;
};

/**
 *
 * bageUnix
 *
 * generateRecommendations -> for badge and startUnix
 * any manual tasks. use the manual over ride date
 *
 *
 *
 *
 */
