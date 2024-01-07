import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore"; //   FirebaseFirestoreTypes,
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { dayMS } from "@providers/period/periodStore";
import { Task } from "@models/Tasks/Task";
import useQuestCalendar from "@hooks/quest/useQuestCalendar";

export const useTasksByBadgeDate = (badgeId: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  // const { todayUnix } = useAuthContext();

  const currentDate = useQuestCalendar((state) => state.active?.currentDate);

  const { roundStart } = useUserStore((state) => {
    return { roundStart: state.currentRound?.start };
  }, shallow);

  // console.log("roundStart", new Date(roundStart));

  useEffect(() => {
    // get tasks for badgeDay

    //

    if (currentDate) {
      const selectedUnix = new Date(currentDate).getTime();
      // console.log("selectedUnix", roundStart, selectedUnix);

      const days = Math.floor(
        (selectedUnix - (roundStart ? roundStart : selectedUnix)) / dayMS
      );

      if (days >= 0) {
        const badgeKey = `${badgeId}_${days}`;

        const l = firestore()
          .collection("tasks")
          .where("badgeDays", "array-contains", badgeKey)
          .onSnapshot((docs) => {
            // fetch tasks
            const fetchedTasks: Task[] = [];
            for (const doc of docs.docs) {
              const taskDoc = doc.data() as Task;
              fetchedTasks.push(taskDoc);
            }

            const sortedTasks = fetchedTasks.sort((a, b) => {
              return (
                (a.badgeDayPriority &&
                typeof a.badgeDayPriority[badgeKey] === "number"
                  ? a.badgeDayPriority[badgeKey]
                  : 0) -
                (b.badgeDayPriority &&
                typeof b.badgeDayPriority[badgeKey] === "number"
                  ? b.badgeDayPriority[badgeKey]
                  : 0)
              );
            });

            setTasks(sortedTasks);
          });

        // remove listener
        return () => {
          l();
        };
      } else {
        setTasks([]);
      }
    }

    // const days = 0;
    // console.log(days);
  }, [badgeId, currentDate, roundStart, dayMS]);

  return {
    tasks,
  };
};
