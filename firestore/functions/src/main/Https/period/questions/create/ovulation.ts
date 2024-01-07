import { questionResponse } from "../interface";

export const createMilkyWhiteDischargeQuestion = (): questionResponse[] => {
  return [
    {
      question: "Did you see a milky white discharge?",
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
      underlineButton: {
        text: "Don't ask me these questions",
        action: "dontAskPrivateQuestions",
        nextId: "questionApology",
      },

      viewStyle: "popup",
      id: "ovulation_white_discharge",
    },
    {
      question:
        "We apologise if you felt uncomfortable. We won't ask you questions regarding discharge or sexual wellness. Be rest assured that all interaction with the period tracker is 100% private.\n\nYou can change the privacy settings on top right.",
      hidePresent: true,
      buttons: [],
      id: "questionApology",
      viewStyle: "popup",
    },
  ];
};
