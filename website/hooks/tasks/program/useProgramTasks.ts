import { useEffect, useState } from "react";
// import { format } from "date-fns";
import { Task } from "@models/Tasks/Task";
import { db } from "config/firebase";
import {
  collection,
  Query,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export type SelectedType = "yourProgram" | "all";
export interface dateObject {
  formattedDate: string;
  dayNumber: number;
  dayName: string;
  monthName: string;
  startUnix: number;
  isFinale?: boolean;
  isWarmup?: boolean;
}

export const useProgramTasks = (
  //   level?: number,
  userLevel?: number,
  gameId?: string,
  nowObj?: dateObject,
  defaultObj?: dateObject,
  gameStarts?: number
) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [browseBy, setBrowseBy] = useState<SelectedType>("yourProgram");
  const [selectedLevel, setLevel] = useState<number>(userLevel ? userLevel : 1);
  const [selectedDay, setDay] = useState<dateObject | undefined>(
    nowObj ? nowObj : defaultObj
  );

  useEffect(() => {
    let q: Query | undefined;
    if (gameStarts && gameStarts > Date.now()) {
      q = query(collection(db, "tasks"));
    } else if (
      browseBy === "yourProgram" &&
      selectedDay &&
      selectedDay.isWarmup
    ) {
      q = query(
        collection(db, "tasks"),
        // where("games", "array-contains", gameId),
        where("programDays", "array-contains", -1)
      );
    } else if (browseBy === "yourProgram" && selectedDay) {
      q = query(
        collection(db, "tasks"),
        // where("games", "array-contains", gameId),
        where("programDays", "array-contains", selectedDay.dayNumber)
      );
    } else if (browseBy === "all" && typeof selectedLevel === "number") {
      q = query(
        collection(db, "tasks"),
        where("level", "==", selectedLevel)
        // where("games", "array-contains", gameId)
      );
    }

    // console.log("selectedLevel", selectedLevel, gameId);

    if (q && gameId) {
      const unsub = onSnapshot(q, (docs) => {
        const remTasks: Task[] = [];

        // console.log("docs", docs.docs.length);
        for (const doc of docs.docs) {
          const remoteTask = doc.data() as Task;

          //   console.log("docs", remoteTask.games);
          if (remoteTask.games?.includes(gameId)) {
            remTasks.push(remoteTask);
          }
        }

        if (browseBy === "yourProgram") {
          const d = selectedDay?.dayNumber ? selectedDay.dayNumber : 0;
          const sorted = remTasks.sort((a, b) =>
            a.priorityObj && b.priorityObj
              ? a.priorityObj[d] - b.priorityObj[d]
              : 0
          );
          setTasks(sorted);
        } else {
          setTasks(remTasks);
        }

        // console.log("remTasks", remTasks);
      });

      return () => {
        setTasks([]);
        unsub();
      };
    }
  }, [browseBy, selectedDay, selectedLevel, gameId, gameStarts]);

  return {
    browseBy,
    setBrowseBy,
    setLevel,
    setDay,
    selectedDay,
    tasks,
    selectedLevel,
  };
};
