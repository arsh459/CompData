export type calendlySessionTypes = "PROGRESS" | "DONE" | "FAILED";

export interface CalendlySession {
  uid: string;
  name?: string;
  id: string;
  createdOn: number;
  status: calendlySessionTypes;
}

export type appointmentStatus = "SCHEDULED" | "CANCELLED" | "DONE" | "FAILED";
export type appointmentType = "PCOS" | "Thyroid" | "Other";

export type CategoryTypes =
  | "gynaecologist"
  | "health_coach"
  | "nutrtitionist"
  | "sales";

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
  status?: appointmentStatus;

  prescription?: string;
  prescriptionData?: Prescription;

  nextFollowupDate?: string;
  miscData?: string;
  rawString?: string;
  zohoBookingId?: string;
  zohoStaffId?: string;
}

export enum dietTypes {
  "low_carb" = "low_carb",
  "keto" = "keto",
  "vegan" = "vegan",
  "high_protein" = "high_protein",
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

export interface lifestyleSuggestions {
  goal?: doctorFitnessGoal;
  weightDelta?: number;
  weeklyExerciseGoal?: string;
}

export enum doctorFitnessGoal {
  "lose_weight" = "lose_weight",
  "gain_weight" = "gain_weight",
  "keep_fit" = "keep_fit",
}
