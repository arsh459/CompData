import { v4 as uuidv4 } from "uuid";
import {
  dailyEnergyObj,
  dailyMoodObj,
  dailySleepObj,
  dailyWeightObj,
} from "./User";
import { format } from "date-fns";

export const createDailyWeightObj = (weight: number): dailyWeightObj => {
  const now = Date.now();
  return {
    weight,
    id: uuidv4(),
    unix: now,
    date: format(new Date(), "yyyy-MM-dd"),
  };
};

export const createDailyMoodObj = (mood: number): dailyMoodObj => {
  const now = Date.now();
  return {
    mood,
    id: uuidv4(),
    unix: now,
    date: format(new Date(), "yyyy-MM-dd"),
  };
};

export const createDailyEnergyObj = (energy: number): dailyEnergyObj => {
  const now = Date.now();
  return {
    energy,
    id: uuidv4(),
    unix: now,
    date: format(new Date(), "yyyy-MM-dd"),
  };
};

export const createDailySleepObj = (sleepHours: number): dailySleepObj => {
  const now = Date.now();
  return {
    sleepHours,
    id: uuidv4(),
    unix: now,
    date: format(new Date(), "yyyy-MM-dd"),
  };
};
