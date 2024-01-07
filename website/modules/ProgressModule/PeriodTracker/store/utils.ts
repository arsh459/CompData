import { Cycle, PeriodDateObj, periodDateType } from "@models/User/User";
import { CalendarDate, ZPeriodState, saveStatesForPeriod } from "./interface";
import { addDays, format, isFuture } from "date-fns";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@config/firebase";
import axios from "axios";

export const formatedDate = (date?: Date) => {
  return date ? format(date, "yyyy-MM-dd") : undefined;
};

export const getCalenderDate = (date: Date): CalendarDate => {
  return {
    currentDate: format(date, "yyyy-MM-dd"),
    day: format(date, "eee"),
    visibleDate: format(date, "d"),
    unix: date.getTime(),
  };
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

export const getMainBackgroundColorCalendar = (
  type: periodDateType,
  color: string
): { backgroundColor: string; borderColor: string; textColor: string } => {
  if (type === "OVULATION") {
    return {
      backgroundColor: "#3AFFB8",
      borderColor: "transparent",
      textColor: "#232136",
    };
  }

  if (type === "PERIOD") {
    return {
      backgroundColor: "#FF6069",
      borderColor: "transparent",
      textColor: "#FFFFFF",
    };
  }

  if (type === "ESTIMATED_PERIOD") {
    return {
      backgroundColor: "transparent",
      borderColor: "#FF6069",
      textColor: "#FF6069",
    };
  }

  return {
    borderColor: "transparent",
    backgroundColor: "transparent",
    textColor: color || "#FFFFFF",
  };
};

export const getBottomBackgroundColor = (
  type: periodDateType,
  symptom: boolean
): { backgroundColor: string; borderColor: string } => {
  if (type === "PERIOD" && symptom) {
    return {
      backgroundColor: "#3ACFFF",
      borderColor: "#FFFFFF",
    };
  }

  if (type === "ESTIMATED_PERIOD" && symptom) {
    return {
      borderColor: "#3ACFFF",
      backgroundColor: "transparent",
    };
  }
  if (
    (type === "UNKNOWN" || type === "FOLLICULAR" || type === "LUTEAL") &&
    symptom
  ) {
    return {
      borderColor: "transparent",
      backgroundColor: "#3ACFFF",
    };
  }
  return {
    borderColor: "transparent",
    backgroundColor: "transparent",
  };
};

export const getAllPeriodDates = async (uid: string) => {
  const docs = await getDocs(
    query(
      collection(doc(db, "users", uid), "periodDates"),
      where("type", "==", "PERIOD"),
      orderBy("unix", "desc")
    )
  );

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

export const savePeriodInRemote = async (
  uid: string,
  periodDates: string[]
) => {
  try {
    await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/periodTracker`,
      // url: `https://asia-south1-vocal-pad-262908.cloudfunctions.net/periodTracker`,
      method: "POST",
      data: {
        uid,
        newPeriodDates: periodDates,
        // noUpdate: true,
      },
      params: {
        uid,
        newPeriodDates: periodDates,
        // noUpdate: true,
      },
    });
  } catch (error) {
    console.log("periodTracker API", error);
  }
};

export const getCurrentCycle = (cycles: Cycle[], todayUnix: number) => {
  const remoteCycles = cycles.filter((item) => {
    const predictedCycle = item.startUnix > todayUnix;
    const currentCycle =
      todayUnix >= item.startUnix && todayUnix <= item.endUnix;

    if (!predictedCycle && currentCycle) {
      return item;
    }
  });

  return remoteCycles.length ? remoteCycles[0] : undefined;
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

export const getSavedPeriod = (selectedDates: {
  [date: string]: periodDateType;
}): string[] => {
  const savedPeriods: string[] = [];

  Object.keys(selectedDates).map((item) => {
    if (selectedDates[item] === "PERIOD") {
      savedPeriods.push(item);
    }
  });

  return savedPeriods;
};

export const getPeriodAndCycleLength = (
  cycles: Cycle[],
  todayUnix: number
): { periodLength?: number; cycleLength?: number } => {
  let periodLength: number | undefined = undefined;
  let cycleLength: number | undefined = undefined;

  const lastCompletedCycle = cycles
    .sort((a, b) => {
      const dateA = new Date(a.endUnix);
      const dateB = new Date(b.endUnix);

      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    })
    .find((cycle) => cycle.startUnix < todayUnix && cycle.endUnix < todayUnix);

  if (lastCompletedCycle) {
    cycleLength = lastCompletedCycle.length;
    periodLength = lastCompletedCycle.phaseSplits.PERIOD.length;
  }

  return { periodLength, cycleLength };
};
