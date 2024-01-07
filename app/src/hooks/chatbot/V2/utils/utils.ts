import { sakhiStateTypes } from "@hooks/chatbot/V2/useSakhiV2";
import { ChatMessage } from "@models/ChatBot/interface";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const callSakhi = (
  chatMessages: ChatMessage[],
  setSakhiState: (state: sakhiStateTypes) => void,
  onboardingDone?: boolean
) => {
  if (
    (!chatMessages.length ||
      chatMessages[0].role === "user" ||
      chatMessages[0].role === "tool" ||
      chatMessages[0].tool_calls) &&
    onboardingDone
  ) {
    if (
      chatMessages[0] &&
      (chatMessages[0].role === "tool" || chatMessages[0].tool_calls)
    )
      setSakhiState("ANALYZING");
    else setSakhiState("FETCHING");
    return true;
  }

  // role:- user , text
  // role :assistant - text, tool_calls
  // role : tool , strifiedResponse

  return false;
};

export const getUpdatedMessages = (
  prevMessages: ChatMessage[],
  message: string
) => {
  const lastMessage = prevMessages[0];
  let updatedArray: ChatMessage[] = [];
  if (!lastMessage) {
    updatedArray = [
      {
        id: uuidv4(),
        createdOn: Date.now(),
        content: message,
        role: "assistant",
      },
    ];
  } else if (lastMessage.role !== "assistant") {
    updatedArray = [
      {
        id: uuidv4(),
        createdOn: Date.now(),
        content: message,
        role: "assistant",
      },
      ...prevMessages,
    ];
  } else {
    updatedArray = [
      {
        ...prevMessages[0],
        content: message,
      },
      ...prevMessages.slice(1, prevMessages.length),
    ];
  }
  return updatedArray;
};
