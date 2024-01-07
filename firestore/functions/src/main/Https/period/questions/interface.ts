import { periodPrompts } from "../../../../models/User/User";
import { symptomId } from "../../../../models/User/symptoms";

export interface questionResponse {
  question: string;
  buttons: ButtonInterface[];
  underlineButton?: ButtonInterface;
  viewStyle: questionViewStyles;
  hidePresent: boolean;
  heroImage?: string;
  options?: OptionInterface[];
  optionType?: "multiSelect" | "singleSelect" | "noSelect";
  id: periodPrompts;
  themeColor?: "red" | "blue" | "gradient";
}

type questionViewStyles = "popup" | "bottomsheet";

type optionActions =
  | "saveSymptom"
  | "updatePeriodDates"
  // | "updateCurrentCycleLength"
  // | "saveFollowup"
  | "dismiss"
  | "resolveSymptom"
  | "escalateSymptom"
  | "saveOppositeSymptom"
  // | "updateSymptom"
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
