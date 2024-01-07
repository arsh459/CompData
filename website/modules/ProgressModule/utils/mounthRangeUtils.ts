import { WeeklyAvgObj } from "@hooks/progress/interface";

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
