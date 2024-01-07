// import { TaskRec } from "@models/User/User";
// import { useEffect, useState } from "react";
// import { Task } from "@models/Tasks/Task";
// import firestore from "@react-native-firebase/firestore"; //   FirebaseFirestoreTypes,

// export const useManualTasks = (
//   manual?: boolean,
//   taskList?: TaskRec[],
//   restDay?: boolean
// ) => {
//   const stringTkList = JSON.stringify(taskList);
//   const [mTasks, setTasks] = useState<Task[]>([]);

//   useEffect(() => {
//     if (manual && stringTkList && !restDay) {
//       const parsedList = JSON.parse(stringTkList) as TaskRec[];

//       const tkIds: string[] = [];
//       for (const parsedTk of parsedList) {
//         tkIds.push(parsedTk.id);
//       }

//       const q = firestore().collection("tasks").where("id", "in", tkIds);

//       const unsub = q.onSnapshot((docs) => {
//         const tkObj: { [taskId: string]: Task } = {};

//         if (docs) {
//           for (const doc of docs.docs) {
//             const remoteTask = doc.data() as Task;

//             if (remoteTask.taskType !== "steps") {
//               tkObj[remoteTask.id] = remoteTask;
//             }
//           }

//           const remTasks: Task[] = [];
//           for (const id of tkIds) {
//             const finalTk = tkObj[id];
//             if (finalTk) {
//               remTasks.push(finalTk);
//             }
//           }

//           setTasks(remTasks);
//         }

//         // const d = selectedDay;
//       });

//       return () => {
//         setTasks([]);
//         unsub();
//       };
//     }
//   }, [manual, stringTkList, restDay]);

//   return {
//     mTasks,
//   };
// };

import { TaskRec } from "@models/User/User";
import { useEffect, useState } from "react";
import { Task } from "@models/Tasks/Task";
import firestore from "@react-native-firebase/firestore"; //   FirebaseFirestoreTypes,
export const useManualTasks = (
  manual?: boolean,
  taskList?: TaskRec[],
  restDay?: boolean
) => {
  const stringTkList = JSON.stringify(taskList);
  const [mTasks, setTasks] = useState<Task[]>([]);
  // console.log("stringTkList", stringTkList);
  useEffect(() => {
    if (manual && stringTkList && !restDay) {
      const parsedList = JSON.parse(stringTkList) as TaskRec[];
      console.log(parsedList);

      const tkIds: string[] = [];

      const chunkSize = 10;
      const chunkedTkIds: string[][] = [];
      for (const parsedTk of parsedList) {
        tkIds.push(parsedTk.id);
      }
      for (let i = 0; i < tkIds.length; i += chunkSize) {
        const chunk = tkIds.slice(i, i + chunkSize);
        chunkedTkIds.push(chunk);
      }
      console.log("chunkedTkIds", chunkedTkIds);
      const unsubscribeCallbacks: (() => void)[] = [];
      const combinedTasks: Task[] = [];
      chunkedTkIds.forEach((chunk) => {
        const q = firestore().collection("tasks").where("id", "in", chunk);
        const unsub = q.onSnapshot(
          (docs) => {
            const tkObj: { [taskId: string]: Task } = {};

            if (docs) {
              docs.forEach((doc) => {
                const remoteTask = doc.data() as Task;

                if (remoteTask.taskType !== "steps") {
                  tkObj[remoteTask.id] = remoteTask;
                }
              });
              const chunkTasks: Task[] = chunk
                .map((id) => tkObj[id])
                .filter((t) => t !== undefined);
              combinedTasks.push(...chunkTasks);
              console.log("combinedTasks", combinedTasks.length);
              setTasks((prev) => [...prev, ...combinedTasks]);
            }
          },
          (error) => {
            console.error("Error fetching tasks: ", error);
          }
        );
        unsubscribeCallbacks.push(unsub);
      });

      // console.log("combinedTasks", combinedTasks.length);
      // const d = selectedDay;
      // });

      return () => {
        setTasks([]);
        unsubscribeCallbacks.forEach((unsub) => unsub());
      };
    }
  }, [manual, stringTkList, restDay]);
  return {
    mTasks,
  };
};
