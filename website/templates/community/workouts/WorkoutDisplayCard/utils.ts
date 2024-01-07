import { LiveClass } from "@models/Workouts/LiveClass";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";
import { Workout } from "@models/Workouts/Workout";

export const getNextWorkout = (workouts: Workout[], currentIndex: number) => {
  return {
    nextWorkout:
      currentIndex + 1 < workouts.length
        ? workouts[currentIndex + 1]
        : undefined,
    prevWorkout: currentIndex !== 0 ? workouts[currentIndex - 1] : undefined,
  };
};

export const getPreviousWorkout = (
  workouts: (Workout | LiveClass | NutritionPlan)[],
  currentIndex: number
) => {
  return {
    prevWorkout: currentIndex !== 0 ? workouts[currentIndex - 1] : undefined,
  };
};

export const getLabels = (
  current: Workout | LiveClass | NutritionPlan,
  prevWorkout?: Workout | LiveClass | NutritionPlan
) => {
  if (!prevWorkout) {
    return {
      label: `Day ${current.day ? current.day : "0"}`,
    };
  } else if (prevWorkout && prevWorkout.day !== current.day) {
    return {
      label: `Day ${current.day ? current.day : "0"}`,
    };
  } else {
    return {
      label: "",
    };
  }
};

export const millisecondsToStr = (milliseconds: number) => {
  // TIP: to find current time in milliseconds, use:
  // var  current_time_milliseconds = new Date().getTime();

  function numberEnding(num: number) {
    return num > 1 ? "s" : "";
  }

  var temp = Math.floor(milliseconds / 1000);
  var years = Math.floor(temp / 31536000);
  if (years) {
    return years + " year" + numberEnding(years);
  }
  //TODO: Months! Maybe weeks?
  var days = Math.floor((temp %= 31536000) / 86400);
  if (days) {
    return days + " day" + numberEnding(days);
  }
  var hours = Math.floor((temp %= 86400) / 3600);
  if (hours) {
    return hours + " hour" + numberEnding(hours);
  }
  var minutes = Math.floor((temp %= 3600) / 60);
  if (minutes) {
    return minutes + " minute" + numberEnding(minutes);
  }
  var seconds = temp % 60;
  if (seconds) {
    return seconds + " second" + numberEnding(seconds);
  }
  return "less than a second"; //'just now' //or other string you like;
};
