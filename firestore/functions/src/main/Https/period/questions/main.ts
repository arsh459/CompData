import {
  Cycle,
  PeriodDateObj,
  UserInterface,
} from "../../../../models/User/User";
import {
  createDidYouGetPeriodQuestion,
  createDidYouGetYourPeriodInPast,
  createPeriodEndQuestion,
  createSymptomReliefQuestion,
} from "./create/estimatedPeriod";
import { questionResponse } from "./interface";
import { fetchLastSavedPeriodDate } from "../../../../models/User/Methods";
import { format } from "date-fns";
import {
  canAskDischarge,
  canAskGoodMood,
  canAskPMSQuestion,
  canAskPeriodEnd,
  getViableSymptom,
  isPostOvulation,
  isPreOvulation,
  isPrePeriod,
} from "./checks";
import {
  createHighEnergyQuestion,
  createMildCrampQuestion,
} from "./create/follicular";
import { createMilkyWhiteDischargeQuestion } from "./create/ovulation";
import {
  createMildSpottingQuestion,
  createPMSApproachingQuestion,
  createSymptomToAskQuestion,
} from "./create/luteal";
import {
  getMarkedSymptoms,
  hasMarkedSymptoms,
} from "../../../../models/User/getSymptoms";
import { getPeriodSymptoms, getPrePeriodSymptoms } from "./userSymptoms";

export const getQuestionToAsk = async (
  currentCycle: Cycle,
  todayPeriodObj: PeriodDateObj,
  user: UserInterface,
  noPrivate: boolean,
): Promise<questionResponse[]> => {
  // handle missing data
  const response = await handleMissingPeriodData(
    currentCycle,
    user.uid,
    todayPeriodObj,
  );

  console.log("");
  console.log("missing period data", response);

  if (response.length) {
    return response;
  }

  console.log("");
  console.log("Phase", todayPeriodObj.type);

  switch (todayPeriodObj.type) {
    case "ESTIMATED_PERIOD":
      return await handleEstimatedPeriodQuestion(
        currentCycle,
        todayPeriodObj,
        user.uid,
      );
    case "FOLLICULAR":
      return await handleFollicularQuestion(
        currentCycle,
        todayPeriodObj,
        user.uid,
      );
    case "OVULATION":
      return handleOvulationQuestion(currentCycle, noPrivate);
    case "LUTEAL":
      return await handleLutealQuestion(currentCycle, todayPeriodObj, user);
    case "PERIOD":
      return await handlePeriodQuestion(currentCycle, user);
  }

  return [];
};

// day 0 of cycle
const handleEstimatedPeriodQuestion = async (
  currentCycle: Cycle,
  todayPeriodObj: PeriodDateObj,
  uid: string,
): Promise<questionResponse[]> => {
  const dayNumber = todayPeriodObj.dayNumber;

  // if period is logged in cycle

  if (typeof dayNumber === "number") {
    // first expected day of period
    if (dayNumber === 0) {
      return createDidYouGetPeriodQuestion();
    }
    // symptom relief
    else if (dayNumber > 0 && (await hasMarkedSymptoms(uid, "NEGATIVE"))) {
      const oldSymptoms = await getMarkedSymptoms(uid);
      return createSymptomReliefQuestion(oldSymptoms);
    }
  }

  return [];
};

// no period data in cycle
const handleMissingPeriodData = async (
  currentCycle: Cycle,
  uid: string,
  todayPeriodObj: PeriodDateObj,
) => {
  const dayNumber = todayPeriodObj.dayNumber;
  if (
    typeof dayNumber === "number" &&
    dayNumber > 0 &&
    currentCycle.phaseSplits.PERIOD.length === 0
  ) {
    // if no period logged

    const lastPeriodDate = await fetchLastSavedPeriodDate(uid);

    if (lastPeriodDate) {
      const lastPeriodDateString = format(
        new Date(lastPeriodDate.date),
        "d MMM yy",
      );
      return createDidYouGetYourPeriodInPast(lastPeriodDateString);
    }
  }

  return [];
};

const handleLutealQuestion = async (
  currentCycle: Cycle,
  todayPeriodObj: PeriodDateObj,
  user: UserInterface,
) => {
  const dayNumber = todayPeriodObj.dayNumber;
  console.log("dayNumber", dayNumber);
  if (typeof dayNumber === "number") {
    // post ovulation
    if (isPostOvulation(currentCycle, dayNumber)) {
      return createMildSpottingQuestion();
    }

    // symptom relief
    else if (dayNumber > 0 && (await hasMarkedSymptoms(user.uid, "NEGATIVE"))) {
      const oldSymptoms = await getMarkedSymptoms(user.uid);
      return createSymptomReliefQuestion(oldSymptoms);
    } else if (canAskPMSQuestion(currentCycle, dayNumber)) {
      console.log("CAN ASK PMS QUESTION");
      return createPMSApproachingQuestion();
    } else if (isPrePeriod(currentCycle, dayNumber)) {
      const prePeriod = await getPrePeriodSymptoms(user);
      const viableSymptom = getViableSymptom(prePeriod, currentCycle);

      if (viableSymptom) {
        return createSymptomToAskQuestion(viableSymptom);
      }
    }
  }

  return [];
};

const handleOvulationQuestion = (currentCycle: Cycle, noPrivate: boolean) => {
  if (canAskDischarge(currentCycle, noPrivate)) {
    return createMilkyWhiteDischargeQuestion();
  }

  return [];
};

const handleFollicularQuestion = async (
  currentCycle: Cycle,
  todayPeriodObj: PeriodDateObj,
  uid: string,
): Promise<questionResponse[]> => {
  const dayNumber = todayPeriodObj.dayNumber;
  console.log("dayNumber", dayNumber);
  if (typeof dayNumber === "number") {
    // check if period ended
    if (canAskPeriodEnd(currentCycle, dayNumber)) {
      console.log("PERIOD END QUESTION?");
      return createPeriodEndQuestion();
    }
    // symptom relief
    else if (await hasMarkedSymptoms(uid, "NEGATIVE")) {
      console.log("Marked Symptoms?");
      const oldSymptoms = await getMarkedSymptoms(uid);
      console.log("oldSymptoms", oldSymptoms);
      return createSymptomReliefQuestion(oldSymptoms);
    } else if (isPreOvulation(currentCycle, dayNumber)) {
      console.log("Is Pre ovulation");
      return createMildCrampQuestion();
    } else if (canAskGoodMood(currentCycle)) {
      console.log("Can ask mood question");
      return createHighEnergyQuestion();
    }
  }

  return [];
};

// P.. P(flow reduction)
const handlePeriodQuestion = async (
  currentCycle: Cycle,

  user: UserInterface,
): Promise<questionResponse[]> => {
  // current symptom fix.
  if (await hasMarkedSymptoms(user.uid, "NEGATIVE")) {
    const oldSymptoms = await getMarkedSymptoms(user.uid);
    return createSymptomReliefQuestion(oldSymptoms);
  }

  const periodSymptoms = await getPeriodSymptoms(user);
  const viableSymptom = getViableSymptom(periodSymptoms, currentCycle);

  console.log("periodSymptoms", periodSymptoms);
  console.log("viableSymptom", viableSymptom);

  if (viableSymptom) {
    return createSymptomToAskQuestion(viableSymptom);
  }
  return [];
};
