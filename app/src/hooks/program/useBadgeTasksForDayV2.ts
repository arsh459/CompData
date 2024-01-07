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

import firestore from "@react-native-firebase/firestore"; //   FirebaseFirestoreTypes,
// import { dateObject, SelectedType } from "./useProgramTasks";
// import { useBadgeProgress } from "./useBadgeProgress";
// import { useBadgeContext } from "@providers/badges/BadgeProvider";
import { useBadgeProgressContext } from "@providers/BadgeProgressProvider/BadgeProgressProvider";

export const useBadgeTasksForDayV2 = () =>
  //   badgeId?: string

  //   userLevel?: number,
  //   gameId?: string,
  //   nowObj?: dateObject,
  //   defaultObj?: dateObject
  {
    const { badgeProgress, badgeId } = useBadgeProgressContext();
    const [tasks, setTasks] = useState<Task[]>([]);

    const [selectedDay, setDay] = useState<number>(
      badgeProgress?.currentDay ? badgeProgress.currentDay : 0
    );

    const [init, setInit] = useState<boolean>(false);

    // init
    useEffect(() => {
      if (!init && badgeProgress?.currentDay) {
        setDay(badgeProgress?.currentDay);
        setInit(true);
      }
    }, [badgeProgress?.currentDay, init]);

    useEffect(() => {
      if (badgeId && typeof selectedDay === "number") {
        const keyStr = `${badgeId}_${selectedDay}`;
        const q = firestore()
          .collection("tasks")
          .where("badgeDays", "array-contains", keyStr);

        const unsub = q.onSnapshot((docs) => {
          const remTasks: Task[] = [];

          if (docs)
            for (const doc of docs.docs) {
              const remoteTask = doc.data() as Task;

              if (
                remoteTask.taskType !== "steps" &&
                remoteTask.taskType !== "nutrition"
              ) {
                remTasks.push(remoteTask);
              }
            }

          // const d = selectedDay;

          const sorted = remTasks.sort((a, b) =>
            a.badgeDayPriority && b.badgeDayPriority
              ? a.badgeDayPriority[keyStr] - b.badgeDayPriority[keyStr]
              : 0
          );
          setTasks(sorted);
        });

        return () => {
          setTasks([]);
          unsub();
        };
      }
    }, [badgeId, selectedDay]);

    return {
      setDay,
      selectedDay,
      tasks,
    };
  };
