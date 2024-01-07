import { create } from "zustand";
import { ZPeriodState, saveStatesForPeriod } from "./interface";
import { getAllPeriodDates, logPeriodFuncV2 } from "./utils";
import {
  differenceInCalendarMonths,
  endOfMonth,
  format,
  startOfMonth,
} from "date-fns";
import { Cycle, PeriodDateObj } from "@models/User/User";
import {
  getCalendarMonthsV2,
  getCalendarMonthsFromFirstCycle,
  getNextMonthFromString,
  getPreviousMonthFromString,
  onMonthInMS,
} from "./monthUtils";

const today = format(new Date(), "yyyy-MM-dd");

export const useCurrentPeriodStore = create<ZPeriodState>((set, get) => ({
  savePending: "NONE",
  selectedState: {},
  selectedPeriodState: {},
  periodDateObjStore: {},
  cycles: {},
  cyclesArray: [],
  markedDates: {
    [today]: { selected: true, color: "sel" },
  },
  currentlySelectedInMonth: today,
  refreshCycles: 0,
  dataStartUnix: -1,
  dataEndUnix: -1,
  initialMonthScrollIndex: -1,
  lastMarkedPeriodDate: undefined,
  months: [],
  editMonths: [],

  onNextMonth: () => {
    const state = get();
    const previousMonths = state.months;
    if (previousMonths.length) {
      const dt = previousMonths[previousMonths.length - 1].monthStartUnix;

      const nextMonthObj = getNextMonthFromString(dt);

      return set({
        ...state,
        months: [...state.months, nextMonthObj],
        ...(state.dataEndUnix < nextMonthObj.monthEndUnix
          ? { dataEndUnix: nextMonthObj.monthEndUnix }
          : {}),
      });
    }
  },

  onPreviousMonth: () => {
    const state = get();
    const previousMonths = state.editMonths;

    if (previousMonths.length) {
      const dt = previousMonths[previousMonths.length - 1].monthStartUnix;

      const previousMonthObj = getPreviousMonthFromString(dt);

      return set({
        ...state,
        editMonths: [...state.editMonths, previousMonthObj],
        ...(state.dataStartUnix < previousMonthObj.monthStartUnix
          ? { dataStartUnix: previousMonthObj.monthStartUnix }
          : {}),
      });
    }
  },

  onMonthView: async (todayUnix: number) => {
    const state = get();

    const firstCycle = state.cyclesArray[state.cyclesArray.length - 1];
    const firstCycleStart = firstCycle.startUnix;

    const { months, todayIndex } = getCalendarMonthsFromFirstCycle(
      firstCycleStart,
      todayUnix // + dayMS * 30
    );

    if (months.length) {
      const monthStart = months[0].monthStartUnix;
      const lastMonth = months[months.length - 1];
      const monthEnd = lastMonth.monthEndUnix;

      return set({
        ...state,
        months: months,

        initialMonthScrollIndex: todayIndex,
        ...(state.dataStartUnix > monthStart
          ? { dataStartUnix: monthStart }
          : {}),
        ...(state.dataEndUnix < monthEnd ? { dataEndUnix: monthEnd } : {}),
      });
    }
  },

  onMonthEditView: (todayUnix: number) => {
    const state = get();

    const startUnix = todayUnix + onMonthInMS;
    const pastEndUnix =
      (state.lastMarkedPeriodDate || todayUnix) - 2 * onMonthInMS;
    const count = differenceInCalendarMonths(startUnix, pastEndUnix);

    const months = getCalendarMonthsV2(startUnix, count);

    if (months.length) {
      const monthEnd = months[0].monthEndUnix;
      const monthStart = months[months.length - 1].monthStartUnix;

      return set({
        ...state,
        editMonths: months,

        ...(state.dataStartUnix > monthStart
          ? { dataStartUnix: monthStart }
          : {}),
        ...(state.dataEndUnix < monthEnd ? { dataEndUnix: monthEnd } : {}),
      });
    }
  },

  onAddCycles: (newCycles: { [id: string]: Cycle }, cyclesArray: Cycle[]) => {
    set((state) => ({
      ...state,
      cycles: {
        ...state.cycles,
        ...newCycles,
      },
      cyclesArray: cyclesArray,
    }));
  },

  onAddPeriodStore: (
    newPeriodDataObjs: { [date: string]: PeriodDateObj },
    toRemoveDocs: { [date: string]: PeriodDateObj }
  ) => {
    set((state) => ({
      ...state,
      periodDateObjStore: {
        ...state.periodDateObjStore,
        ...newPeriodDataObjs,
      },
    }));
  },

  toggleMonthlySelectedDate: (newValue: string) => {
    set((state) => {
      if (state.currentlySelectedInMonth === newValue) {
        return state;
      } else {
        return {
          ...state,
          currentlySelectedInMonth: newValue,
          markedDates: {
            ...state.markedDates,
            [state.currentlySelectedInMonth]: {
              ...(state.markedDates[state.currentlySelectedInMonth]
                ? state.markedDates[state.currentlySelectedInMonth]
                : {}),
              color: "",
            },
            [newValue]: {
              ...(state.markedDates[newValue]
                ? state.markedDates[newValue]
                : {}),
              color: "sel",
            },
          },
        };
      }
    });
  },

  prepolulatePeriodDates: async (uid: string) => {
    const { periodDates, lastMarkedPeriodDate } = await getAllPeriodDates(uid);

    return set((state) => {
      const { selectedState, selectedPeriodState, ...rest } = state;
      return {
        ...rest,
        selectedState: { ...periodDates, ...selectedState },
        selectedPeriodState: { ...periodDates, ...selectedPeriodState },
        lastMarkedPeriodDate,
      };
    });
  },

  logPeriod: (newValue: string) => {
    set((state) => logPeriodFuncV2(state, newValue));
  },

  setUnix: (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);

    set((state) => ({
      ...state,
      dataStartUnix: start.getTime(),
      dataEndUnix: end.getTime(),
    }));
  },

  onChangeSavePending: (newValue: saveStatesForPeriod) => {
    set((state) => ({ ...state, savePending: newValue }));
  },

  onSave: async () => {
    const state = get();

    return set({
      ...state,
      savePending: "NONE",
      ...(state.cyclesArray.length === 0
        ? { refreshCycles: state.refreshCycles + 1 }
        : {}),
      periodDateObjStore: {},
    });
  },
}));
