import { CategoryTypes } from "@templates/CalendlyTemplate/CalendlyTemplateV2";

export type appointmentType = "PCOS" | "Thyroid" | "Other";

export const AppArr: appointmentType[] = [
  "PCOS",
  "Thyroid",
  "Other",
  "Other",
  "Other",
];

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
  noteForWorkoutCoach?: string;
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
  miscData?: string;
  menstrualData?: string;

  lifestyle?: lifestyleSuggestions;
  diet?: dietSuggestions;
}

export type appointmentStatusType =
  | "SCHEDULED"
  | "CANCELLED"
  | "DONE"
  | "FAILED";

export const appointmentStatusArray: appointmentStatusType[] = [
  "SCHEDULED",
  "CANCELLED",
  "DONE",
  "FAILED",
];

export interface AppointmentInterface {
  name: string;
  patientId: string;
  id: string;
  chiefComplaints: string;
  // create from doctortimes
  doctorId?: string;
  category?: CategoryTypes;
  createdOn: number;

  // fetch from calendly object
  startSlot?: number;
  endSlot?: number;
  link?: string;
  cause?: appointmentType;
  status?: appointmentStatusType;

  // url of prescription
  prescription?: string;
  prescriptionData?: Prescription;

  nextFollowupDate?: string;
  nextFollowupDateNote?: string;
  miscData?: string;
  rawString?: string;
  isFollowUp?: boolean;
}
