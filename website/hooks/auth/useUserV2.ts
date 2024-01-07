import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { UserInterface } from "@models/User/User";
import * as Sentry from "@sentry/browser";

export const useUserV2 = (uid?: string) => {
  const [user, setUser] = useState<UserInterface | undefined>();
  const [loaded, setStatus] = useState<boolean>(false);

  // console.log("authStatus", authStatus);

  useEffect(() => {
    try {
      if (uid) {
        const unsubscribe = onSnapshot(doc(db, "users", uid), (doc) => {
          const remUser = doc.data() as UserInterface;
          setUser(remUser);
          setStatus(true);
        });

        return () => {
          unsubscribe();
        };
      }
    } catch (error) {
      console.log("error", error);
      Sentry.captureException(error);
    }
  }, [uid]);

  return {
    user,
    loaded,
  };
};
