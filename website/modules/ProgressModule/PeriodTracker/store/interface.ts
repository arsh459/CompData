import { Cycle, PeriodDateObj, periodDateType } from "@models/User/User";

export type saveStatesForPeriod = "READY" | "NEED_ONE_VALUE" | "NONE";
export interface CalendarMonth {
  currentDate: string;
  viewDate: string;
  monthStartUnix: number;
  monthEndUnix: number;
}

export interface CalendarDate {
  currentDate: string;
  day: string; /// eee
  visibleDate: string;
  unix: number;
}

export declare type MarkedDates = {
  [key: string]: {
    selected?: boolean;
    color?: string;
  };
};

export interface ZPeriodState {
  savePending: saveStatesForPeriod;
  selectedState: { [date: string]: periodDateType };
  selectedPeriodState: { [date: string]: periodDateType };
  periodDateObjStore: { [date: string]: PeriodDateObj };
  cycles: { [cycleId: string]: Cycle };
  cyclesArray: Cycle[];
  markedDates: MarkedDates;
  currentlySelectedInMonth: string;
  refreshCycles: number;
  dataStartUnix: number;
  dataEndUnix: number;
  initialMonthScrollIndex: number;
  lastMarkedPeriodDate?: number;
  months: CalendarMonth[];
  editMonths: CalendarMonth[];
  onNextMonth: () => void;
  onPreviousMonth: () => void;
  onMonthView: (todayUnix: number) => Promise<void>;
  onMonthEditView: (todayUnix: number) => void;
  onAddCycles: (
    newCycles: { [id: string]: Cycle },
    cyclesArray: Cycle[]
  ) => void;
  onAddPeriodStore: (
    periodDate: { [date: string]: PeriodDateObj },
    toRemoveDocs: { [date: string]: PeriodDateObj }
  ) => void;
  toggleMonthlySelectedDate: (newDate: string) => void;
  prepolulatePeriodDates: (uid: string) => Promise<void>;
  logPeriod: (newDate: string) => void;
  setUnix: (newDate: Date) => void;
  onChangeSavePending: (newValue: saveStatesForPeriod) => void;
  onSave: () => Promise<void>;
}
