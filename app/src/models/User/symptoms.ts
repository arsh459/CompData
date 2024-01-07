import {
  acneEmoji,
  backAcheEmoji,
  bloatingEmoji,
  breastTenderEmoji,
  constipationEmoji,
  crampsEmoji,
  cravingsEmoji,
  diarrhoeaEmoji,
  fatigueEmoji,
  headacheEmoji,
  heavyFlow,
  insomniaEmoji,
  lightFlow,
  mediumFlow,
  nauseaEmoji,
} from "@constants/imageKitURL";
import { LoggedSymptom, periodDateType } from "./User";

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
  | "ovulation_cramp"
  | "no_symptom";

export type sympyomType = "POSITIVE" | "NEGATIVE" | "NEUTRAL";
export const DEFAULT_PRE_PERIOD_SYMPTOMS: symptomId[] = [
  "headache",
  "cramps",
  "acne",
];

export const opppositeSymptoms: Partial<Record<symptomId, symptomId>> = {
  highEnergy: "fatigue",
  greatMood: "badMood",
};

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
  no_symptom: "POSITIVE",
};

export const symptomData: Record<symptomId, LoggedSymptom> = {
  cramps: { text: "cramps", image: crampsEmoji },
  back_ache: { text: "back ache", image: backAcheEmoji },
  fatigue: { text: "fatigue", image: fatigueEmoji },
  constipation: { text: "constipation", image: constipationEmoji },
  cravings: { text: "cravings", image: cravingsEmoji },
  nausea: { text: "nausea", image: nauseaEmoji },
  abdominal_pain: { text: "abdominal pain", image: backAcheEmoji },
  acne: { text: "acne", image: acneEmoji },
  headache: { text: "headache", image: headacheEmoji },
  bloating: { text: "bloating", image: bloatingEmoji },
  diarrhoea: { text: "diarrhoea", image: diarrhoeaEmoji },
  insomia: { text: "insomia", image: insomniaEmoji },
  breast_tenderness: {
    text: "tenderness in breasts",
    image: breastTenderEmoji,
  },
  heavyFlow: { text: "heavy flow", image: heavyFlow },
  mediumFlow: { text: "medium flow", image: mediumFlow },
  lightFlow: { text: "light flow", image: lightFlow },
  // Image has to be added
  highEnergy: { text: "highly energetic", image: "NO_IMG" },
  greatMood: { text: "positive", image: "NO_IMG" },
  badMood: { text: "bad", image: "NO_IMG" },
  ovulation_white_discharge: { text: "white discharge", image: "NO_IMG" },
  ovulation_cramp: { text: "mild cramp", image: "NO_IMG" },
  ovulation_spotting: { text: "mild spotting", image: "NO_IMG" },
  //
  no_symptom: { text: "no symptom", image: "NO_IMG" },
};

export type symptomStatus = "MARKED" | "RESOLVED" | "ESCALATED" | "UNKNOWN";

export interface loggedSymptomDB {
  id: string;
  symptomId: symptomId;
  cycleId: string;
  day: number;
  phaseProgress: number;
  date: string;
  createdOn: number;
  phase: periodDateType;
  resolutionStatus: symptomStatus;
}
