import { PeriodDateObj, periodDateType } from "@models/User/User";
import { format } from "date-fns";
import {
  estPeriodComps,
  estPeriodCompsFuture,
  follicularDateComps,
  futureDateComps,
  lutealDateComps,
  ovulationComps,
  ovulationCompsFuture,
  periodComps,
} from "./constants";

export type cycleStateType = "FUTURE" | "PAST" | "CURRENT" | "UNKNOWN";

const getCycleType = (
  todayUnix: number,
  cycleStart?: number,
  cycleEnd?: number
): cycleStateType => {
  if (!cycleStart || !cycleEnd) {
    return "UNKNOWN";
  }

  if (todayUnix >= cycleStart && todayUnix <= cycleEnd) {
    return "CURRENT";
  }

  if (cycleStart > todayUnix) {
    return "FUTURE";
  }

  return "PAST";
};

const getNextPhaseIn = (currentObj?: PeriodDateObj) => {
  if (
    typeof currentObj?.phaseLength === "number" &&
    typeof currentObj.phaseDay === "number"
  ) {
    return currentObj.phaseLength - currentObj.phaseDay;
  }

  return currentObj?.dayNumber;
};

const getCycleLabels = (
  cycleType: cycleStateType,
  currentObj?: PeriodDateObj,
  isFuture?: boolean,
  cyclesPresent?: boolean
): {
  label: string;
  mainText: string;
  cta?: string;

  insightTextColor?: string;
  insightBgColor?: string;
  ctaColor?: string;
  ctaTextColor?: string;
  date?: string;
} => {
  if (currentObj?.type === "PERIOD") {
    return {
      label: "Period",
      mainText:
        typeof currentObj.dayNumber === "number"
          ? `Day ${currentObj.dayNumber + 1}`
          : "",
      ...periodComps,

      date: format(new Date(currentObj.unix), "do MMM"),
    };
  } else if (currentObj?.type === "ESTIMATED_PERIOD") {
    return {
      label: "Expected Period",
      mainText:
        typeof currentObj.dayNumber === "number"
          ? `Day ${currentObj.dayNumber + 1}`
          : "",
      ...(isFuture ? estPeriodCompsFuture : estPeriodComps),
      date: format(new Date(currentObj.unix), "do MMM"),
    };
  } else if (currentObj?.type === "OVULATION") {
    return {
      label: isFuture ? "Prediction:" : "Today is",
      mainText: "ovulation day",
      ...(isFuture ? ovulationCompsFuture : ovulationComps),
      date: format(new Date(currentObj.unix), "do MMM"),
    };
  } else if (currentObj?.type === "FOLLICULAR") {
    const nextPhaseDays = getNextPhaseIn(currentObj);
    return {
      label: `${
        cycleType === "PAST"
          ? "Past: "
          : cycleType === "FUTURE"
          ? "Future: "
          : ""
      }Ovulation in`,
      mainText: `${nextPhaseDays} Day${
        nextPhaseDays && nextPhaseDays > 1 ? "s" : ""
      }`,
      ...(isFuture ? futureDateComps : follicularDateComps),
      date: format(new Date(currentObj.unix), "do MMM"),
    };
  } else if (currentObj?.type === "LUTEAL") {
    const nextPhaseDays = getNextPhaseIn(currentObj);
    return {
      label: `${
        cycleType === "PAST"
          ? "Past: "
          : cycleType === "FUTURE"
          ? "Future: "
          : ""
      }Period in`,
      mainText: `${nextPhaseDays} Day${
        nextPhaseDays && nextPhaseDays > 1 ? "s" : ""
      }`,
      ...(isFuture ? futureDateComps : lutealDateComps),
      date: format(new Date(currentObj.unix), "do MMM"),
    };
  }

  if (cyclesPresent) {
    return {
      label: "Change date above",
      mainText: "No data",
      ...follicularDateComps,
      // date: format(new Date(currentObj.unix), "do MMM"),
    };
  }

  return {
    label: "Loading...",
    mainText: "",
    ...follicularDateComps,
    // date: format(new Date(currentObj.unix), "do MMM"),
  };
};

export const getCircleData = (
  todayUnix: number,
  currentObj?: PeriodDateObj,
  isFuture?: boolean,
  cycleSt?: number,
  cycleEn?: number,
  cyclesPresent?: boolean
): {
  topText?: string;
  dayText?: string;
  // insight: string;
  cta?: string;
  ctaColor?: string;
  date?: string;
  insightTextColor?: string;
  insightBgColor?: string;
  ctaTextColor?: string;
} => {
  const cycleState = getCycleType(todayUnix, cycleSt, cycleEn);

  const {
    label,
    mainText,
    cta,
    ctaColor,
    ctaTextColor,
    insightBgColor,
    insightTextColor,
    date,
  } = getCycleLabels(cycleState, currentObj, isFuture, cyclesPresent);

  return {
    topText: label,
    dayText: mainText,
    cta,
    ctaColor,
    ctaTextColor,
    insightBgColor,
    insightTextColor,
    date,
  };
};

export const getCircleColor = (
  type?: periodDateType,
  future?: boolean
): {
  fillColor: string;
  fillColor2?: string;
  strokeColor: string;
  strokeWidth: number;
} => {
  if (type === "PERIOD") {
    return {
      fillColor: "#FF6069",
      strokeColor: "",
      strokeWidth: 0,
    };
  } else if (type === "ESTIMATED_PERIOD") {
    return {
      fillColor: "transparent",
      strokeColor: "#FF6069",
      strokeWidth: 10,
    };
  } else if (type === "OVULATION") {
    return {
      fillColor: "#20D29D",
      fillColor2: "#21B9CE",
      strokeColor: "",
      strokeWidth: 0,
    };
  } else if (future) {
    return {
      fillColor: "transparent",
      strokeColor: "#fff",
      strokeWidth: 10,
    };
  } else {
    return {
      fillColor: "#343150",
      strokeColor: "",
      strokeWidth: 0,
    };
  }
};

export const getMainBackgroundColorCalendar = (
  type: periodDateType,
  future: boolean
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
    textColor: "#FFFFFF",
  };
};

export const getMainBackgroundColor = (
  type: periodDateType,
  future: boolean
): { backgroundColor: string; borderColor: string } => {
  if (type === "OVULATION") {
    return {
      backgroundColor: "#3AFFB8",
      borderColor: "#FFFFFF",
    };
  }

  if (type === "PERIOD") {
    return {
      backgroundColor: "#FF6069",
      borderColor: "#FFFFFF",
    };
  }

  if (type === "ESTIMATED_PERIOD") {
    return {
      borderColor: "#FF6069",
      backgroundColor: "transparent",
    };
  }

  if (future) {
    return {
      backgroundColor: "transparent",
      borderColor: "#FFFFFF",
    };
  }

  if (type === "UNKNOWN" || type === "FOLLICULAR" || type === "LUTEAL") {
    return {
      borderColor: "transparent",
      backgroundColor: "#4D4974",
    };
  }
  return {
    borderColor: "transparent",
    backgroundColor: "transparent",
  };
};
export const getBottomBackgroundColor = (
  type: periodDateType,
  symptom: boolean
): { backgroundColor: string; borderColor: string } => {
  // if(!symptom){
  //   return {
  //   borderColor: "transparent",
  //   backgroundColor: "transparent",
  // };
  // }
  //   if (type === "OVULATION") {
  //     return {
  //       backgroundColor: "#3AFFB8",
  //       borderColor: "#FFFFFF",
  //     };
  //   }

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
