import {
  getAllPreviousDayRecs,
  updateRec,
} from "../../Https/taskGenerator/getterSetter";
import { getTimedActivitiesToday } from "../../../models/Activity/getUtils";
import {
  getDayStartIST,
  getFormattedDateForUnix,
} from "../../PubSub/activityTracker/utils";
import { NutritionConsumption, TaskRec } from "../../../models/User/User";
import { addNutritionFactsToRec } from "./badgeDayUpdateV3";

export const getProgValuesForTkList = async (
  tasks: TaskRec[],
  uid: string,
  dayStart: number,
) => {
  let dayFP: number = 0;
  let nutrition: NutritionConsumption | undefined = undefined;
  for (const taskObj of tasks) {
    const userActs = await getTimedActivitiesToday(
      uid,
      dayStart,
      dayStart + 24 * 60 * 60 * 1000,
      taskObj.id,
    );

    let taskCals: number = 0;

    for (const userAct of userActs) {
      if (userAct.calories && userAct.calories > taskCals) {
        taskCals = userAct.calories;
      }

      if (userAct.macros) {
        nutrition = addNutritionFactsToRec(
          userAct.macros,
          nutrition,
          userAct.totalKcalConsumed,
        );
      }
    }

    const taskFP = Math.round(taskCals / 300);

    dayFP += taskFP;
  }

  return { dayFP, nutrition: nutrition };
};

export const userRecProgress = async (
  uid: string,
  type: "workout" | "nutrition",
  unix: number,
) => {
  // const now = Date.now();
  const dayStart = getDayStartIST(unix);
  const date = getFormattedDateForUnix(dayStart, "YYYY-MM-DD");

  // console.log("now", unix);
  // console.log("dayStart", dayStart);
  // console.log("date", date);

  const pastRecs = await getAllPreviousDayRecs(uid, date, type);

  for (const rec of pastRecs) {
    const { dayFP, nutrition } = await getProgValuesForTkList(
      rec.tasks,
      uid,
      dayStart,
    );

    // console.log("rec", rec.date, dayFP);
    await updateRec(uid, rec.id, dayFP, nutrition);
  }
};
