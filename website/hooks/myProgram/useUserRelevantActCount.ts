import { db } from "@config/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useUserRelevantActsCount = (uid?: string, taskId?: string) => {
  const [userRelevantActsCount, setUserRelevantActsCount] = useState<number>(0);

  useEffect(() => {
    const getCount = async () => {
      if (taskId && uid) {
        const q = query(
          collection(db, "users", uid, "activities"),
          where("taskId", "==", taskId),
          where("calories", ">", 0),
          orderBy("calories", "desc")
        );

        const snapshot = await getDocs(q);
        setUserRelevantActsCount(snapshot.size);
      }
    };

    getCount();
  }, [uid, taskId]);

  return { userRelevantActsCount };
};
