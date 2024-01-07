import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { Clapper } from "@models/Posts/Post";

export const useUserClaps = (fetch: boolean, uid?: string) => {
  const [userClappers, setClappers] = useState<Clapper[]>([]);

  useEffect(() => {
    try {
      if (fetch && uid) {
        const userRef = doc(db, "users", uid);
        const clapperRef = collection(userRef, "clappers");

        const unsubscribe = onSnapshot(clapperRef, (clappers) => {
          const remoteClappers: Clapper[] = [];
          for (const clapper of clappers.docs) {
            remoteClappers.push(clapper.data() as Clapper);
          }
          setClappers(remoteClappers);
          // setClapper(doc.data() as Clapper);
        });

        return () => {
          unsubscribe();
        };
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [fetch, uid]);

  return {
    userClappers,
  };
};
