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
  insomniaEmoji,
  nauseaEmoji,
} from "@constants/icons";
import { LoggedSymptom } from "./User";

export interface symptomsListType extends LoggedSymptom {
  id: symptomId;
}

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

export const symptomsList: symptomsListType[] = [
  { text: "Cramps", image: crampsEmoji, id: "cramps" },
  { text: "Bloating", image: bloatingEmoji, id: "bloating" },
  { text: "Fatigue", image: fatigueEmoji, id: "fatigue" },
  { text: "Cravings", image: cravingsEmoji, id: "cravings" },
  { text: "Headache", image: headacheEmoji, id: "nausea" },
  { text: "Nausea", image: nauseaEmoji, id: "headache" },
  { text: "Diarrhoea", image: diarrhoeaEmoji, id: "diarrhoea" },
  { text: "Constipation", image: constipationEmoji, id: "constipation" },
  { text: "Abdominal Pain", image: backAcheEmoji, id: "abdominal_pain" },
  { text: "Insomnia", image: insomniaEmoji, id: "insomia" },
  { text: "Acne", image: acneEmoji, id: "acne" },
  {
    text: "Breast Tenderness",
    image: breastTenderEmoji,
    id: "breast_tenderness",
  },
  { text: "Back-ache", image: backAcheEmoji, id: "back_ache" },
  { text: "No Symptom", image: "NO_IMG", id: "no_symptom" },
];
