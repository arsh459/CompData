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
} from "@constants/imageKitURL";
import { LoggedSymptom } from "@models/User/User";
import { symptomId } from "@models/User/symptoms";

export const periodComps = {
  ctaColor: "#fff",
  ctaTextColor: "#000",
  insightTextColor: "#fff",
  insightBgColor: "transparent",
  cta: "Edit Period",
};

export const estPeriodComps = {
  insightTextColor: "#fff",
  insightBgColor: "transparent",
  ctaColor: "#fff",
  ctaTextColor: "#000",
  cta: "Log Period",
};

export const estPeriodCompsFuture = {
  insightTextColor: "#fff",
  insightBgColor: "transparent",
  //   ctaColor: "#fff",
  //   ctaTextColor: "#000",
  //   cta: "Log Period",
};

export const ovulationComps = {
  insightTextColor: "#fff",
  insightBgColor: "rgba(255, 255, 255, 0.15)",
  ctaColor: "#fff",
  ctaTextColor: "#000",
  cta: "Edit Period Dates",
};

export const ovulationCompsFuture = {
  insightTextColor: "#fff",
  insightBgColor: "rgba(255, 255, 255, 0.15)",
};

export const futureDateComps = {
  insightTextColor: "#fff",
  insightBgColor: "#6D55D1",
};

export const follicularDateComps = {
  ctaColor: "#fff",
  ctaTextColor: "#000",
  insightTextColor: "#fff",
  insightBgColor: "#4D4974",
  cta: "Edit Period dates",
};

export const lutealDateComps = {
  ctaColor: "#fff",
  ctaTextColor: "#000",
  insightTextColor: "#fff",
  insightBgColor: "#4D4974",
  cta: "Edit Period dates",
};

// export interface SymptomElement {
//   title: string;
//   image: string;
// }

interface symptomsListType extends LoggedSymptom {
  id: symptomId;
}

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
