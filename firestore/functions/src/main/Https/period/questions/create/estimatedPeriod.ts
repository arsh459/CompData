import {
  loggedSymptomDB,
  // symptomId,
} from "../../../../../models/User/symptoms";
import { OptionInterface, questionResponse } from "../interface";

export const createDidYouGetYourPeriodInPast = (
  lastPeriodDate: string,
): questionResponse[] => {
  return [
    {
      id: "pastPeriod",
      question: `Did you get your period after ${lastPeriodDate}?`,
      buttons: [
        {
          text: "Yes I did",
          action: "updatePeriodDates",
        },
        {
          text: "No",
          action: "delayedPeriod",
        },
      ],
      viewStyle: "popup",
      hidePresent: false,
    },
  ];
};

export const createDidYouGetPeriodQuestion = (): questionResponse[] => {
  return [
    {
      id: "didYouGetPeriod",
      question: "Did you get your period today?",
      buttons: [
        {
          text: "Yes, I did",
          action: "addPeriodToday",
          nextId: "flowInfo",
        },
        {
          text: "No",
          action: "removePeriodToday",
        },
      ],
      viewStyle: "popup",
      hidePresent: true,
    },
    {
      id: "flowInfo",
      question: "How is the flow right now?",
      options: [
        {
          symptomId: "lightFlow",
        },
        {
          symptomId: "mediumFlow",
        },
        {
          symptomId: "heavyFlow",
        },
      ],
      buttons: [
        {
          text: "Save Details",
          action: "saveSymptom",
          nextId: "symptomCheck",
        },
      ],
      optionType: "singleSelect",
      hidePresent: true,
      viewStyle: "bottomsheet",
      themeColor: "red",
    },
    {
      id: "symptomCheck",
      question: "Do you face any other symptoms?",
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

export const getSymptoms = (): OptionInterface[] => {
  return [
    { symptomId: "cramps" },
    { symptomId: "bloating" },
    { symptomId: "fatigue" },
    { symptomId: "cravings" },
    { symptomId: "nausea" },
    { symptomId: "headache" },
    { symptomId: "diarrhoea" },
    { symptomId: "constipation" },
    { symptomId: "abdominal_pain" },
    { symptomId: "insomia" },
    { symptomId: "acne" },
    { symptomId: "breast_tenderness" },
    { symptomId: "back_ache" },
  ];
};

export const createSymptomReliefQuestion = (
  symptoms: loggedSymptomDB[],
): questionResponse[] => {
  return [
    {
      question: "Did you get relief from:",
      hidePresent: true,
      options: symptoms.map((item) => ({ symptomId: item.symptomId })),
      buttons: [
        {
          text: "Yes, I did",
          action: "resolveSymptom",
        },
        {
          text: "No",
          action: "escalateSymptom",
        },
      ],
      viewStyle: "popup",
      id: "symptomRelief",
    },
  ];
};

export const createPeriodEndQuestion = (): questionResponse[] => {
  return [
    {
      question: "Did your period end?",
      hidePresent: true,
      buttons: [
        {
          text: "Yes, it did",
          action: "removePeriodToday",
        },
        {
          text: "No",
          action: "addPeriodToday",
        },
      ],
      viewStyle: "popup",
      id: "didYourPeriodEnd",
    },
  ];
};
