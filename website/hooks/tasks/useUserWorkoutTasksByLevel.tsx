import { Task } from "@models/Tasks/Task";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  collection,
  Query,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export const useUserWorkoutTasksByLevel = (level?: number, gameId?: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (level && gameId) {
      let q: Query;

      q = query(collection(db, "tasks"), where("level", "==", level));

      const unsub = onSnapshot(q, (docs) => {
        const remTasks: Task[] = [];
        for (const doc of docs.docs) {
          const remoteTask = doc.data() as Task;
          if (remoteTask.games?.includes(gameId)) {
            remTasks.push(remoteTask);
          }
        }

        // console.log("remTasks", remTasks);
        setTasks(remTasks);
      });

      return () => {
        unsub();
      };
    }
  }, [level, gameId]);

  return {
    tasks,
  };
};
