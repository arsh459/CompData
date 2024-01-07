import { db } from "@config/firebase";
import { Activity } from "@models/Activities/Activity";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useUserRelevantActs = (uid?: string, taskId?: string) => {
  const [userRelevantActs, setUserRelevantActs] = useState<Activity[]>([]);

  useEffect(() => {
    const getRelevantActs = async () => {
      if (taskId && uid) {
        const q = query(
          collection(db, "users", uid, "activities"),
          where("taskId", "==", taskId),
          where("calories", ">", 0),
          orderBy("calories", "desc")
        );

        const snapshot = await getDocs(q);
        const remTasks: Activity[] = [];
        snapshot.forEach((doc) => {
          const remoteTask = doc.data() as Activity;
          if (remoteTask.taskId) {
            remTasks.push(remoteTask);
          }
        });

        setUserRelevantActs(remTasks);
      }
    };
    if (uid && taskId) {
      getRelevantActs();
    }
  }, [uid, taskId]);

  return { userRelevantActs };
};
