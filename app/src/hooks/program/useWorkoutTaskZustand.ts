import { Task } from "@models/Tasks/Task";
import { useEffect, useState } from "react";
import * as Sentry from "@sentry/react-native";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@config/firebase";

import firestore from "@react-native-firebase/firestore";
import { useWorkoutVideoStore } from "@modules/Workout/ProgramDetails/TaskSubmitV3/utils/useWorkoutVideoStore";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { shallow } from "zustand/shallow";

export const useWorkoutTaskZustand = (
  taskId?: string,
  attemptedDate?: string
) => {
  const { state } = useAuthContext();
  const [initDone, setInitDone] = useState<boolean>(false);
  const { onInit } = useWorkoutVideoStore((state) => {
    return {
      onInit: state.onInit,
    };
  }, shallow);

  useEffect(() => {
    if (taskId && state.uid && attemptedDate) {
      const uid = state.uid;

      const transaction = Sentry.startTransaction({
        name: "useWorkoutTaskZustand",
      });
      const span = transaction.startChild({ op: "useWorkoutTaskSubscription" }); // This function returns a Span

      const unsub = firestore()
        .collection("tasks")
        .doc(taskId)
        .onSnapshot((doc) => {
          if (doc) {
            const tk = doc.data() as Task;
            onInit(tk, uid, attemptedDate).then(() => setInitDone(true));
          }
          span.finish();
          transaction.finish();
        });

      return () => {
        unsub();
      };
    }
  }, [taskId, onInit, state.uid]);

  return { initDone };
};
