import { streakNavActionType } from "@modules/MealMain/utils/navUtils";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { streakLevelsTypes, streakMapInterface } from "../interface";
import { streakData } from "../store/useStreakStoreV2";

export const streakLevels: streakLevelsTypes[] = [7, 14, 21, 28];
export const streakLevelsObj: { [key: number]: number } = {
  7: 7,
  14: 14,
  21: 21,
  28: 28,
};

export const streakUpdate = async (
  action: streakNavActionType,
  uid: string,
  today: string,
  userStreak: streakData
) => {
  const streakDoc: FirebaseFirestoreTypes.DocumentReference = firestore().doc(
    `users/${uid}/streaks/${userStreak.id}`
  );

  try {
    if (action === "streakMaintained" || action === "streakCompleted") {
      const updatedMap: streakMapInterface = {
        ...userStreak.streakMap,
        [today]: "activeHit",
      };

      await streakDoc.update({
        streakMap: updatedMap,
        updatedOn: Date.now(),
        days: getStreakDayCount(updatedMap),
        pendingActiveHitView: false,
      });
    } else if (action === "streakRemoved") {
      const updatedMap: streakMapInterface = {
        ...userStreak.streakMap,
        [today]: "active",
      };

      await streakDoc.update({
        streakMap: updatedMap,
        updatedOn: Date.now(),
        days: getStreakDayCount(updatedMap),
        pendingActiveHitView: false,
      });
    }
  } catch (error) {
    console.log("error in updating user streak");
  }

  return;
};

export const getStreakDayCount = (streakMap: streakMapInterface) => {
  const hitItems = Object.values(streakMap).filter(
    (item) => item === "activeHit" || item === "freeze" || item === "hit"
  );

  return hitItems.length;
};
