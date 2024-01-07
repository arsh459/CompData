import { fetchPromptByType } from "./prompt";
// import * as Sentry from "@sentry/react-native";
import { fetchGptResponse } from "@hooks/chatbot/insights/api";
import { GPTMessage, GPTVisionMessage } from "@models/ChatBot/interface";
import { validateResponse } from "./validate";
import {
  parseItemsResponse,
  parseItemsResponseV2,
  validateItemsParsed,
  validateItemsParsedV2,
} from "./subUtilities";
import { parseResponse, validateParsed } from "./parse";

export const fetchImageItems = async (
  apiKey: string,
  uid: string,
  imageUrl: string
) => {
  const prompt = await fetchPromptByType("imageItemsGeneration");
  if (!prompt) {
    return undefined;
  }

  const messageArr: (GPTMessage | GPTVisionMessage)[] = prompt.prompt.length
    ? prompt.prompt
    : [];

  let response = await fetchGptResponse(
    [
      ...messageArr,
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
    prompt?.model ? prompt.model : "gpt-4-vision-preview",
    apiKey,
    prompt?.temperature !== undefined ? prompt?.temperature : 1,
    prompt?.top_p !== undefined ? prompt?.top_p : 1,
    prompt?.max_tokens ? prompt?.max_tokens : 4000,
    prompt?.presence_penalty !== undefined ? prompt?.presence_penalty : 0,
    prompt?.frequency_penalty !== undefined ? prompt?.frequency_penalty : 0,
    uid,
    prompt.type ? prompt.type : "na"
  );

  let validatedResponse = validateResponse(response);

  if (!validatedResponse) {
    return undefined;
  }

  let parsedContent = parseItemsResponse(validatedResponse.choices);
  let ValidatedParsedContent = validateItemsParsed(parsedContent);
  if (!ValidatedParsedContent) {
    return undefined;
  }

  return ValidatedParsedContent.items.join(",");
};

export const fetchImageItemsV2 = async (
  apiKey: string,
  uid: string,
  imageUrl: string
) => {
  const prompt = await fetchPromptByType("imageItemsGenerationV2");
  if (!prompt) {
    return undefined;
  }

  const messageArr: (GPTMessage | GPTVisionMessage)[] = prompt.prompt.length
    ? prompt.prompt
    : [];

  let response = await fetchGptResponse(
    [
      ...messageArr,
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
    prompt?.model ? prompt.model : "gpt-4-vision-preview",
    apiKey,
    prompt?.temperature !== undefined ? prompt?.temperature : 1,
    prompt?.top_p !== undefined ? prompt?.top_p : 1,
    prompt?.max_tokens ? prompt?.max_tokens : 4000,
    prompt?.presence_penalty !== undefined ? prompt?.presence_penalty : 0,
    prompt?.frequency_penalty !== undefined ? prompt?.frequency_penalty : 0,
    uid,
    prompt.type ? prompt.type : "na"
  );

  let validatedResponse = validateResponse(response);

  if (!validatedResponse) {
    return undefined;
  }

  let parsedContent = parseItemsResponseV2(validatedResponse.choices);
  let ValidatedParsedContent = validateItemsParsedV2(parsedContent);
  if (!ValidatedParsedContent) {
    return undefined;
  }

  return ValidatedParsedContent.items;
};

export const fetchImageNutrition = async (
  apiKey: string,
  uid: string,
  imageUrl: string,
  itemsString: string
) => {
  const prompt = await fetchPromptByType("imageTaskGenerationV2");
  if (!prompt) {
    return undefined;
  }
  const messageArr: (GPTMessage | GPTVisionMessage)[] = prompt.prompt.length
    ? prompt.prompt
    : [];
  let response = await fetchGptResponse(
    [
      ...messageArr,
      {
        role: "user",
        content: [
          { type: "text", text: itemsString },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
    prompt?.model ? prompt.model : "gpt-4-vision-preview",
    apiKey,
    prompt?.temperature !== undefined ? prompt?.temperature : 1,
    prompt?.top_p !== undefined ? prompt?.top_p : 1,
    prompt?.max_tokens ? prompt?.max_tokens : 4000,
    prompt?.presence_penalty !== undefined ? prompt?.presence_penalty : 0,
    prompt?.frequency_penalty !== undefined ? prompt?.frequency_penalty : 0,
    uid,
    prompt.type ? prompt.type : "na"
  );

  let validatedResponse = validateResponse(response);

  if (!validatedResponse) {
    return undefined;
  }

  let parsedContent = parseResponse(validatedResponse.choices);
  let ValidatedParsedContent = validateParsed(parsedContent);
  if (!ValidatedParsedContent) {
    return undefined;
  }

  return ValidatedParsedContent;
};
