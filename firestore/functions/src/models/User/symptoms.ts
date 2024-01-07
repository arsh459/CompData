import { periodDateType } from "./User";

export type symptomId =
  | "cramps"
  | "bloating"
  | "fatigue"
  | "cravings"
  | "nausea"
  | "headache"
  | "diarrhoea"
  | "constipation"
  | "abdominal_pain"
  | "insomia"
  | "acne"
  | "breast_tenderness"
  | "back_ache"
  | "highEnergy"
  | "greatMood"
  | "badMood"
  | "heavyFlow"
  | "lightFlow"
  | "mediumFlow"
  | "ovulation_white_discharge"
  | "ovulation_spotting"
  | "ovulation_cramp";

export type sympyomType = "POSITIVE" | "NEGATIVE" | "NEUTRAL";
export const DEFAULT_PRE_PERIOD_SYMPTOMS: symptomId[] = [
  "headache",
  "cramps",
  "acne",
];
export const DEFAULT_PERIOD_SYMPTOMS: symptomId[] = ["cramps", "back_ache"];

export const symptomTypes: Record<symptomId, sympyomType> = {
  cramps: "NEGATIVE",
  back_ache: "NEGATIVE",
  fatigue: "NEGATIVE",
  constipation: "NEGATIVE",
  cravings: "NEGATIVE",
  nausea: "NEGATIVE",
  abdominal_pain: "NEGATIVE",
  acne: "NEGATIVE",
  headache: "NEGATIVE",
  bloating: "NEGATIVE",
  diarrhoea: "NEGATIVE",
  insomia: "NEGATIVE",
  breast_tenderness: "NEGATIVE",
  highEnergy: "POSITIVE",
  greatMood: "POSITIVE",
  badMood: "NEGATIVE",
  ovulation_white_discharge: "NEUTRAL",
  ovulation_cramp: "NEUTRAL",
  heavyFlow: "NEUTRAL",
  mediumFlow: "NEUTRAL",
  lightFlow: "NEUTRAL",
  ovulation_spotting: "NEUTRAL",
};

export const opppositeSymptoms: Partial<Record<symptomId, symptomId>> = {
  highEnergy: "fatigue",
  greatMood: "badMood",
};

export const symptomStrings: Record<symptomId, string> = {
  cramps: "cramps",
  back_ache: "back ache",
  fatigue: "fatigue",
  constipation: "constipation",
  cravings: "cravings",
  nausea: "nausea",
  abdominal_pain: "abdominal pain",
  acne: "acne",
  headache: "headache",
  bloating: "bloating",
  diarrhoea: "diarrhoea",
  insomia: "insomia",
  breast_tenderness: "tenderness in breasts",
  highEnergy: "highly energetic",
  greatMood: "positive",
  badMood: "bad",
  ovulation_white_discharge: "white discharge",
  ovulation_cramp: "mild cramp",
  heavyFlow: "heavy flow",
  mediumFlow: "medium flow",
  lightFlow: "light flow",
  ovulation_spotting: "mild spotting",
};

type symptomStatus = "MARKED" | "RESOLVED" | "ESCALATED" | "UNKNOWN";

export interface loggedSymptomDB {
  id: string;
  symptomId: symptomId;
  date: string;
  createdOn: number;

  cycleId?: string; // cycleId
  day?: number; // to update
  phaseProgress?: number; // to update
  phase?: periodDateType; // to update

  // resolution status
  resolutionStatus?: symptomStatus;
}
