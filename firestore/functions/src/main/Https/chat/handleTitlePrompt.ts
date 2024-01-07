import { ChatMessage, GPTMessage, Room } from "../../../models/Room/Room";
import { makeGPTRequest } from "./handleGPTQuery";
import { saveTitle } from "./saveResponse";

export const handleTitlePrompt = async (
  uid: string,
  room: Room,
  chat: ChatMessage[],
) => {
  if (!room.title) {
    const messagesToUse = createTitlePromptMessages(chat);
    // console.log("mess", messagesToUse);
    const turboResponse = await makeGPTRequest(messagesToUse, 200);

    const newTitleSaved = await saveTitle(uid, room.id, turboResponse);

    return newTitleSaved;
  }

  return "";
};

const createTitlePromptMessages = (chatMessages: ChatMessage[]) => {
  const messages: GPTMessage[] = [];

  for (const chatM of chatMessages) {
    if (chatM.content && chatM.role !== "tool")
      messages.push({ role: chatM.role, content: chatM.content });
  }

  // messages.push({
  //   role: "system",
  //   content: "You are Sakhi AI, A chatboat designed by SocialBoat",
  // });
  messages.push({ role: "user", content: createTitlePrompt() });

  return messages;
};

const createTitlePrompt = () => {
  return `Based on the above chat, Generate a 50 character title for the chat. The title should summarise the conversation and should not exceed the character limit. Share the title in the format : "Title:[Your generated title]"`;
};
