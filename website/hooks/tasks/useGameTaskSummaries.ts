import { useEffect, useState } from "react";

import { db } from "config/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
} from "firebase/firestore";

// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { TaskSummary } from "@models/Tasks/Task";
// import { createNewTask } from "@models/Tasks/createUtils";

export const useGameTaskSummaries = (gameId: string) => {
  const [taskSummaries, setTaskSumaries] = useState<TaskSummary[]>([]);

  // console.log("here", taskList);

  useEffect(() => {
    const ref = doc(db, "taskGames", gameId);
    const gameSummaries = collection(ref, "summaries");
    const q = query(gameSummaries, orderBy("priority", "asc"));

    const unsubscribe = onSnapshot(q, (taskDocs) => {
      const remoteTasks: TaskSummary[] = [];
      for (const taskDoc of taskDocs.docs) {
        remoteTasks.push(taskDoc.data() as TaskSummary);
      }
      setTaskSumaries(remoteTasks);
    });

    return () => {
      unsubscribe();
    };
  }, [gameId]);

  return {
    taskSummaries,
  };
};
