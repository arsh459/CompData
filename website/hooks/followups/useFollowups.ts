import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
} from "firebase/firestore";
import { userFollowup } from "@models/User/User";

export const useFollowups = (uid?: string) => {
  const [followups, setFollowups] = useState<userFollowup[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (uid) {
      setLoading(true);

      const followupQuery = query(
        collection(doc(db, "users", uid), "followups"),
        orderBy("followupTime", "desc")
      );

      onSnapshot(followupQuery, async (docs) => {
        const follows: userFollowup[] = [];

        for (const followupDoc of docs.docs) {
          if (followupDoc.data()) {
            const followupDocData = followupDoc.data() as userFollowup;
            follows.push(followupDocData);
          }
        }
        setFollowups(follows);
      });
    }
  }, [uid]);

  return { followups, loading };
};
