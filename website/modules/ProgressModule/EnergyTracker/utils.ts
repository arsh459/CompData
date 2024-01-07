import {
  defaultEnergy,
  lowEnergy,
  lowEnergyAdd,
  moderateEnergy,
  moderateEnergyAdd,
  veryHighEnergy,
  veryHighEnergyAdd,
} from "@constants/icons/iconURLs";

export const getEmojiByEnergy = (
  energy: number
): { icon: string; text: string } => {
  switch (energy) {
    case 1:
      return { text: "Low", icon: lowEnergy };

    case 2:
      return { text: "Moderate", icon: moderateEnergy };

    case 3:
      return { text: "Excellent", icon: veryHighEnergy };

    default:
      return { text: "-", icon: lowEnergy };
  }
};

export const getEnergyString = (energy?: number): string => {
  switch (energy) {
    case 1:
      return "It's okay to feel tired somedays. Take it easy and eat something nice today!";

    case 2:
      return "You are doing well. Do a workout task today and get your energy up!";

    case 3:
      return "This is the way to be! Continue working out and keep the energy up";

    default:
      return "";
  }
};

export const getIconByEnergy = (energy?: number, isAdd?: boolean) => {
  // if (!energy) energy = 1;
  switch (energy) {
    case 1:
      return {
        icon: isAdd ? lowEnergyAdd : lowEnergy,
        text: "low",
      };

    case 2:
      return {
        icon: isAdd ? moderateEnergyAdd : moderateEnergy,
        text: "Moderate",
      };

    case 3:
      return {
        icon: isAdd ? veryHighEnergyAdd : veryHighEnergy,
        text: "Very High",
      };

    default:
      return {
        icon: isAdd ? lowEnergyAdd : defaultEnergy,
        text: "low",
      };
  }
};
