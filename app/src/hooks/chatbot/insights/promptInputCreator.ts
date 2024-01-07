import { Cycle, PeriodDateObj } from "@models/User/User";
import { promptGeneratorInterface } from "./mainHandler";
import { DEFAULT_CYCLE_LENGTH, DEFAULT_PERIOD_LENGTH } from "./constants";

export const promptInputCreator = (
  currentUnix: number,
  //   selectedUnix: number,
  periodDateObj: PeriodDateObj,
  cycles: { [id: string]: Cycle },
  cyclesArray: Cycle[],
  inputCycleLength: number = DEFAULT_CYCLE_LENGTH,
  inputPeriodLength: number = DEFAULT_PERIOD_LENGTH
): promptGeneratorInterface | undefined => {
  const cycleId = periodDateObj.cycleId;

  const currentCycle = getCurrentCycle(cycles, cycleId);

  if (currentCycle) {
    const { lastCycleLength } = getLastCycleLength(
      cycleId,
      inputCycleLength,
      cyclesArray
    );

    const { predictedCycleLength, predictedPeriodLength } = getPredictedLengths(
      // cyclesArray,
      inputPeriodLength,
      inputCycleLength,
      currentCycle
    );

    return {
      selectedUnix: periodDateObj.unix,
      currentUnix,
      type: periodDateObj.type,
      phaseLength: periodDateObj.phaseLength,
      phaseDay: periodDateObj.phaseDay,
      symptoms: periodDateObj.loggedSymptoms
        ? periodDateObj.loggedSymptoms
        : {},
      currentCycleLength: currentCycle.length,
      actualPeriodLength: currentCycle.phaseSplits.PERIOD.length,
      lastCycleLength,
      predictedCycleLength,
      predictedPeriodLength,
      dayNumber: periodDateObj.dayNumber ? periodDateObj.dayNumber : 0,
    };
  }
};

const getLastCycleLength = (
  cycleId: string,
  inputCycleLength: number,
  cyclesArray: Cycle[]
) => {
  let lastCycleLength: number = inputCycleLength;
  let lastCycleIndex: number = -1;
  for (let i: number = 0; i < cyclesArray.length; i++) {
    if (cyclesArray[i].id === cycleId) {
      lastCycleIndex = i + 1;
      break;
    }
  }

  if (lastCycleIndex >= 0 && lastCycleIndex < cyclesArray.length) {
    lastCycleLength = cyclesArray[lastCycleIndex].length;

    return { lastCycleLength, lastCycle: cyclesArray[lastCycleIndex] };
  }

  return { lastCycleLength };
};

const getCurrentCycle = (
  cycles: { [cycleId: string]: Cycle },
  cycleId: string
): Cycle | undefined => {
  //   const cycleId = periodDateObj.cycleId;

  return cycles[cycleId];
};

const getPredictedLengths = (
  inputPeriodLength: number,
  inputCycleLength: number,
  activeCycle: Cycle
) => {
  let predictedPeriodLength: number = inputPeriodLength;
  let predictedCycleLength: number = inputCycleLength;
  if (activeCycle) {
    predictedCycleLength = activeCycle.length;
    predictedPeriodLength =
      activeCycle.phaseSplits.PERIOD.length +
      activeCycle.phaseSplits.ESTIMATED_PERIOD.length;
  }

  return {
    predictedPeriodLength,
    predictedCycleLength,
  };
};
