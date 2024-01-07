import { db } from "@config/firebase";
import { NutritionTarget } from "@models/User/User";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useDailyNutriTargets = (uid?: string) => {
  const [nutritionTargets, setNutriTargets] = useState<NutritionTarget[]>([]);
  useEffect(() => {
    if (uid) {
      const listener = onSnapshot(
        query(
          collection(doc(db, "users", uid), "nutritionTarget"),
          orderBy("start", "desc")
        ),
        (userDocs) => {
          const dailyGoalObjs: NutritionTarget[] = [];

          for (const doc of userDocs.docs) {
            const remoteObj = doc.data() as NutritionTarget | undefined;

            if (remoteObj) {
              dailyGoalObjs.push(remoteObj);
            }
          }

          setNutriTargets(dailyGoalObjs);
        }
      );

      return () => {
        listener();
      };
    }
  }, [uid]);

  return {
    nutritionTargets,
  };
};
export const updateDailyNutritionTargets = async (uid?: string) => {
  const uniqueId = uuidv4();
  try {
    if (uid) {
      const userDocRef = doc(db, "users", uid, "nutritionTarget", uniqueId);
      await setDoc(userDocRef, {
        id: uniqueId,
        carbs: 40,
        fats: 15,
        fiber: 8,
        kcal: 250,
        protein: 20,
      });
    }

    console.log(`Document with ID ${uniqueId} updated successfully.`);
  } catch (error) {
    console.error(`Error updating document with ID ${uniqueId}: ${error}`);
  }
};
