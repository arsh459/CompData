import { db } from "@config/firebase";
import { makeGeneratorCall } from "@hooks/myProgram/generatorCall";
import { UserInterface } from "@models/User/User";
import { format } from "date-fns";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

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

export const useWorkoutPreference = (
  user: UserInterface,
  setLoading: (val: boolean) => void
) => {
  const [workoutDays, setWorkoutDays] = useState<Day[]>(
    user?.recommendationConfig?.workoutDays || defaultDays
  );

  const hour =
    user?.recommendationConfig?.workoutNotificationTime?.split(":")[0];
  const minute =
    user?.recommendationConfig?.workoutNotificationTime?.split(":")[1];

  const [workoutNotificationTime, setWorkoutNotificationTime] = useState<Date>(
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

  const workoutDaysUpdate = (day: Day) => {
    if (workoutDays.includes(day)) {
      setWorkoutDays(workoutDays.filter((id) => id !== day));
    } else {
      setWorkoutDays([...workoutDays, day]);
    }
  };

  const onSaveWorkoutDays = async () => {
    if (user) {
      setLoading(true);
      await updateDoc(doc(db, "users", user.uid), {
        [`recommendationConfig.workoutDays`]: workoutDays,
      });

      await makeGeneratorCall(user.uid, "workout", true);
      setLoading(false);
    }
  };

  const onSaveWorkoutNotificationTime = async (
    uid?: string,
    dateObj?: Date
  ) => {
    if (uid && dateObj) {
      await updateDoc(doc(db, "users", user.uid), {
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
  };
};
