// import { format } from "date-fns";
import {
  RecommendationConfig,
  UserInterface,
  dayRecommendation,
} from "../../../models/User/User";
import {
  deleteReminderById,
  // getReminderByActivityId,
  getReminderByDateAndUID,
  saveReminder,
} from "../../../models/Reminders/createUtils";
import { v4 as uuid } from "uuid";
import {
  Reminder,
  whatsappTemplates,
} from "../../../models/Reminders/Reminder";
import { isDayRestDay } from "./main";
import {
  getDateBucket,
  getNotificationTime,
} from "../../FirestoreTriggers/onActivityUpdateV2/dateBucket";

const defaultOffset = 330;

export const getUserOffset = (offset?: number) => {
  if (typeof offset === "number") {
    return offset;
  }

  return defaultOffset;
};

export const getUserTimezone = (tz?: string) => {
  if (typeof tz === "string") {
    return tz;
  }

  return "Asia/Kolkata";
};

const generateReminderUnix = (dates: string[], user: UserInterface) => {
  const userTz = getUserTimezone(user.recommendationConfig?.timezone?.tzString);
  // notification time ins present
  console.log("offset", userTz);

  const reminderUnix: { [date: string]: number } = {};
  const summaryUnixObj: { [date: string]: number } = {};
  if (
    user.recommendationConfig?.workoutNotificationTime &&
    typeof userTz === "string"
  ) {
    for (const date of dates) {
      // console.log("hrMin", hrMin);

      const dateList = date.split("-");
      const timeList =
        user.recommendationConfig.workoutNotificationTime.split(":");

      if (dateList.length === 3 && timeList.length === 2) {
        const notUnix = getNotificationTime(
          userTz,
          parseInt(dateList[2]),
          parseInt(dateList[1]) - 1,
          parseInt(dateList[0]),
          parseInt(timeList[0]),
          parseInt(timeList[1]),
        );

        const sumUnix = getNotificationTime(
          userTz,
          parseInt(dateList[2]),
          parseInt(dateList[1]) - 1,
          parseInt(dateList[0]),
          19,
          0,
        );

        summaryUnixObj[date] = sumUnix;
        reminderUnix[date] = notUnix;
      }

      // get mi
      // const hours = Math.floor(Math.abs(offset) / 60);
      // const minutes = Math.abs(offset) % 60;

      // // get midnight in your zone
      // const isoStr = `${date}T${
      //   user.recommendationConfig.workoutNotificationTime
      // }:00${offset > 0 ? "+" : "-"}${hours >= 10 ? hours : `0${hours}`}:${
      //   minutes >= 10 ? minutes : `0${minutes}`
      // }`;

      // console.log("date", date, isoStr);

      // summary message
      // const timeList =
      //   user.recommendationConfig.workoutNotificationTime.split(":");
      // let summaryHour: number = 19;
      // if (timeList.length) {
      //   const notHour = parseInt(timeList[0]);
      //   if (notHour >= 19 && notHour < 23) {
      //     summaryHour = notHour + 1;
      //   }
      // }

      // const summaryISO = `${date}T${summaryHour}:00:00${
      //   offset > 0 ? "+" : "-"
      // }${hours >= 10 ? hours : `0${hours}`}:${
      //   minutes >= 10 ? minutes : `0${minutes}`
      // }`;

      // console.log("summaryISO", date, summaryISO);

      // will come in Zulu time
      // const requiredUnix = new Date(isoStr).getTime();
      // const summaryUnix = new Date(summaryISO).getTime();
    }
  }

  return { reminderUnix, summaryUnixObj };
};

const dayMS = 24 * 60 * 60 * 1000;
const getDtsToCheck = (user: UserInterface) => {
  const now = Date.now();
  const dtsToCheck: string[] = [];

  const tzString = getUserTimezone(
    user.recommendationConfig?.timezone?.tzString,
  );
  if (tzString) {
    for (let i: number = 0; i < 7; i++) {
      // const usrTimeZoneTime = offset * 60 * 1000;

      const usrUnix = now + i * dayMS; //+ usrTimeZoneTime;
      const dt = getDateBucket(tzString, usrUnix);

      // const dt = format(new Date(usrUnix), "yyyy-MM-dd");

      dtsToCheck.push(dt);
    }
  }

  return dtsToCheck;
};

const checkIfRest = (
  date: string,
  recommendationConfig?: RecommendationConfig,
) => {
  const wkDays = recommendationConfig?.workoutDays
    ? recommendationConfig?.workoutDays
    : [];

  const tzDay = new Date(date).getDay();

  const isRest = isDayRestDay(wkDays, tzDay);

  if (isRest) {
    return true;
  }

  return false;
};

const reminderShouldUpdate = (
  previousReminder: Reminder,
  newSchedule: number,
) => {
  if (
    previousReminder.scheduledAt &&
    previousReminder.scheduledAt !== newSchedule
  ) {
    return true;
  }

  return false;
};

const saveAndCreateWorkoutReminder = async (
  uid: string,
  scheduledUnix: number,
  date: string,
  dayRecs: { [date: string]: dayRecommendation },
  templateId: whatsappTemplates,
) => {
  const reminder = createNewWorkoutRecommenderHandler(
    uid,
    scheduledUnix,
    date,
    dayRecs,
    templateId,
  );
  if (reminder) {
    await saveReminder(reminder);
  }
};

const createNewWorkoutRecommenderHandler = (
  uid: string,
  scheduledUnix: number,
  date: string,
  dayRecs: { [date: string]: dayRecommendation },
  templateId: whatsappTemplates,
) => {
  const rec = dayRecs[date];
  if (rec) {
    if (rec.overrideBadgeId && typeof rec.overrideDay === "number") {
      return createWorkoutReminder(
        uid,
        scheduledUnix,
        rec.overrideDay,
        rec.overrideBadgeId,
        date,
        templateId,
      );
    } else {
      return createWorkoutReminder(
        uid,
        scheduledUnix,
        rec.day,
        rec.badgeId,
        date,
        templateId,
      );
    }
  }

  return undefined;
};

const createWorkoutReminder = (
  uid: string,
  scheduledUnix: number,
  badgeDay: number,
  badgeId: string,
  date: string,
  templateId: whatsappTemplates,
): Reminder => {
  return {
    id: uuid(),
    state: "URGENT",
    templateId: templateId,
    createdOn: Date.now(),
    scheduledAt: scheduledUnix,
    badgeDay: badgeDay,
    badgeId: badgeId,
    date: date,

    authorId: uid,
  };
};

const deleteStaleReminders = async (previousReminders: Reminder[]) => {
  for (const reminder of previousReminders) {
    await deleteReminderById(reminder.id);
  }
};

const handleReminderForWorkouts = async (
  datesToUse: string[],
  user: UserInterface,
  unixMap: { [date: string]: number },
  dayRecs: { [date: string]: dayRecommendation },
  templateId: whatsappTemplates,
) => {
  for (const date of datesToUse) {
    // previous scheduled reminders
    const previousReminders = await getReminderByDateAndUID(
      user.uid,
      date,
      templateId,
    );

    const toPushUnix = unixMap[date];

    // rest check flag
    const restFlag = checkIfRest(date, user.recommendationConfig);

    console.log("rest flag", date, toPushUnix, restFlag);

    // remove reminder
    if (restFlag && previousReminders.length) {
      console.log("deleting on rest");
      await deleteStaleReminders(previousReminders);
    } else if (
      !restFlag &&
      previousReminders.length === 1 &&
      toPushUnix &&
      reminderShouldUpdate(previousReminders[0], toPushUnix)
    ) {
      console.log("changing");
      // delete previous reminder
      await deleteStaleReminders(previousReminders);
      // create new reminder
      await saveAndCreateWorkoutReminder(
        user.uid,
        toPushUnix,
        date,
        dayRecs,
        templateId,
      );
    } else if (!restFlag && previousReminders.length === 0) {
      console.log("creating");
      await saveAndCreateWorkoutReminder(
        user.uid,
        toPushUnix,
        date,
        dayRecs,
        templateId,
      );
    } else if (previousReminders.length > 1) {
      throw new Error(
        `Duplicate reminders. CHECK:uid ${user.uid} date:${date} notificationTime:${user.recommendationConfig?.workoutNotificationTime}`,
      );
    }
  }
};

export const generateWorkoutReminders = async (
  user: UserInterface,
  dayRecs: { [date: string]: dayRecommendation },
) => {
  const datesToUse = getDtsToCheck(user);
  console.log("dates", datesToUse);
  const { reminderUnix, summaryUnixObj } = generateReminderUnix(
    datesToUse,
    user,
  );
  console.log("unixMap", reminderUnix);
  console.log("summaryUnixObj", summaryUnixObj);

  // throw new Error("HI I am pausing");
  await handleReminderForWorkouts(
    datesToUse,
    user,
    reminderUnix,
    dayRecs,
    "workout_reminder_notification",
  );
  await handleReminderForWorkouts(
    datesToUse,
    user,
    summaryUnixObj,
    dayRecs,
    "summary_message",
  );
};
