import { Day, defaultDays } from "./useWorkoutPreference";

export const getUserWorkoutDays = (workoutDays?: Day[]) => {
  if (workoutDays) {
    return createShortDays(workoutDays);
  }

  return createShortDays(defaultDays);
};

const curr = new Date();

export const getUserNotificationTime = (
  workoutNotificationTimeStr?: string
) => {
  if (workoutNotificationTimeStr) {
    const hour = workoutNotificationTimeStr?.split(":")[0];
    const minute = workoutNotificationTimeStr?.split(":")[1];

    return new Date(
      curr.getFullYear(),
      curr.getMonth(),
      curr.getDate(),
      hour ? parseInt(hour) : 9,
      minute ? parseInt(minute) : 0,
      0,
      0
    );
  }

  return undefined;
};

const createShortDays = (workoutDays: Day[]) => {
  return workoutDays.map(
    (each) => `${each.substring(0, 1).toUpperCase()}${each.substring(1, 3)}`
  );
};
