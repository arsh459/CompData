import { questionResponse } from "../interface";

export const createHighEnergyQuestion = (): questionResponse[] => {
  return [
    {
      question: "Are you feeling -",
      hidePresent: false,
      buttons: [
        {
          text: "Yes!",
          action: "saveSymptom",
        },
        {
          text: "Not Really",
          action: "saveOppositeSymptom",
        },
      ],
      options: [
        {
          symptomId: "highEnergy",
        },
        { symptomId: "greatMood" },
      ],

      viewStyle: "popup",
      id: "highEnergy",
      optionType: "noSelect",
    },
  ];
};

export const createMildCrampQuestion = (): questionResponse[] => {
  return [
    {
      question: "Did you feel a mild cramp today?",
      hidePresent: false,
      buttons: [
        {
          text: "Yes!",
          action: "saveSymptom",
        },
        {
          text: "No",
          action: "dismiss",
        },
      ],

      viewStyle: "popup",
      id: "ovulation_cramp",
    },
  ];
};
