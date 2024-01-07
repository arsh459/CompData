import useDietCalendar from "@hooks/dietPlan/useDietCalendar";
import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
import { getDisplayMealTimeForComparson } from "@modules/Nutrition/V2/PlanList/scrollTime";

import { useConfigContext } from "@providers/Config/ConfigProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { SwapItemParams } from "@screens/AddNewItemLoadingScreen/utils";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

const useTaskRecLocation = (taskId?: string, toBeSwaped?: SwapItemParams) => {
  const [positioningIndex, setPositioningIndex] = useState<number | undefined>(
    undefined
  );
  const [indicesArray, _] = useState<number[]>([]);
  const { tasks } = useDietCalendar((state) => {
    return {
      tasks: state.activeTasks,
    };
  }, shallow);

  const { timings } = useUserStore((state) => {
    return {
      timings: state.user?.dietForm?.foodTimings,
    };
  }, shallow);

  const { config } = useConfigContext();
  const { task } = useWorkoutTask(taskId);

  useEffect(() => {
    if (toBeSwaped && !toBeSwaped?.taskId && task && taskId) {
      if (tasks.length === 0) {
        setPositioningIndex(0);
      } else {
        let indexToPosition = 0;
        let timeToPosition = getDisplayMealTimeForComparson(
          task.mealTypes,
          config?.mealTimings,
          timings,
          config?.mealTypeOrder
        );
        let taskTimeArray = tasks.map((item) => {
          return getDisplayMealTimeForComparson(
            item.mealTypes,
            config?.mealTimings,
            timings,
            config?.mealTypeOrder
          );
        });
        // let taskIdArray = tasks.map((item) => {
        //   return item.id;
        // });

        let flag = false;
        for (let i = 0; i < taskTimeArray.length; i++) {
          if (taskTimeArray[i] > timeToPosition) {
            indexToPosition = i;
            flag = true;
            break;
          }
        }
        if (flag) {
          setPositioningIndex(indexToPosition);
        } else {
          setPositioningIndex(tasks.length);
        }

        // let updatedTaskTimeArray = [...taskTimeArray, timeToPosition];
        // let updatedTasksIdArray = [...taskIdArray, task.id];
        // const indices = Array.from(updatedTasksIdArray.keys());
        // indices.sort(
        //   (a, b) => updatedTaskTimeArray[a] - updatedTaskTimeArray[b]
        // );
        // setIndicesArray(indices);
      }
    }
  }, [taskId, toBeSwaped, tasks, config?.mealTimings, timings, task]);

  return {
    positioningIndex,
    indicesArray,
  };
};

export default useTaskRecLocation;
