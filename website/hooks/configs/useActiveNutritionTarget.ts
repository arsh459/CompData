import { db } from "@config/firebase";
import { NutritionTarget } from "@models/User/User";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useActiveNutritionTarget = (uid?: string) => {
  const [nutritionTarget, setNutriTarget] = useState<NutritionTarget>();

  useEffect(() => {
    const getCurrentTarget = async () => {
      if (uid) {
        const qForBothSide = query(
          collection(doc(db, "users", uid), "nutritionTarget"),
          where("start", "<=", Date.now()),
          orderBy("start", "desc"),
          limit(1)
        );

        const remoteDocs = await getDocs(qForBothSide);
        if (remoteDocs.docs.length) {
          setNutriTarget(remoteDocs.docs[0].data() as NutritionTarget);
        }
      }
    };

    getCurrentTarget();
  }, [uid]);

  return {
    nutritionTarget,
  };
};
