import { periodDateType } from "@models/User/User";
import {
  getPhaseString,
  noRepeatYogaString,
  symptomEaseString,
} from "./prompts";

export const createLongerPeriodYogaPrompt = (days: number) => {
  // return `Missed Period. ${generalString}`;
  return `Had a ${days} period. Suggest asanas to counter fatigue & weakness. ${noRepeatYogaString}`;
};

export const createMenstrualCyclePhaseYogaPrompt = (
  type: periodDateType,
  cycleState: "long" | "short" | "regular"
) => {
  if (cycleState === "regular") {
    return `${getPhaseString(type)} Phase. ${phaseRemedyYogaString(
      type
    )}. ${noRepeatYogaString}`;
  } else {
    return `${getPhaseString(type)} Phase. ${getCycleStateYogaString(
      cycleState
    )}. ${noRepeatYogaString}`;
  }
};

const getCycleStateYogaString = (cycleState: "long" | "short") => {
  if (cycleState === "long") {
    return `Cycle is longer than usual. Suggest Yin Yoga Asanas that can regularise the cycle`;
  } else {
    return `Cycle is shorter than usual. Suggest Yin Yoga Asanas that can regularise the cycle`;
  }
};

const phaseRemedyYogaString = (type: periodDateType) => {
  if (type === "FOLLICULAR") {
    return `Suggest active and invigorating yoga practices`;
  } else if (type === "OVULATION") {
    return `Suggest asanas for peak energy phase`;
  } else if (type === "LUTEAL") {
    return `Suggest asanas that can help reduce symptoms of PMS`;
  } else if (type === "PERIOD" || type === "ESTIMATED_PERIOD") {
    return `Have cramps and body ache. ${symptomEaseString}`;
  }

  return "";
};
