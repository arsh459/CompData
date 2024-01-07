import { Cycle, periodPrompts } from "../../../../models/User/User";
import { getHeavyFlow } from "../../../../models/User/getSymptoms";
import { symptomId } from "../../../../models/User/symptoms";
import { MenstrualPhaseDays } from "../utils";

// export const hasMarkedSymptoms = (currentCycle: Cycle) => {
//   if (
//     currentCycle.cycleSymptoms &&
//     currentCycle.cycleSymptoms.length &&
//     currentCycle.cycleSymptoms[currentCycle.cycleSymptoms.length - 1].status ===
//       "MARKED"
//   ) {
//     return true;
//   }

//   return false;
// };

export const canAskGoodMood = (currentCycle: Cycle) => {
  if (currentCycle.promptStatus && currentCycle.promptStatus.highEnergy) {
    return false;
  }

  return true;
};

export const canAskPeriodEnd = (currentCycle: Cycle, dayNumber: number) => {
  const follicularArray = currentCycle.phaseSplits.FOLLICULAR;

  if (follicularArray.length && follicularArray[0] === dayNumber) {
    return true;
  }

  const previouslyAsked = isPreviouslyAsked(currentCycle, "didYourPeriodEnd");

  if (
    follicularArray.length &&
    (follicularArray[0] === dayNumber || follicularArray[1] === dayNumber) &&
    !previouslyAsked
  ) {
    return true;
  }

  return false;
};

export const isPreOvulation = (currentCycle: Cycle, dayNumber: number) => {
  const follicularArray = currentCycle.phaseSplits.FOLLICULAR;

  if (
    follicularArray.length &&
    follicularArray[follicularArray.length - 1] === dayNumber
  ) {
    return true;
  }

  const previouslyAsked = isPreviouslyAsked(
    currentCycle,
    "ovulation_white_discharge",
  );

  if (
    follicularArray.length &&
    (follicularArray[follicularArray.length - 1] === dayNumber ||
      follicularArray[follicularArray.length - 2] === dayNumber) &&
    !previouslyAsked
  ) {
    return true;
  }

  return false;
};

export const isPostOvulation = (currentCycle: Cycle, dayNumber: number) => {
  const lutealArray = currentCycle.phaseSplits.LUTEAL;

  if (lutealArray.length && lutealArray[0] === dayNumber) {
    console.log("POST OVULATION", lutealArray);
    return true;
  }

  const previouslyAsked = isPreviouslyAsked(currentCycle, "ovulation_spotting");

  console.log("previouslyAsked", previouslyAsked);

  if (
    lutealArray.length &&
    (lutealArray[0] === dayNumber || lutealArray[1] === dayNumber) &&
    !previouslyAsked
  ) {
    return true;
  }

  return false;
};

const isPreviouslyAsked = (currentCycle: Cycle, prompt: periodPrompts) => {
  const previouslyAsked =
    currentCycle.promptStatus && currentCycle.promptStatus[prompt];

  if (previouslyAsked) {
    return true;
  }

  return false;
};

export const canAskDischarge = (
  currentCycle: Cycle,
  noPrivateQuestions?: boolean,
) => {
  const previouslyAsked = isPreviouslyAsked(currentCycle, "didYourPeriodEnd");

  if (!previouslyAsked && !noPrivateQuestions) {
    return true;
  }

  return false;
};

const isLateLuteal = (
  phases: MenstrualPhaseDays,
  dayNumber: number,
  cutoff: number,
) => {
  const indexOfElement = phases.LUTEAL.indexOf(dayNumber);

  if (indexOfElement / phases.LUTEAL.length > cutoff) {
    return true;
  }

  return false;
};

export const getViableSymptom = (
  symptomIds: symptomId[],
  currentCycle: Cycle,
) => {
  for (const symptId of symptomIds) {
    const previouslyAsked = isPreviouslyAsked(currentCycle, symptId);

    if (!previouslyAsked) {
      return symptId;
    }
  }

  return undefined;
};

export const canAskHeadacheQuestion = (
  currentCycle: Cycle,
  dayNumber: number,
) => {
  const lateLuteal = isLateLuteal(currentCycle.phaseSplits, dayNumber, 0.5);

  const previouslyAsked = isPreviouslyAsked(currentCycle, "headache");

  if (lateLuteal && !previouslyAsked) {
    return true;
  }

  return false;
};

// export const canAskAnxietyQuestion = (
//   currentCycle: Cycle,
//   dayNumber: number,
// ) => {
//   const lateLuteal = isLateLuteal(currentCycle.phaseSplits, dayNumber, 0.7);

//   const previouslyAsked = isPreviouslyAsked(currentCycle, '');

//   if (lateLuteal && !previouslyAsked) {
//     return true;
//   }

//   return false;
// };

export const canAskPMSQuestion = (currentCycle: Cycle, dayNumber: number) => {
  const lateLuteal = isLateLuteal(currentCycle.phaseSplits, dayNumber, 0.75);

  console.log("late luteal", lateLuteal);

  const previouslyAsked = isPreviouslyAsked(currentCycle, "pmsCheck");

  if (lateLuteal && !previouslyAsked) {
    return true;
  }

  return false;
};

export const isPrePeriod = (currentCycle: Cycle, dayNumber: number) => {
  const lateLuteal = isLateLuteal(currentCycle.phaseSplits, dayNumber, 0.75);

  if (lateLuteal) {
    return true;
  }

  return false;
};

export const userLoggedHeavyFlow = async (uid: string, currentCycle: Cycle) => {
  const wasHeavyFlow = await getHeavyFlow(uid, currentCycle.id);
  if (wasHeavyFlow) {
    return true;
  }

  return false;
};
