import { labelType, Task } from "@models/Tasks/Task";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  collection,
  Query,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export const useWorkoutTasks = (summaryType?: labelType, gameId?: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (summaryType && gameId) {
      setLoading(true);

      let q: Query;
      if (summaryType === "finale") {
        q = query(collection(db, "tasks"), where("finaleTask", "==", true));
      } else if (summaryType === "beginner") {
        q = query(collection(db, "tasks"), where("level", "<=", 2));
      } else if (summaryType === "intermediate") {
        q = query(
          collection(db, "tasks"),
          where("level", ">=", 3),
          where("level", "<", 4)
        );
      } else if (summaryType === "advanced") {
        q = query(
          collection(db, "tasks"),
          where("level", ">", 3),
          where("level", "<=", 4)
        );
      } else if (summaryType === "master") {
        q = query(collection(db, "tasks"), where("level", ">=", 5));
      } else {
        q = query(
          collection(db, "tasks"),
          where("labels", "array-contains", summaryType)
        );
      }

      const unsub = onSnapshot(q, (docs) => {
        const remTasks: Task[] = [];
        for (const doc of docs.docs) {
          const remoteTask = doc.data() as Task;
          if (
            remoteTask.games?.includes(gameId) &&
            (!remoteTask.finaleTask ||
              (remoteTask.finaleTask && summaryType === "finale"))
          ) {
            remTasks.push(remoteTask);
          }
        }

        remTasks.sort((a, b) => {
          if (
            summaryType === "endurance" &&
            typeof a.enduranceScore === "number" &&
            typeof b.enduranceScore === "number"
          ) {
            return b.enduranceScore - a.enduranceScore;
          } else if (
            summaryType === "agility" &&
            typeof a.agilityScore === "number" &&
            typeof b.agilityScore === "number"
          ) {
            return b.agilityScore - a.agilityScore;
          } else if (
            summaryType === "cardio" &&
            typeof a.cardioScore === "number" &&
            typeof b.cardioScore === "number"
          ) {
            return b.cardioScore - a.cardioScore;
          } else if (
            summaryType === "strength" &&
            typeof a.strengthScore === "number" &&
            typeof b.strengthScore === "number"
          ) {
            return b.strengthScore - a.strengthScore;
          } else {
            return 0;
          }
        });

        // console.log("remTasks", remTasks);

        setTasks(remTasks);
        setLoading(false);
      });

      return () => {
        unsub();
      };
    }
  }, [summaryType, gameId]);

  return {
    tasks,
    loading,
  };
};
