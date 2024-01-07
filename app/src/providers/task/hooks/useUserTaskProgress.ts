import { useAuthContext } from "@providers/auth/AuthProvider";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { TaskProgress } from "@models/Tasks/Task";

export const useUserTaskProgress = (selectedTaskId?: string) => {
  const { state } = useAuthContext();
  const [taskProgress, setTaskProgress] = useState<TaskProgress>();

  useEffect(() => {
    const getTaskProg = async () => {
      if (state.uid && state.gameId && selectedTaskId) {
        const ref = firestore()
          .collection("tasks")
          .doc(selectedTaskId)
          .collection("taskProgress")
          .doc(state.uid);

        const doc = await ref.get();

        // const unsub = ref.onSnapshot((doc) => {
        const tProgress = doc.data() as TaskProgress | null;

        if (tProgress) {
          setTaskProgress(tProgress);
        } else {
          setTaskProgress({
            values: {},
            uid: "",
            updatedOn: Date.now(),
            createdOn: Date.now(),
          });
        }
      }
    };

    getTaskProg();
  }, [state.gameId, state.uid, selectedTaskId]);

  return {
    taskProgress,
  };
};
