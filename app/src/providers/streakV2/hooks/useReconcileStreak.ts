import { shallow } from "zustand/shallow";
import { useStreakStore } from "../store/useStreakStoreV2";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "react-native-dotenv";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { checkStreakValidity } from "../utils/hasGapInDates";

export const useReconcileStreak = () => {
  const { today } = useAuthContext();

  const { streakValidity, streakId } = useStreakStore((state) => {
    // check if streak needs reconciliation.
    let streakValidity = true;
    if (state.streak?.streakMap) {
      streakValidity = checkStreakValidity(
        today,
        state.streak?.streakMap,
        state.streak.days
      );
    }

    return {
      streakValidity: streakValidity,
      streakId: state.streak?.id,
    };
  }, shallow);

  const uid = useUserStore((state) => state.user?.uid);

  const [loading, setLoading] = useState<"NONE" | "FETCHING" | "FAILED">(
    "NONE"
  );
  // console.log(needsReconcile);
  useEffect(() => {
    if (!streakValidity && streakId && uid) {
      console.log("streak validity run");
      setLoading("FETCHING");

      axios({
        url: `${BACKEND_URL}/reconcileStreak`,
        method: "POST",
        params: {
          uid,
          streakId,
        },
        data: {
          uid,
          streakId,
        },
      })
        .then(() => setLoading("NONE"))
        .catch((e) => {
          setLoading("FAILED");
          console.log("error in streak", e);
        });
    }
  }, [streakValidity, uid, streakId]);

  return {
    loading,
  };
};
