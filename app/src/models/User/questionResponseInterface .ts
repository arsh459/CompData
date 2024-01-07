import { periodPrompts } from "./User";
import { symptomId } from "./symptoms";

export interface questionResponse {
  question: string;
  buttons: ButtonInterface[];
  underlineButton?: ButtonInterface;
  viewStyle: questionViewStyles;
  hidePresent: boolean;
  heroImage?: string;
  options?: OptionInterface[];
  optionType?: optionTypes;
  id: periodPrompts;
  themeColor?: "red" | "blue" | "gradient";
}

export type optionTypes = "multiSelect" | "singleSelect" | "noSelect";
export type questionViewStyles = "popup" | "bottomsheet";

export type optionActions =
  | "saveSymptom"
  | "updatePeriodDates"
  | "dismiss"
  | "resolveSymptom"
  | "escalateSymptom"
  | "saveOppositeSymptom"
  | "addPeriodToday"
  | "removePeriodToday"
  | "delayedPeriod"
  | "dontAskPrivateQuestions"
  | "none";

export interface ButtonInterface {
  text: string;
  action: optionActions;
  nextId?: periodPrompts;
}

export interface OptionInterface {
  text?: string;
  image?: string;
  symptomId?: symptomId;
}
