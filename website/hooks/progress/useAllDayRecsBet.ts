import { collection, doc, query, where, getDocs } from "firebase/firestore";
import { db } from "@config/firebase";
import {
  dayRecommendation,
  dayRecommendationWithNutrition,
} from "@models/User/User";
import { useEffect, useState } from "react";

export const fetchAllDayRecsBetween = async (
  uid: string,
  badgeId?: string,
  nutritionBadgeId?: string,
  start?: number,
  end?: number
) => {
  const combinedData: { [date: string]: dayRecommendationWithNutrition } = {};

  if ((badgeId || nutritionBadgeId) && start && end && uid) {
    const q = query(
      collection(doc(db, "users", uid), "dayRecommendations"),
      where("unix", ">=", start),
      where("unix", "<=", end)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as dayRecommendation;
      const date = data.date;

      if (badgeId && data.type === "workout" && data.badgeId === badgeId) {
        combinedData[date] = {
          ...combinedData[date],
          doneFP: data.doneFP || 0,
          taskFP: data.taskFP,
          workoutRecId: data.id,
        };
      }

      if (
        nutritionBadgeId &&
        data.type === "nutrition" &&
        data.badgeId === nutritionBadgeId
      ) {
        combinedData[date] = {
          ...combinedData[date],
          doneFPNutri: data.doneFP || 0,
          taskFPNutri: data.taskFP,
          nutriRecId: data.id,
        };
      }
    });
  }

  return combinedData;
};

export function useFetchAllDayRecsBetween(
  uid: string,
  badgeId?: string,
  nutritionBadgeId?: string,
  start?: number,
  end?: number
) {
  const [data, setData] = useState<{
    [date: string]: dayRecommendationWithNutrition;
  }>({});

  useEffect(() => {
    async function fetchData() {
      const result = await fetchAllDayRecsBetween(
        uid,
        badgeId,
        nutritionBadgeId,
        start,
        end
      );
      setData(result);
    }
    if (badgeId || nutritionBadgeId) {
      fetchData();
    }
  }, [uid, badgeId, nutritionBadgeId, start, end]);

  return { dataAllRecs: data };
}
