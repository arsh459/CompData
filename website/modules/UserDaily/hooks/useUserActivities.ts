import { db } from "@config/firebase";
import { Activity } from "@models/Activities/Activity";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useUserActivities = (uid: string) => {
  const [workoutActs, setWorkoutActs] = useState<Activity[]>([]);
  const [dietActs, setDietActs] = useState<Activity[]>([]);

  useEffect(() => {
    const getUserPositiveActs = async () => {
      const remoteDocs = await getDocs(
        query(
          collection(doc(db, "users", uid), "activities"),
          where("calories", ">", 0)
          // where("createdOn", ">=", start),
          // where("createdOn", "<=", end)
        )
      );

      const wRemoteActs: Activity[] = [];
      const dRemoteActs: Activity[] = [];
      for (const doc of remoteDocs.docs) {
        const remoteDoc = doc.data() as Activity;

        if (remoteDoc.source === "nutrition") {
          dRemoteActs.push(remoteDoc);
        } else if (remoteDoc.source === "task" && !remoteDoc.stepsActive) {
          wRemoteActs.push(remoteDoc);
        }
      }

      setDietActs(
        dRemoteActs.sort(
          (a, b) =>
            (a.createdOn ? a.createdOn : 0) - (b.createdOn ? b.createdOn : 0)
        )
      );

      setWorkoutActs(
        wRemoteActs.sort(
          (a, b) =>
            (a.createdOn ? a.createdOn : 0) - (b.createdOn ? b.createdOn : 0)
        )
      );
    };

    getUserPositiveActs();
  }, [uid]);

  return {
    workoutActs,
    dietActs,
  };
};
