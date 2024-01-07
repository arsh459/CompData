import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isMonday,
  isSunday,
  startOfDay,
  startOfMonth,
  // startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";
import { v4 as uuidv4 } from "uuid";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";

import {
  dailyEnergyObj,
  dailyMoodObj,
  dailySleepObj,
  dailyWeightObj,
} from "@models/User/User";

import {
  badMoodEmoji,
  defaultEnergy,
  goodMoodEmoji,
  greatMoodEmoji,
  lowEnergy,
  lowEnergyAdd,
  mehMoodEmoji,
  moderateEnergy,
  moderateEnergyAdd,
  notGoodMoodEmoji,
  veryHighEnergy,
  veryHighEnergyAdd,
} from "@constants/imageKitURL";
import {
  // CurrentWeekData,
  DailyDataObj,
  WeeklyAvgObj,
} from "@providers/streak/hooks/useAvgDataV2";

export type typePropTypes = "mood" | "energy" | "weight";

export interface OpDataOverall {
  [date: string]: DailyDataObj;
}
export const msInDay = 24 * 60 * 60 * 1000;
export interface WeekData {
  startDate: string;
  endDate: string;
  weekStr: string;
}
export interface WeekDataWithDateKey {
  [date: string]: WeekData;
}
export type ProgressCollectionType =
  | "dailyMood"
  | "dailyEnergy"
  | "dailyWeight";
export const saveMoodToFirebase = async (
  type: typePropTypes,
  collectionName: ProgressCollectionType,
  value: number,
  uid?: string
) => {
  if (typeof value !== "number" || !uid || !type || !collectionName) {
    return;
  }

  const currentDate = new Date();
  const date = format(currentDate, "yyyy-MM-dd");
  const unixStartDay = startOfDay(currentDate).getTime();
  const unixUpdateTime = currentDate.getTime();

  try {
    const querySnapshot = await firestore()
      .collection("users")
      .doc(uid)
      .collection(collectionName)
      .where("date", "==", date)
      .get();

    if (querySnapshot.empty) {
      await addDailyProgress(
        uid,
        date,
        unixStartDay,
        type,
        value,
        collectionName
      );
    } else {
      await updateDailyProgress(
        querySnapshot.docs[0].ref,
        type,
        value,
        unixUpdateTime
      );
    }
  } catch (error: any) {
    console.log(error);
    crashlytics().recordError(error);
  }
};

export const saveDailyProgress = async (
  uid: string,
  collectionName: "dailyWeight" | "dailyEnergy" | "dailyMood" | "dailySleep",
  progressObj: dailyWeightObj | dailyMoodObj | dailyEnergyObj | dailySleepObj
) => {
  try {
    await firestore()
      .collection("users")
      .doc(uid)
      .collection(collectionName)
      .doc(progressObj.id)
      .set(progressObj);
  } catch (error: any) {
    console.log(error);
    crashlytics().recordError(error);
  }
};

const addDailyProgress = async (
  uid: string,
  date: string,
  unix: number,
  type: typePropTypes,
  value: number,
  collectionName: ProgressCollectionType
) => {
  try {
    const uniqueId = uuidv4();
    await firestore()
      .collection("users")
      .doc(uid)
      .collection(collectionName)
      .doc(uniqueId)
      .set({
        date: date,
        unix: unix,
        [type]: value,
        id: uniqueId,
      });
  } catch (error: any) {
    console.log(error);
    crashlytics().recordError(error);
  }
};

const updateDailyProgress = async (
  docRef: FirebaseFirestoreTypes.DocumentReference,
  type: typePropTypes,
  value: number,
  unix: number
) => {
  try {
    await docRef.update({
      [type]: value,
      unix,
    });
  } catch (error: any) {
    console.log(error);
    crashlytics().recordError(error);
  }
};

export const calculatePrevWeekAvg = (data: any[], type: typePropTypes) => {
  const firstDayOfPrevWeek = startOfWeek(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    { weekStartsOn: 1 }
  ).getTime();
  const lastDayOfPrevWeek = endOfWeek(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    { weekStartsOn: 1 }
  ).getTime();
  const dataForPrevWeek = data.filter(
    (item) => item.unix >= firstDayOfPrevWeek && item.unix <= lastDayOfPrevWeek
  );
  const prevWeekData = dataForPrevWeek.map((item) => item[type]);
  const prevWeekAvg = calculateOverallAvg(prevWeekData, type);
  return prevWeekAvg;
};

export const calculateOverallAvg = (
  data: DailyDataObj[],
  type: typePropTypes
) => {
  if (data.length === 0) {
    return 0;
  }
  const sum = data.reduce(
    (accumulator, currentValue) =>
      accumulator + ((currentValue && currentValue[type]) || 0),
    0
  );

  return sum / data.length;
};
export interface WeekDataObj {
  [key: string]: number | string;
  date: string;
}

//lastDayOfMonth variable now represents the day before the start of the current week
export const calculateWeeklyAvgsV2 = (
  data: OpDataOverall,
  type: typePropTypes,
  startDate: Date,
  endDate: Date
) => {
  const weeksInRange = weeksBetween(startDate, endDate);

  const weeks: WeeklyAvgObj[] = [];
  // const weekData: WeekDataWithDateKey = {};
  let currentWeekData: {
    currentWeekAvg: number;
    currentWeekNumber: number;
    weekDataObj: WeekDataObj[];
    weekString: string;
    weekStatus: string;
  } = {
    currentWeekAvg: 0,
    weekDataObj: [],
    weekString: "",
    weekStatus: "",
    currentWeekNumber: 0,
  };
  const today = new Date();
  const monday = startOfWeek(today, { weekStartsOn: 1 });
  const mondayOfCurrentWeek = format(monday, "yyyy-MM-dd");
  let currentWeekTotal = 0;
  let currentWeekCount = 0;
  let currentWeekNumber = 0;
  const weekDataObj: WeekDataObj[] = [];
  for (let week = 0; week < weeksInRange; week++) {
    // Calculate the start date of the current week
    const startOfTheWeek = new Date(startDate);
    startOfTheWeek.setDate(startDate.getDate() + 7 * week);
    // Calculate the end date of the current week
    const endOfWeek = new Date(startOfTheWeek);
    endOfWeek.setDate(startOfTheWeek.getDate() + 6);
    const formattedStartDate = format(startOfTheWeek, "yyyy-MM-dd");
    const formattedEndDate = format(endOfWeek, "yyyy-MM-dd");

    let totalOfWeek = 0;
    let count = 0;

    for (let day = 0; day < 7; day++) {
      const element = new Date(startOfTheWeek.getTime() + day * msInDay);

      const dateToCheck = format(element, "yyyy-MM-dd");

      if (data[dateToCheck] && data[dateToCheck][type]) {
        totalOfWeek = totalOfWeek + (data[dateToCheck][type] || 0);

        count++;
      }
      if (formattedStartDate === mondayOfCurrentWeek) {
        const value =
          data[dateToCheck] && data[dateToCheck][type]
            ? data[dateToCheck][type] || 0
            : 0;
        weekDataObj.push({
          [type]: value,
          date: dateToCheck,
        });
        currentWeekTotal = totalOfWeek;
        currentWeekNumber = week + 1;
        if (value) {
          currentWeekCount += 1;
        }
      }
    }

    // Convert the start/end dates to strings and add them to the array
    const strWeek = getDateDiff(
      startOfTheWeek.getDate(),
      endOfWeek.getDate(),
      endOfWeek
    );

    weeks.push({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      // weekStr: `Week ${week + 1}`,
      count: count,
      weekStr: strWeek,
      averageValue:
        (type === "weight"
          ? Math.floor(totalOfWeek / count)
          : Math.ceil(totalOfWeek / count)) || 0,
      weekNumber: week + 1,
      totalOfWeek,
    });

    const moodNumber = Math.ceil(currentWeekTotal / currentWeekCount) || 0;

    currentWeekData = {
      currentWeekAvg: moodNumber,
      currentWeekNumber,
      weekDataObj,
      weekStatus:
        currentWeekCount && type === "mood"
          ? getEmojiByMood(moodNumber).text
          : currentWeekCount && type === "energy"
          ? getEmojiByEnergy(moodNumber).text
          : "",
      weekString: currentWeekCount
        ? `Your overall ${type} for the week is`
        : `Log your ${type} to see the trend`,
    };
  }

  return {
    weeks,
    currentWeekData,
  };
};

export const getIconByEnergy = (energy?: number, isAdd?: boolean) => {
  // if (!energy) energy = 1;
  switch (energy) {
    case 1:
      return {
        icon: isAdd ? lowEnergyAdd : lowEnergy,
        text: "low",
      };

    case 2:
      return {
        icon: isAdd ? moderateEnergyAdd : moderateEnergy,
        text: "Moderate",
      };

    case 3:
      return {
        icon: isAdd ? veryHighEnergyAdd : veryHighEnergy,
        text: "Very High",
      };

    default:
      return {
        icon: isAdd ? lowEnergyAdd : defaultEnergy,
        text: "low",
      };
  }
};

export const getMoodString = (mood?: number): string => {
  switch (mood) {
    case 1:
      return "Some days are bad. Reach out to us or talk to Sakhi to help you through";

    case 2:
      return "One day at a time! Reach out to us or talk to Sakhi to help you through";

    case 3:
      return "A lot of ways to make this a happy day! Go for a walk or do your workout. You will feel better";

    case 4:
      return "Amazing! Keep following the plan to keep this feeling up!";

    case 5:
      return "You are awesome! Keep up the good work";

    default:
      return "";
  }
};

export const getEnergyString = (energy?: number): string => {
  switch (energy) {
    case 1:
      return "It's okay to feel tired somedays. Take it easy and eat something nice today!";

    case 2:
      return "You are doing well. Do a workout task today and get your energy up!";

    case 3:
      return "This is the way to be! Continue working out and keep the energy up";

    default:
      return "";
  }
};

export const getEmojiByMood = (
  mood: number
): { icon: string; text: string } => {
  switch (mood) {
    case 1:
      return { text: "Sad", icon: badMoodEmoji };

    case 2:
      return { text: "Bit Low", icon: notGoodMoodEmoji };

    case 3:
      return { text: "Meh", icon: mehMoodEmoji };

    case 4:
      return { text: "Good", icon: goodMoodEmoji };

    case 5:
      return { text: "Great", icon: greatMoodEmoji };

    default:
      return { text: "-", icon: badMoodEmoji };
  }
};

export const getEmojiByEnergy = (
  energy: number
): { icon: string; text: string } => {
  switch (energy) {
    case 1:
      return { text: "Low", icon: lowEnergy };

    case 2:
      return { text: "Moderate", icon: moderateEnergy };

    case 3:
      return { text: "Excellent", icon: veryHighEnergy };

    default:
      return { text: "-", icon: lowEnergy };
  }
};

// export const getNearestMondayFromFirstWeekOfMonth = (date?: Date) => {
//   // Get the current date and set it to the start of the month
//   const currentDate = date ? date : new Date();
//   const startOfMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth(),
//     1
//   );
//   const timezoneOffset = startOfMonth.getTimezoneOffset();
//   startOfMonth.setTime(startOfMonth.getTime() + timezoneOffset * 60 * 1000);
//   // If the 1st day of the month is not a Monday, set the start of the first week to the previous Monday
//   if (startOfMonth.getDay() !== 1) {
//     const previousMonday = new Date(startOfMonth);
//     previousMonday.setDate(
//       startOfMonth.getDate() - ((startOfMonth.getDay() + 6) % 7)
//     );
//     startOfMonth.setTime(previousMonday.getTime());
//   }

//   // Set the date to the start of the first week
//   const startOfWeek = new Date(startOfMonth);
//   startOfWeek.setTime(startOfWeek.getTime() + timezoneOffset * 60 * 1000);
//   startOfWeek.setDate(startOfMonth.getDate() - startOfMonth.getDay() + 1);

//   // Calculate the days until the nearest Monday
//   let daysToMonday = 1 - startOfWeek.getDay();

//   // Adjust daysToMonday as needed
//   if (daysToMonday > 1) {
//     daysToMonday -= 7;
//   } else if (daysToMonday < -5) {
//     daysToMonday += 7;
//   }

//   // Calculate the nearest Monday
//   const nearestMonday = new Date(startOfWeek);
//   nearestMonday.setDate(startOfWeek.getDate() + daysToMonday);
//   return nearestMonday;
// };
export const getNearestMondayFromFirstWeekOfMonth = (date?: Date) => {
  const currentDate = date || new Date();

  const start = startOfMonth(currentDate);
  const firstWeekStart = startOfWeek(start, { weekStartsOn: 1 });

  let nearestMonday = firstWeekStart;
  while (!isMonday(nearestMonday)) {
    nearestMonday = addDays(nearestMonday, 1);
  }

  return nearestMonday;
};
export const getNearestSundayToEndOfLastWeekOfMonth = (date?: Date): Date => {
  // Get the current date and set it to the end of the month
  const currentDate = date ? date : new Date();

  const lastDayOfMonth = endOfMonth(currentDate);
  if (isSunday(lastDayOfMonth)) {
    return lastDayOfMonth;
  }
  const endOfWeekOfMonth = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });

  return endOfWeekOfMonth;
};
const getNextSunday = (date: Date): Date => {
  const nextDay = addDays(date, 1);
  if (isSunday(nextDay)) {
    return nextDay;
  }
  return getNextSunday(nextDay);
};

export const weeksBetween = (startDate: Date, endDate: Date) => {
  const oneWeek = 1000 * 60 * 60 * 24 * 7; // number of milliseconds in one week
  const diffInMs = endDate.getTime() - startDate.getTime(); // difference between dates in milliseconds
  const diffInWeeks = Math.ceil(diffInMs / oneWeek); // round down to get the number of whole weeks

  return diffInWeeks;
};

function getDateDiff(startDay: number, endDay: number, endDate: Date): string {
  // Get the month name from the end date
  const monthName = format(endDate, "MMM");

  // Return the result in the desired format
  // return `${startDay}-${endDay} ${monthName}`;
  return `${endDay} ${monthName}`;
}

// export const getCurrentWeekRang = (
//   weekDataObj: WeekDataObj[],
//   startWeight: number
// ) => {
//   let str = "";
//   let lastWeightUpdated = startWeight;
//   let weightToShow: number[] = [];
//   let labelDynamic: string[] = [];
//   const now = new Date();
//   const dataSet = weekDataObj.map((day, index, arr) => {
//     const date = new Date(day.date);
//     if (index === 0) {
//       str += format(date, "do");
//     }
//     if (index === arr.length - 1) {
//       str += `-${format(date, "do MMMM yyyy")}`;
//     }
//     const savedWeight = day.weight as number;
//     // if(date <= now){
//     // if(sa)
//     // }
//     if (date <= now) {
//       const day = format(date, "EE");
//       if (savedWeight) {
//         lastWeightUpdated = savedWeight;
//         weightToShow.push(savedWeight);
//         labelDynamic.push(day);
//       } else {
//         weightToShow.push(lastWeightUpdated);
//         labelDynamic.push(day);
//       }
//     }

//     return savedWeight === 0 ? lastWeightUpdated : startWeight;
//   });

//   return { str, dataSet: weightToShow,labelDynamic };
// };

export const getCurrentWeekRange = (
  weekData: WeekDataObj[],
  startingWeight: number
) => {
  let weekRange = "";
  let lastUpdatedWeight = startingWeight;
  const weightsToShow: number[] = [];
  const dayLabels: string[] = [];

  const today = new Date();
  const dataSet: number[] = [];

  for (let i = 0; i < weekData.length; i++) {
    const date = new Date(weekData[i].date);

    if (i === 0) {
      weekRange += format(date, "do");
    }

    if (i === weekData.length - 1) {
      weekRange += `-${format(date, "do MMMM yyyy")}`;
    }

    const savedWeight = weekData[i].weight as number;

    if (date <= today) {
      const dayLabel = format(date, "EE");

      if (savedWeight) {
        lastUpdatedWeight = savedWeight;
        weightsToShow.push(savedWeight);
        dayLabels.push(dayLabel);
      } else {
        weightsToShow.push(lastUpdatedWeight);
        dayLabels.push(dayLabel);
      }
    }

    dataSet.push(savedWeight === null ? lastUpdatedWeight : startingWeight);
  }

  return { weekRange, weightsToShow, dayLabels };
};

export const get = async (
  type: typePropTypes,
  collectionName: ProgressCollectionType,
  value: number,
  uid?: string
) => {
  if (typeof value !== "number" || !uid || !type || !collectionName) {
    console.log("Invalid value or uid");
    return;
  }

  const currentDate = new Date();
  const date = format(currentDate, "yyyy-MM-dd");
  const unixStartDay = startOfDay(currentDate).getTime();
  const unixUpdateTime = currentDate.getTime();

  try {
    const querySnapshot = await firestore()
      .collection("users")
      .doc(uid)
      .collection(collectionName)
      .where("date", "==", date)
      .get();

    if (querySnapshot.empty) {
      await addDailyProgress(
        uid,
        date,
        unixStartDay,
        type,
        value,
        collectionName
      );
    } else {
      await updateDailyProgress(
        querySnapshot.docs[0].ref,
        type,
        value,
        unixUpdateTime
      );
    }
  } catch (error: any) {
    console.log(error);
    crashlytics().recordError(error);
  }
};

export const addWeightToPreviousDay = async (
  userId?: string,
  previousWeight?: number
) => {
  if (typeof previousWeight !== "number" || !userId) {
    console.log("Invalid previousWeight or uid");
    return;
  }

  // only add a new doc if docs are zero
  const getCount = await firestore()
    .collection("users")
    .doc(userId)
    .collection("dailyWeight")
    .count()
    .get();

  const numDocs = getCount.data().count;

  if (numDocs === 0)
    try {
      const yesterday = subDays(new Date(), 1);
      const yesterdayString = format(yesterday, "yyyy-MM-dd");

      const yesterdayDocRef = firestore()
        .collection("users")
        .doc(userId)
        .collection("dailyWeight")
        .where("date", "==", yesterdayString)
        .limit(1);

      const yesterdayDoc = await yesterdayDocRef.get();

      if (!yesterdayDoc.empty) {
        const docToUpdate = yesterdayDoc.docs[0].ref;
        await docToUpdate.update({ weight: previousWeight });
      } else {
        const newId = uuidv4();

        const newDailyWeight: dailyWeightObj = {
          date: yesterdayString,
          id: newId,
          unix: yesterday.getTime(),
          weight: previousWeight,
        };

        await firestore()
          .collection("users")
          .doc(userId)
          .collection("dailyWeight")
          .doc(newDailyWeight.id)
          .set(newDailyWeight);
      }
    } catch (error: any) {
      console.log(error);
      crashlytics().recordError(error);
    }
};

export const getMonthRange = (
  currentWeekNumber: number,
  weeklyAvgs: WeeklyAvgObj[],
  startWeight: number
) => {
  let dataSetMonth: number[] = [];
  let monthRange: string[] = [];
  if (weeklyAvgs.length) {
    for (let index = 0; index < weeklyAvgs.length; index++) {
      const element = weeklyAvgs[index];

      if (currentWeekNumber >= element.weekNumber) {
        const valueForMonth =
          element.averageValue === 0 ? startWeight : element.averageValue;

        dataSetMonth.push(valueForMonth);
        const labelForRange = element.weekStr; //  element.weekStr.split("-")[1];
        monthRange.push(labelForRange);
      }
    }
  }
  return { dataSetMonth, monthRange };
};
