import { db } from "@config/firebase";
import { UserAppSubscription } from "@models/AppSubscription/AppSubscription";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useIsSubscription = (uid: string) => {
  const [userSubObj, setUserSubObj] = useState<UserAppSubscription>();

  useEffect(() => {
    onSnapshot(
      doc(doc(db, "appSubscriptions", "0cPvVrnphNJBnvvOM9Zf"), "userSubs", uid),
      (doc) => {
        if (doc.data()) {
          setUserSubObj(doc.data() as UserAppSubscription);
        }
      }
    );
  }, [uid]);

  return {
    userSubObj,
  };
};
