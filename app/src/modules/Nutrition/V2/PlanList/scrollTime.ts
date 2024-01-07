import { mealTypeTiming } from "@constants/mealType";
import { MealTypes, MealTypesArray } from "@models/Tasks/Task";
import { MealTypesDietForm } from "@models/User/User";
import {
  format,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
  startOfToday,
} from "date-fns";

export const scrollTime = (
  configMealTime: Record<MealTypes, string>,
  timings?: Partial<Record<MealTypesDietForm, number>>,
  configMealTypeOrder?: MealTypes[]
) => {
  const now = new Date();
  const currHours = getHours(now);
  const currMins = getMinutes(now);

  const timeFromZeroTarget = currHours * 60 + currMins;

  let filledTiming = { ...timings };
  if (filledTiming) {
    let updatedUserTiming = checkAndAddKeys(
      filledTiming,
      configMealTime,
      configMealTypeOrder
    );
    if (updatedUserTiming) {
      const { minTime, selectedMealtype } = processMealTimings(
        updatedUserTiming,
        timeFromZeroTarget
      );

      if (selectedMealtype) {
        return {
          minTime,
          selectedMealtype,
        };
      }
    }
  }

  const respDefault = processConfigTime(configMealTime, timeFromZeroTarget);

  if (respDefault.selectedMealtype) {
    return {
      ...respDefault,
    };
  }

  return undefined;
};

function unixTimestampToDayTime(unix: number) {
  let time = format(new Date(unix), "HH:mm");
  // console.log("time", unix, time);
  time = time.split(":")[0] + time.split(":")[1];
  let timeNumber = Number(time);

  return timeNumber;
}

function checkOrder(
  filledTiming: Partial<Record<MealTypesDietForm, number>>,
  configMealTime: Record<MealTypes, string>,
  configMealTypeOrder?: MealTypes[]
) {
  let sortedKey = Object.keys(filledTiming)
    .sort((a: string, b: string) => {
      let prev = filledTiming[a as MealTypesDietForm];
      let next = filledTiming[b as MealTypesDietForm];

      if (prev && next) {
        return unixTimestampToDayTime(prev) - unixTimestampToDayTime(next);
      } else {
        return 0;
      }
    })
    .map((item) => {
      return changeMealtypeType(item as MealTypesDietForm);
    });

  if (
    JSON.stringify(
      configMealTypeOrder ? configMealTypeOrder : MealTypesArray
    ) === JSON.stringify(sortedKey)
  ) {
    return true;
  }

  return false;
}

function checkAndAddKeys(
  object: Partial<Record<MealTypesDietForm, number>>,
  configMealTime: Record<MealTypes, string>,
  configMealTypeOrder?: MealTypes[]
) {
  (configMealTypeOrder ? configMealTypeOrder : MealTypesArray).forEach(
    (key: MealTypes) => {
      let updateKey = changeToDietFormMealType(key);
      if (!Object.prototype.hasOwnProperty.call(object, updateKey)) {
        object[updateKey] = convertToUnixNumber(configMealTime[key]);
      }
    }
  );

  if (!checkOrder(object, configMealTime, configMealTypeOrder)) {
    return undefined;
  }
  return object;
}

function convertToUnixNumber(configTime: string) {
  const [hours, minutes] = configTime.split(":").map(Number);
  const dateTime = setMinutes(setHours(startOfToday(), hours), minutes);
  const unixTimestamp = dateTime.getTime();
  return unixTimestamp;
}

const processConfigTime = (
  timings: Record<MealTypes, string>,
  timeFromZeroTarget: number
) => {
  // user has saved some timings
  let minTime: number = Number.POSITIVE_INFINITY;
  let selectedMealtype: MealTypes | undefined = undefined;
  for (const mealType of Object.keys(timings)) {
    const mlTypeCasted = mealType as MealTypes;
    const mlTimingUnix = timings[mlTypeCasted];

    if (mlTimingUnix) {
      const splitArr = mlTimingUnix.split(":");

      if (splitArr.length === 2) {
        //   const mlTimingDate = new Date(mlTimingUnix);
        const hr = parseInt(splitArr[0]);
        const mn = parseInt(splitArr[1]);

        const timeFromZero = hr * 60 + mn;

        const diff = Math.abs(timeFromZeroTarget - timeFromZero);

        // console.log("diff", diff, mlTypeCasted);

        if (diff < minTime) {
          minTime = diff;
          selectedMealtype = mlTypeCasted;
        }
      }
    }
  }

  return {
    minTime,
    selectedMealtype,
  };
};

const processMealTimings = (
  timings: Partial<Record<MealTypesDietForm, number>>,
  timeFromZeroTarget: number
) => {
  // user has saved some timings
  let minTime: number = Number.POSITIVE_INFINITY;
  let selectedMealtype: MealTypesDietForm | undefined = undefined;
  for (const mealType of Object.keys(timings)) {
    const mlTypeCasted = mealType as MealTypesDietForm;
    const mlTimingUnix = timings[mlTypeCasted];

    if (mlTimingUnix) {
      const mlTimingDate = new Date(mlTimingUnix);
      const hr = getHours(mlTimingDate);
      const mn = getMinutes(mlTimingDate);

      //   console.log("HR", hr, mn);

      const timeFromZero = hr * 60 + mn;

      //   console.log("timeFromZero", timeFromZero);
      //   console.log("timeFromZeroTarget", timeFromZeroTarget);

      const diff = Math.abs(timeFromZeroTarget - timeFromZero);

      //   console.log("diff", diff, mlTypeCasted, diff < minTime);

      if (diff < minTime) {
        minTime = diff;
        selectedMealtype = mlTypeCasted;
        // console.log("new meal type", mlTypeCasted);
      }
    }
  }

  return {
    minTime,
    selectedMealtype: changeMealtypeType(selectedMealtype),
  };
};

const changeMealtypeType = (dietFormMeal?: MealTypesDietForm): MealTypes => {
  if (dietFormMeal === "breakfast") {
    return "Breakfast";
  } else if (dietFormMeal === "postBreakfast") {
    return "Post Breakfast";
  } else if (dietFormMeal === "dinner") {
    return "Dinner";
  } else if (dietFormMeal === "lunch") {
    return "Lunch";
  } else if (dietFormMeal === "eveningSnacks") {
    return "Evening Snacks";
  } else if (dietFormMeal === "postDinner") {
    return "Post Dinner";
  } else if (dietFormMeal === "preBreakfast") {
    return "Pre Breakfast";
  }

  return "Breakfast";
};

const changeToDietFormMealType = (
  dietFormMeal?: MealTypes
): MealTypesDietForm => {
  if (dietFormMeal === "Breakfast") {
    return "breakfast";
  } else if (dietFormMeal === "Dinner") {
    return "dinner";
  } else if (dietFormMeal === "Post Breakfast") {
    return "postBreakfast";
  } else if (dietFormMeal === "Lunch") {
    return "lunch";
  } else if (dietFormMeal === "Evening Snacks") {
    return "eveningSnacks";
  } else if (dietFormMeal === "Post Dinner") {
    return "postDinner";
  } else if (dietFormMeal === "Pre Breakfast") {
    return "preBreakfast";
  }

  return "breakfast";
};

export const getDisplayMealTime = (
  taskMealType?: MealTypes,
  configTime?: Record<MealTypes, string>,
  userTimings?: Partial<Record<MealTypesDietForm, number>>,
  configMealTypeOrder?: MealTypes[]
) => {
  let updatedTaskMealType = taskMealType ? taskMealType : "Breakfast";
  const userFormDataType = changeToDietFormMealType(updatedTaskMealType);

  let filledTiming = { ...userTimings };
  if (filledTiming) {
    let updatedUserTiming = checkAndAddKeys(
      filledTiming,
      configTime ? configTime : mealTypeTiming,
      configMealTypeOrder
    );
    if (updatedUserTiming) {
      const numValue = updatedUserTiming[userFormDataType];
      if (numValue) {
        // number
        return format(new Date(numValue), "hh:mm a");
      }
    }
  }

  if (configTime && configTime[updatedTaskMealType]) {
    return format(
      convertToUnixNumber(configTime[updatedTaskMealType]),
      "hh:mm a"
    );
  } else if (mealTypeTiming[updatedTaskMealType]) {
    return format(
      convertToUnixNumber(mealTypeTiming[updatedTaskMealType]),
      "hh:mm a"
    );
  }

  return "";
};

export const getDisplayMealTimeForComparson = (
  taskMealType?: MealTypes,
  configTime?: Record<MealTypes, string>,
  userTimings?: Partial<Record<MealTypesDietForm, number>>,
  configMealTypeOrder?: MealTypes[]
) => {
  let updatedTaskMealType = taskMealType ? taskMealType : "Breakfast";
  const userFormDataType = changeToDietFormMealType(updatedTaskMealType);

  let filledTiming = { ...userTimings };
  if (filledTiming) {
    let updatedUserTiming = checkAndAddKeys(
      filledTiming,
      configTime ? configTime : mealTypeTiming,
      configMealTypeOrder
    );
    if (updatedUserTiming) {
      const numValue = updatedUserTiming[userFormDataType];
      if (numValue) {
        // number
        let time = format(new Date(numValue), "HH:mm");
        time = time.split(":")[0] + time.split(":")[1];
        let timeNumber = Number(time);
        return timeNumber;
      }
    }
  }

  if (configTime && configTime[updatedTaskMealType]) {
    let time = configTime[updatedTaskMealType];
    time = time.split(":")[0] + time.split(":")[1];
    let timeNumber = Number(time);
    return timeNumber;
  } else {
    let time = mealTypeTiming[updatedTaskMealType];
    time = time.split(":")[0] + time.split(":")[1];
    let timeNumber = Number(time);
    return timeNumber;
  }
};
