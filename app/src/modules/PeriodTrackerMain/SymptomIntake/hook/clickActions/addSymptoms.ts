import { PeriodDateObj } from "@models/User/User";
import { updateSymptom } from "@models/User/createSymptomUtils";
import {
  opppositeSymptoms,
  symptomId,
  symptomStatus,
} from "@models/User/symptoms";

export const updateSymptomsToPeriod = async (
  uid: string,
  symps: symptomId[],
  date: string,
  state: symptomStatus
) => {
  for (const symp of symps) {
    await updateSymptom(uid, symp, date, state);
  }
};

export const onReverseSymptom = async (
  uid: string,
  symps: symptomId[],
  todayObj: PeriodDateObj
) => {
  for (const symp of symps) {
    if (symp && opppositeSymptoms[symp]) {
      // @ts-ignore
      await addNewSymptom(uid, opppositeSymptoms[symp], todayObj);
    }
  }
};
