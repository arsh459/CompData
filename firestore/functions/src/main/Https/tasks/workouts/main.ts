import { TEAM_ALPHABET_GAME } from "../../../../constants/challenge";
import { Task } from "../../../../models/Task/Task";
import { getTaskByBadgeDay } from "../../../../models/Task/getUtils";

import { getBadge } from "../../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";

export const mainWorkoutGet = async (badgeId: string) => {
  const badge = await getBadge(badgeId, TEAM_ALPHABET_GAME);

  let i: number = 0;
  const tasks: Task[] = [];
  if (badge?.workoutLevels) {
    for (const wkLevel of badge.workoutLevels) {
      //   console.log("wkLevel", wkLevel);

      // get Tasks
      const tasksOnDay = await getTaskByBadgeDay(badge.id, wkLevel.day);

      for (const tk of tasksOnDay) {
        if (tk.taskType !== "steps" && !tk.isReel && !tk.preview) {
          console.log(
            `${i} | ${wkLevel.day} | ${tk.id} | ${tk.name} | ${tk.taskType} | ${tk.fitPoints} | ${tk.durationMinutes} | ${tk.exercises?.length} | ${badge.id}`,
          );

          tasks.push(tk);

          i++;
        }
      }
    }
  }

  return {
    tasks: tasks,
  };
};
