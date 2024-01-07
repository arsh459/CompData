import { UserInterface } from "@models/User/User";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { onSnapshot, doc } from "firebase/firestore";

export const useUserSnapshot = (uid?: string) => {
  const [user, setUser] = useState<UserInterface>();

  useEffect(() => {
    try {
      if (uid) {
        const unsubscribe = onSnapshot(doc(db, "users", uid), (doc) => {
          if (doc.data()) {
            const remUser = doc.data() as UserInterface;

            setUser(remUser);
          }
        });

        return () => {
          unsubscribe();
        };
      }
    } catch (error: any) {
      console.log("error", error);
    }
  }, [uid]);

  return {
    user,
  };
};
