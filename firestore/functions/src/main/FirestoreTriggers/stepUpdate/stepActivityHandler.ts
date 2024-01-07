import {
  getStepActivitiesToday,
  updateCalories,
} from "../../../models/Activity/getUtils";
import { StepsDoc } from "../../../models/StepDoc/StepDoc";
import { getTask } from "../../../models/Task/getUtils";
// import {
//   getDayStartIST,
//   getFormattedDateForUnix,
// } from "../../PubSub/activityTracker/utils";

export const stepActivityHandler = async (uid: string, stepDoc: StepsDoc) => {
  // if stepDoc update is for today
  // const now = Date.now();
  // const istStartUnix = getDayStartIST(now);
  // const nowDate =  // getFormattedDateForUnix(now);

  // console.log("nowDate", nowDate, stepDoc.date, uid);

  // if todays date
  if (stepDoc.date) {
    const acts = await getStepActivitiesToday(uid, stepDoc.date);

    // console.log("acts", acts.length);

    // if activity exists
    if (acts.length && acts[0].taskId && acts[0].id) {
      // console.log("acts[0].taskId", acts[0].taskId);
      // console.log("acts[0].id", acts[0].id);

      // remote task
      const actTask = await getTask(acts[0].taskId);

      // console.log("actTask", actTask?.name);

      const targetSteps = actTask?.stepsToDo ? actTask.stepsToDo : 1;

      // console.log("targetSteps", targetSteps);

      const percentageStepsDone = stepDoc.steps / targetSteps;

      const percentageFixed = percentageStepsDone > 1 ? 1 : percentageStepsDone;

      const taskPts = actTask?.fitPoints ? actTask?.fitPoints : 0;
      const ptsDone = Math.round(taskPts * percentageFixed);

      // console.log("percentageFixed", percentageFixed);
      // console.log("taskPts", taskPts);
      // console.log("ptsDone", ptsDone);

      const calories = ptsDone * 300;

      // console.log("calories", calories);
      await updateCalories(uid, acts[0].id, calories);
    }
  }
};
