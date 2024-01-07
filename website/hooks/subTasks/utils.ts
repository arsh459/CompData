// import { async } from "@firebase/util";
import {
  IngredientCollection,
  NutritionFacts,
  SubTask,
} from "@models/Tasks/Task";
import axios from "axios";
import { db } from "config/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  writeBatch,
  // query,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const mainCollectionName = "subTasks";
const subcollectionName = "ingredients";

export const saveNewTask = async (subTask: SubTask) => {
  try {
    const taskRef = doc(db, mainCollectionName, subTask.id);
    const ingridientRef = collection(taskRef, subcollectionName);
    let subTaskToStore = subTask;

    if (subTask.aiSuggest) {
      const batch = writeBatch(db);
      const snapshot = await getDocs(ingridientRef);
      snapshot.forEach((document) => {
        const subDocRef = doc(ingridientRef, document.id);
        batch.delete(subDocRef);
      });
      let newData: IngredientCollection[] = [];
      subTask.aiSuggest.ingridientDetails.forEach((item) => {
        let id = uuidv4();
        let obj: IngredientCollection = {
          ...item,
          id,
          qtyRequiredForSubTask: subTask.aiSuggest?.ingrdientQuantities[
            item.name
          ]
            ? subTask.aiSuggest?.ingrdientQuantities[item.name]
            : "as per taste",
        };
        newData.push(obj);
      });
      newData.forEach((data) => {
        const newDocRef = doc(ingridientRef, data.id);
        batch.set(newDocRef, data);
      });

      await batch.commit();
    }

    if (subTaskToStore.gptInfo) {
      let { ingrdientQuantities, ingridientDetails, ...gptObj } =
        subTaskToStore.gptInfo;

      subTaskToStore.gptInfo = gptObj;
      subTaskToStore.gptGeneratedNutrition = true;
    }

    const { aiSuggest, ...rest } = subTaskToStore;

    await setDoc(taskRef, rest);

    if (!subTask.isExercise) {
      updateTasks(subTask.id);
    }
  } catch (error) {
    console.log("error", error);
  }
};

const updateTasks = async (subTaskId: string) => {
  let response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reconcileNutritionTasksOnSubtask`,
    { subTaskId: subTaskId }
  );

  if (response.data.status) {
    console.log("success task Updated");
  } else {
    console.log("failed task Updated");
  }
};

export const createNewTask = (): SubTask => {
  return { id: uuidv4() };
};

export const calculateKCalValue = (nutrientsValue: NutritionFacts) => {
  const kcal =
    (nutrientsValue.carbs ? nutrientsValue.carbs : 0) * 4 +
    (nutrientsValue.fats ? nutrientsValue.fats : 0) * 9 +
    (nutrientsValue.protein ? nutrientsValue.protein : 0) * 4;

  return kcal;
};
