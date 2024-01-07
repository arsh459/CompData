import { firestore } from "firebase-admin";
import {
  getDateBucket,
  getDayEndForTz,
  getDayEndForTz_DATE,
  getTodayDate,
} from "../../main/FirestoreTriggers/onActivityUpdateV2/dateBucket";
import {
  StreakDataInterface,
  streakMapInterface,
  streakStatusType,
} from "./streakInterface";
import { useUserPowerUps } from "./getPowerUps";
import { getMonthsInBetween } from "./getUtils";
import { PowerUpInterface } from "./powerUpInterface";

import { getFormattedDateForUnixWithTZ } from "../../main/PubSub/activityTracker/utils";

export const reconcileUserStreak = async (
  uid: string,
  tz: string,
  reconcileStreakMap: streakMapInterface,
  streakStatus: streakStatusType,
  activeTillDate: string,
  streakId: string,
  streakDays: number,
  startedOn: number,
) => {
  // const userData = await getUserById(uid);
  // const userTimeZone = userData && getTimezone(userData);
  // const today = userData && getToday(userData);
  const activeTillUnix = getDayEndForTz_DATE(tz, activeTillDate);

  if (activeTillUnix) {
    const streakMonths = getMonthsInBetween(startedOn, activeTillUnix, tz);
    await firestore().doc(`users/${uid}/streaks/${streakId}`).update({
      streakMap: reconcileStreakMap,
      updatedOn: Date.now(), // today?.nowStart,
      activeTill: activeTillUnix,
      days: streakDays,
      streakStatus: streakStatus,
      streakMonths: streakMonths,
    });
  }
  // const streakDays = Object.keys(reconcileStreakMap).length;
};

export const updateUserActiveStreak = async (
  streakData: StreakDataInterface,
  uid: string,
  usertz: string,
) => {
  const batch = firestore().batch();
  const streakDocRef = firestore().doc(`users/${uid}/streaks/${streakData.id}`);

  const userActiveTillDate = getDateBucket(usertz, streakData.activeTill);
  const today = getTodayDate(usertz);
  const newActiveTill = getDayEndForTz(usertz, today.todayUnix);

  if (userActiveTillDate) {
    if (streakData.streakMap[userActiveTillDate] === "active") {
      // here handling the power up case
      // used batch for updating power count and streak data together
      const purchaseFlag = await useUserPowerUps(uid, "freeze", 1, usertz);
      if (purchaseFlag) {
        batch.update(streakDocRef, {
          [`streakMap.${userActiveTillDate}`]: "freeze",
          [`streakMap.${today.todayDate}`]: "active",
          days: streakData.days + 1,
          updatedOn: today.todayUnix,
          activeTill: newActiveTill,
        });
      } else {
        batch.update(streakDocRef, {
          [`streakMap.${userActiveTillDate}`]: "miss",
          streakStatus: "inactive",
          updatedOn: today.todayUnix,
          days: streakData.days + 1,
        });
      }
      // if (userPowerUp.power > 0) {
      //   batch.update(userPowerUpDocRef, { power: userPowerUp.power - 1 });

      //   batch.update(streakDocRef, {
      //     [`streakMap.${userActiveTillDate}`]: "freeze",
      //     [`streakMap.${today.todayDate}`]: "active",
      //     days: streakData.days + 1,
      //     updatedOn: today.todayUnix,
      //     activeTill: newActiveTill,
      //   });
      // } else {
      //   batch.update(streakDocRef, {
      //     [`streakMap.${userActiveTillDate}`]: "miss",
      //     streakStatus: "inactive",
      //     updatedOn: today.todayUnix,
      //     days: streakData.days + 1,
      //   });
      // }
    } else if (streakData.streakMap[userActiveTillDate] === "activeHit") {
      batch.update(streakDocRef, {
        [`streakMap.${userActiveTillDate}`]: "hit",
        [`streakMap.${today.todayDate}`]: "active",
        days: streakData.days + 1,
        updatedOn: today.todayUnix,
        activeTill: newActiveTill,
      });
    }
  }

  await batch.commit();
};

export const userUsedPowerUp = async (
  startUnix: number,
  endUnix: number,
  uid: string,
  tz: string,
) => {
  const freezeMap: { [key: string]: PowerUpInterface } = {};
  const usedPowerUpCollection = await firestore()
    .collection(`users/${uid}/powerup`)
    // .where("type", "==", variants)
    .where("usedOn", ">=", startUnix)
    .where("usedOn", "<=", endUnix + 1)
    .get();

  if (usedPowerUpCollection.docs && usedPowerUpCollection.docs.length) {
    // storing the freeze data with date as key which can be checked with streakMap for comparing freeze

    for (const usedPowerUpDoc of usedPowerUpCollection.docs) {
      //

      const usedPowerUpData = usedPowerUpDoc.data() as PowerUpInterface;
      if (usedPowerUpData.usedOn) {
        const freezeDate = getFormattedDateForUnixWithTZ(
          usedPowerUpData.usedOn - 1, // freeze is used for date before
          tz,
        );

        freezeMap[freezeDate] = usedPowerUpData;
      }
    }
  }

  return freezeMap;
};
