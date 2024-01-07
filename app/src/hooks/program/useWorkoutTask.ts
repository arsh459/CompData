import { Task } from "@models/Tasks/Task";
import { useEffect, useState } from "react";
import * as Sentry from "@sentry/react-native";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@config/firebase";

import firestore from "@react-native-firebase/firestore";

export const useWorkoutTask = (taskId?: string, wait?: boolean) => {
  const [task, setTask] = useState<Task>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (taskId && !wait) {
      setLoading(true);
      const transaction = Sentry.startTransaction({ name: "useWorkoutTask" });
      const span = transaction.startChild({ op: "useWorkoutTaskSubscription" }); // This function returns a Span
      // console.log("t", transaction.traceId);

      const unsub = firestore()
        .collection("tasks")
        .doc(taskId)
        .onSnapshot((doc) => {
          if (doc) {
            setTask(doc.data() as Task);
            setLoading(false);
          }
          span.finish();
          transaction.finish();
        });

      return () => {
        unsub();
      };
    }
  }, [taskId, wait]);

  return {
    task,
    loading,
  };
};
