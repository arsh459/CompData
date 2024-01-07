export type dayObj = {
  day: string;
  date: string;
  unix: number;
  numStr: string;
};
export type weekArr = dayObj[];
export type calenderArr = weekArr[];

export type DayContextProps = {
  children: React.ReactNode;
  startUnix?: number;
};

export interface DayContextInterface {
  calender: calenderArr;
  selectedWeekDay: string;
  setSelectedWeekDay: (val: string) => void;
  selectedtDate: string;
  setSelectedDate: (val: string) => void;
  intialSlideIndex: number;
  setIntialSlideIndex: (val: number) => void;
  selectedUnix: number;
  setSelectedUnix: (val: number) => void;
  startUnixDayStart: number;
  startUnix?: number;
  startTime?: number;
  endTime?: number;
}
