import { symptomId, symptomStrings } from "../../../../../models/User/symptoms";
import { questionResponse } from "../interface";
import { getSymptoms } from "./estimatedPeriod";

export const createMildSpottingQuestion = (): questionResponse[] => {
  return [
    {
      question: "Do you see mild spotting today?",
      hidePresent: false,
      buttons: [
        {
          text: "Yes",
          action: "saveSymptom",
        },
        {
          text: "No",
          action: "dismiss",
        },
      ],

      viewStyle: "popup",
      id: "ovulation_spotting",
    },
  ];
};

export const createPMSApproachingQuestion = (): questionResponse[] => {
  return [
    {
      question: `Do you think your period is approaching?`,
      hidePresent: false,
      buttons: [
        {
          text: "Yes",
          action: "none",
          nextId: "symptomCheck",
        },
        {
          text: "No",
          action: "delayedPeriod",
        },
      ],

      viewStyle: "popup",
      id: "pmsCheck",
    },
    {
      id: "symptomCheck",
      question: "Which of the following do you feel?",
      options: getSymptoms(),
      buttons: [
        {
          text: "Save Details",
          action: "saveSymptom",
        },
      ],
      optionType: "multiSelect",
      hidePresent: true,
      viewStyle: "bottomsheet",
      themeColor: "blue",
    },
  ];
};

export const createSymptomToAskQuestion = (
  symptId: symptomId,
): questionResponse[] => {
  return [
    {
      question: getSymptomQuestion(symptId),
      hidePresent: false,
      buttons: [
        {
          text: "Yes",
          action: "saveSymptom",
        },
        {
          text: "No",
          action: "dismiss",
        },
      ],

      viewStyle: "popup",
      id: symptId,
    },
  ];
};

const getSymptomQuestion = (symptId: symptomId) => {
  if (symptId === "ovulation_white_discharge") {
    return "Do you see a white discharge?";
  } else if (
    symptId === "heavyFlow" ||
    symptId === "mediumFlow" ||
    symptId === "lightFlow"
  ) {
    return `Did you have a ${symptomStrings[symptId]}?`;
  } else {
    return `Do you feel ${symptomStrings[symptId]}?`;
  }
};
