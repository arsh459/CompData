import { format } from "date-fns";
import { WeekDataObj, graphDataInterface } from "../interface";

export const getCurrentWeekRange = (
  weekData: WeekDataObj[],
  startingWeight: number
) => {
  let weekRange = "";
  let lastUpdatedWeight = startingWeight;
  const weightsToShow: number[] = [];
  const dayLabels: string[] = [];
  const dateArr: Date[] = [];
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
      } else {
        weightsToShow.push(lastUpdatedWeight);
      }
      dayLabels.push(dayLabel);
      dateArr.push(date);
    }

    dataSet.push(savedWeight === null ? lastUpdatedWeight : startingWeight);
  }

  return { weekRange, weightsToShow, dayLabels, dateArr };
};
export const getCurrentWeekRangeV2 = (
  weekData: WeekDataObj[],
  startingWeight: number,
  maxWeight: number
) => {
  let weekRange = "";
  let lastUpdatedWeight = startingWeight;
  const weightsToShow: number[] = [];
  const dayLabels: string[] = [];
  const dateArr: string[] = [];
  const today = new Date();
  const dataSet: number[] = [];

  const weightGraphData = [] as graphDataInterface[];
  for (let i = 0; i < weekData.length; i++) {
    const date = new Date(weekData[i].date);
    const weightGraphDataObj = {} as graphDataInterface;

    if (i === 0) {
      weekRange += format(date, "do");
    }

    if (i === weekData.length - 1) {
      weekRange += `-${format(date, "do MMMM yyyy")}`;
    }

    const savedWeight = weekData[i].weight as number;

    if (date <= today) {
      const dayLabel = format(date, "EE");
      const weekStrFrmt = format(new Date(date), "iiiiii");
      if (savedWeight) {
        lastUpdatedWeight = savedWeight;
        weightsToShow.push(savedWeight);
        weightGraphDataObj.averageValue = savedWeight;
      } else {
        weightsToShow.push(lastUpdatedWeight);
        weightGraphDataObj.averageValue = lastUpdatedWeight;
      }
      weightGraphDataObj.weekStr = weekStrFrmt;
      weightGraphDataObj.bar = maxWeight;
      weightGraphDataObj.default = maxWeight;

      dayLabels.push(dayLabel);
      dateArr.push(weekStrFrmt);

      weightGraphData.push(weightGraphDataObj);
    }

    dataSet.push(savedWeight === null ? lastUpdatedWeight : startingWeight);
  }

  return { weekRange, weightsToShow, dayLabels, dateArr, weightGraphData };
};
