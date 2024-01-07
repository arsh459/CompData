import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  collection,
  onSnapshot,
  Query,
  query,
  where,
} from "firebase/firestore";
import { CollectionTypes, Task, TaskTypes } from "@models/Tasks/Task";
import { SortTypes } from "./useTasks";

export const useTasksV2 = () => {
  const [collectionType, setCollectionType] =
    useState<CollectionTypes>("tasks");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskType, setTaskType] = useState<TaskTypes | "all">("nutrition");
  const [sortBy, setSortBy] = useState<SortTypes>("nothing");
  const [isReel, setIsReel] = useState<boolean>(false);

  // console.log("here", taskList);

  useEffect(() => {
    const ref = collection(db, "tasks");

    const queryConstraints = [];

    if (taskType !== "all") {
      queryConstraints.push(where("taskType", "==", taskType));
    }
    if (isReel) {
      queryConstraints.push(where("isReel", "==", isReel));
    }

    if (collectionType === "gptTasks") {
      queryConstraints.push(where("gptGeneratedNutrition", "==", true));
    }

    // if (sortBy !== "nothing") {
    //   queryConstraints.push(
    //     orderBy("updatedOn", sortBy === "old_to_new" ? "asc" : "desc")
    //   );
    // }
    let q: Query;
    q = query(ref, ...queryConstraints);

    const unsubscribe = onSnapshot(q, (taskDocs) => {
      const remoteTasks: Task[] = [];
      for (const taskDoc of taskDocs.docs) {
        remoteTasks.push(taskDoc.data() as Task);
      }

      if (sortBy === "nothing") {
        const sorted = remoteTasks.sort((a, b) => {
          var textA = a.name ? a.name.toUpperCase() : "z";
          var textB = b.name ? b.name.toUpperCase() : "z";

          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });

        setTaskList(sorted);
      } else if (sortBy === "old_to_new") {
        const sorted = remoteTasks.sort((a, b) => {
          var textA = a.updatedOn ? a.updatedOn : 0;
          var textB = b.updatedOn ? b.updatedOn : 0;

          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });

        setTaskList(sorted);
      } else if (sortBy === "new_to_old") {
        const sorted = remoteTasks.sort((a, b) => {
          var textA = a.updatedOn ? a.updatedOn : 0;
          var textB = b.updatedOn ? b.updatedOn : 0;

          return -(textA < textB ? -1 : textA > textB ? 1 : 0);
        });

        setTaskList(sorted);
      } else {
        setTaskList(remoteTasks);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [taskType, isReel, sortBy, collectionType]);

  return {
    taskList,
    taskType,
    setTaskType,
    isReel,
    setIsReel,
    sortBy,
    setSortBy,
    collectionType,
    setCollectionType,
  };
};
