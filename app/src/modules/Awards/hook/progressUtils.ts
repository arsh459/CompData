import {
  dailyEnergyObj,
  dailyMoodObj,
  dailyWeightObj,
} from "@models/User/User";
import { AchievementPathDataItemTypes } from "@modules/JoinBoatMainV3/components/AchievementPath/utils/interface";
import firestore from "@react-native-firebase/firestore";

export const getCollectionNameForProgress = (
  type?: AchievementPathDataItemTypes
) => {
  if (type === "mood" || type === "bad_mood") {
    return "dailyMood";
  } else if (type === "energy" || type === "fatigue") {
    return "dailyEnergy";
  } else if (type === "weight") {
    return "dailyWeight";
  }

  return undefined;
};

export const getEnergyDaysAfter = async (
  userId: string,
  unix: number,
  minValue: number,
  collectionName: "dailyEnergy" | "dailyMood" | "dailyWeight"
) => {
  try {
    const achievementPathDocs = await firestore()
      .collection("users")
      .doc(userId)
      .collection(collectionName)
      .where("unix", ">=", unix)
      .get();

    let count: number = 0;
    if (achievementPathDocs.docs.length) {
      for (const doc of achievementPathDocs.docs) {
        let value: number = 0;
        if (collectionName === "dailyEnergy") {
          const el = doc.data() as dailyEnergyObj;
          value = el.energy ? el.energy : 0;
        } else if (collectionName === "dailyMood") {
          const el = doc.data() as dailyMoodObj;
          value = el.mood ? el.mood : 0;
        } else {
          const el = doc.data() as dailyWeightObj;
          value = el.weight ? el.weight : 0;
        }

        if (value >= minValue) {
          count++;
        }
      }
    }

    return count;
  } catch (error) {
    return 0;
  }
};
