import { makeGeneratorCall } from "@hooks/dayRecs/generatorCall";
import { useUserStore } from "@providers/user/store/useUserStore";
import firestore from "@react-native-firebase/firestore";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export const DAYS: Day[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const defaultDays: Day[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const curr = new Date();

export const useWorkoutPreference = () => {
  const { uid, workoutDaysDB, workoutNotificationTimeDB } = useUserStore(
    ({ user }) => {
      return {
        uid: user?.uid,
        workoutDaysDB: user?.recommendationConfig?.workoutDays,
        workoutNotificationTimeDB:
          user?.recommendationConfig?.workoutNotificationTime,
      };
    },
    shallow
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [workoutDays, setWorkoutDays] = useState<Day[]>(defaultDays);

  const [workoutNotificationTime, setWorkoutNotificationTime] = useState<Date>(
    new Date()
  );

  useEffect(() => {
    if (workoutDaysDB) {
      setWorkoutDays(workoutDaysDB);
    }
    if (workoutNotificationTimeDB) {
      const hour = workoutNotificationTimeDB.split(":")[0];
      const minute = workoutNotificationTimeDB.split(":")[1];

      setWorkoutNotificationTime(
        new Date(
          curr.getFullYear(),
          curr.getMonth(),
          curr.getDate(),
          hour ? parseInt(hour) : 9,
          minute ? parseInt(minute) : 0,
          0,
          0
        )
      );
    }
  }, [workoutDaysDB, workoutNotificationTimeDB]);

  const workoutDaysUpdate = (day: Day) => {
    if (workoutDays.includes(day)) {
      setWorkoutDays(workoutDays.filter((id) => id !== day));
    } else {
      setWorkoutDays([...workoutDays, day]);
    }
  };

  const onSaveWorkoutDays = async () => {
    if (uid) {
      setLoading(true);
      await firestore()
        .collection("users")
        .doc(uid)
        .update({
          [`recommendationConfig.workoutDays`]: workoutDays,
        });

      await makeGeneratorCall(uid, "workout", true);
      setLoading(false);
    }
  };

  const onSaveWorkoutNotificationTime = async (
    uid?: string,
    dateObj?: Date
  ) => {
    if (uid && dateObj) {
      await firestore()
        .collection("users")
        .doc(uid)
        .update({
          [`recommendationConfig.workoutNotificationTime`]: format(
            dateObj,
            "HH:mm"
          ),
        });
    }
  };

  return {
    workoutDays,
    workoutDaysUpdate,
    onSaveWorkoutDays,
    workoutNotificationTime,
    setWorkoutNotificationTime,
    onSaveWorkoutNotificationTime,
    loading,
  };
};
