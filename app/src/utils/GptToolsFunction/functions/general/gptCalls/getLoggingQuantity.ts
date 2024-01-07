import { fetchGptResponse } from "@hooks/chatbot/insights/api";
import { GPTChoice, gptModels } from "@models/ChatBot/interface";
import { validateResponse } from "@modules/ImageCaptureScreen/utils/validate";
import { useUserStore } from "@providers/user/store/useUserStore";
import { fetchGptPromptByType } from "../config/fetchGptPrompt";
import * as Sentry from "@sentry/react-native";

interface LoggingQuantityResultInterface {
  error: string | null;
  dishName: string;
  loggingEquivalentToRecommendedQty: number | null;
}

interface LoggingQuantityInterface {
  Step_1: string;
  Step_2: string;
  Step_3: string;
  Step_4: string;
  Step_5: string;
  Step_6: LoggingQuantityResultInterface;
  result: LoggingQuantityResultInterface;
}

export const getLoggingQuantityFromGpt = async (
  OPENAI_API_KEY: string,
  content: string,
  model?: gptModels
) => {
  const { gptPromptFetched } = await fetchGptPromptByType(
    "loggingQuantityFinder"
  );
  const uid = useUserStore.getState().user?.uid;

  if (!gptPromptFetched || !uid) {
    return undefined;
  }

  let messages =
    gptPromptFetched.prompt && gptPromptFetched.prompt.length > 0
      ? gptPromptFetched.prompt
      : [];

  const response = await fetchGptResponse(
    [...messages, { role: "user", content: content }],
    model ? model : gptPromptFetched.model ? gptPromptFetched.model : "gpt-4",
    OPENAI_API_KEY,
    gptPromptFetched.temperature != undefined
      ? gptPromptFetched.temperature
      : 0,
    gptPromptFetched.top_p != undefined ? gptPromptFetched.top_p : 1,
    gptPromptFetched.max_tokens ? gptPromptFetched.max_tokens : 4000,
    gptPromptFetched.presence_penalty != undefined
      ? gptPromptFetched.presence_penalty
      : 0,
    gptPromptFetched.frequency_penalty != undefined
      ? gptPromptFetched.frequency_penalty
      : 0,
    uid,
    gptPromptFetched.type ? gptPromptFetched.type : "na"
  );

  if (!response) {
    return undefined;
  }

  let validatedResponse = validateResponse(response);

  if (!validatedResponse) {
    return undefined;
  }

  let parsedContent = parseQuantityResponse(validatedResponse.choices);
  let ValidatedParsedContent = validateLoggingQuantity(parsedContent);
  if (!ValidatedParsedContent) {
    return undefined;
  }

  if (ValidatedParsedContent.result && ValidatedParsedContent.result.error) {
    return undefined;
  }

  console.log("validated response logging", ValidatedParsedContent.result);

  return ValidatedParsedContent.result;
};

export const parseQuantityResponse = (response: GPTChoice[]) => {
  try {
    let parsedContentReceived = JSON.parse(
      response[0].message.content
    ) as LoggingQuantityInterface;

    return parsedContentReceived;
  } catch (error) {
    Sentry.addBreadcrumb({
      category: "gpt",
      level: "error",
      message: "invalid json parseQuantityResponse parser",
    });
    console.log("error", error);
    return undefined;
  }
};

export const validateLoggingQuantity = (
  content: LoggingQuantityInterface | undefined
) => {
  if (content && content.hasOwnProperty("result")) {
    return content as LoggingQuantityInterface;
  }

  Sentry.addBreadcrumb({
    category: "gpt",
    level: "error",
    message: "validateLoggingQuantity format error",
  });
  console.log("error", "validateLoggingQuantity format error");
  return undefined;
};
