import { getUserTodayNutritionActivities } from "../../../models/Activity/utils";
import { addNutritionActivities } from "../../../models/nutrition/utils";
import { getTask } from "../../../models/Task/getUtils";
import {
  getDayStartIST,
  getFormattedDateForUnix,
} from "../../PubSub/activityTracker/utils";

export const userNutritionUpdate = async (uid: string, createdOn?: number) => {
  const createdDayUnix = createdOn ? createdOn : Date.now();
  const reatedDayStartUnix = getDayStartIST(createdDayUnix);
  const reatedDayEndUnix = reatedDayStartUnix + 24 * 60 * 60 * 1000 - 1;

  const acts = await getUserTodayNutritionActivities(
    uid,
    reatedDayStartUnix,
    reatedDayEndUnix,
  );

  let kcal: number = 0;
  for (const act of acts) {
    const taskId = act.taskId;

    if (taskId) {
      const task = await getTask(taskId);

      if (
        task?.fitPoints &&
        act.calories &&
        act.calories === task?.fitPoints * 300 &&
        task?.kcal
      ) {
        kcal += task.kcal;
      }
    }
  }

  const day = getFormattedDateForUnix(createdDayUnix, "YYYY-MM-DD");
  await addNutritionActivities(uid, day, kcal);
};
