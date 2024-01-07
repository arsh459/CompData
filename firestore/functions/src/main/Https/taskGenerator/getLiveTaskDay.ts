// import { format } from "date-fns";
import { getTaskBySchedule } from "../../../models/Task/getUtils";
import { getDayStartForTz } from "../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
import { ONE_DAY_MS } from "../period/getPeriodArray";
import { getFormattedDateForUnixWithTZ } from "../../PubSub/activityTracker/utils";

export const getLiveTaskDay = async (
  badgeId: string,
  userDayStart: number,
  timezone: string,
): Promise<number> => {
  // get task with badgeId, badgeDay
  //   getTask;
  // taskTime -> Sept 1: 7am IST, Aug 31: 8:30pm
  // get hh:mma yyyy-mm-dd for user - aug 31
  // aug 31 8:30pm. ->
  const nowStart = getDayStartForTz(timezone, userDayStart);
  console.log(
    "LIVE TASK",
    nowStart,
    getFormattedDateForUnixWithTZ(
      nowStart,
      "Asia/Kolkata",
      "hh:mma YYYY-MM-DD",
    ),
  );

  // console.log("fo", format(new Date(nowStart), "yyyy-mm-dd"));

  const tasks = await getTaskBySchedule(
    badgeId,
    nowStart,
    nowStart + ONE_DAY_MS,
  );

  console.log("tasks", tasks.length);
  console.log("userDayStart", new Date(nowStart));
  console.log("userDayStart", new Date(nowStart + ONE_DAY_MS));

  //   let day: number = 0;
  for (const tk of tasks) {
    if (tk.badgeDays) {
      for (const badgeDay of tk.badgeDays) {
        console.log("badgeDay", badgeDay);
        if (badgeDay.includes(badgeId)) {
          const splitDay = badgeDay.split("_");
          console.log("splitDay", splitDay);

          if (splitDay.length === 2) {
            const potentialDay = parseInt(splitDay[1]);
            console.log("potentialDay", potentialDay, tk.name);
            if (typeof potentialDay === "number") {
              return potentialDay;
            }
          }
        }
      }
    }
  }

  return -1;
};
