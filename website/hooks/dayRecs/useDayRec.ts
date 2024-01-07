import { db } from "@config/firebase";
import { dayRecommendation } from "@models/User/User";
import axios from "axios";
import {
  // collection,
  doc,
  getDoc,
  // query,
  updateDoc,
  // where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useDayRec = (
  uid: string,
  id: string,
  type: "workout" | "nutrition"
) => {
  const [recomendation, setRecommendation] = useState<dayRecommendation>();
  const [refresh, setRefresh] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getDayRecs = async () => {
      const recs = await getDoc(
        doc(doc(db, "users", uid), "dayRecommendations", id)
      );

      if (recs.data()) {
        setRecommendation(recs.data() as dayRecommendation);
      }
    };

    getDayRecs();
  }, [uid, id, refresh, type]);

  const updateRec = (
    key: "overrideBadgeId" | "overrideDay" | "propagateDate",
    value: string | number | boolean
  ) => {
    setRecommendation((p) => {
      if (p) {
        return {
          ...p,
          [key]: value,
        };
      }
    });
  };

  const saveRecommendationChanges = async () => {
    if (recomendation) {
      const isManual =
        recomendation.overrideBadgeId &&
        typeof recomendation.overrideDay === "number"
          ? true
          : false;
      setLoading(true);

      await updateDoc(
        doc(doc(db, "users", uid), "dayRecommendations", recomendation?.id),
        {
          ...recomendation,
          manual: isManual,
        }
      );

      await axios({
        url: "/api/rec/update",
        method: "POST",
        params: {
          uid,
          date: recomendation.date,
          type,
          badgeId: recomendation.badgeId,
        },
      });

      setRefresh((p) => p + 1);
      setLoading(false);
    }
  };

  return {
    recomendation,
    updateRec,
    saveRecommendationChanges,
    loading,
  };
};

export const allDayUpdate = async (
  uid: string,
  days: number,
  type: "workout" | "nutrition",
  startToday: boolean,
  recreate: boolean
) => {
  await axios({
    url: "/api/rec/create",
    method: "POST",
    params: { uid, days, type, startToday, recreate },
  });
};
