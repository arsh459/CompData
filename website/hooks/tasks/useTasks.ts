import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  Query,
  query,
  where,
} from "firebase/firestore";
import { CollectionTypes, Task, TaskTypes } from "@models/Tasks/Task";

export type SortTypes = "new_to_old" | "old_to_new" | "nothing";

export const useTasks = (gameId?: string, badgeId?: string) => {
  const [collectionType, setCollectionType] =
    useState<CollectionTypes>("tasks");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskType, setTaskType] = useState<TaskTypes | "all">("all");
  const [sortBy, setSortBy] = useState<SortTypes>("nothing");
  const [isReel, setIsReel] = useState<boolean>(false);

  // console.log("here", taskList);

  useEffect(() => {
    const ref = collection(db, collectionType);

    let q: Query;
    if (gameId && badgeId) {
      q = query(ref, where("badgeId", "==", badgeId));
    } else if (gameId) {
      q = query(ref, where("games", "array-contains", gameId));
    } else {
      const queryConstraints = [];
      if (taskType !== "all") {
        queryConstraints.push(where("taskType", "==", taskType));
      }
      if (isReel) {
        queryConstraints.push(where("isReel", "==", isReel));
      }
      if (sortBy !== "nothing") {
        queryConstraints.push(
          orderBy("updatedOn", sortBy === "old_to_new" ? "asc" : "desc")
        );
      }
      q = query(ref, ...queryConstraints);
      console.log(q);
      // q = query(ref, orderBy("priority", "asc"));
    }

    const unsubscribe = onSnapshot(q, (taskDocs) => {
      const remoteTasks: Task[] = [];
      for (const taskDoc of taskDocs.docs) {
        remoteTasks.push(taskDoc.data() as Task);
      }

      const sorted = remoteTasks.sort((a, b) => {
        var textA = a.name ? a.name.toUpperCase() : "z";
        var textB = b.name ? b.name.toUpperCase() : "z";

        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      setTaskList(sorted);
      console.log(sorted);
    });

    return () => {
      unsubscribe();
    };
  }, [gameId, badgeId, taskType, isReel, sortBy, collectionType]);

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
