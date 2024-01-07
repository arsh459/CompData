import { TEAM_ALPHABET_GAME } from "../../../constants/challenge";
import { Activity } from "../../../models/Activity/Activity";
import { StepsDoc } from "../../../models/StepDoc/StepDoc";
import { getUserById } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
import { getOldTeamId } from "../../Https/removeFromTeam/utils";
import { createNewActivityForSteps } from "../onWorkoutActivityCreate/createActivityFromStream";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { getTask } from "../../../models/Task/getUtils";
import { Task } from "../../../models/Task/Task";
// export const stepTKId = "42193ff0-75d8-4cf0-915d-bf139b02fa82";

export const getSelectedAct = (
  user: UserInterface,
  stepDoc: StepsDoc,
  task: Task,
) => {
  if (user) {
    const teamId = getOldTeamId(user, TEAM_ALPHABET_GAME);
    // console.log("teamId", teamId);
    // if (teamId) {
    return createNewActivityForSteps(
      user.uid,
      task.id,
      task.name ? task.name : "Daily Steps Task",
      TEAM_ALPHABET_GAME,
      teamId,
      0,
      stepDoc.date,
      stepDoc.unix,
    );
    // }
  }

  return undefined;
};

export const getStepsActivities = async (
  uid: string,
  acts: Activity[],
  stepDoc: StepsDoc,
  task: Task,
) => {
  if (acts.length) {
    return acts[0];
  } else {
    const user = await getUserById(uid);
    // console.log("user", user?.uid);
    if (user) {
      return getSelectedAct(user, stepDoc, task);
    }
  }

  return undefined;
};

export const getRelevantStepsTask = async () => {
  const game = await getSbEventById(TEAM_ALPHABET_GAME);

  if (game?.configuration && game.configuration.stepTaskId) {
    // get step task
    return await getTask(game.configuration.stepTaskId);
  }

  return undefined;
};
