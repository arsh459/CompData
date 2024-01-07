import { endOfWeek, format, startOfWeek } from "date-fns";
import { msInDay } from "../constants";
import { getDateDiff, weeksBetween } from "./dateUtils";
import { getEmojiByMood } from "../MoodTracker/utils";
import { getEmojiByEnergy } from "../EnergyTracker/utils";
import { DailyDataObj, WeeklyAvgObj } from "@hooks/progress/interface";
import { OpDataOverall, WeekDataObj, typePropTypes } from "../interface";

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
