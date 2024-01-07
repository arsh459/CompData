import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import * as Sentry from "@sentry/browser";

export const useLeaderboard = (uid?: string) => {
  const [leader, setLeader] = useState<LeaderBoard | undefined>();
  const [loaded, setStatus] = useState<boolean>(false);

  // console.log("authStatus", authStatus);

  useEffect(() => {
    try {
      if (uid) {
        const unsubscribe = onSnapshot(
          doc(db, "leaderBoard", `leader-${uid}`),
          (doc) => {
            setLeader(doc.data() as LeaderBoard);
            setStatus(true);
          }
        );

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
    leader,
    loaded,
  };
};
