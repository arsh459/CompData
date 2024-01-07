import { useAuthContext } from "@providers/auth/AuthProvider";
import firestore from "@react-native-firebase/firestore";
import { Nutrition } from "@models/User/Nutritions";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export const useUserNutritions = (today?: string, unix?: number) => {
  const { state } = useAuthContext();
  const [dayNutritions, setDayDoc] = useState<Nutrition>();

  useEffect(() => {
    if (today || unix) {
      let dt = today;
      if (!dt && unix) {
        dt = format(new Date(unix), "yyyy-MM-dd");
      }

      if (dt) {
        const listener = firestore()
          .collection("users")
          .doc(state.uid)
          .collection("nutrition")
          .where("date", "==", dt)
          .onSnapshot((doc) => {
            if (doc)
              if (doc.docs.length) {
                const remoteDoc = doc.docs[0].data() as Nutrition | null;

                if (remoteDoc) {
                  setDayDoc(remoteDoc);
                }
              }
          });

        return () => {
          listener();
        };
      }
    }
  }, [state.uid, today, unix]);

  return {
    dayNutritions,
  };
};
