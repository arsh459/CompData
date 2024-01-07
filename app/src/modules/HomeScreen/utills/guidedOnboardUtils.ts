import {
  getNextSlotInterventionTypes,
  setSltoInterventionObj,
} from "@modules/SlotIntervention/utils";
import firestore from "@react-native-firebase/firestore";

export const onGuidedOnbordDone = async (uid?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ guidedOnboardDone: true });

  setSltoInterventionObj(getNextSlotInterventionTypes(), uid);
};

export const onSwapMealGuidedOnbordDone = async (uid?: string, id?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.swapMealGuidedOnboardDone`]: id });
};

export const onMealTrackOnboardingDone = async (
  status: boolean,
  uid?: string
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.mealTrackOnboarding`]: status });
};

export const onChatScreenOnboardDone = async (uid?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.chatScreenOnboard`]: true });
};

export const onKnowMoreSakhiDone = async (uid?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.knowMoreSakhi`]: true });
};

export const onRoomPopupRemove = async (uid: string, roomId: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .collection("rooms")
    .doc(roomId)
    .update({ restartConvPopup: false });
};

export const onWorkoutCardOnboardDone = async (uid?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.workoutCardOnboard`]: true });
};

export const onWorkoutProgOnboardDone = async (uid?: string, id?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.workoutProgOnboard`]: id });
};

export const onWorkoutDoneOnboardDone = async (uid?: string, id?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.workoutDoneOnboard`]: id });
};

export const onIntroReelsOnboardDone = async (uid?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.introReelsOnboard`]: true });
};

export const onDietCardOnboardDone = async (uid?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.dietCardOnboard`]: true });
};

export const onDietDoneOnbordDone = async (uid?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.dietDoneOnboard`]: true });
};

export const onDietFormFilledDone = async (uid?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.dietFormFilled`]: true });
};

export const onRecipesOnboardDone = async (uid?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.recipesOnboard`]: true });
};

export const onDaySelectorOnboardDone = async (uid?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.daySelectorOnboard`]: true });
};

export const onSeenWelcomePro = async (uid?: string, val?: boolean) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.seenWelcomePro`]: val || false });
};
export const onPeriodTarckerCalenderOnboardDone = async (uid?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.periodTrackerCalender`]: true });
};

export const onPeriodTarckerInsightOnboardDone = async (uid?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.periodTrackerInsight`]: true });
};

export const onDoNotAskPrivateQu = async (uid?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.noPrivateQu`]: true });
};
export const onBootcampOnboardedDone = async (uid?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.bootcampOnboarded`]: true });
};

export const onAppointmentOnboardedDone = async (uid?: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`flags.appointmentFlag`]: true });
};
