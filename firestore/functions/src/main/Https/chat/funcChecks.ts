import { ChatMessage } from "../../../models/Room/Room";

export const handleChatCheck = (chatMessages: ChatMessage[]) => {
  const userMessages = chatMessages.filter((item) => item.role === "user");

  return userMessages.length > 0 ? true : false;
};
