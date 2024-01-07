import { useEffect, useState } from "react";
// import { format } from "date-fns";
import { Task } from "@models/Tasks/Task";
// import {
//   collection,
//   Query,
//   onSnapshot,
//   query,
//   where,
// } from "firebase/firestore";
// import { db } from "@config/firebase";

import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

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
  defaultObj?: dateObject
) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [browseBy, setBrowseBy] = useState<SelectedType>("yourProgram");
  const [selectedLevel, setLevel] = useState<number>(userLevel ? userLevel : 1);
  const [selectedDay, setDay] = useState<dateObject | undefined>(
    nowObj ? nowObj : defaultObj
  );

  useEffect(() => {
    if (!selectedDay && nowObj) {
      setDay(nowObj);
    }
  }, [nowObj, selectedDay]);

  useEffect(() => {
    let q: FirebaseFirestoreTypes.Query | undefined;
    if (browseBy === "yourProgram" && selectedDay && selectedDay.isWarmup) {
      q = firestore()
        .collection("tasks")
        .where("programDays", "array-contains", -1);

      // query(
      //   collection(db, "tasks"),
      //   where("programDays", "array-contains", -1)
      // );
    }
    if (browseBy === "yourProgram" && selectedDay) {
      q = firestore()
        .collection("tasks")
        .where("programDays", "array-contains", selectedDay.dayNumber);
      // q = query(
      //   collection(db, "tasks"),
      //   where("programDays", "array-contains", selectedDay.dayNumber)
      // );
    } else if (browseBy === "all" && typeof selectedLevel === "number") {
      q = firestore().collection("tasks").where("level", "==", selectedLevel);
      // q = query(collection(db, "tasks"), where("level", "==", selectedLevel));
    }

    if (q && gameId) {
      const unsub = q.onSnapshot((docs) => {
        const remTasks: Task[] = [];

        if (docs)
          for (const doc of docs.docs) {
            const remoteTask = doc.data() as Task;

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
      });

      return () => {
        setTasks([]);
        unsub();
      };
    }
  }, [browseBy, selectedDay, selectedLevel, gameId]);

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
