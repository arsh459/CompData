import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Task } from "@models/Tasks/Task";

export const getBadgeTasks = async (badgeId: string) => {
  const ref = query(
    collection(db, "tasks"),
    where("badgeIds", "array-contains", badgeId)
  );

  const remoteDocs = await getDocs(ref);

  const remTaskArr: Task[] = [];
  for (const tk of remoteDocs.docs) {
    remTaskArr.push(tk.data() as Task);
  }

  return remTaskArr;
};

export const useBadgeTasks = (badgeId: string) => {
  const [tasksInBadge, setTasksInBadge] = useState<Task[]>([]);
  //   console.log("tasksInBadge", tasksInBadge);

  useEffect(() => {
    if (badgeId) {
      console.log("badgeId", badgeId);
      const ref = query(
        collection(db, "tasks"),
        where("badgeIds", "array-contains", badgeId)
      );

      const list = onSnapshot(ref, (remTasks) => {
        const remTaskArr: Task[] = [];
        for (const tk of remTasks.docs) {
          remTaskArr.push(tk.data() as Task);
        }

        setTasksInBadge(remTaskArr);
      });

      return () => {
        list();
      };
    }
  }, [badgeId]);

  return {
    tasksInBadge,
  };
};
