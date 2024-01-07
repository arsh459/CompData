import {
  ChatMessage,
  MessageResponse,
  roleTypes,
} from "@models/ChatBot/interface";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

export const getMessageColor = (role: roleTypes) => {
  switch (role) {
    case "system":
      return "#D7D5E266";
    case "assistant":
      return "#D7D5E2";
    case "user":
      return "#C1B7FF";
    default:
      return "#C1B7FF";
  }
};

export const sortMessages = (messages: ChatMessage[]) => {
  return messages.sort((a, b) => (a.createdOn > b.createdOn ? -1 : 1));
};

export const createNewMessageRes = () => {
  const id = uuid();
  const now = Date.now();

  return {
    id,
    createdOn: now,
    updatedOn: now,
    numMessages: 0,
    messages: [],
  } as MessageResponse;
};
