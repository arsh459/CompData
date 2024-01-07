import { localGoalObj } from "@models/User/User";
import { DateData } from "react-native-calendars";

export type MonthlyStreakContextProps = {
  children: React.ReactNode;
};

export interface MonthlyStreakContextInterface {
  onMonthChange?: (obj: DateData) => void;
  goalObjs: { [date: string]: localGoalObj };
  loading: boolean;
  //   selDate: string;
  //   setSelDate: React.Dispatch<React.SetStateAction<string>>;
}
