import firestore from "@react-native-firebase/firestore";
import { Activity } from "@models/Activity/Activity";
import { useEffect, useState } from "react";
import { useAuthContext } from "@providers/auth/AuthProvider";

export const useUserRelevantActs = (taskId?: string) => {
  const { state } = useAuthContext();
  const [userRelevantActs, setUserRelevantActs] = useState<Activity[]>([]);

  useEffect(() => {
    if (taskId) {
      const unsub = firestore()
        .collection("users")
        .doc(state.uid)
        .collection("activities")
        .where("taskId", "==", taskId)
        .where("calories", ">", 0)
        .orderBy("calories", "desc")
        .onSnapshot((userRelevantActsDocs) => {
          if (userRelevantActsDocs) {
            const remoteUserRelevantActs: Activity[] = [];

            for (const doc of userRelevantActsDocs.docs) {
              if (doc.data()) {
                remoteUserRelevantActs.push(doc.data() as Activity);
              }
            }

            setUserRelevantActs(remoteUserRelevantActs);
          }
        });

      return () => {
        unsub();
      };
    }
  }, [state.uid, taskId]);

  return { userRelevantActs };
};

export const useUserRelevantActsCount = (taskId?: string) => {
  const { state } = useAuthContext();
  const [userRelevantActsCount, setUserRelevantActsCount] = useState<number>(0);

  useEffect(() => {
    const getCount = async () => {
      if (taskId) {
        const snapshot = await firestore()
          .collection("users")
          .doc(state.uid)
          .collection("activities")
          .where("taskId", "==", taskId)
          .where("calories", ">", 0)
          .orderBy("calories", "desc")
          .count()
          .get();

        setUserRelevantActsCount(snapshot.data().count);
      }
    };

    getCount();
  }, [state.uid, taskId]);

  return { userRelevantActsCount };
};
