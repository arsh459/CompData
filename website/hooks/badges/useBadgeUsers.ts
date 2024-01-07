import { useEffect, useState } from "react";

import { UserInterface } from "@models/User/User";
import {
  collection,
  onSnapshot,
  query,
  Query,
  where,
} from "firebase/firestore";
import { badgeTypes } from "@models/Prizes/PrizeV2";
import { db } from "@config/firebase";

export const useBadgeUsers = (badgeId?: string, badgeType?: badgeTypes) => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [fetched, setFetching] = useState<boolean>(false);

  useEffect(() => {
    if (badgeId && badgeType) {
      let q: Query | undefined = undefined;
      if (badgeType === "relative") {
        q = query(
          collection(db, "users"),
          where("relativeBadgesWon", "array-contains", badgeId)
        );

        // firestore()
        //   .collection("users")
        //   .where("relativeBadgesWon", "array-contains", badgeId);
      } else if (badgeType === "independent") {
        q = query(
          collection(db, "users"),
          where("independentBadgesWon", "array-contains", badgeId)
        );
      } else {
        q = query(
          collection(db, "users"),
          where("otherBadgesWon", "array-contains", badgeId)
        );
      }

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
    }
  }, [badgeId, badgeType]);

  return {
    users,
    fetched,
  };
};
