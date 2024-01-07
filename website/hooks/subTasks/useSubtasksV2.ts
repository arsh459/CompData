import { CollectionTypes, SubTask } from "@models/Tasks/Task";
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
import { SortTypes } from "@hooks/tasks/useTasks";

export const useSubTasksV2 = () => {
  const [subTaskList, setSubTaskList] = useState<SubTask[]>([]);
  const [subTaskObj, setSubTaskObj] = useState<{ [id: string]: SubTask }>({});

  const [sortBy, setSortBy] = useState<SortTypes>("nothing");
  const [isExercise, setIsExercise] = useState<boolean>(false);
  const [collectionType, setCollectionType] =
    useState<CollectionTypes>("tasks");

  useEffect(() => {
    const ref = collection(db, "subTasks");

    // let q: Query = query(ref, orderBy("taskName", "asc"));

    const queryConstraints = [];
    if (collectionType === "gptTasks") {
      queryConstraints.push(where("gptGeneratedNutrition", "==", true));
    }
    if (isExercise) {
      queryConstraints.push(where("isExercise", "==", true));
    }

    let q: Query;
    q = query(ref, ...queryConstraints, orderBy("taskName", "asc"));

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
  }, [isExercise, collectionType]);

  return {
    subTaskList,
    subTaskObj,
    isExercise,
    setIsExercise,
    collectionType,
    setCollectionType,
    sortBy,
    setSortBy,
  };
};
