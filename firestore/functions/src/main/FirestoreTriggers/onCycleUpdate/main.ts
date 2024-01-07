import { getPeriodDateForDate } from "../../../models/User/Methods";
import {
  getCycleSymptoms,
  updateSymptomOnRefresh,
} from "../../../models/User/getSymptoms";
import { loggedSymptomDB } from "../../../models/User/symptoms";

export const updateSymptomsInCycles = async (uid: string, cycleId: string) => {
  const cycleSymptoms = await getCycleSymptoms(uid, cycleId);

  for (const cycleSymptom of cycleSymptoms) {
    await handleSymptomCycleUpdate(uid, cycleSymptom);
  }
};

const handleSymptomCycleUpdate = async (
  uid: string,
  symptom: loggedSymptomDB,
) => {
  const periodDate = await getPeriodDateForDate(uid, symptom.date);

  if (periodDate) {
    await updateSymptomOnRefresh(
      uid,
      symptom.id,
      periodDate.type,
      periodDate.cycleId,
      periodDate.dayNumber,
      periodDate.phaseProgress,
    );
  }
};
