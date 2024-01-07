import { SubTask } from "@models/Tasks/Task";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  Query,
  query,
  // orderBy,
  where,
} from "firebase/firestore";

export const useSubTasks = (isExercise?: boolean) => {
  const [subTaskList, setSubTaskList] = useState<SubTask[]>([]);
  const [subTaskObj, setSubTaskObj] = useState<{ [id: string]: SubTask }>({});

  useEffect(() => {
    const ref = collection(db, "subTasks");

    let q: Query = query(ref, orderBy("taskName", "asc"));
    if (isExercise) {
      q = query(
        ref,
        where("isExercise", "==", true),
        orderBy("taskName", "asc")
      );
    }

    const unsubscribe = onSnapshot(
      q,
      (subTaskDocs) => {
        const remoteSubTasksList: SubTask[] = [];
        const remoteSubTasksObj: { [id: string]: SubTask } = {};

        for (const subTaskDoc of subTaskDocs.docs) {
          const subtask = subTaskDoc.data() as SubTask;
          remoteSubTasksList.push(subtask);
          remoteSubTasksObj[subtask.id] = subtask;
        }

        setSubTaskList(remoteSubTasksList);
        setSubTaskObj(remoteSubTasksObj);
      },
      (err) => console.log(err)
    );

    return () => {
      unsubscribe();
    };
  }, [isExercise]);

  return {
    subTaskList,
    subTaskObj,
  };
};
