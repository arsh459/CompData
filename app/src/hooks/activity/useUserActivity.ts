import { useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";

// import { db } from "@config/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { Badge } from "@models/Prizes/Prizes";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import { Activity } from "@models/Activity/Activity";
// import { createNewBadge } from "@models/Prizes/createUtils";

export const useUserActivity = (actId: string, uid?: string) => {
  // const { state } = useAuthContext();
  const [activity, setActivity] = useState<Activity>();

  useEffect(() => {
    if (uid && actId) {
      const unsub = firestore()
        .collection("users")
        .doc(uid)
        .collection("activities")
        .doc(actId)
        .onSnapshot((doc) => {
          const remAct = doc.data() as Activity | null;
          if (remAct) {
            setActivity(remAct);
          }
        });
      return () => {
        unsub();
      };
    }
  }, [uid, actId]);

  return {
    activity,
  };
};
