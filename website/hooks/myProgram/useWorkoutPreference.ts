import { db } from "@config/firebase";
import { UserInterface } from "@models/User/User";
import { format } from "date-fns";
import { updateDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { makeGeneratorCall } from "./generatorCall";

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

export const useWorkoutPreference = (user?: UserInterface) => {
  const [loading, setLoading] = useState<boolean>(false);

  // console.log("days", user?.recommendationConfig?.workoutDays);

  const [workoutDays, setWorkoutDays] = useState<Day[]>(
    user?.recommendationConfig?.workoutDays || defaultDays
  );

  const hour =
    user?.recommendationConfig?.workoutNotificationTime?.split(":")[0];
  const minute =
    user?.recommendationConfig?.workoutNotificationTime?.split(":")[1];

  // console.log("hour", hour, minute);

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
      // regenerate workouts

      setLoading(true);
      await updateDoc(doc(db, "users", user?.uid), {
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
    // console.log("UID", uid, dateObj);
    if (uid && dateObj) {
      await updateDoc(doc(db, "users", uid), {
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
