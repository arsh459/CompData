// import { OpenAIApi, Configuration } from "openai";
import {
  GPTMessage,
  gptModels,
  gptTaskType,
} from "../../../../models/Room/Room";
import * as admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { openai } from "../../chat/handleGPTQuery";
import OpenAI from "openai";

export const fetchGptResponse = async (
  messages: GPTMessage[],
  model: gptModels,
  temperature: number = 1,
  top_p: number = 1,
  max_tokens: number = 150,
  presence_penalty: number = 1,
  frequency_penalty: number = 1,
  type: gptTaskType,
  uid: string,
) => {
  try {
    const response = await openai.chat.completions.create({
      messages,
      model,
      temperature,
      top_p,
      max_tokens,
      presence_penalty,
      frequency_penalty,
    });

    let formattedResponse = response; // TurboResponse;

    await archiveResponse(
      formattedResponse,
      uid,
      type,
      model,
      process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY : "",
      messages[messages.length - 1],
      temperature,
      top_p,
      max_tokens,
      presence_penalty,
      frequency_penalty,
    );

    return formattedResponse;
  } catch (error) {
    return undefined;
  }
};

const archiveResponse = async (
  response: OpenAI.Chat.Completions.ChatCompletion, // TurboResponse,
  uid: string,
  type: string,
  model: gptModels,
  OPENAI_API_KEY: string,
  initMessage: GPTMessage,
  temperature: number = 1,
  top_p: number = 1,
  max_tokens: number = 1000,
  presence_penalty: number = 0,
  frequency_penalty: number = 0,
) => {
  let id = uuidv4();
  await admin
    .firestore()
    .collection("gptResponses")
    .doc(id)
    .set({
      ...response,
      uid,
      type,
      createdOn: Date.now(),
      initMessage,
      details: {
        model,
        OPENAI_API_KEY,
        temperature,
        top_p,
        max_tokens,
        presence_penalty,
        frequency_penalty,
      },
    });
};
