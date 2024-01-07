import firestore from "@react-native-firebase/firestore";
import { Journey } from "@models/Jounrney/Jourrney";
import { useEffect, useState } from "react";

export const useUserJourney = (uid?: string) => {
  const [journey, setJourney] = useState<Journey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (uid) {
      const unsubscribe = firestore()
        .collection("users")
        .doc(uid)
        .collection("journey")
        .orderBy("displayOn", "desc")
        .onSnapshot((snapshot) => {
          const remoteJourney: Journey[] = [];

          for (const doc of snapshot.docs) {
            if (doc) {
              remoteJourney.push(doc.data() as Journey);
            }
          }

          setJourney(remoteJourney);
          setLoading(false);
        });

      return () => {
        unsubscribe();
      };
    }
  }, [uid]);

  return {
    journey,
    loading,
  };
};
