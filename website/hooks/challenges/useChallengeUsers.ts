import { useEffect, useState } from "react";

import { UserInterface } from "@models/User/User";
import {
  collection,
  onSnapshot,
  query,
  Query,
  where,
} from "firebase/firestore";

import { db } from "@config/firebase";

export const useChallengeUsers = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [fetched, setFetching] = useState<boolean>(false);

  useEffect(() => {
    let q: Query | undefined = undefined;
    q = query(collection(db, "users"), where("challengeJoined", ">", 0));

    if (q) {
      const unsub = onSnapshot(q, (snapshot) => {
        const rUsers: UserInterface[] = [];
        for (const doc of snapshot.docs) {
          if (doc) {
            rUsers.push(doc.data() as UserInterface);
          }
        }

        setUsers(rUsers);
        setTimeout(() => setFetching(true), 200);
      });

      return () => {
        if (unsub) {
          setFetching(false);
          unsub();
        }
      };
    }
  }, []);

  return {
    users,
    fetched,
  };
};
