import { NutritionFacts, SubTask, Task } from "@models/Tasks/Task";
import { SOCIALBOAT_GAME } from "@providers/auth/AuthProvider";
import { saveNutritionActivity } from "@utils/post/createUtils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { getTeamId } from "@utils/utills";
import { startOfDay, getTime } from "date-fns";

export const createNutritionActivity = async (
  subTasks: SubTask[],
  subTaskId: string,
  quantity: number,
  task: Task,
  date: string
) => {
  try {
    const participatingInGameWithTeam =
      useUserStore.getState().user?.participatingInGameWithTeam;
    const uid = useUserStore.getState().user?.uid;
    const teamId = getTeamId(participatingInGameWithTeam, SOCIALBOAT_GAME);
    const dayStartToday = getTime(startOfDay(Date.now()));
    const dayStartUnix = getTime(startOfDay(new Date(date)));
    let unixToUse = Date.now();
    if (dayStartUnix && dayStartToday > dayStartUnix) {
      unixToUse = dayStartUnix;
    }
    const subTaskQty: { [id: string]: number } = { [subTaskId]: quantity };
    let subTaskScore: { [id: string]: number } = {};

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

    await saveNutritionActivity(
      SOCIALBOAT_GAME,
      uid ? uid : "",
      task.id,
      task.name ? task.name : "Diet Task",
      fps,
      subTaskScore,
      subTaskQty,
      macros,
      totalKcalConsumed,
      task.avatar,
      teamId,
      unixToUse
    );

    return `Activity logged `;
  } catch (error) {
    console.log("error", error);
    return `problem in logging the activity please try again in few minutes `;
  }
};
