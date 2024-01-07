import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { sectionTypes } from "./useSection";

export const sendWEOnboardingEvent = (sec: sectionTypes) => {
  if (sec === "name") {
    return weEventTrack("fScanName_clickNext", {});
  } else if (sec === "gender") {
    return weEventTrack("fScanGender_clickNext", {});
  } else if (sec === "fcs") {
    weEventTrack("fScanFitnessConcern_clickNext", {});
  } else if (sec === "desiredWeight") {
    return weEventTrack("fScanGoalWeight_clickNext", {});
  } else if (sec === "goal") {
    return weEventTrack("fScanGoal_clickNext", {});
  } else if (sec === "height") {
    return weEventTrack("fScanHeight_clickNext", {});
  } else if (sec === "join") {
    return weEventTrack("fScanProScreen_clickGetAccess", {});
  } else if (sec === "pace") {
    return weEventTrack("fScanDifficulty_clickNext", {});
  } else if (sec === "phone") {
    return weEventTrack("fScanPhone_clickNext", {});
  } else if (sec === "repsCount") {
    return weEventTrack("fScanReps_clickNext", {});
  } else if (sec === "weight") {
    return weEventTrack("fScanCurrentWeight_clickNext", {});
  } else if (sec === "settingup") {
    return weEventTrack("fScanFinal_clickNext", {});
  } else if (sec === "welcome") {
    return weEventTrack("fScanIntro_clickNext", {});
  } else if (sec === "currentBodyType") {
    return weEventTrack("fScanCurrentBodyType_clickNext", {});
  } else if (sec === "desiredBodyType") {
    return weEventTrack("fScanDesiredBodyType_clickNext", {});
  } else if (sec === "scaningBodyType") {
    return weEventTrack("fScanScaningBodyType_clickNext", {});
  } else if (sec === "resolutionDetail") {
    return weEventTrack("fScanResolutionDetail_clickNext", {});
  } else if (sec === "getStarted") {
    return weEventTrack("fScanGetFitnessPlan_clickNext", {});
  } else if (sec === "bookConsultation") {
    return weEventTrack("fScanBookConsultation_clickNext", {});
  } else if (sec === "consultationSlot") {
    return weEventTrack("fScanConsultationSlot_clickNext", {});
  } else if (sec === "slotBooked") {
    weEventTrack("fScanSlotBooked_clickNext", {});

    // conversion
    weEventTrack("conv_bookSlot", {});
    return;
  }
};
