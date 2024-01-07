import { firestore } from "firebase-admin";
import { StreakDataInterface } from "./streakInterface";

export const getUserStreak = async (uid: string, streakId?: string) => {
  if (streakId) {
    const userStreak = await firestore()
      .collection(`users/${uid}/streaks`)
      .doc(streakId)
      .get();

    if (userStreak.data()) {
      return userStreak.data() as StreakDataInterface;
    }

    return undefined;
  } else {
    const userActiveStreakDocs = await firestore()
      .collection(`users/${uid}/streaks`)
      .where("streakStatus", "==", "active")
      .orderBy("startedOn", "desc")
      .limit(1)
      .get();

    if (userActiveStreakDocs.docs.length) {
      return userActiveStreakDocs.docs[0].data() as StreakDataInterface;
    }

    return undefined;
  }
};
