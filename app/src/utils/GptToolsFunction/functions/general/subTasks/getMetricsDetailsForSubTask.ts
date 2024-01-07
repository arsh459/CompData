import { NutritionMetric } from "@models/config/config";
import { servingType, SubTask } from "@models/Tasks/Task";

export const getMetricDetailsForSubTask = (
  subTask: SubTask,
  nutritionMetrics?: Record<servingType, NutritionMetric>
) => {
  if (
    subTask &&
    subTask.servingType &&
    nutritionMetrics &&
    nutritionMetrics[subTask.servingType]
  ) {
    let data = nutritionMetrics[subTask.servingType];
    data = { ...data, value: data.value * (subTask.servingValue || 1) };
    return data;
  } else if (subTask && subTask.servingType && subTask.servingValue) {
    return { unit: subTask?.servingType, value: subTask.servingValue };
  } else if (subTask && subTask.gptInfo) {
    return { unit: "gram", value: subTask.gptInfo.gramEquivalent };
  } else {
    return null;
  }
};

export const getMetricDetailsForSubTaskinGramOrMl = (
  subTask: SubTask,
  nutritionMetrics?: Record<servingType, NutritionMetric>
) => {
  if (
    subTask &&
    subTask.servingType &&
    nutritionMetrics &&
    nutritionMetrics[subTask.servingType]
  ) {
    let data = nutritionMetrics[subTask.servingType];
    data = { ...data, value: data.value * (subTask.servingValue || 1) };
    return data;
  } else if (subTask && subTask.servingType && subTask.servingValue) {
    return null;
  } else if (subTask && subTask.gptInfo) {
    return { unit: "gram", value: subTask.gptInfo.gramEquivalent };
  } else {
    return null;
  }
};
