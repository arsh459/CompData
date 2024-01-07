// import { firestore } from "firebase-admin";
// import { getTzStreaks } from "../../../../models/Streak/getUtils";
// import { getMidnightTimezones } from "../util";
// import {
// //   getDateBucket,
// //   getDayEndForTz,
//   getTodayDate,
// } from "../../../FirestoreTriggers/onActivityUpdateV2/dateBucket";
// import { StreakDataInterface } from "../../../../models/Streak/streakInterface";
import { getMidnightTimezones } from "../util";
// import { useUserPowerUps } from "../../../../models/Streak/getPowerUps";

export const dailyStreakTestMain = async () => {
    console.log("dailyStreakFunction is called")
  const midNightTimeZones = getMidnightTimezones();
  
  console.log(midNightTimeZones);
    // const timezone = "Asia/Calcutta";
//   for (const timezone of midNightTimeZones) {
    // const batch = firestore().batch();
    // const usersTzStreaksRef = await getTzStreaks(timezone);
    // const today = getTodayDate(timezone);
    // const newActiveTill = getDayEndForTz(timezone, today.todayUnix);
    // for (const userStreakDocRef of usersTzStreaksRef.docs) {
    //   const streakData = userStreakDocRef.data() as StreakDataInterface;
    //   console.log("streak data" ,streakData);
    //   const userActiveTillDate = getDateBucket(timezone, streakData.activeTill);
    //   const uid = userStreakDocRef.ref.path.split("/")[1];
    //     console.log("uid", uid);
    //   if (streakData.streakMap[userActiveTillDate] === "active") {
    //     const purchaseFlag = await useUserPowerUps(uid, "freeze", 1, timezone);

    //     if (purchaseFlag) {
    //       batch.update(userStreakDocRef.ref, {
    //         [`streakMap.${userActiveTillDate}`]: "freeze",
    //         [`streakMap.${today.todayDate}`]: "active",
    //         days: streakData.days + 1,
    //         updatedOn: today.todayUnix,
    //         activeTill: newActiveTill,
    //       });
    //     } else {
    //       batch.update(userStreakDocRef.ref, {
    //         [`streakMap.${userActiveTillDate}`]: "miss",
    //         streakStatus: "inactive",
    //         updatedOn: today.todayUnix,
    //       });
    //     }
    //   } else if (streakData.streakMap[userActiveTillDate] === "activeHit") {
    //     batch.update(userStreakDocRef.ref, {
    //       [`streakMap.${userActiveTillDate}`]: "hit",
    //       [`streakMap.${today.todayDate}`]: "active",
    //       days: streakData.days + 1,
    //       updatedOn: today.todayUnix,
    //       activeTill: newActiveTill,
    //     });
    return
      }
    //   return;
    // }
    // await batch.commit();

    // return; 
//   }

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
// };
