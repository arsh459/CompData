import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";

export const useLeaderboardKey = (userKey?: string) => {
  const [leader, setLeader] = useState<LeaderBoard | undefined>();
  const [loaded, setStatus] = useState<boolean>(false);

  //   console.log("userKey", userKey);

  useEffect(() => {
    try {
      if (userKey) {
        const q = query(
          collection(db, "leaderBoard"),
          where("userKey", "==", userKey)
        );

        const unsubscribe = onSnapshot(q, (doc) => {
          if (doc.docs.length > 0) {
            setLeader(doc.docs[0].data() as LeaderBoard);
          }

          //   setLeader(doc.data() as LeaderBoard);
          setStatus(true);
        });

        return () => {
          unsubscribe();
        };
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [userKey]);

  return {
    leader,
    loaded,
  };
};
