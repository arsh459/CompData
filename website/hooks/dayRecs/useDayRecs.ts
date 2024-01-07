import { db } from "@config/firebase";
import { dayRecommendation } from "@models/User/User";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useDayRecs = (
  uid: string,
  start: number,
  end: number,
  type: "workout" | "nutrition",
  badgeId?: string
) => {
  const [recomendations, setRecommendations] = useState<dayRecommendation[]>(
    []
  );

  const [refresh, setRefresh] = useState<number>(0);

  const refreshPage = () => setRefresh((p) => p + 1);

  useEffect(() => {
    const getDayRecs = async () => {
      const recs = await getDocs(
        query(
          collection(doc(db, "users", uid), "dayRecommendations"),
          where("unix", ">=", start),
          where("unix", "<=", end),
          where("type", "==", type)
        )
      );

      // console.log("start", start, end);
      // console.log("recs", recs.docs.length);

      const recObjs: dayRecommendation[] = [];
      for (const rec of recs.docs) {
        const recObj = rec.data() as dayRecommendation;
        if (recObj.badgeId === badgeId) {
          recObjs.push(recObj);
        }
      }

      setRecommendations(recObjs);
    };

    getDayRecs();
  }, [uid, start, end, refresh, type, badgeId]);

  return {
    recomendations,
    refreshPage,
  };
};
