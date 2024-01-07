import { getEmojiByMood } from "@modules/JourneyLogHome/utils";
import { getEmojiByEnergy } from "@modules/JourneyLogHome/utils";
import { weightIconFrame45 } from "@constants/imageKitURL";

const getWeightDetails = (weightChange: number) => {
  if (weightChange > 0) {
    return {
      text: "Your weight increased by",
      icon: weightIconFrame45,
      unit: "Kgs",
      value: Math.abs(Math.round(weightChange)),
    };
  } else if (weightChange < 0) {
    return {
      text: "Your weight reduced by",
      icon: weightIconFrame45,
      unit: "Kgs",
      value: Math.abs(Math.round(weightChange)),
    };
  } else {
    return {
      text: "Your weight remained unchanged",
      icon: weightIconFrame45,
      unit: "",
      value: "",
    };
  }
};

const getEnergyDetails = (energy: number) => {
  const { text, icon } = getEmojiByEnergy(Math.ceil(energy));
  return {
    text: "Your average energy was",
    icon: icon,
    unit: "",
    value: text,
  };
};

const getMoodDetails = (mood: number) => {
  const { text, icon } = getEmojiByMood(Math.ceil(mood));
  return {
    text: "Your average mood was",
    icon: icon,
    unit: "",
    value: text,
  };
};

export const handleReportResponse = (
  view: "Weight" | "Energy" | "Mood",
  weightChange: number,
  averageEnergy: number,
  averageMood: number
) => {
  if (view === "Weight") {
    return getWeightDetails(weightChange);
  } else if (view === "Energy") {
    return getEnergyDetails(averageEnergy);
  } else {
    return getMoodDetails(averageMood);
  }
};
