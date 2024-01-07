import { dayRecommendation } from "@models/User/User";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore"; //   FirebaseFirestoreTypes,
import { useAuthContext } from "@providers/auth/AuthProvider";

export const useDayRecsBetween = (
  badgeId?: string,
  start?: number,
  end?: number
) => {
  const { state } = useAuthContext();
  const [dateRecs, setDateRecs] = useState<{
    [date: string]: dayRecommendation;
  }>({});
  useEffect(() => {
    if (badgeId && start && end && state?.uid) {
      // firestore()
      //   .collection("users")
      //   .doc(state.uid)
      //   .collection("dayRecommendations")
      //   .where("badgeId", "==", badgeId)
      //   .where("unix", ">=", start)
      //   .where("unix", "<=", end)
      //   .get()
      //   .then((d) => console.log("done"))
      //   .catch((e) => console.log("e", e));

      const unsub = firestore()
        .collection("users")
        .doc(state.uid)
        .collection("dayRecommendations")
        .where("badgeId", "==", badgeId)
        .where("unix", ">=", start)
        .where("unix", "<=", end)
        .onSnapshot((docs) => {
          if (docs) {
            const remoteObjs: { [date: string]: dayRecommendation } = {};
            for (const doc of docs.docs) {
              const remoteObj = doc.data() as dayRecommendation;

              remoteObjs[remoteObj.date] = remoteObj;
            }

            setDateRecs(remoteObjs);
          }
        });

      return () => {
        unsub();
      };
    }
  }, [badgeId, start, end, state?.uid]);

  return {
    dateRecs,
  };
};
