import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NutritionTarget } from "@models/User/User";
import { createNewNutriTargets } from "@models/Configs/createUtils";

export type NutriTargetsNumericKey =
  | "end"
  | "start"
  | "carbs"
  | "fats"
  | "fiber"
  | "protein"
  | "kcal";
export const useNutriTarget = (uid: string, nutriTargetId?: string) => {
  const [nutriTarget, setNutriTarget] = useState<NutritionTarget>();

  useEffect(() => {
    const getStoryDetail = async () => {
      if (nutriTargetId) {
        const ref = doc(
          doc(db, "users", uid),
          "nutritionTarget",
          nutriTargetId
        );
        const document = await getDoc(ref);
        const data = document.data();
        if (data) {
          const sd = data as NutritionTarget;
          setNutriTarget(sd);
        } else {
          setNutriTarget(createNewNutriTargets());
        }
      }
    };
    getStoryDetail();
  }, [uid, nutriTargetId]);

  const onNumberFieldsUpdate = (
    newVal: number,
    key: NutriTargetsNumericKey
  ) => {
    setNutriTarget((p) => {
      if (p) return { ...p, [key]: newVal };
    });
  };

  const onUpdateDate = (key: "start" | "end", date?: Date) => {
    if (date) {
      setNutriTarget((p) => {
        if (p)
          return {
            ...p,
            [key]: date.getTime(),
          };
      });
    } else {
      setNutriTarget((p) => {
        if (p) {
          const { [key]: _, ...rest } = p;
          return {
            ...rest,
          };
        }
      });
    }
  };

  return {
    nutriTarget,
    onNumberFieldsUpdate,
    onUpdateDate,
  };
};
