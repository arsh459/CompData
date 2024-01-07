import { Badge } from "../../../models/Prizes/Badges";
import {
  Day,
  dayRecommendation,
  UserInterface,
} from "../../../models/User/User";
import { getTimezone } from "../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
import {
  // getFormattedDateForUnix,
  getFormattedDateForUnixWithTZ,
} from "../../PubSub/activityTracker/utils";
import { getNextBadgeId, getTierDay } from "./constants";
import { generateWorkoutReminders } from "./generateReminders";
import { getLiveTaskDay } from "./getLiveTaskDay";
import {
  createDayRecommendationList,
  getPreviousDayRecs,
  saveDayRecommendationListV2,
  //   saveDayRecommendationListV2,
} from "./getterSetter";
import {
  getToday,
  getCurrentBadgeAndDay,
  isDayRestDay,
  checkIfTasksExistOnBadge,
} from "./main";

export const getBadgeIdDayV3 = async (
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

  // throw new Error("hi");

  if (resp.status === "LIVE_BADGE_ID") {
    return {
      badges: resp.badges,
      badgeId: resp.badgeId,
      badgeDay: await getLiveTaskDay(resp.badgeId, userDayStart, timezone),
    };
  }

  // resp.badgeId === null
  //   console.log("status", resp.status);

  // same badge same tier
  if (resp.status === "SAME_BADGE_SAME_TIER") {
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

  throw new Error("Check edge case here");
};

const getDatesForRecsV2 = async (
  uid: string,
  nowStart: number,
  num: number,
  currentBadgeId: string,
  todayDayNumber: number,
  badges: { [badgeId: string]: Badge },
  workoutDays: Day[],
  type: "workout" | "nutrition",
  timezone: string,
  primaryWorkoutCoach?: string,
  //   startToday?: boolean,
) => {
  const dateList: {
    unix: number;
    date: string;
    badgeId?: string;
    day?: number;
    restDay?: boolean;
    previousRec?: dayRecommendation;
  }[] = [];
  let badgesMap = { ...badges };

  const initValue = 0;
  let badgeIdToTrack: string = currentBadgeId;
  let dayNoToTrack: number = todayDayNumber - 1;
  for (let i: number = initValue; i <= num; i++) {
    console.log("nowStart", nowStart);

    // throw new Error("hi");
    const tomorrow = nowStart + i * 24 * 60 * 60 * 1000;

    const tomorrow_dt = getFormattedDateForUnixWithTZ(
      tomorrow,
      timezone,
      "YYYY-MM-DD",
    );
    const newDayNumber = dayNoToTrack + 1;
    console.log();
    console.log();
    console.log();

    console.log("badgeIdToTrack", badgeIdToTrack);
    console.log("dayNoToTrack", dayNoToTrack);
    console.log("tomorrow", tomorrow);

    console.log("tomorrow_dt", tomorrow_dt);
    console.log("newDayNumber", newDayNumber);
    console.log("new Date(tomorrow)", new Date(tomorrow));

    const day = new Date(tomorrow_dt).getDay();

    const restDay = isDayRestDay(workoutDays, day);

    console.log("fetching");
    console.log("tomorrow_dt", tomorrow_dt);
    console.log("type", type);
    console.log("badgeIdToTrack", badgeIdToTrack);

    const previousRec = await getPreviousDayRecs(
      uid,
      tomorrow_dt,
      type,
      badgeIdToTrack,
    );

    console.log("previousRec", previousRec?.date);
    console.log("previousRec Manual", previousRec?.manual);

    // console.log("restDay", restDay);
    if (restDay && !previousRec?.manual) {
      dateList.push({
        unix: tomorrow,
        date: tomorrow_dt,
        restDay: true,
        badgeId: badgeIdToTrack,
        day: dayNoToTrack,
        previousRec: previousRec,
      });
    } else {
      //   console.log(
      //     "manual",
      //     previousRec?.manual,
      //     // typeof manualRecs[0].overrideDay,
      //     // manualRecs[0].overrideBadgeId,
      //     tomorrow_dt,
      //   );
      let manualBadgeId: string | undefined;
      let manualDayNumb: number | undefined;
      let propagate: boolean = false;
      if (
        previousRec?.manual &&
        typeof previousRec.overrideDay === "number" &&
        previousRec.overrideBadgeId
      ) {
        manualDayNumb = previousRec.overrideDay;
        manualBadgeId = previousRec.overrideBadgeId;
        propagate = previousRec.propagateDate ? true : false;
      }

      //   console.log(
      //     tomorrow_dt,

      //     "Day",
      //     typeof manualDayNumb === "number" ? manualDayNumb : newDayNumber,
      //     "prop",
      //     propagate,
      //   );

      console.log("manualDayNumb", manualDayNumb);
      console.log("manualBadgeId", manualBadgeId);
      console.log("propagate", propagate);

      const resp = await getBadgeIdDayV3(
        uid,
        manualBadgeId ? manualBadgeId : badgeIdToTrack,
        typeof manualDayNumb === "number" ? manualDayNumb : newDayNumber,
        badgesMap,
        tomorrow,
        timezone,

        primaryWorkoutCoach,
      );

      console.log("newDayNumber", newDayNumber, resp.badgeDay);

      // update badges
      badgesMap = resp.badges;

      if (resp.badgeId && typeof resp.badgeDay === "number") {
        dateList.push({
          unix: tomorrow,
          badgeId: resp.badgeId,
          day: resp.badgeDay,
          date: tomorrow_dt,
          previousRec: previousRec,
        });

        if (propagate && typeof manualDayNumb === "number") {
          dayNoToTrack = manualDayNumb;
        } else if (typeof manualDayNumb === "number") {
          dayNoToTrack = newDayNumber - 1;
        } else {
          // update day and badgeId
          dayNoToTrack = resp.badgeDay; // newDayNumber;
        }

        badgeIdToTrack = resp.badgeId;
      } else {
        dateList.push({
          unix: tomorrow,
          date: tomorrow_dt,
        });
      }
    }

    console.log("");
    console.log("");

    // dateList.push([tomorrow, tomorrow_dt, newDayNumber]);
  }

  return dateList;
};

export const mainTaskGeneratorV3 = async (
  user: UserInterface,
  workoutDays: Day[],
  primaryWorkoutCoach: string,
  //   startToday: boolean,
  start: number, // base badge start time
  badgeId: string,
  dayCount: number,
  type: "workout" | "nutrition",
  startFromBeginning?: boolean,
  deletePrevious?: boolean,

  //   ignoreManual?: boolean,
) => {
  if (start && badgeId) {
    const tz = getTimezone(user);
    const { nowStart } = getToday(user);

    // console.log("nowStart", nowStart);

    const { todayDayNumber, currentBadgeId, startTime, daysToRun } =
      await getCurrentBadgeAndDay(
        user.uid,
        nowStart,
        start,
        badgeId,
        type,
        dayCount,
        startFromBeginning,
      );

    console.log("daysToRun", daysToRun);
    // console.log("currentBadgeId", currentBadgeId);
    console.log("startTime", startTime);
    console.log("todayDayNumber", todayDayNumber);

    let badges: { [badgeId: string]: Badge } = {};

    const dtSubObj = await getDatesForRecsV2(
      user.uid,
      startTime,
      daysToRun,
      currentBadgeId,
      todayDayNumber,
      badges,
      workoutDays,
      type,
      tz,
      primaryWorkoutCoach,
      //   startToday,
    );

    const recs: { [date: string]: dayRecommendation } = {};
    for (const dt of dtSubObj) {
      if (dt.badgeId && typeof dt.day === "number") {
        const newObj = await createDayRecommendationList(
          user.uid,
          dt.badgeId,
          dt.day,
          dt.date,
          dt.unix,
          type,
          dt.previousRec,
          // undefined,
          // undefined,
          dt.restDay,
        );

        recs[dt.date] = newObj;
        console.log(
          "date:",
          newObj.date,
          dt.restDay ? "REST" : "WORK",
          "override badgeId:",
          newObj.overrideBadgeId,
          newObj.badgeId,
          "overrideDay:",
          newObj.overrideDay,
          "day:",
          dt.day,
          "Manual:",
          newObj?.manual ? true : false,
          "doneFP:",
          newObj.doneFP,
          "Nutrition:",
          newObj.consumedNutrition
            ? `${newObj.consumedNutrition.kcal}KCal ${newObj.consumedNutrition.carbs}carbs ${newObj.consumedNutrition.protein}protein ${newObj.consumedNutrition.fats}fats`
            : "",
          "ids match:",
          dt.previousRec?.id === newObj.id,
          "Tasks:",
          newObj.tasks.length,
        );
      }
    }

    await saveDayRecommendationListV2(recs, user.uid, badgeId, deletePrevious);

    try {
      await generateWorkoutReminders(user, recs);
    } catch (error) {
      console.log("error creating tasks notifications");
    }

    return true;
  }

  return false;
};

/**
 * date
 * badgeId
 * badgeDay
 * periodDate - period, follicular, ovulation, luteal
 *
 *
 * // singular coach
 * period - low intensity, symptom relief
 *
 * follicular + ovulation
 *
 * luteal
 * - restorative
 */
