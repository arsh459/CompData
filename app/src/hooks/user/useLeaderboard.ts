// import { db } from "@config/firebase";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
import { LeaderBoard } from "@models/Leader/LeaderBoard";
import { useEffect, useState } from "react";
// import * as Sentry from "@sentry/browser";

export const useLeaderboard = (uid?: string) => {
  const [leader, setLeader] = useState<LeaderBoard | undefined>();
  const [loaded, setStatus] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (uid) {
        const unsubscribe = firestore()
          .collection("leaderBoard")
          .doc(`leader-${uid}`)
          .onSnapshot(
            // doc(db, "leaderBoard", `leader-${uid}`),
            (doc) => {
              if (doc) {
                setLeader(doc.data() as LeaderBoard);
                setStatus(true);
              }
            }
          );

        return () => {
          unsubscribe();
        };
      }
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
      // Sentry.captureException(error);
    }
  }, [uid]);

  return {
    leader,
    loaded,
  };
};
