import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useUserStore } from "@providers/user/store/useUserStore";
import { streakData, useStreakStore } from "../store/useStreakStoreV2";
import { shallow } from "zustand/shallow";

export const useUpdateUserStreak = () => {
  const { userId } = useUserStore(
    (state) => ({ userId: state.user?.uid }),
    shallow
  );
  const { updateStreak } = useStreakStore(
    (state) => ({
      updateStreak: state.updateStreak,
    }),
    shallow
  );

  useEffect(() => {
    if (userId) {
      const userStreak = firestore()
        .collection(`users/${userId}/streaks`)
        .orderBy("startedOn", "desc")
        .limit(1)
        .onSnapshot(async (doc) => {
          if (doc.docs.length) {
            const streakData = doc.docs[0].data() as streakData;
            // console.log(streakData, "streakSnapshot");
            updateStreak(streakData);
          } else {
            updateStreak(undefined);
          }
        });

      return () => {
        userStreak();
      };
    }
  }, [userId]);
};
