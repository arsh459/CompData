import {
  ChatMessage,
  GPTMessage,
  // TurboResponse,
} from "../../../models/Room/Room";
import { UserInterface } from "../../../models/User/User";
import { makeGPTRequest } from "./handleGPTQuery";
import { createUserPrompt } from "./initialPrompts";
import { savePrompts, saveUserPrompts } from "./saveResponse";

export const createPromptsForUserHome = async (user: UserInterface) => {
  const gptMessagesToSend = createMessagesForGeneralUserPrompt(user);
  console.log("gpt messages", gptMessagesToSend);

  const promptTurboResponse = await makeGPTRequest(gptMessagesToSend, 300);

  if (promptTurboResponse.choices.length) {
    const finalArrayToSave = getPromptArray(
      promptTurboResponse.choices[0].message?.content
        ? promptTurboResponse.choices[0].message?.content
        : "",
    );

    // console
    console.log("generating prompts for user", finalArrayToSave);

    if (finalArrayToSave.length)
      await saveUserPrompts(user.uid, finalArrayToSave);
  }
};

export const createPromptsForUserToAsk = async (
  uid: string,
  roomId: string,
  chatMessages: ChatMessage[],
  // response: TurboResponse,
) => {
  const gptMessagesToSend = createMessagesForPrompt(chatMessages);

  // console.log("gpt messages", gptMessagesToSend);

  const promptTurboResponse = await makeGPTRequest(gptMessagesToSend, 300);

  if (promptTurboResponse.choices.length) {
    const finalArrayToSave = getPromptArray(
      promptTurboResponse.choices[0].message?.content
        ? promptTurboResponse.choices[0].message?.content
        : "",
    );

    await savePrompts(uid, roomId, finalArrayToSave);
  }
};

const getPromptArray = (prompts: string) => {
  const promptResponse = prompts.split("Prompts:");
  // console.log("original", prompts);
  if (promptResponse.length === 2) {
    // let regex = /(\d+\.\d*)\s?(.*?)(?=\d+\.|$)/gs;

    let matches = promptResponse[1].split(/\d+\.\s+/);
    // let matches = promptResponse[1].match(regex);
    // console.log(matches);

    // const promptArray = promptResponse[1].split(",");
    if (matches.length) {
      const matchesTrim = matches.map((item) =>
        item.replace(/[“”‘’"'`]/g, "").trim(),
      );
      const filtered = matchesTrim.filter((item) => item !== "");
      if (filtered.length === 4) {
        return filtered;
      } else {
        return [];
      }
    }
  }

  return [];
};

const createMessagesForGeneralUserPrompt = (user: UserInterface) => {
  const gptMessages: GPTMessage[] = [];

  gptMessages.push({
    role: "user",
    content: createUserPrompt(user),
  });

  return gptMessages;
};

const createMessagesForPrompt = (
  chatMessages: ChatMessage[],
  // response: TurboResponse,
) => {
  const gptMessages: GPTMessage[] = [];
  for (const chatMessage of chatMessages) {
    if (chatMessage.content && chatMessage.role !== "tool") {
      console.log("chat", chatMessage.content);
      gptMessages.push({
        role: chatMessage.role,
        content: chatMessage.content,
      });
    }
  }

  // if (response.choices.length) {
  //   const responseFromGPT = response.choices[0];

  //   gptMessages.push({
  //     role: "assistant",
  //     content: responseFromGPT.message.content,
  //   });
  // }

  gptMessages.push({
    role: "user",
    content: `Based on the above chat, create 4 prompt questions that I can ask you. Each prompt should be less than 150 characters and something that we have not discussed before. Respond in the following format  - "Prompts: 1. [PROMPT 1] 2. [PROMPT 2] 3. [PROMPT 3] 4. [PROMPT 4]"`,
  });

  return gptMessages;
};
