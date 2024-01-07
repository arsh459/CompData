import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

import { badgeTypes } from "@models/Prizes/Prizes";
import { UserInterface } from "@models/User/User";

export const useBadgeUsers = (badgeId?: string, badgeType?: badgeTypes) => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [fetched, setFetching] = useState<boolean>(false);
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();

  useEffect(() => {
    const getUsers = async () => {
      if (badgeId && badgeType) {
        let q: FirebaseFirestoreTypes.Query | undefined = undefined;
        if (badgeType === "relative") {
          q = firestore()
            .collection("users")
            .where("relativeBadgesWon", "array-contains", badgeId);
        } else if (badgeType === "independent") {
          q = firestore()
            .collection("users")
            .where("independentBadgesWon", "array-contains", badgeId);
        } else {
          q = firestore()
            .collection("users")
            .where("otherBadgesWon", "array-contains", badgeId);
        }

        if (q) {
          const rUsers: UserInterface[] = [];
          const userDocs = await q.limit(5).get();
          for (const doc of userDocs.docs) {
            if (doc.data()) {
              rUsers.push(doc.data() as UserInterface);
            }
          }

          setUsers(rUsers);
          setLastDoc(userDocs.docs[userDocs.docs.length - 1]);
          setTimeout(() => setFetching(true), 200);
        }
      }
    };
    getUsers();
  }, [badgeId, badgeType]);

  const onNext = () => {
    const getUsers = async () => {
      if (badgeId && badgeType) {
        let q: FirebaseFirestoreTypes.Query | undefined = undefined;
        if (badgeType === "relative") {
          q = firestore()
            .collection("users")
            .where("relativeBadgesWon", "array-contains", badgeId);
        } else if (badgeType === "independent") {
          q = firestore()
            .collection("users")
            .where("independentBadgesWon", "array-contains", badgeId);
        } else {
          q = firestore()
            .collection("users")
            .where("otherBadgesWon", "array-contains", badgeId);
        }

        if (q) {
          const rUsers: UserInterface[] = [];
          const userDocs = await q.startAfter(lastDoc).limit(5).get();
          for (const doc of userDocs.docs) {
            if (doc.data()) {
              rUsers.push(doc.data() as UserInterface);
            }
          }

          setUsers((prev) => [...prev, ...rUsers]);
          setLastDoc(userDocs.docs[userDocs.docs.length - 1]);
          setTimeout(() => setFetching(true), 200);
        }
      }
    };
    if (badgeId && badgeType && lastDoc) {
      getUsers();
    }
  };

  return {
    users,
    fetched,
    onNext,
  };
};
