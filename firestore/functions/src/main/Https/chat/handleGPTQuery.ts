import { getMessages } from "../../../models/Room/Methods";
import {
  ChatMessage,
  GPTMessage,
  Room,
  genImageResponseFormat,
  genImageSizes,
} from "../../../models/Room/Room";
import { createSystemPrompt } from "./initialPrompts";
import OpenAI from "openai";
import { saveResponse } from "./saveResponse";
import { gptConfig } from "../../../models/Room/constants";
import { createPromptsForUserToAsk } from "./createPrompts";

// import { streamCompletion } from "@fortaine/openai/stream";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// console.log("process", process.env.OPENAI_API_KEY);

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY : "",
});

// const openai = new OpenAIApi(configuration);

export const handleGPTQuery = async (
  uid: string,
  room: Room,
  // responseLength: number,
) => {
  // system prompt does not exist
  let systemPrompt: string = "";
  if (!room?.systemPrompt) {
    systemPrompt = await createSystemPrompt(uid);
  } else {
    systemPrompt = room.systemPrompt;
  }

  ///// fetch all message responses
  const { lastResponse, chatMessages } = await getMessages(uid, room.id);

  ///// make query
  const messagesToSend = createChatGPTMessages(systemPrompt, chatMessages);

  // console.log("m", messagesToSend);
  // throw new Error("hi");

  const turboResponse = await makeGPTRequest(messagesToSend, 2000);
  console.log("title response", turboResponse);

  ///// add response to messages
  await saveResponse(uid, room, turboResponse, systemPrompt, lastResponse);

  // prompts
  await createPromptsForUserToAsk(uid, room.id, chatMessages);

  //// additional updates
  ///// get RTDB status

  //// handle image update

  ///// increment unreadMessages if needed
  ///// push notification if messaage is inc
};

const createChatGPTMessages = (
  systemPrompt: string,
  chatMessages: ChatMessage[],
) => {
  const messages: GPTMessage[] = [];

  messages.push({
    role: "system",
    content: "You are Sakhi AI, A chatboat designed by SocialBoat",
  });
  messages.push({ role: "user", content: systemPrompt });

  for (const chatMessage of chatMessages) {
    if (chatMessage.role !== "tool") {
      messages.push({ role: chatMessage.role, content: chatMessage.content });
    }
  }

  return messages;
};

export const makeDaliRequest = async (
  prompt: string,
  uid: string,
  size: genImageSizes,
  response_format: genImageResponseFormat,
) => {
  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: size,
      response_format: response_format,
      user: uid,
    });

    // const response = await openai.createImage({
    //   prompt: prompt,
    //   n: 1,
    //   size: size,
    //   response_format: response_format,
    //   user: uid,
    // });

    response.data;

    if (response.data.length) {
      return response.data;
    }

    return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const makeGPTRequest = async (
  contextMessages: GPTMessage[],
  max_tokens: number,
) => {
  const response = await openai.chat.completions.create({
    model: gptConfig.model,
    messages: contextMessages,
  });

  // const response = await openai.createChatCompletion({
  //   model: gptConfig.model,
  //   messages: contextMessages,

  //   // max_tokens: max_tokens,
  // });

  // response

  return response; // as TurboResponse;
};

// export const makeGPTStreamRequest = async (contextMessages: GPTMessage[]) => {
//   const response = await openai.createChatCompletion(
//     {
//       model: gptConfig.model,
//       messages: contextMessages,
//       stream: true,
//       // max_tokens: max_tokens,
//     },
//     { responseType: "stream" },
//   );

//   console.log("response", response);
// };
