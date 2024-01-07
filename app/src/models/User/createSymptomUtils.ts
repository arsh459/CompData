import { loggedSymptomDB, symptomId, symptomStatus } from "./symptoms";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { PeriodDateObj } from "./User";
import firestore from "@react-native-firebase/firestore";

export const addNewSymptom = async (
  uid: string,
  sympIds: symptomId[],
  todayObj: PeriodDateObj
) => {
  const batch = firestore().batch();
  for (const sympId of sympIds) {
    const symptomObj = createNewSymptom(sympId, todayObj);
    console.log("symptomObj", uid, symptomObj);
    batch.set(
      firestore()
        .collection("users")
        .doc(uid)
        .collection("loggedSymptoms")
        .doc(symptomObj.id),
      symptomObj
    );
  }

  await batch.commit();
};

export const updateSymptom = async (
  uid: string,
  sympId: symptomId,
  date: string,
  status: symptomStatus
) => {
  const symptoms = await firestore()
    .collection("users")
    .doc(uid)
    .collection("loggedSymptoms")
    .where("date", "==", date)
    .where("symptomId", "==", sympId)
    .get();

  for (const symp of symptoms.docs) {
    await firestore()
      .collection("users")
      .doc(uid)
      .collection("loggedSymptoms")
      .doc(symp.id)
      .update({ resolutionStatus: status });
  }
};

const createNewSymptom = (
  sympId: symptomId,
  todayObj: PeriodDateObj
): loggedSymptomDB => {
  return {
    id: uuidv4(),
    symptomId: sympId,
    createdOn: Date.now(),
    cycleId: todayObj.cycleId,
    date: todayObj.date,
    phaseProgress: todayObj.phaseProgress ? todayObj.phaseProgress : 0,
    phase: todayObj.type,
    resolutionStatus: "MARKED",
    day: todayObj.dayNumber ? todayObj.dayNumber : 0,
  };
};
