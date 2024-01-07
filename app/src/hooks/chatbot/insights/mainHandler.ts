import { LoggedSymptom, periodDateType } from "@models/User/User";
import {
  isEarlyPeriod,
  isLongerThanUsualCycle,
  isLongerThanUsualPeriod,
  isMissedPeriod,
  isShorterPeriod,
  isShorterThanUsualCycle,
} from "./checkUtils";
import {
  createEarlyPeriodPrompt,
  createLongerPeriodPrompt,
  createMissedPeriodPrompt,
  createShorterPeriodPrompt,
  createSymptomPrompt,
  createMenstrualCyclePhasePrompt,
} from "./prompts";
import {
  createEarlyPeriodInsight,
  createLongerPeriodInsight,
  createMissedPeriodInsight,
  createShorterPeriodInsight,
  createSymptomInsight,
  getPhaseInsightString,
} from "./insights";
import {
  createLongerPeriodYogaPrompt,
  createMenstrualCyclePhaseYogaPrompt,
} from "./yogaPrompts";

export interface promptGeneratorInterface {
  selectedUnix: number;
  currentUnix: number;
  type: periodDateType;
  phaseLength?: number;
  phaseDay?: number;
  symptoms: { [symptom: string]: LoggedSymptom };
  currentCycleLength: number;
  dayNumber: number;

  // save in cycle
  actualPeriodLength: number;

  // save in cycle
  lastCycleLength: number;

  // save in userInterface
  predictedPeriodLength: number;
  predictedCycleLength: number;
}

export const getNewPrompt = (
  input: promptGeneratorInterface
): {
  insight: string;
  prompt: string;
  yogaPrompt: string;
  insightPrompt: string;
} => {
  const {
    phaseDay,
    predictedPeriodLength,
    actualPeriodLength,
    selectedUnix,
    currentUnix,
    type,
    phaseLength,
    lastCycleLength,
    predictedCycleLength,
    currentCycleLength,
    symptoms,
    dayNumber,
  } = input;

  // if today
  if (selectedUnix === currentUnix) {
    if (isMissedPeriod(type)) {
      const { insight, insightPrompt } = createMissedPeriodInsight();
      return {
        insight: insight,
        insightPrompt,
        prompt: createMissedPeriodPrompt("DIET"),
        yogaPrompt: createMissedPeriodPrompt("YOGA"),
      };
    } else if (isEarlyPeriod(type, lastCycleLength, predictedCycleLength)) {
      const { insight, insightPrompt } = createEarlyPeriodInsight();
      return {
        insight: insight,
        insightPrompt,
        prompt: createEarlyPeriodPrompt("DIET"),
        yogaPrompt: createEarlyPeriodPrompt("YOGA"),
      };
    } else if (
      isLongerThanUsualPeriod(type, phaseLength, predictedPeriodLength)
    ) {
      const { insight, insightPrompt } = createLongerPeriodInsight();
      return {
        insight: insight,
        insightPrompt,
        prompt: createLongerPeriodPrompt(dayNumber + 1, "DIET"),
        yogaPrompt: createLongerPeriodYogaPrompt(dayNumber + 1),
      };
    } else if (
      isShorterPeriod(type, actualPeriodLength, phaseDay, predictedPeriodLength)
    ) {
      const { insight, insightPrompt } = createShorterPeriodInsight();
      return {
        insight: insight,
        insightPrompt,
        prompt: createShorterPeriodPrompt(dayNumber + 1, "DIET"),
        yogaPrompt: createShorterPeriodPrompt(dayNumber + 1, "YOGA"),
      };
    }
  }

  const symptomArray = Object.values(symptoms);
  // if there are more than 1 symptom
  if (symptomArray.length) {
    const { insight, insightPrompt } = createSymptomInsight(symptomArray, type);
    return {
      prompt: createSymptomPrompt(symptomArray, "DIET"),
      yogaPrompt: createSymptomPrompt(symptomArray, "YOGA"),
      insight: insight,
      insightPrompt,
    };
  }

  const cycleType = isLongerThanUsualCycle(
    predictedCycleLength,
    currentCycleLength
  )
    ? "long"
    : isShorterThanUsualCycle(predictedCycleLength, currentCycleLength)
    ? "short"
    : "regular";

  const { insight, insightPrompt } = getPhaseInsightString(
    type,
    typeof phaseDay === "number" ? phaseDay : 1
  );

  return {
    insight: insight,
    insightPrompt,
    prompt: createMenstrualCyclePhasePrompt(type, cycleType, "DIET"),
    yogaPrompt: createMenstrualCyclePhaseYogaPrompt(type, cycleType),
  };
};
