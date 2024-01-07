import { db } from "@config/firebase";
import { Task } from "@models/Tasks/Task";
import { TaskRec } from "@models/User/User";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
export const useManualTasks = (
  manual?: boolean,
  taskList?: TaskRec[],
  restDay?: boolean
) => {
  const stringTkList = JSON.stringify(taskList);
  const [mTasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (manual && stringTkList && !restDay) {
      const parsedList = JSON.parse(stringTkList) as TaskRec[];

      const tkIds: string[] = [];
      for (const parsedTk of parsedList) {
        tkIds.push(parsedTk.id);
      }

      const tasksRef = collection(db, "tasks");
      const q = query(tasksRef, where("id", "in", tkIds));

      const unsub = onSnapshot(q, (snapshot) => {
        const tkObj: { [taskId: string]: Task } = {};

        snapshot.forEach((doc) => {
          const remoteTask = doc.data() as Task;

          if (remoteTask.taskType !== "steps") {
            tkObj[remoteTask.id] = remoteTask;
          }
        });

        const remTasks: Task[] = [];
        for (const id of tkIds) {
          const finalTk = tkObj[id];
          if (finalTk) {
            remTasks.push(finalTk);
          }
        }

        setTasks(remTasks);
      });

      return () => {
        setTasks([]);
        unsub();
      };
    }
  }, [manual, stringTkList, restDay]);

  return {
    mTasks,
  };
};
