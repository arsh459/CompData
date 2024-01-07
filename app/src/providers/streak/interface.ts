import { goalObj, localGoalObj } from "@models/User/User";

export interface StreakContextInterface {
  goalObjs: localGoalObj[];
  sevenDayStreak: number;
  todaysObj?: goalObj;
}

export type StreakContextProps = {
  children: React.ReactNode;
};
