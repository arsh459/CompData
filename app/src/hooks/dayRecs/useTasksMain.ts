import { TaskRec } from "@models/User/User";
import { useManualTasks } from "./useManualTasks";
import { useRecommendationTasks } from "./useRecommendationTasks";

export const useTasksMain = (
  manual?: boolean,
  badgeId?: string,
  badgeDay?: number,
  taskList?: TaskRec[],
  restDay?: boolean
) => {
  const { tasks } = useRecommendationTasks(badgeId, badgeDay, manual, restDay);
  const { mTasks } = useManualTasks(manual, taskList, restDay);
  return {
    tasks: manual ? mTasks : tasks,
  };
};
