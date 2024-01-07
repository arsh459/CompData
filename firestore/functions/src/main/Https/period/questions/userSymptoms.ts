import { UserInterface } from "../../../../models/User/User";
import { getPhaseSymptoms } from "../../../../models/User/getSymptoms";
import {
  DEFAULT_PRE_PERIOD_SYMPTOMS,
  DEFAULT_PERIOD_SYMPTOMS,
  loggedSymptomDB,
  symptomId,
  symptomTypes,
} from "../../../../models/User/symptoms";

export const getPeriodSymptoms = async (
  user: UserInterface,
): Promise<symptomId[]> => {
  if (user && user.periodTrackerObj?.symptomsDuringPeriod) {
    return user.periodTrackerObj?.symptomsDuringPeriod;
  }

  const markedSymptoms = await getPhaseSymptoms(user.uid, "PERIOD");
  if (markedSymptoms.length) {
    const negativeSymptoms = filterOnlyNegative(markedSymptoms);
    const finalArray = getTopKSymptoms(negativeSymptoms, 3);

    return finalArray;
  }

  return DEFAULT_PERIOD_SYMPTOMS;
};

export const getPrePeriodSymptoms = async (
  user: UserInterface,
): Promise<symptomId[]> => {
  // const user = await getUserById(uid);

  if (user && user.periodTrackerObj?.symptomsBeforePeriod) {
    return user.periodTrackerObj?.symptomsBeforePeriod;
  }

  const markedSymptoms = await getPhaseSymptoms(user.uid, "LUTEAL");
  if (markedSymptoms.length) {
    const filteredSymptoms = filterSymptomsBeforeCutoff(markedSymptoms, 0.5);
    const finalArray = getTopKSymptoms(filteredSymptoms, 3);

    return finalArray;
  }

  return DEFAULT_PRE_PERIOD_SYMPTOMS;
};

const getTopKSymptoms = (filteredSymptoms: loggedSymptomDB[], k: number) => {
  const symptomMap = createPhaseSymptomMap(filteredSymptoms);

  const sortedArray = Object.entries(symptomMap).sort((a, b) => b[1] - a[1]);

  const topThree = sortedArray.slice(0, k);
  const finalArray = topThree.map((item) => item[0] as symptomId);

  return finalArray;
};

const filterSymptomsBeforeCutoff = (
  symptoms: loggedSymptomDB[],
  cutoff: number,
) => {
  return symptoms.filter(
    (item) => item.phaseProgress && item.phaseProgress < cutoff,
  );
};

const filterOnlyNegative = (symptoms: loggedSymptomDB[]) => {
  return symptoms.filter((item) => symptomTypes[item.symptomId] === "NEGATIVE");
};

const createPhaseSymptomMap = (symptoms: loggedSymptomDB[]) => {
  const symptomMap: Partial<Record<symptomId, number>> = {};

  for (const remoteSymptom of symptoms) {
    if (symptomMap[remoteSymptom.symptomId]) {
      //@ts-ignore
      symptomMap[remoteSymptom.symptomId] += 1;
    } else {
      symptomMap[remoteSymptom.symptomId] = 1;
    }
  }

  return symptomMap;
};
