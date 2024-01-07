import {
  slotInterventionInterface,
  slotInterventionTypes,
} from "@models/User/User";
import { dayMS } from "@providers/period/periodStore";
import firestore from "@react-native-firebase/firestore";

export const getSltoInterventionType = (
  intervention: slotInterventionInterface,
  slotInterventionDelay?: Record<slotInterventionTypes, number>
): slotInterventionTypes | undefined => {
  const now = Date.now();
  const delayMS = slotInterventionDelay
    ? slotInterventionDelay[intervention.type]
    : dayMS;

  if (intervention.lastShown + delayMS < now) {
    return intervention.type;
  }

  return undefined;
};

export const setSltoInterventionObj = async (
  type: slotInterventionTypes | "none",
  uid?: string
) => {
  if (uid) {
    const now = Date.now();

    const appointments = await firestore()
      .collection("appointments")
      .where("patientId", "==", uid)
      .where("status", "==", "SCHEDULED")
      .where("startSlot", ">=", Date.now())
      // .where("category", "==", "sales")
      .limit(1)
      .get();

    const hasApppointment = !!appointments.docs.length;

    const slotIntervention: slotInterventionInterface | "none" =
      hasApppointment || type === "none" ? "none" : { type, lastShown: now };

    await firestore().collection("users").doc(uid).update({ slotIntervention });
  }
};

export const getNextSlotInterventionTypes = (
  currType?: slotInterventionTypes
): slotInterventionTypes | "none" => {
  if (currType) {
    if (currType === "managePCOS") {
      return "looseWeight";
    } else if (currType === "looseWeight") {
      return "pearsnolTeam";
    } else if (currType === "pearsnolTeam") {
      return "none";
    } else {
      return "none";
    }
  } else {
    return "managePCOS";
  }
};
