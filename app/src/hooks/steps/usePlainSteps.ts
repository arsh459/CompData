import { useAuthContext } from "@providers/auth/AuthProvider";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore"; // FirebaseFirestoreTypes,
import { StepsDoc } from "@models/User/StepsDoc";

export const usePlainSteps = (today?: string) => {
  const { state } = useAuthContext();
  const [daySteps, setDayDoc] = useState<StepsDoc>();

  useEffect(() => {
    if (today) {
      let dt = today;

      if (dt) {
        const listener = firestore()
          .collection("users")
          .doc(state.uid)
          .collection("steps")
          .where("date", "==", dt)
          .onSnapshot((doc) => {
            if (doc.docs.length) {
              const remoteDoc = doc.docs[0].data() as StepsDoc | null;

              if (remoteDoc) {
                setDayDoc(remoteDoc);
              }
            } else {
              setDayDoc(undefined);
            }
          });

        return () => {
          listener();
        };
      }
    }
  }, [state.uid, today]);

  return {
    daySteps,
  };
};
