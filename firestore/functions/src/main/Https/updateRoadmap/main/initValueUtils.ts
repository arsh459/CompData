import {
  getEnergyDaysAfter,
  getMoodDaysAfter,
  getSleepDaysAfter,
} from "../../../../models/User/roadmap";
import { getTickMarks } from "./streakView";

export const getObjInitValue = async (
  uid: string,
  monthStart: number,
  monthEnd: number,
  type: "dailyEnergyObj" | "dailyMoodObj" | "dailySleepObj",
  minValue: number,
) => {
  if (type === "dailyEnergyObj") {
    const objs = await getEnergyDaysAfter(uid, monthStart, monthEnd);
    return getTickMarks(objs, type, minValue);
  } else if (type === "dailyMoodObj") {
    const objs = await getMoodDaysAfter(uid, monthStart, monthEnd);
    return getTickMarks(objs, type, minValue);
  } else {
    const objs = await getSleepDaysAfter(uid, monthStart, monthEnd);
    return getTickMarks(objs, type, minValue);
  }
};
