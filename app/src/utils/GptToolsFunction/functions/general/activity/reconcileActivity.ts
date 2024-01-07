import { Activity } from "@models/Activity/Activity";
import { NutritionFacts, SubTask } from "@models/Tasks/Task";
import { saveNutritionActvity } from "./saveNutritionActivity";

export const reconcileActivity = async (
  activity: Activity,
  subTasks: SubTask[],
  subTaskId: string,
  quantity: number
) => {
  const subTaskQty = activity.subTaskQty || {};
  subTaskQty[subTaskId] = quantity;

  let subTaskScore = activity.subTaskScore || {};

  let macros: NutritionFacts = {
    protein: 0,
    carbs: 0,
    fibre: 0,
    fats: 0,
  };

  let totalKcalConsumed = 0;
  let fps = 0;

  subTasks.map((subTask) => {
    if (subTaskQty[subTask.id]) {
      subTaskScore[subTask.id] = subTask.fp || 0;
      macros = {
        protein:
          (macros.protein || 0) +
          (subTask.nutrientValues?.protein || 0) * subTaskQty[subTask.id],
        carbs:
          (macros.carbs || 0) +
          (subTask.nutrientValues?.carbs || 0) * subTaskQty[subTask.id],
        fats:
          (macros.fats || 0) +
          (subTask.nutrientValues?.fats || 0) * subTaskQty[subTask.id],
        fibre:
          (macros.fibre || 0) +
          (subTask.nutrientValues?.fibre || 0) * subTaskQty[subTask.id],
      };
      totalKcalConsumed =
        totalKcalConsumed + (subTask.kcal || 0) * subTaskQty[subTask.id];
      fps += subTask.fp || 0;
    }
  });

  let updateStatus = await saveNutritionActvity(
    macros,
    subTaskQty,
    subTaskScore,
    fps,
    totalKcalConsumed,
    activity
  );

  return updateStatus;
};
