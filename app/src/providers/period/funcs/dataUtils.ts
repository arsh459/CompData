import { Cycle, PeriodDateObj, periodDateType } from "@models/User/User";
import {
  CalendarDate,
  ZPeriodState,
  dayMS,
  saveStatesForPeriod,
} from "../periodStore";
import firestore from "@react-native-firebase/firestore";
import {
  addDays,
  format,
  isFuture,
} from "date-fns";
import { BACKEND_URL } from "react-native-dotenv";
import axios from "axios";

export const logPeriodFunc = (state: ZPeriodState, newValue: string) => {
  const previousValue =
    state.markedDates[newValue] &&
    (state.markedDates[newValue].color as periodDateType | undefined);

  let newState: periodDateType = "PERIOD";
  if (previousValue && previousValue === "PERIOD") {
    newState = "UNKNOWN";
  }

  if (newValue) {
    return {
      ...state,
      savePending: "READY" as saveStatesForPeriod,
      markedDates: {
        ...state.markedDates,
        [newValue]: {
          ...(state.markedDates[newValue] ? state.markedDates[newValue] : {}),
          color: newState,
        },
      },
    };
  } else {
    return state;
  }
};

export const logPeriodFuncV2 = (
  state: ZPeriodState,
  newValue: string
): ZPeriodState => {
  if (newValue) {
    const targetDate = new Date(newValue);

    const selectedStateRemote: { [date: string]: periodDateType } = {
      ...state.selectedState,
    };
    const remoteSelectedPeriodState: { [date: string]: periodDateType } = {
      ...state.selectedPeriodState,
    };

    if (shouldMarkMultiple(selectedStateRemote, targetDate)) {
      for (let i = 0; i < 5; i++) {
        const newTargetDate = addDays(targetDate, i);

        if (!isFuture(newTargetDate)) {
          const targetValue = format(newTargetDate, "yyyy-MM-dd");

          logPeriodFuncHelper(
            state,
            targetValue,
            selectedStateRemote,
            remoteSelectedPeriodState
          );
        }
      }
    } else {
      logPeriodFuncHelper(
        state,
        newValue,
        selectedStateRemote,
        remoteSelectedPeriodState
      );
    }

    return {
      ...state,
      savePending: "READY" as saveStatesForPeriod,
      selectedState: selectedStateRemote,
      selectedPeriodState: remoteSelectedPeriodState,
    };
  } else {
    return state;
  }
};

export const getPeriodDate = async (uid: string, date: string) => {
  const docs = await firestore()
    .collection("users")
    .doc(uid)
    .collection("periodDates")
    .where("date", "==", date)
    .get();

  if (docs.docs.length) {
    return docs.docs[0].data() as PeriodDateObj;
  }
};

export const getAllPeriodDates = async (uid: string) => {
  const docs = await firestore()
    .collection("users")
    .doc(uid)
    .collection("periodDates")
    .where("type", "==", "PERIOD")
    .orderBy("unix", "desc")
    .get();

  let lastMarkedPeriodDate: number | undefined = undefined;
  const periodDates: { [date: string]: periodDateType } = {};
  for (const doc of docs.docs) {
    const rPeriodDateObj = doc.data() as PeriodDateObj;
    periodDates[rPeriodDateObj.date] = "PERIOD";
    if (!lastMarkedPeriodDate) {
      lastMarkedPeriodDate = rPeriodDateObj.unix;
    }
  }

  return { periodDates, lastMarkedPeriodDate };
};

export const getMatchPeriodGroupedArray = (
  groupedDates: string[][],
  searchArray: string[]
) => {
  for (let subArray of groupedDates) {
    if (searchArray.every((item) => subArray.includes(item))) {
      return subArray;
    }
  }
  return false;
};

// export const areDatesConsecutive = (date1: Date, date2: Date) => {
//   return differenceInCalendarDays(date1, date2) === 1;
// };

// export const groupConsecutivePeriodDates = async (periodDates: {
//   [date: string]: periodDateType;
// }) => {
//   // takes already sorted dates by orderBy firebase query
//   const sortedDates = Object.keys(periodDates);

//   const grouped: string[][] = [];
//   let currentGroup: string[] = [];

//   for (let i = 1; i < sortedDates.length; i++) {
//     const prevDate = new Date(currentGroup[currentGroup.length - 1]);
//     const currentDate = new Date(sortedDates[i]);

//     if (areDatesConsecutive(prevDate, currentDate)) {
//       currentGroup.push(sortedDates[i]);
//     } else {
//       grouped.push(currentGroup);
//       currentGroup = [sortedDates[i]];
//     }
//   }

//   // Push the last group
//   if (currentGroup.length) {
//     grouped.push(currentGroup);
//   }

//   return grouped;
// };

export const getPeriodDates = async (
  uid: string,
  start: number,
  end: number
) => {
  const docs = await firestore()
    .collection("users")
    .doc(uid)
    .collection("periodDates")
    .where("type", "==", "PERIOD")
    .where("unix", ">=", start)
    .where("unix", "<=", end)
    .get();

  const periodDates: { [date: string]: PeriodDateObj } = {};
  for (const doc of docs.docs) {
    const rPeriodDateObj = doc.data() as PeriodDateObj;
    periodDates[rPeriodDateObj.date] = rPeriodDateObj;
  }

  return periodDates;
};

export const getObjMap = async (uid: string, start: number, end: number) => {
  const docs = await firestore()
    .collection("users")
    .doc(uid)
    .collection("periodDates")
    .where("unix", ">=", start)
    .where("unix", "<=", end)
    .get();

  const periodDates: { [date: string]: PeriodDateObj } = {};
  for (const doc of docs.docs) {
    const rPeriodDateObj = doc.data() as PeriodDateObj;
    periodDates[rPeriodDateObj.date] = rPeriodDateObj;
  }

  return periodDates;
};

const getListToShow = (
  days: number,
  startUnix: number,
  today: string,
  periodDates: { [date: string]: PeriodDateObj }
) => {
  let selectedIndex: number = 0;
  let weekNumber: number = 0;
  const periodDateObjsLocal: PeriodDateObj[] = [];

  for (let i: number = 0; i <= days; i++) {
    const dayTime = startUnix + i * dayMS;

    const date = format(new Date(dayTime), "yyyy-MM-dd");

    weekNumber = Math.floor(i / 7);

    if (date === today) {
      selectedIndex = weekNumber * 7;
    }

    if (periodDates[date]) {
      periodDateObjsLocal.push(periodDates[date]);
    } else {
      const newPeriodDateObj: PeriodDateObj = {
        id: date,
        date,
        type: "UNKNOWN",
        unix: dayTime,
        cycleId: "",
      };
      periodDateObjsLocal.push(newPeriodDateObj);
    }
  }

  return {
    selectedIndex,
    periodDateObjsLocal,
  };
};

export const handleCalendarDates = (st: number, en: number, today?: string) => {
  const days = Math.floor((en - st) / dayMS);

  let weekNumber: number = 0;
  let selectedIndex: number = 0;
  const calenderDates: CalendarDate[] = [];
  for (let i: number = 0; i <= days; i++) {
    const selectedUnix = st + i * dayMS;
    const dateObj = new Date(selectedUnix);
    const formattedDate = format(dateObj, "yyyy-MM-dd");

    weekNumber = Math.floor(i / 7);

    if (formattedDate === today) {
      selectedIndex = weekNumber * 7;
    }

    calenderDates.push({
      currentDate: formattedDate,
      day: format(dateObj, "eee"),
      visibleDate: formattedDate.split("-")[2],
      unix: selectedUnix,
    });
  }

  return { calenderDates: calenderDates, selectedIndex };
};

export const initialiseData = async (
  st: number,
  en: number,
  uid: string,
  today: string
) => {
  // get period dates
  const periodDates = await getObjMap(uid, st, en);

  const days = Math.floor((en - st) / dayMS);

  const { selectedIndex, periodDateObjsLocal } = getListToShow(
    days,
    st,
    today,
    periodDates
  );

  return {
    uid,
    selectedIndex,
    periodDateObjsLocal,
    periodDates,
  };
};

export const handleDurationExtend = async (
  state: ZPeriodState,
  type: "future" | "past",
  numWeeks: number
) => {
  let st: number = state.endUnix + dayMS;
  let en: number = state.endUnix + 7 * dayMS;
  if (type === "past") {
    st = state.startUnix - numWeeks * 7 * dayMS;
    en = state.startUnix - dayMS;
  }

  const nextObjMap = await getObjMap(state.uid, st, en);

  const days = Math.ceil((en - st) / dayMS);

  const { periodDateObjsLocal } = getListToShow(
    days,
    st,
    state.today,
    nextObjMap
  );

  return {
    nextObjMap,
    periodDateObjsLocal,
    st,
    en,
  };
};

export const needsCycleGen = (weekEnd: number, cycles?: Cycle[]) => {
  if (cycles?.length) {
    const lastCycle = cycles[0];

    if (lastCycle.endUnix > weekEnd) {
      return { genNeeded: false };
    }

    return { genNeeded: true, nextStart: lastCycle.endUnix };
  }

  return {
    genNeeded: false,
  };
};

export const handleDurationExtendV2 = (
  state: ZPeriodState,
  type: "future" | "past",
  numWeeks: number
) => {
  let st: number = state.endUnix + dayMS;
  let en: number = state.endUnix + 7 * dayMS;
  if (type === "past") {
    st = state.startUnix - numWeeks * 7 * dayMS;
    en = state.startUnix - dayMS;
  }

  const { calenderDates } = handleCalendarDates(st, en);

  // const nextObjMap = await getObjMap(state.uid, st, en);

  // const days = Math.ceil((en - st) / dayMS);

  return { calenderDates: calenderDates, st, en };
};

export const generateNewCycle = async (uid: string) => {
  await axios({
    url: `${BACKEND_URL}/getNextCycle`,
    method: "POST",
    data: {
      uid,
    },
    params: {
      uid,
    },
  });
};

const logPeriodFuncHelper = (
  state: ZPeriodState,
  targetDate: string,
  selectedStateRemote: { [date: string]: periodDateType },
  selectedPeriodStateRemote: { [date: string]: periodDateType }
) => {
  const previousValue =
    state.selectedState[targetDate] && state.selectedState[targetDate];

  let newState: periodDateType = "PERIOD";
  if (previousValue && previousValue === "PERIOD") {
    newState = "UNKNOWN";
  }

  selectedStateRemote[targetDate] = newState;
  if (newState === "PERIOD") {
    selectedPeriodStateRemote[targetDate] = "PERIOD";
  } else {
    delete selectedPeriodStateRemote[targetDate];
  }
};

const shouldMarkMultiple = (
  selectedState: { [date: string]: periodDateType },
  targetDate: Date
): boolean => {
  const trgetBufferinDays = 15;
  const startUnixToLook = addDays(targetDate, -trgetBufferinDays).getTime();
  const endUnixToLook = addDays(targetDate, trgetBufferinDays).getTime();

  const temp = Object.keys(selectedState)
    .sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);

      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    })
    .find((item) => {
      const dateUnix = new Date(item).getTime();
      return (
        dateUnix >= startUnixToLook &&
        dateUnix <= endUnixToLook &&
        selectedState[item] === "PERIOD"
      );
    });

  return temp ? false : true;
};
