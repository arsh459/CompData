import { UserInterface } from "../../User/User";
import { WorkoutSeries } from "../../Workout/Workout";

export const getSeriesIds = (workoutSeries: WorkoutSeries[]) => {
  const ids: string[] = [];
  for (const ser of workoutSeries) {
    ids.push(ser.id);
  }

  return ids;
};

export const isPaidUser = (user: UserInterface, courseIds: string[]) => {
  if (user.enrolledCourses && courseIds.length > 0) {
    for (const courseId of courseIds) {
      if (user.enrolledCourses.includes(courseId)) {
        return true;
      }
    }
  }

  return false;
};

export const isPaidUserV2 = (user: UserInterface, courseIds: string[]) => {
  return true;
};
