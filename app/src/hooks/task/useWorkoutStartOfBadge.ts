import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { getStartTime } from "@modules/Nutrition/V2/DaySelector/provider/utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

export const useWorkoutStartOfBadge = (badgeId?: string) => {
  const [workoutStartOfBadge, setWorkoutStartOfBadge] = useState<Date>(
    new Date()
  );

  const { uid, startTime } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      // start: user?.recommendationConfig?.start,
      // nutritionStart: user?.recommendationConfig?.nutritionStart,
      // badgeConfig: user?.recommendationConfig?.badgeConfig,
      startTime: getStartTime(
        user?.recommendationConfig?.badgeConfig,
        badgeId,
        "workout",
        user?.recommendationConfig?.start,
        undefined
      ),
    };
  }, shallow);

  useEffect(() => {
    if (startTime) {
      setWorkoutStartOfBadge(new Date(startTime));
    }
  }, [startTime]);

  const onSaveWorkoutStartOfBadge = async (val: Date) => {
    if (uid && badgeId) {
      const start = val.getTime();

      await firestore()
        .collection("users")
        .doc(uid)
        .update({
          [`recommendationConfig.badgeConfig.${badgeId}.start`]: start,
        });
    }
  };

  return {
    workoutStartOfBadge,
    setWorkoutStartOfBadge,
    onSaveWorkoutStartOfBadge,
  };
};
