import { AutoRoomIDs } from "@models/ChatBot/insights";
import { LoggedSymptom, periodDateType } from "@models/User/User";

export const noRepeatString = "Don't repeat old recipes";
export const noRepeatYogaString = "Don't repeat old asanas";
export const squareBracket = `Ensure square brackets are in the response.`;
export const symptomEaseString = "Suggest something to ease the symptoms";
const generalString = `Ensure you follow the following format\nName: [Name of recipe]\nReason: [Reason with a benefit]`;

export const createMissedPeriodPrompt = (roomId: AutoRoomIDs) => {
  // return `Missed Period. ${generalString}`;
  return `Missed Period. Suggest something to reduce cortisol levels. ${getNoRepeatString(
    roomId
  )}. ${squareBracket}`;
};

export const createLongerPeriodPrompt = (days: number, roomId: AutoRoomIDs) => {
  // return `Missed Period. ${generalString}`;
  return `Had a ${days} period. Suggest iron rich food and complex carbohydrates to counter fatigue & weakness. ${getNoRepeatString(
    roomId
  )}. ${squareBracket}`;
};

export const createEarlyPeriodPrompt = (roomId: AutoRoomIDs) => {
  // return `Longer than usual period. ${generalString}`;
  return `Early period. Suggest something to reduce cortisol levels. ${getNoRepeatString(
    roomId
  )}. ${squareBracket}`;
};

export const createShorterPeriodPrompt = (
  days: number,
  roomId: AutoRoomIDs
) => {
  return `Had a ${days} period. Suggest something to reduce cortisol levels. ${getNoRepeatString(
    roomId
  )}. ${squareBracket}`;
};

// export const createLongerCyclePrompt = () => {
//   return `Cycle is longer than usual. Seed cycling to regularise the cycle. ${getNoRepeatString(roomId)}`;
// };

// export const createShorterCyclePrompt = () => {
//   return `Cycle is shorter than usual. Seed cycling to regularise the cycle. ${getNoRepeatString(roomId)}`;
// };

const getNoRepeatString = (roomId: AutoRoomIDs) => {
  if (roomId === "DIET") {
    return noRepeatString;
  } else {
    return noRepeatYogaString;
  }
};

export const createSymptomPrompt = (
  symptoms: LoggedSymptom[],
  roomId: AutoRoomIDs
) => {
  return `Have ${symptoms
    .map((item) => item.text)
    .join(", ")}. ${symptomEaseString}. ${getNoRepeatString(
    roomId
  )}. ${generalString}. ${squareBracket}`;
};

export const createPeriodPhasePrompt_startDays = (
  dayNumber: number,
  roomId: AutoRoomIDs
) => {
  return `Period Day ${dayNumber}. Have cramps, lower back pain. ${symptomEaseString}. ${getNoRepeatString(
    roomId
  )}. ${generalString}. ${squareBracket}`;
};

export const createPeriodPhasePrompt_LaterDays = (
  dayNumber: number,
  roomId: AutoRoomIDs
) => {
  return `Period Day ${dayNumber}. Mild cramps & fatigue. ${symptomEaseString}. ${getNoRepeatString(
    roomId
  )}. ${generalString}. ${squareBracket}`;
};

const getCycleStateString = (cycleState: "long" | "short") => {
  if (cycleState === "long") {
    return `Cycle is longer than usual. Seed Cycling to regularise the cycle`;
  } else {
    return `Cycle is shorter than usual. Seed Cycling to regularise the cycle`;
  }
};

export const createMenstrualCyclePhasePrompt = (
  type: periodDateType,
  cycleState: "long" | "short" | "regular",
  roomId: AutoRoomIDs
) => {
  if (cycleState === "regular") {
    return `${getPhaseString(type)} Phase. ${phaseRemedyString(
      type
    )}. ${getNoRepeatString(roomId)}. ${squareBracket}`;
  } else {
    return `${getPhaseString(type)} Phase. ${getCycleStateString(
      cycleState
    )}. ${getNoRepeatString(roomId)}. ${squareBracket}`;
  }
};

const phaseRemedyString = (type: periodDateType) => {
  if (type === "FOLLICULAR") {
    return `Suggest whole grains & protein to power the workouts`;
  } else if (type === "OVULATION") {
    return `Suggest high fiber and antioxidant rich food to balance estrogen surge`;
  } else if (type === "LUTEAL") {
    return `Suggest complex carbs to reduce symptoms of PMS`;
  } else if (type === "PERIOD" || type === "ESTIMATED_PERIOD") {
    return `Have cramps and body ache. ${symptomEaseString}`;
  }

  return "";
};

export const getPhaseString = (type: periodDateType) => {
  if (type === "PERIOD") {
    return "Period";
  } else if (type === "LUTEAL") {
    return "Luteal";
  } else if (type === "FOLLICULAR") {
    return "Follicular";
  } else if (type === "OVULATION") {
    return "Ovulation";
  } else if (type === "ESTIMATED_PERIOD") {
    return "Period";
  } else {
    return "Period";
  }
};
