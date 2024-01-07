import { buttonParams } from "@models/ChatBot/chatBotButtonInterface";
import { ChatMessage } from "@models/ChatBot/interface";
import { ToolCall } from "@models/config/Tools";

export const getUpdatedMessageForButton = <
  T extends ChatMessage,
  U extends ToolCall,
  V extends buttonParams
>(
  message: T,
  functionCall: U,
  response: V
) => {
  if (response) {
    let formattedResponse = response;
    if (formattedResponse?.type) {
      switch (functionCall.function.name) {
        case "go_to_meal_screen":
        case "go_to_diet_plan_screen":
          if (formattedResponse?.type === functionCall.function.name) {
            let updatedChatMessage: ChatMessage = {
              ...message,
              buttonParams: formattedResponse,
            };
            return updatedChatMessage;
          }
          return message;

        default:
          return message;
      }
    }
  }

  return message;
};
