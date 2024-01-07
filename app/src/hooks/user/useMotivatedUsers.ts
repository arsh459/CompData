import { UserInterface } from "@models/User/User";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export const useMotivatedUsers = (motivatorUid?: string) => {
  const [motivatedUsers, setMotivatedUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    try {
      if (motivatorUid) {
        const userRef = firestore().collection("users");

        const q = userRef.where("motivatedBy", "==", motivatorUid);

        const unsub = q.onSnapshot((querySnapshot) => {
          const newlyMotivated: UserInterface[] = [];

          if (querySnapshot?.docs) {
            for (const remMotivatedDoc of querySnapshot.docs) {
              const realTimeMotivated = remMotivatedDoc.data() as
                | UserInterface
                | undefined;
              if (realTimeMotivated) newlyMotivated.push(realTimeMotivated);
            }
          }
          setMotivatedUsers([...newlyMotivated]);
        });
        return () => {
          if (unsub) {
            unsub();
          }
        };
      }
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
    }
  }, [motivatorUid]);
  return {
    motivatedUsers,
  };
};
