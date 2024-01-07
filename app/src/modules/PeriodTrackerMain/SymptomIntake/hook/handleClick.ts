import { optionActions } from "@models/User/questionResponseInterface ";
import { addPeriodTodayClick } from "./clickActions/addPeriodToday";
import { delayCycle } from "./clickActions/delayCycle";
import { changeUserPrivacySettings } from "@models/User/updateUtils";
import { PeriodDateObj, periodPrompts } from "@models/User/User";
import { addNewSymptom } from "@models/User/createSymptomUtils";
import { symptomId } from "@models/User/symptoms";
import {
  onReverseSymptom,
  updateSymptomsToPeriod,
} from "./clickActions/addSymptoms";
import firestore from "@react-native-firebase/firestore";

export const handleClickAsyncAction = async (
  todayObj: PeriodDateObj,
  userAction: optionActions,
  today: string,
  uid: string,
  sympIds: symptomId[]
) => {
  switch (userAction) {
    case "addPeriodToday":
      await addPeriodTodayClick(uid, today, "add");
      return;
    case "delayedPeriod":
      await delayCycle(uid, todayObj.cycleId);
      return;
    case "dismiss":
      return;
    case "none":
      return;
    case "dontAskPrivateQuestions":
      await changeUserPrivacySettings(uid, true);
      return;
    case "removePeriodToday":
      await addPeriodTodayClick(uid, today, "remove");
      return;
    case "updatePeriodDates":
      return;
    case "saveSymptom":
      if (sympIds.length) {
        await addNewSymptom(uid, sympIds, todayObj);
      }
      return;
    case "escalateSymptom":
      if (sympIds.length) {
        await updateSymptomsToPeriod(uid, sympIds, today, "ESCALATED");
      }
      return;
    case "resolveSymptom":
      if (sympIds.length) {
        await updateSymptomsToPeriod(uid, sympIds, today, "RESOLVED");
      }
      return;
    case "saveOppositeSymptom":
      if (sympIds.length) {
        await onReverseSymptom(uid, sympIds, todayObj);
      }
      return;
  }
};

export const updatePromptAsked = async (
  uid: string,
  cycleId: string,
  prompt: periodPrompts
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .collection("cycles")
    .doc(cycleId)
    .update({ [`promptStatus.${prompt}`]: firestore.FieldValue.increment(1) });
};
