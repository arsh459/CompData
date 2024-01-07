import { useUserStore } from "@providers/user/store/useUserStore";
import { useEffect, useState, useRef } from "react";
import { shallow } from "zustand/shallow";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore"; //   FirebaseFirestoreTypes,
import { Task } from "@models/Tasks/Task";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import { getDisplayMealTimeForComparson } from "@modules/Nutrition/V2/PlanList/scrollTime";
import { TaskRec } from "@models/User/User";

export const useTasksFromRec = (recTasks?: TaskRec[], recId?: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { config } = useConfigContext();
  const { timings } = useUserStore(
    (state) => ({
      timings: state.user?.dietForm?.foodTimings,
    }),
    shallow
  );

  const prevRecTasksRef = useRef<TaskRec[] | undefined>();

  useEffect(() => {
    const fetchTasks = async () => {
      if (
        !prevRecTasksRef.current ||
        !(JSON.stringify(prevRecTasksRef.current) === JSON.stringify(recTasks))
      ) {
        prevRecTasksRef.current = recTasks;
        if (!recId) {
          // console.log("id does not exist");
          setTasks([]);
          setLoading(false);
        } else if (recId && recTasks) {
          // console.log("id does exist", recTasks.length);
          setLoading(true);
          const promises: Promise<
            FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
          >[] = [];

          for (const parsedTk of recTasks) {
            const promise = firestore()
              .collection("tasks")
              .doc(parsedTk.id)
              .get();

            promises.push(promise);
          }

          const results = await Promise.all(promises);

          let remoteTasksData: Task[] = [];

          results.forEach((remTask, index) => {
            const tk = remTask.data() as Task;
            let taskObject = { ...tk };
            if (recTasks[index].overrideMealType) {
              taskObject.mealTypes = recTasks[index].overrideMealType;
            }
            remoteTasksData.push(taskObject);
          });

          if (config?.mealTimings) {
            remoteTasksData.sort((a, b) => {
              return (
                getDisplayMealTimeForComparson(
                  a.mealTypes ? a.mealTypes : "Breakfast",
                  config.mealTimings,
                  timings,
                  config.mealTypeOrder
                ) -
                getDisplayMealTimeForComparson(
                  b.mealTypes ? b.mealTypes : "Breakfast",
                  config.mealTimings,
                  timings,
                  config.mealTypeOrder
                )
              );
            });
          }

          setTasks(remoteTasksData);
          setLoading(false);
        } else if (recId && !recTasks) {
          setTasks([]);
          setLoading(false);
        }
      }
    };
    fetchTasks();
  }, [recTasks, config?.mealTimings, config?.mealTypeOrder, timings]);

  return {
    tasks,
    loading,
  };
};
