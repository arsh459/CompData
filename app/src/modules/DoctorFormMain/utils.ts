import { CategoryTypes } from "@modules/Appointments/constants";
import firestore from "@react-native-firebase/firestore";
import { format } from "date-fns";

export const storeAppointment = async (obj: AppointmentInterface) => {
  try {
    await firestore().collection("appointments").doc(obj.id).set(obj);
    return obj.id;
  } catch (error) {
    console.error("Error storing appointment:", error);
    return undefined;
  }
};

export type appointmentStatus = "SCHEDULED" | "CANCELLED" | "DONE" | "FAILED";

export enum doctorFitnessGoal {
  "lose_weight" = "lose_weight",
  "gain_weight" = "gain_weight",
  "keep_fit" = "keep_fit",
}

export enum dietTypes {
  "low_carb" = "low_carb",
  "keto" = "keto",
  "vegan" = "vegan",
  "high_protein" = "high_protein",
}

export interface lifestyleSuggestions {
  goal?: doctorFitnessGoal;
  weightDelta?: number;
  weeklyExerciseGoal?: string;
}

export interface dietSuggestions {
  nutrientsToInclude?: string;
  noteForDietician?: string;
  particularFoodToInclude?: string;
  particularDietToFollow?: dietTypes[];
}

export interface Prescription {
  createdOn?: number;
  updatedOn?: number;

  diagnosis?: string;
  tests?: string;
  medications?: string;
  supplements?: string;

  lifestyle?: lifestyleSuggestions;
  diet?: dietSuggestions;
  miscData?: string;
}

export interface AppointmentInterface {
  name: string;
  patientId: string;
  id: string;
  chiefComplaints: string;
  // create from doctortimes
  doctorId?: string; // doctorId
  category?: CategoryTypes;
  createdOn: number;

  // fetch from calendly object
  startSlot?: number; // startSlot appointment start unix
  endSlot?: number;
  link?: string;
  cause?: appointmentType;
  status?: appointmentStatus;

  prescription?: string;
  prescriptionData?: Prescription;

  nextFollowupDate?: string;
  miscData?: string;
  rawString?: string;
}

export type appointmentType = "PCOS" | "Thyroid" | "Other";

export const formatUnixTimestampByTime = (unixTimestamp?: number) => {
  if (!unixTimestamp) {
    return "";
  }

  return format(new Date(unixTimestamp), "h:mm a, dd MMM yy");
  // const offsetMilliseconds = 5.5 * 60 * 60 * 1000;

  // const dateIST = new Date(unixTimestamp * 1000 + offsetMilliseconds);
  // return format(dateIST, formatting || "hh:mm a");
};
export const formatUnixTimestampByDateTime = (unixTimestamp?: number) => {
  if (!unixTimestamp) {
    return "";
  }

  return format(new Date(unixTimestamp), "do LLL yyyy, h:mmaaaa");
};
