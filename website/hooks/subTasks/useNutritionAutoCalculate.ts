import { numberKeys } from "@hooks/tasks/useTask";
import { NutritionFacts, SubTask, Task } from "@models/Tasks/Task";
import { useEffect } from "react";
import { db } from "config/firebase";
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
} from "firebase/firestore";

export const useNutritionAutoCalculate = (
  onNumberUpdate: (key: numberKeys, newVal: string) => void,
  onUpdateNutriFacts: (val: string, key: keyof NutritionFacts) => void,
  task?: Task
) => {
  useEffect(() => {
    const updateFromSubTasks = async () => {
      const firestorePromises: Promise<DocumentSnapshot<DocumentData>>[] = [];
      const qntObj: { [id: string]: number } = {};

      if (task?.subTasks) {
        for (const subTaskEle of task.subTasks) {
          firestorePromises.push(
            getDoc(doc(db, "subTasks", subTaskEle.subTaskId))
          );
          qntObj[subTaskEle.subTaskId] = subTaskEle.qty || 1;
        }
      }

      const remDocs = await Promise.all(firestorePromises);

      let fp: number = 0;
      let kcal: number = 0;
      let nutritionFacts: NutritionFacts = {
        carbs: 0,
        fats: 0,
        fibre: 0,
        protein: 0,
      };

      for (const remDoc of remDocs) {
        if (remDoc.data()) {
          const subTask = remDoc.data() as SubTask;
          fp = fp + (subTask.fp || 0);
          kcal = kcal + (subTask.kcal || 0) * (qntObj[subTask.id] || 1);
          nutritionFacts.carbs =
            (nutritionFacts.carbs || 0) +
            (subTask.nutrientValues?.carbs || 0) * (qntObj[subTask.id] || 1);
          nutritionFacts.fats =
            (nutritionFacts.fats || 0) +
            (subTask.nutrientValues?.fats || 0) * (qntObj[subTask.id] || 1);
          nutritionFacts.fibre =
            (nutritionFacts.fibre || 0) +
            (subTask.nutrientValues?.fibre || 0) * (qntObj[subTask.id] || 1);
          nutritionFacts.protein =
            (nutritionFacts.protein || 0) +
            (subTask.nutrientValues?.protein || 0) * (qntObj[subTask.id] || 1);
        }
      }

      onNumberUpdate("fitPoints", fp.toString());
      onNumberUpdate("kcal", kcal.toString());
      onUpdateNutriFacts((nutritionFacts.carbs || 0).toString(), "carbs");
      onUpdateNutriFacts((nutritionFacts.fats || 0).toString(), "fats");
      onUpdateNutriFacts((nutritionFacts.fibre || 0).toString(), "fibre");
      onUpdateNutriFacts((nutritionFacts.protein || 0).toString(), "protein");
    };

    updateFromSubTasks();
  }, [task?.subTasks, onNumberUpdate, onUpdateNutriFacts]);
};
