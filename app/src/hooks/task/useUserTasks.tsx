import { useEffect, useState } from "react";
import { Task } from "@models/Tasks/Task";

import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

export const useUserTasks = (uid?: string, numToFetch?: number) => {
  const [userTasks, setUserTasks] = useState<Task[]>();
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();

  const onNext = () => {
    const getNextUserTasks = async () => {
      const q = firestore()
        .collection("tasks")
        // const q = query(
        // collection(db, "tasks"),
        .where("userId", "==", uid)
        .orderBy("updatedOn", "desc")
        .startAfter(lastDoc)
        .limit(numToFetch ? numToFetch : 4);
      // );
      const querySnapshot = await q.get(); // getDocs(q);
      const remoteTasks: Task[] = [];
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      querySnapshot.forEach((doc) => {
        const dataTask = doc.data() as Task;
        remoteTasks.push(dataTask);
      });
      setUserTasks((prev) => (prev ? [...prev, ...remoteTasks] : remoteTasks));
    };
    if (uid && lastDoc) {
      getNextUserTasks();
    }
  };

  useEffect(() => {
    const getUserTask = async () => {
      const q = firestore()
        .collection("tasks") //  query(
        // collection(db, "tasks"),
        .where("userId", "==", uid)
        .orderBy("updatedOn", "desc")
        .limit(numToFetch ? numToFetch : 4);
      // );
      const querySnapshot = await q.get(); // getDocs(q);
      const remoteTasks: Task[] = [];
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);

      querySnapshot.forEach((doc) => {
        const dataTask = doc.data() as Task;
        remoteTasks.push(dataTask);
      });
      setUserTasks(remoteTasks);
    };
    if (uid) {
      getUserTask();
    }
  }, [uid]);
  return {
    userTasks,
    onNext,
    nextExists: lastDoc ? true : false,
  };
};

export default useUserTasks;
