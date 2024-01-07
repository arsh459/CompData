import {
  Cycle,
  MenstrualPhaseDays,
  PeriodDateObj,
  periodPrompts,
} from "@models/User/User";
import { dayMS } from "@providers/period/periodStore";
import firestore from "@react-native-firebase/firestore";

export const checkIfUserCanBeAsked = (
  cycle: Cycle,
  //   todayPeriodObj: PeriodDateObj,
  today: string
) => {
  if (cycle.lastPromptAsked && cycle.promptStatus) {
    const lastAsked = cycle.promptStatus[cycle.lastPromptAsked];
    return canWeAskUser(lastAsked, today, cycle.lastPromptAsked);
  } else {
    return true;
  }

  //   if (cycle.promptStatus && cycle.promptStatus["didYouGetPeriod"]) {
  //     const lastAsked = cycle.promptStatus["didYouGetPeriod"];

  //     const askFlag = canWeAskUser(lastAsked, today, "didYouGetPeriod");
  //     if (askFlag) {
  //     }
  //   } else {
  //   }
};

const canWeAskUser = (
  lastAsked: number,
  today: string,
  lastPrompt: periodPrompts
) => {
  const cooloff = getCooloffPeriod(lastPrompt);

  const lastDate = new Date(lastAsked);
  const todayDate = new Date(today);
  const diff = Math.round((todayDate.getTime() - lastDate.getTime()) / dayMS);

  if (diff >= cooloff) {
    return true;
  }

  return false;
};

const getCooloffPeriod = (lastPrompt: periodPrompts): number => {
  return 1;
};

export const isFollicularFirstDay = (
  phaseSplits: MenstrualPhaseDays,
  dayNumber: number
) => {
  const isFirstFollicular =
    phaseSplits.FOLLICULAR.length && phaseSplits.FOLLICULAR[0] === dayNumber;

  return isFirstFollicular;
};

export const isPreOvulation = (
  phaseSplits: MenstrualPhaseDays,
  dayNumber: number
) => {
  const preOvulation =
    phaseSplits.FOLLICULAR.length &&
    phaseSplits.FOLLICULAR[phaseSplits.FOLLICULAR.length - 1] === dayNumber;

  return preOvulation;
};

export const isFollicularPhase = (
  phaseSplits: MenstrualPhaseDays,
  dayNumber: number
) => {
  return phaseSplits.FOLLICULAR.includes(dayNumber);
};

export const symptomsWereLoggedYesterday = (
  yesterdayPeriod?: PeriodDateObj
) => {
  if (
    yesterdayPeriod?.loggedSymptoms &&
    Object.keys(yesterdayPeriod.loggedSymptoms).length
  ) {
    return true;
  }

  return false;
};

export const isFirstLutealDay = (
  phaseSplits: MenstrualPhaseDays,
  dayNumber: number
) => {
  const isFirstLuteal =
    phaseSplits.LUTEAL.length && phaseSplits.LUTEAL[0] === dayNumber;

  return isFirstLuteal;
};

export const onAnswerQuestion = async (
  uid: string,
  cycleId: string,
  questionAsked: periodPrompts,
  today: string
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .collection("cycles")
    .doc(cycleId)
    .update({
      [`promptStatus.${questionAsked}`]: today,
      lastPromptAsked: questionAsked,
    });
};
