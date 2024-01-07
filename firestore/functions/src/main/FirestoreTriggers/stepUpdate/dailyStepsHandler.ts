// import { TEAM_ALPHABET_GAME } from "../../../constants/challenge";
// import { Activity } from "../../../models/Activity/Activity";

import { stepTaskId } from "../../../constants/email/contacts";
import {
  // getStepActivitiesToday,
  getStepActivitiesTodayV2,
  saveActivityWithCalories,
  // updateCalories,
} from "../../../models/Activity/getUtils";

import { StepsDoc } from "../../../models/StepDoc/StepDoc";
import { getTask } from "../../../models/Task/getUtils";
// import { getUserById } from "../../../models/User/Methods";
// import { getOldTeamId } from "../../Https/removeFromTeam/utils";
// import {
//   getDayStartIST,
//   // getFormattedDateForUnix,
// } from "../../PubSub/activityTracker/utils";
// import {
//   createNewActivityForSteps,
//   //   createNewActivityForTask,
// } from "../onWorkoutActivityCreate/createActivityFromStream";
import { getStepsActivities } from "./utils";

export const dailyStepsHandler = async (uid: string, stepDoc: StepsDoc) => {
  // if stepDoc update is for today
  // const stepUnix = stepDoc.unix; // Date.now();
  // const stepUnixStart = getDayStartIST(stepUnix);
  // const stepUnixEnd = stepUnixStart + 24 * 60 * 60 * 1000 - 1;
  // const stepUnixDate = getFormattedDateForUnix(stepUnixStart);

  // console.log("now date", nowDate);

  // if todays date
  // if (stepDoc.date === nowDate) {
  // const stepTask = await getRelevantStepsTask();
  // const stepTaskId = "e5688477-5ca3-481a-8714-c5f847ab6fb8";

  // console.log(
  //   "stepTask",
  //   stepTask?.name,
  //   stepTask?.fitPoints,
  //   stepTask?.stepsToDo,
  //   stepUnixStart,
  //   stepUnixEnd,
  // );
  console.log("READ TASK", 1);
  const stepTask = await getTask(stepTaskId);

  if (stepTask) {
    const acts = await getStepActivitiesTodayV2(uid, stepDoc.date, stepTaskId);
    console.log("READ ACTS", acts.length);
    // console.log("Acts", acts.length);

    const selectedAct = await getStepsActivities(uid, acts, stepDoc, stepTask);
    console.log("READ User", 1);

    // console.log("selectedAct", selectedAct?.calories);

    if (selectedAct && selectedAct.taskId && selectedAct.id) {
      const targetSteps = stepTask?.stepsToDo ? stepTask.stepsToDo : 1;
      const percentageStepsDone = stepDoc.steps / targetSteps;

      // console.log("targetSteps", targetSteps);
      // console.log("percentageStepsDone", percentageStepsDone);

      const taskPts = stepTask?.fitPoints ? stepTask?.fitPoints : 0;

      // console.log("taskPts", taskPts);

      const ptsDone = Math.floor(taskPts * percentageStepsDone);

      // console.log("ptsDone", ptsDone);

      const calories = ptsDone * 300;

      console.log("Update Activity", 1);
      await saveActivityWithCalories(uid, selectedAct.id, {
        ...selectedAct,
        calories,
      });
    }
  }
  // }
};
