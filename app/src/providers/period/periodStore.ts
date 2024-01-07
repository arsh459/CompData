import { Cycle, PeriodDateObj, periodDateType } from "@models/User/User";
import { format } from "date-fns";
import { MarkedDates } from "react-native-calendars/src/types";
import { create } from "zustand";
import {
  generateNewCycle,
  getAllPeriodDates,
  getPeriodDate,
  handleCalendarDates,
  handleDurationExtendV2,
  logPeriodFuncV2,
  needsCycleGen,
} from "./funcs/dataUtils";
import {
  getCalendarMonths,
  getCalendarMonthsFromFirstCycle,
  getNextMonthFromString,
  getPreviousMonthFromString,
  getPreviousMonthsFromString,
} from "./funcs/monthUtils";
import { AutoRoomIDs } from "@models/ChatBot/insights";
import { formatStream, parseString } from "@hooks/chatbot/insights/utilsV2";
import {
  EmojiItem,
  EmojiItemLocal,
} from "@hooks/chatbot/insights/useSakhiInsightsV2";
import { remoteUpdatePeriodObj } from "@hooks/chatbot/insights/callHandler";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const monthMap: { [mon: number]: string } = {
  0: "Jan",
  1: "Feb",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "Aug",
  8: "Sept",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

export const dayMS = 24 * 60 * 60 * 1000;
const defaultWeeks = 2;

const today = format(new Date(), "yyyy-MM-dd");

export type localPeriodDataType = periodDateType | "SELECTED";
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
  progressPercent?: number; //between 0 to 1
  dailyRecommendationPoint?: number;
}

export interface ZPeriodState {
  markedDates: MarkedDates;
  today: string;
  forceScrollIndex: number;
  postForceScroll: () => void;
  inViewMonth: string;
  horizontalDateList: CalendarDate[];
  loading: boolean;
  toggleLoading: (load: boolean) => void;
  onSave: () => Promise<void>;
  months: CalendarMonth[];
  editMonths: CalendarMonth[];
  currentlySelected: string;
  currentlySelectedInMonth: string;
  toggleSelectedDate: (newDate: string) => void;
  toggleMonthlySelectedDate: (newDate: string) => void;
  initialScrollIndex: number;
  initialMonthScrollIndex: number;
  lastMarkedPeriodDate?: number;
  startUnix: number;
  endUnix: number;
  dataStartUnix: number;
  dataEndUnix: number;
  cycles: { [cycleId: string]: Cycle };
  cyclesArray: Cycle[];
  onAddCycles: (
    newCycles: { [id: string]: Cycle },
    cyclesArray: Cycle[]
  ) => void;
  onAddPeriodStore: (
    periodDate: { [date: string]: PeriodDateObj },
    toRemoveDocs: { [date: string]: PeriodDateObj }
  ) => void;
  onNextWeek: () => void;
  selectedState: { [date: string]: periodDateType };
  selectedPeriodState: { [date: string]: periodDateType };
  onNextWeekData: () => Promise<void>;
  onPreviousWeek: () => void;
  uid: string;
  dayLoading: boolean;
  onToggleDayLoading: (newVal: boolean) => void;
  onNextMonth: () => void;
  onPreviousMonth: () => void;
  onExtendMonths: (numMonths: number) => void;
  onRefreshSymptoms: (date: string) => Promise<void>;
  refreshCycles: number;
  onChangeSavePending: (newValue: saveStatesForPeriod) => void;
  onViewMonthChange: (monthSt: string) => void;
  savePending: saveStatesForPeriod;
  periodDateObjStore: { [date: string]: PeriodDateObj };
  logPeriod: (newDate: string) => void;
  mainInsights: { [date: string]: { insight: string; prompt: string } };
  setMainInsights: (insight: string, prompt: string, date: string) => void;
  insights: Record<AutoRoomIDs, { [date: string]: EmojiItemLocal }>;
  onStreamingInsight: (
    openAIResult: string,
    roomId: AutoRoomIDs,
    date: string
  ) => void;
  onErrorInStream: (roomId: AutoRoomIDs, date: string) => void;
  onFinishStreamingInsight: (
    streamText: string,
    roomId: AutoRoomIDs,
    id: string,
    date: string
  ) => void;
  onMonthView: (uid: string, todayUnix: number) => Promise<void>;
  onMonthEditView: (uid: string, todayUnix: number) => void;
  prepolulatePeriodDates: () => Promise<void>;
  initData: (uid: string, todayUnix: number) => Promise<void>;
}

export const useCurrentPeriodStore = create<ZPeriodState>((set, get) => ({
  markedDates: {
    [today]: { selected: true, color: "sel" },
  },
  uid: "",
  selectedState: {},
  selectedPeriodState: {},
  horizontalDateList: [],
  loading: true,
  initialScrollIndex: -1,
  initialMonthScrollIndex: -1,
  lastMarkedPeriodDate: undefined,
  periodDateObjStore: {},
  months: [],
  editMonths: [],
  dayLoading: false,
  // datesLoading: false,

  refreshCycles: 0,
  cycles: {},
  cyclesArray: [],
  insights: { DIET: {}, YOGA: {} },
  mainInsights: {},
  setMainInsights: (insight: string, prompt: string, date: string) => {
    set((state) => ({
      ...state,
      mainInsights: {
        ...state.mainInsights,
        [date]: {
          insight,
          prompt,
        },
      },
    }));
  },
  onStreamingInsight: (
    openAIStream: string,
    roomId: AutoRoomIDs,
    date: string
  ) => {
    // const item: EmojiItem = parseString(openAIStream);

    const formattedStream = formatStream(openAIStream);

    const toUpdateItem: EmojiItemLocal = {
      // ...item,
      name: "",
      reason: formattedStream,
      fetchingState: "FETCHING",
    };

    // update state
    set((state) => ({
      ...state,
      insights: {
        ...state.insights,
        [roomId]: {
          ...state.insights[roomId],
          [date]: toUpdateItem,
        },
      },
    }));
  },
  onFinishStreamingInsight: async (
    streamText: string,
    roomId: AutoRoomIDs,
    id: string,
    date: string
  ) => {
    const state = get();

    const item: EmojiItem = parseString(streamText);

    const toUpdateItem: EmojiItemLocal = {
      ...item,
      fetchingState: "COMPLETE",
    };

    set((state) => ({
      ...state,
      insights: {
        ...state.insights,
        [roomId]: {
          ...state.insights[roomId],
          [date]: toUpdateItem,
        },
      },
    }));

    if (toUpdateItem.name)
      remoteUpdatePeriodObj(
        state.uid,
        id,
        { name: toUpdateItem.name, reason: toUpdateItem.reason },
        roomId
      );
  },
  onErrorInStream: (roomId: AutoRoomIDs, date: string) => {
    set((state) => ({
      ...state,
      insights: {
        ...state.insights,
        [roomId]: {
          ...state.insights[roomId],
          [date]: {
            ...(state.insights[roomId][date]
              ? state.insights[roomId][date]
              : {}),
            fetchingState: "FAILED",
          },
        },
      },
    }));
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
  startUnix: -1,
  endUnix: -1, //finalEndTime,
  dataStartUnix: -1,
  dataEndUnix: -1,

  // periodData: [],
  today: today,
  forceScrollIndex: -1,
  postForceScroll: () => {
    set((state) => ({ ...state, forceScrollIndex: -1 }));
  },
  savePending: "NONE",
  inViewMonth: "",

  currentlySelected: today,
  currentlySelectedInMonth: today,
  toggleLoading: (newState: boolean) =>
    set((state) => ({ ...state, loading: newState })),
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
  toggleSelectedDate: (newValue: string) => {
    set((state) => {
      if (state.currentlySelected === newValue) {
        return state;
      } else {
        const monthNum = parseInt(newValue.split("-")[1]) - 1;
        const newMonthStr = monthMap[monthNum];

        return {
          ...state,
          currentlySelected: newValue,

          inViewMonth: newMonthStr,
          markedDates: {
            ...state.markedDates,

            // update currently selected
            [state.currentlySelected]: {
              ...(state.markedDates[state.currentlySelected]
                ? state.markedDates[state.currentlySelected]
                : {}),
              // color: "",
              selected: false,
            },
            [newValue]: {
              ...(state.markedDates[newValue]
                ? state.markedDates[newValue]
                : {}),
              selected: true,
            },
          },
        };
      }
    });

    weEventTrack("period_clickHorizontalDate", {});
  },

  logPeriod: (newValue: string) =>
    set((state) => logPeriodFuncV2(state, newValue)),

  onChangeSavePending: (newValue: saveStatesForPeriod) => {
    set((state) => ({ ...state, savePending: newValue }));
  },
  onViewMonthChange: (monthSt: string) => {
    const viewing = monthMap[parseInt(monthSt) - 1];

    const currentMonth = get().inViewMonth;

    if (currentMonth !== viewing)
      set((state) => ({
        ...state,
        inViewMonth: viewing,
      }));
  },
  onToggleDayLoading: (newVal: boolean) => {
    set((state) => ({ ...state, dayLoading: newVal }));
  },

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
  onExtendMonths: (count: number) => {
    const state = get();
    const previousMonths = state.editMonths;

    if (previousMonths.length) {
      const dt = previousMonths[previousMonths.length - 1].monthStartUnix;

      const newMonthsArray = getPreviousMonthsFromString(dt, count);
      const firstMonthObj = newMonthsArray[newMonthsArray.length - 1];

      if (firstMonthObj) {
        return set({
          ...state,
          editMonths: [...state.editMonths, ...newMonthsArray],
          ...(state.dataStartUnix < firstMonthObj.monthStartUnix
            ? { dataStartUnix: firstMonthObj.monthStartUnix }
            : {}),
        });
      }
    }
  },

  onRefreshSymptoms: async (newDate: string) => {
    const state = get();

    const periodDate = await getPeriodDate(state.uid, newDate);

    if (periodDate) {
      set((state) => ({
        ...state,
        periodDateObjStore: {
          ...state.periodDateObjStore,
          [periodDate?.date]: periodDate,
        },
        insights: {
          ...state.insights,
          DIET: {
            ...state.insights.DIET,
            [newDate]: {
              ...state.insights.DIET[newDate],
              fetchingState: "REFETCH",
            },
          },
          YOGA: {
            ...state.insights.YOGA,
            [newDate]: {
              ...state.insights.YOGA[newDate],
              fetchingState: "REFETCH",
            },
          },
        },
      }));
    }
  },

  onMonthView: async (uid: string, todayUnix: number) => {
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
        uid,
        months: months,

        initialMonthScrollIndex: todayIndex,
        ...(state.dataStartUnix > monthStart
          ? { dataStartUnix: monthStart }
          : {}),
        ...(state.dataEndUnix < monthEnd ? { dataEndUnix: monthEnd } : {}),
      });
    }
  },
  prepolulatePeriodDates: async () => {
    const state = get();

    const { periodDates, lastMarkedPeriodDate } = await getAllPeriodDates(
      state.uid
    );

    return set((state) => ({
      ...state,
      selectedState: periodDates,
      selectedPeriodState: periodDates,
      lastMarkedPeriodDate,
    }));
  },
  onMonthEditView: (uid: string, todayUnix: number) => {
    const state = get();

    const months = getCalendarMonths(todayUnix);

    if (months.length) {
      const monthEnd = months[0].monthEndUnix;
      const monthStart = months[months.length - 1].monthStartUnix;

      return set({
        ...state,
        uid,
        editMonths: months,

        ...(state.dataStartUnix > monthStart
          ? { dataStartUnix: monthStart }
          : {}),
        ...(state.dataEndUnix < monthEnd ? { dataEndUnix: monthEnd } : {}),

        // for month view
        // markedDates: {
        //   ...state.markedDates,
        //   ...markedDatesInRange,
        // },
      });
    }
  },

  onSave: async () => {
    const state = get();

    return set({
      ...state,
      loading: false,
      forceScrollIndex: state.initialScrollIndex,
      savePending: "NONE",
      ...(state.cyclesArray.length === 0
        ? { refreshCycles: state.refreshCycles + 1 }
        : {}),
      insights: { DIET: {}, YOGA: {} },
      periodDateObjStore: {},
      // clear saved history
      // periodDateObjStore: {},
      // periodDateObjStore: objMap,
    });
  },

  // initialise data
  initData: async (uid: string, todayUnix: number) => {
    const state = get();

    // const en = Date.now();
    const todayDateObj = new Date(todayUnix);

    const todayDay = todayDateObj.getDay();

    const daysToMondayFromDayStart = todayDay > 0 ? todayDay - 1 : 6;

    const weekMondayTime = todayUnix - daysToMondayFromDayStart * dayMS;
    const daysFromWeekStart = daysToMondayFromDayStart + defaultWeeks * 7;

    const st = todayUnix - daysFromWeekStart * dayMS;
    const finalEndTime = weekMondayTime + defaultWeeks * 7 * dayMS - dayMS;

    const { calenderDates, selectedIndex } = handleCalendarDates(
      st,
      finalEndTime,
      format(todayUnix, "yyyy-MM-dd")
    );

    const monthString = format(todayDateObj, "MMM");
    // const periodMap = await getObjMap(uid, st, finalEndTime);

    set({
      ...state,
      loading: false,
      horizontalDateList: calenderDates,
      inViewMonth: monthString,
      uid: uid,
      startUnix: st,
      endUnix: finalEndTime,
      dataStartUnix: st,
      dataEndUnix: finalEndTime,
      initialScrollIndex: selectedIndex, // response.selectedIndex,
      periodDateObjStore: {
        ...state.periodDateObjStore,
        // ...periodMap,
      },
    });
  },
  onNextWeek: () => {
    const state = get();
    const { calenderDates, en } = handleDurationExtendV2(state, "future", 1);

    set({
      ...state,
      endUnix: en,
      ...(state.endUnix < en ? { dataEndUnix: en } : {}),
      horizontalDateList: [...state.horizontalDateList, ...calenderDates],
      // datesLoading: true,
    });
  },

  onNextWeekData: async () => {
    const state = get();

    const { genNeeded, nextStart } = needsCycleGen(
      state.dataEndUnix,
      state.cyclesArray
    );

    // gen new cycle
    if (genNeeded && nextStart) {
      await generateNewCycle(state.uid);
    }
  },

  onPreviousWeek: async () => {
    const state = get();

    const { calenderDates, st } = handleDurationExtendV2(state, "past", 1);

    set({
      ...state,
      dayLoading: false,
      // datesLoading: true,
      startUnix: st,
      ...(state.dataStartUnix > st ? { dataStartUnix: st } : {}),
      horizontalDateList: [...calenderDates, ...state.horizontalDateList],
    });
  },
}));
