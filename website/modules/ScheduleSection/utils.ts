import { Task } from "@models/Tasks/Task";

export const getMacroString = (task: Task) => {
  let strToShow = "";
  if (task.taskType === "nutrition") {
    strToShow += `${task.kcal}KCal`;
    strToShow += ` | ${task.nutritionFacts?.carbs}g Carbs`;
    strToShow += ` | ${task.nutritionFacts?.protein}g Protein`;
    strToShow += ` | ${task.nutritionFacts?.fats}g Fats`;
  }

  return strToShow;
};
