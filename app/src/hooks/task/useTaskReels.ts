import { fetchingState } from "@hooks/program/useReelTasks";
import { Task } from "@models/Tasks/Task";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

const useTaskReels = (tags?: string[]) => {
  const [reelTasks, setReelTasks] = useState<Task[]>([]);
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();
  const [loadingState, setLoadingState] = useState<fetchingState>("PENDING");

  useEffect(() => {
    const getReelTasks = async () => {
      setLoadingState("LOADING");
      let q: FirebaseFirestoreTypes.Query = firestore()
        .collection("tasks")
        .where("isReel", "==", true)
        .orderBy("priority", "desc")
        .limit(5);

      if (tags && tags.length) {
        q = firestore()
          .collection("tasks")
          .where("isReel", "==", true)
          .where("tags", "array-contains-any", tags)
          .orderBy("priority", "desc")
          .limit(5);
      }

      try {
        const taskDocs = await q.get();

        const remoteTasks: Task[] = [];

        setLastDoc(taskDocs.docs[taskDocs.docs.length - 1]);

        taskDocs.forEach((doc) => {
          const dataTask = doc.data() as Task;

          remoteTasks.push(dataTask);
        });

        setLoadingState("DONE");
        setReelTasks(remoteTasks);
      } catch (e: any) {
        setLoadingState("FAILED");
        crashlytics().recordError(e);
      }
    };

    getReelTasks();
  }, [tags]);

  const onNext = async () => {
    if (lastDoc) {
      let q: FirebaseFirestoreTypes.Query = firestore()
        .collection("tasks")
        .where("isReel", "==", true)
        .orderBy("priority", "desc")
        .startAfter(lastDoc)
        .limit(5);

      if (tags && tags.length) {
        q = firestore()
          .collection("tasks")
          .where("isReel", "==", true)
          .where("tags", "array-contains-any", tags)
          .orderBy("priority", "desc")
          .startAfter(lastDoc)
          .limit(5);
      }

      const taskDocs = await q.get();

      const remoteTasks: Task[] = [];

      setLastDoc(taskDocs.docs[taskDocs.docs.length - 1]);

      taskDocs.forEach((doc) => {
        const dataTask = doc.data() as Task;
        remoteTasks.push(dataTask);
      });

      setReelTasks((prev) => [...prev, ...remoteTasks]);
    }
  };

  return { reelTasks, onNext, loadingState };
};

export default useTaskReels;
