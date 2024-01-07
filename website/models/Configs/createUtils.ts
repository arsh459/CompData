import { v4 as uuidv4 } from "uuid";
import { collection, doc, setDoc } from "@firebase/firestore";
import { db } from "@config/firebase";
import { NutritionTarget } from "@models/User/User";

export const createNewNutriTargets = (): NutritionTarget => {
  const now = Date.now();
  return {
    start: now,

    id: uuidv4(),
  };
};

export const saveNewNutritionTarget = async (
  uid: string,
  nutritionTarget: NutritionTarget
) => {
  const userDocRef = doc(db, "users", uid);
  const nutritionTargetCollectionRef = collection(
    userDocRef,
    "nutritionTarget"
  );

  const nutritionTargetDocRef = doc(
    nutritionTargetCollectionRef,
    nutritionTarget.id
  );

  await setDoc(nutritionTargetDocRef, { ...nutritionTarget });
};
