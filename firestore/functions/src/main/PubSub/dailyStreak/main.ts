import { firestore } from "firebase-admin";
import {
  getMonthsInBetween,
  getTzStreaks,
  isDayIsYesterday,
} from "../../../models/Streak/getUtils";
import { getMidnightTimezones } from "./util";
import {
  getDateBucket,
  getDayEndForTz,
  getTodayDate,
} from "../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
import {
  StreakDataInterface,
  streakMapInterface,
} from "../../../models/Streak/streakInterface";
import { useUserPowerUps } from "../../../models/Streak/getPowerUps";
import { getStreakDayCount } from "../../FirestoreTriggers/onDailyGoalUpdate/utils/getStreakDays";
// import { addUserStreakLength } from "../../FirestoreTriggers/onAppointmentUpdate/inventorySync";

export const dailyStreakMain = async () => {
  const midNightTimeZones = await getMidnightTimezones();

  console.log("TO EVALUATE", midNightTimeZones);

  for (const timezone of midNightTimeZones) {
    console.log();
    console.log("evaluating", timezone);

    const batch = firestore().batch();

    // fetch streaks
    const usersTzStreaksRef = await getTzStreaks(timezone);

    console.log("Streaks in tz", usersTzStreaksRef.docs.length);

    // 12 am date
    const today = getTodayDate(timezone);
    const newActiveTill = getDayEndForTz(timezone, today.todayUnix);

    // console.log("today date", today);
    // console.log("newActiveTill date", newActiveTill);

    for (const userStreakDocRef of usersTzStreaksRef.docs) {
      // console.log();
      // console.log();
      const streakData = userStreakDocRef.data() as StreakDataInterface;

      // date bucket of activeTill date bucket
      const userActiveTillDate = getDateBucket(timezone, streakData.activeTill);
      // console.log("active till", userActiveTillDate);

      const uid = userStreakDocRef.ref.path.split("/")[1];

      console.log("uid", uid);

      const streakMonths = getMonthsInBetween(
        streakData.startedOn,
        streakData.activeTill,
        timezone,
      );

      console.log("streakMonths", streakMonths);

      // userActiveTillDate is day before only
      const isYesterDayFlag = isDayIsYesterday(streakData.activeTill, timezone);

      console.log("isYesterDayFlag", isYesterDayFlag);

      // streak is active
      // let currentStreakLength: number = 0;
      if (isYesterDayFlag === "ACTIVE_YESTERDAY") {
        if (streakData.streakMap[userActiveTillDate] === "active") {
          const purchaseFlag = await useUserPowerUps(
            uid,
            "freeze",
            1,
            timezone,
          );

          if (purchaseFlag) {
            const updatedMap: streakMapInterface = {
              ...streakData.streakMap,
              [userActiveTillDate]: "freeze",
              [today.todayDate]: "active",
            };

            const days = getStreakDayCount(updatedMap);

            batch.update(userStreakDocRef.ref, {
              streakMap: updatedMap,
              days,
              updatedOn: today.todayUnix,
              activeTill: newActiveTill,
              streakMonths: streakMonths,
            });
          } else {
            const updatedMap: streakMapInterface = {
              ...streakData.streakMap,
              [userActiveTillDate]: "miss",
            };

            const days = getStreakDayCount(updatedMap);

            batch.update(userStreakDocRef.ref, {
              streakMap: updatedMap,
              days,
              streakStatus: "inactive",
              updatedOn: today.todayUnix,
              streakMonths: streakMonths,
            });
          }
        }

        // streak is hit
        else if (streakData.streakMap[userActiveTillDate] === "activeHit") {
          const updatedMap: streakMapInterface = {
            ...streakData.streakMap,
            [userActiveTillDate]: "hit",
            [today.todayDate]: "active",
          };

          const days = getStreakDayCount(updatedMap);

          batch.update(userStreakDocRef.ref, {
            streakMap: updatedMap,
            days,
            updatedOn: today.todayUnix,
            activeTill: newActiveTill,
            streakMonths: streakMonths,
          });
        }
      }

      // add streak length to mixpanel
      // await addUserStreakLength(uid, currentStreakLength);
    }
    await batch.commit();
  }

  return;

  // get all streaks ending basis user's tz
  /*
  Active streak basis unix

  UTC

  Date.now() => unix => hh:mm -> UTC

  - user.recommendationConfig.timezone.tz

  - find countries where it was 12 in the last 15 minutes. try gpt 4 to figure out this problem. 
  - find streaks that are active and are in that tz. add tz in streak interface.
  - run your logic

  India
  UK
  USA
  NZ
  */
};
