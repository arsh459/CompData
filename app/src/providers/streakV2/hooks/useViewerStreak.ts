import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

import { streakData } from "../store/useStreakStoreV2";
import { shallow } from "zustand/shallow";
import { useViewerStreakStore } from "../store/useViewerStreak";

export const useViewerStreak = (uid?: string) => {
  const { setStreak } = useViewerStreakStore(
    (state) => ({
      setStreak: state.setStreak,
    }),
    shallow
  );

  useEffect(() => {
    if (uid) {
      const userStreak = firestore()
        .collection(`users/${uid}/streaks`)
        .orderBy("startedOn", "desc")
        .limit(1)
        .onSnapshot(async (doc) => {
          if (doc.docs && doc.docs.length) {
            const streakData = doc.docs[0].data() as streakData;
            // console.log(streakData, "streakSnapshot");
            setStreak(streakData);
          } else {
            setStreak(undefined);
          }
        });

      return () => {
        userStreak();
      };
    }
  }, [uid]);
};
