import firestore from "@react-native-firebase/firestore";
import { Journey } from "@models/Jounrney/Jourrney";
import { useEffect, useState } from "react";

export const useUserTargetJourney = (journeyId: string, uid?: string) => {
  const [journey, setJourney] = useState<Journey>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (uid) {
      const unsubscribe = firestore()
        .collection("users")
        .doc(uid)
        .collection("journey")
        .doc(journeyId)
        .onSnapshot((snapshot) => {
          const remoteJourney: Journey = snapshot.data() as Journey;

          if (remoteJourney) {
            setJourney(remoteJourney);
          }
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
