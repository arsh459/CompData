import { CalendarDate } from "@providers/period/periodStore";
import { create } from "zustand";
import {
  initData,
  getTodayObject,
  getNextWeekData,
  getPreviousWeekData,
} from "./utils";
import { getTime, startOfDay } from "date-fns";
import { Task } from "@models/Tasks/Task";

export interface DietCalendar {
  isVisible: boolean;
  toggleIsVisible: () => void;
  today?: CalendarDate;

  weeksData: CalendarDate[];
  onNext: () => void;

  activeDayNumber?: number;
  setActiveDayNumber: (newDayNumber: number) => void;

  active?: CalendarDate;
  setActive: (date: CalendarDate) => void;

  viewMonth: string;
  setViewMonth: (month: string) => void;

  getPrevious: () => void;
  onInit: (min: number, max?: number, selectedUnixByParams?: number) => void;

  minUnix?: number; // nutrition start
  maxUnix?: number;

  activeTasks: Task[];
  setActiveTasks: (newTasks: Task[]) => void;
}

const useDietCalendar = create<DietCalendar>((set) => {
  return {
    isVisible: false,
    today: undefined,
    weeksData: [],
    activeTasks: [],
    active: undefined,
    viewMonth: "",
    forceScroll: 0,
    minUnix: undefined,
    setActiveDayNumber: (newNumber: number) => {
      set((state) => ({ ...state, activeDayNumber: newNumber }));
    },
    setForceScroll: (index: number) => {
      set((state) => ({ ...state, forceScroll: index }));
    },
    toggleIsVisible: () => {
      // const now = Date.now();
      // const todayObject: CalendarDate = getTodayObject(now);
      set((state) => ({
        ...state,
        isVisible: !state.isVisible,
        // active: todayObject,
        // viewMonth: todayObject.visibleDate.split(" ")[1],
      }));
    },
    onInit: (min: number, max?: number, selectedUnixByParams?: number) => {
      set((state) => {
        const now = Date.now();
        const todayObject: CalendarDate = getTodayObject(now);
        // plan has not started
        let selectedValue = todayObject;
        let weeksData: CalendarDate[] = [];
        let minUnixNumber: number = -1;
        if (selectedUnixByParams) {
          if (min > selectedUnixByParams) {
            weeksData = initData(min);
            selectedValue = getTodayObject(min);
            minUnixNumber = getTime(startOfDay(new Date(min)));
          } else {
            selectedValue = getTodayObject(selectedUnixByParams);
            weeksData = initData(selectedUnixByParams);
            minUnixNumber = getTime(startOfDay(new Date(min)));
          }
        } else {
          if (min > now) {
            weeksData = initData(min);
            selectedValue = getTodayObject(min);
            minUnixNumber = getTime(startOfDay(new Date(now)));
          } else {
            weeksData = initData(now);
            minUnixNumber = getTime(startOfDay(new Date(min)));
          }
        }
        return {
          ...state,
          today: todayObject,
          weeksData: weeksData,
          active: selectedValue,
          minUnix: minUnixNumber,
          ...(max ? { maxUnix: getTime(startOfDay(new Date(max))) } : {}),
          viewMonth: selectedValue.visibleDate.split(" ")[1],
        };
      });
    },
    onNext: () => {
      set((state) => {
        let calculateNext: boolean = true;
        if (
          state.maxUnix &&
          state.weeksData.length &&
          state.weeksData[state.weeksData.length - 1].unix &&
          state.maxUnix <= state.weeksData[state.weeksData.length - 1].unix
        ) {
          console.log("SKIPPING Next run");
          calculateNext = false;
        }

        if (calculateNext) {
          const data = getNextWeekData(
            state.weeksData[state.weeksData.length - 1].unix
          );

          return { ...state, weeksData: [...state.weeksData, ...data] };
        } else {
          return state;
        }
      });
    },

    setActive: (date: CalendarDate) => {
      set((state) => {
        return {
          ...state,
          active: date,
          viewMonth: date.visibleDate.split(" ")[1],
        };
      });
    },

    setViewMonth: (month) => {
      set((state) => {
        return {
          ...state,
          viewMonth: month,
        };
      });
    },

    getPrevious: () => {
      set((state) => {
        let calculatePrevious: boolean = true;
        if (
          state.minUnix &&
          state.weeksData.length &&
          state.weeksData[0].unix &&
          state.minUnix >= state.weeksData[0].unix
        ) {
          console.log("SKIPPING Previous run");
          calculatePrevious = false;
        }

        if (calculatePrevious) {
          const previousData = getPreviousWeekData(state.weeksData[0].unix);
          const viewMonth = previousData[2].visibleDate.split(" ")[1];
          return {
            ...state,
            weeksData: [...previousData, ...state.weeksData],
            viewMonth: viewMonth,
          };
        } else {
          return state;
        }
      });
    },

    setActiveTasks: (newTasks: Task[]) => {
      set((state) => ({
        ...state,
        activeTasks: newTasks,
      }));
    },
  };
});

export default useDietCalendar;
