import { buttonParams } from "@models/ChatBot/chatBotButtonInterface";

export const getButtonParams = (buttonParameters: buttonParams) => {
  return {
    screenName: buttonParameters.screenName,
    screenParams: buttonParameters.navigationArguments,
    buttonText: buttonParameters.text,
  };
};
