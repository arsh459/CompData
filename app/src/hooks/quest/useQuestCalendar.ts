import { CalendarDate } from "@providers/period/periodStore";
import { create } from "zustand";
import {
  initData,
  getTodayObject,
  getNextWeekData,
  getPreviousWeekData,
} from "./utils";
import { getTime, startOfDay } from "date-fns";

export interface QuestCalendar {
  isVisible: boolean;
  toggleIsVisible: () => void;
  today?: CalendarDate;

  weeksData: CalendarDate[];
  onNext: () => void;

  active?: CalendarDate;
  setActive: (date: CalendarDate) => void;

  viewMonth: string;
  setViewMonth: (month: string) => void;

  getPrevious: () => void;
  onInit: (min?: number, max?: number) => void;

  minUnix?: number;
  maxUnix?: number;
  initialScrollIndex: number;
}

const useQuestCalendar = create<QuestCalendar>((set) => {
  return {
    isVisible: false,
    today: undefined,
    weeksData: [],
    active: undefined,
    viewMonth: "",
    initialScrollIndex: 7,

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
    onInit: (min?: number, max?: number) => {
      set((state) => {
        const now = Date.now();
        const todayObject: CalendarDate = getTodayObject(now);

        const weeksData: CalendarDate[] = initData(now);

        return {
          ...state,
          today: todayObject,
          weeksData: weeksData,
          active: todayObject,
          ...(min ? { minUnix: getTime(startOfDay(new Date(min))) } : {}),
          ...(max ? { maxUnix: getTime(startOfDay(new Date(max))) } : {}),
          viewMonth: todayObject.visibleDate.split(" ")[1],
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
            initialScrollIndex: state.initialScrollIndex + 7,
          };
        } else {
          return state;
        }
      });
    },
  };
});

export default useQuestCalendar;
