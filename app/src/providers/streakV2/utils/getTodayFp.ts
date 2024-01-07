import { Activity } from "@models/Activity/Activity";
import { oneDayInMS } from "@modules/Nutrition/V2/DaySelector/hooks/useBadgeProgressCalender";
import firestore from "@react-native-firebase/firestore";

export const getTodayFp = async (uid: string, unix: number) => {
  let totalFp = 0;
  try {
    const todayActivityCollections = await firestore()
      .collection(`users/${uid}/activities`)
      .where("createdOn", ">=", unix)
      .where("createdOn", "<", unix + oneDayInMS)
      .get();

    for (const activity of todayActivityCollections.docs) {
      const activityData = activity.data() as Activity;
      if (activity.exists && activityData.calories) {
        totalFp += Math.round(activityData.calories / 300);
      }
    }

    return totalFp;
  } catch (error) {
    console.log("error in getTodays Fp", error);
  }
  return totalFp;
};
