import {
  GPTMessage,
  TurboResponse,
  gptModels,
  GPTVisionMessage,
} from "@models/ChatBot/interface";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { periodDateType } from "@models/User/User";
import axios from "axios";

import { EmojiItem_dep } from "./useSakhiInsights";
import crashlytics from "@react-native-firebase/crashlytics";
import * as Sentry from "@sentry/react-native";
import firestore from "@react-native-firebase/firestore";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
// import { promptTrainingForCustomRecipe } from "./PromptTrainingForCustomRecipe";

export const createBaseUserMessage = (
  type: periodDateType,
  dayNumber: number,
  currentCycleLength: number
  // currentPeriodLength: number,
  // hasPCOS: boolean,
  // goal: periodTrackerGoal
) => {
  return `${getCurrentCycleLength(currentCycleLength)}${getCurrentPhase(
    type,
    dayNumber
  )}`;
};

export const createInitialGPTMessages = (baseMessage: string): GPTMessage[] => {
  return [
    {
      role: "user",
      content: baseMessage,
    },
  ];
};

const getCurrentCycleLength = (currentCycleLength: number) => {
  return `Current Cycle Length: ${currentCycleLength}\n`;
};

// const getCurrentPeriodLength = (currentPeriodLength: number) => {
//   return `Current Period Length: ${currentPeriodLength}\n`;
// };

// const hasPCOSString = (hasPCOS: boolean) => {
//   return hasPCOS ? `Has PCOS\n` : "";
// };

// const getGoalOfUser = (goal: string) => {
//   return goal ? `Goal: ${goal}\n` : "";
// };

const getCurrentPhase = (type: periodDateType, dayNumber: number) => {
  return `Current Phase: ${type}, Day ${dayNumber}\n`;
};

export const parseInsightsFromResponse = (input: string) => {
  let lines = input.split("\n");

  // Filter out any empty strings that might be created by split
  lines = lines.filter((line) => line.trim() !== "");

  // Now, we'll split each line by '. ' to separate the number from the rest of the line
  // Then, we'll map each line to remove the number and just keep the rest of the line
  let items: EmojiItem_dep[] = lines.map((line) => {
    let splitLine = line.split(". ");

    // If the line was successfully split into two parts, return the second part (index 1)
    // Otherwise, just return the original line
    if (splitLine.length === 2) {
      let itemPart = splitLine[1];
      let emoji = itemPart.substr(0, itemPart.indexOf(" "));
      let text = itemPart.substr(itemPart.indexOf(" ") + 1);
      return { emoji, text };
    } else {
      return { emoji: "", text: line };
    }
  });

  return items;
};

export const makeInsightsCall = async (
  messages: GPTMessage[],
  model: gptModels,
  OPENAI_API_KEY: string,
  stream: boolean = false,
  temperature: number = 1,
  top_p: number = 1,
  max_tokens: number = 150,
  presence_penalty: number = 1,
  frequency_penalty: number = 1
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };

    const data = {
      model: model,
      messages: messages,
      temperature: temperature,
      top_p: top_p,
      max_tokens: max_tokens,
      presence_penalty: presence_penalty,
      frequency_penalty: frequency_penalty,
      stream: stream,
    };

    const response = await axios({
      url: "https://api.openai.com/v1/chat/completions",
      method: "POST",
      headers,
      data: data,
    });

    const formatted = response.data as TurboResponse;
    return formatted;
  } catch (error: any) {
    console.log(error);
    crashlytics().recordError(error);
  }
};

export const makeGptNutritionCall = async (
  messages: (GPTMessage | GPTVisionMessage)[],
  model: gptModels,
  OPENAI_API_KEY: string,
  temperature: number = 1,
  top_p: number = 1,
  max_tokens: number = 1000,
  presence_penalty: number = 0,
  frequency_penalty: number = 0,
  uid: string,
  prompt: string
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };

    console.log("using model", model);
    Sentry.addBreadcrumb({
      category: "gpt",
      level: "info",
      message: `messages:${messages.length} | model:${model} | temperature:${temperature} | top_p:${top_p} | max_tokens:${max_tokens}`,
    });

    const data = {
      model: model,
      messages: messages,
      temperature: temperature,
      top_p: top_p,
      max_tokens: max_tokens,
      presence_penalty: presence_penalty,
      frequency_penalty: frequency_penalty,
    };

    const response = await axios({
      url: "https://api.openai.com/v1/chat/completions",
      method: "POST",
      headers,
      data: data,
    });

    const formatted = response.data as TurboResponse;

    archiveResponse(
      uid,
      prompt,
      model,
      OPENAI_API_KEY,
      messages[messages.length - 1],
      temperature,
      top_p,
      max_tokens,
      presence_penalty,
      frequency_penalty,
      formatted
    );

    return formatted;
  } catch (error: any) {
    let initMessage;
    try {
      initMessage =
        messages && Array.isArray(messages) && messages.length > 0
          ? {
              role: "user",
              content: messages[messages.length - 1].content
                ? JSON.parse(
                    JSON.stringify(messages[messages.length - 1].content)
                  )
                : "UNDEFINED VALUE",
            }
          : {
              role: "user",
              content: "NO MESSAGE PROVIDED",
            };
    } catch (e) {
      initMessage = {
        role: "user",
        content: "CONTENT NOT PARSABLE MEANS SOME UNDEFINED VALUE IS THERE",
      };
    }

    archiveResponse(
      uid ? uid : "",
      prompt ? prompt : "",
      model ? model : "gpt-3.5-turbo",
      OPENAI_API_KEY ? OPENAI_API_KEY : "",
      initMessage as GPTMessage | GPTVisionMessage,
      temperature,
      top_p,
      max_tokens,
      presence_penalty,
      frequency_penalty,
      undefined,
      JSON.stringify(error)
    );

    console.log(error);
    crashlytics().recordError(error);
  }
};

export const archiveResponse = async (
  uid: string,
  type: string,
  model: gptModels,
  OPENAI_API_KEY: string,
  initMessage: GPTMessage | GPTVisionMessage,
  temperature: number = 1,
  top_p: number = 1,
  max_tokens: number = 1000,
  presence_penalty: number = 0,
  frequency_penalty: number = 0,
  response?: TurboResponse,
  errorMessage?: string
) => {
  let responseToStore = response ? response : createDummyResponse();

  await firestore()
    .collection("gptResponses")
    .doc()
    .set({
      ...responseToStore,
      ...(errorMessage ? { errorMessage: errorMessage } : {}),
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

export const makeCustomRecipeCall = async (
  messages: GPTMessage[],
  model: gptModels,
  OPENAI_API_KEY: string,
  stream: boolean = false,
  temperature: number = 1,
  top_p: number = 1,
  max_tokens: number = 2000,
  presence_penalty: number = 0,
  frequency_penalty: number = 0
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };

    const data = {
      model: model,
      messages: [...messages],
      temperature: temperature,
      top_p: top_p,
      max_tokens: max_tokens,
      presence_penalty: presence_penalty,
      frequency_penalty: frequency_penalty,
      stream: stream,
    };

    const response = await axios({
      url: "https://api.openai.com/v1/chat/completions",
      method: "POST",
      headers,
      data: data,
    });

    const formatted = response.data as TurboResponse;
    // console.log("response", formatted.choices[0].message.content);

    // archiveResponse(
    //   formatted,
    //   uid,
    //   prompt,
    //   model,
    //   OPENAI_API_KEY,
    //   messages[messages.length - 1],
    //   temperature,
    //   top_p,
    //   max_tokens,
    //   presence_penalty,
    //   frequency_penalty
    // );

    return formatted;
  } catch (error: any) {
    console.log(error);
    crashlytics().recordError(error);
  }
};

export const fetchGptResponse = async (
  messages: (GPTMessage | GPTVisionMessage)[],
  model: gptModels,
  OPENAI_API_KEY: string,
  temperature: number = 1,
  top_p: number = 1,
  max_tokens: number = 2000,
  presence_penalty: number = 0,
  frequency_penalty: number = 0,
  uid: string,
  prompt: string
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    };

    console.log("using model", model);
    Sentry.addBreadcrumb({
      category: "gpt",
      level: "info",
      message: `messages:${messages.length} | model:${model} | temperature:${temperature} | top_p:${top_p} | max_tokens:${max_tokens}`,
    });

    const data = {
      model: model,
      messages: messages,
      temperature: temperature,
      top_p: top_p,
      max_tokens: max_tokens,
      presence_penalty: presence_penalty,
      frequency_penalty: frequency_penalty,
    };

    // console.log(
    //   "data inside the function",
    //   data.messages[messages.length - 1].content
    // );

    const response = await axios({
      url: "https://api.openai.com/v1/chat/completions",
      method: "POST",
      headers,
      data: data,
    });

    // console.log("response", response);
    const formatted = response.data as TurboResponse;
    // console.log(formatted.choices[0].message.content);

    weEventTrack("GptRequestSuccess", {});

    archiveResponse(
      uid,
      prompt,
      model,
      OPENAI_API_KEY,
      messages[messages.length - 1],
      temperature,
      top_p,
      max_tokens,
      presence_penalty,
      frequency_penalty,
      formatted
    );

    return formatted;
  } catch (error: any) {
    let initMessage;
    try {
      initMessage =
        messages && Array.isArray(messages) && messages.length > 0
          ? {
              role: "user",
              content: messages[messages.length - 1].content
                ? JSON.parse(
                    JSON.stringify(messages[messages.length - 1].content)
                  )
                : "UNDEFINED VALUE",
            }
          : {
              role: "user",
              content: "NO MESSAGE PROVIDED",
            };
    } catch (e) {
      initMessage = {
        role: "user",
        content: "CONTENT NOT PARSABLE MEANS SOME UNDEFINED VALUE IS THERE",
      };
    }

    archiveResponse(
      uid ? uid : "",
      prompt ? prompt : "",
      model ? model : "gpt-3.5-turbo",
      OPENAI_API_KEY ? OPENAI_API_KEY : "",
      initMessage as GPTMessage | GPTVisionMessage,
      temperature,
      top_p,
      max_tokens,
      presence_penalty,
      frequency_penalty,
      undefined,
      JSON.stringify(error)
    );

    weEventTrack("GptRequestFailed", {});

    console.log("error in fetchGptResponse", error);
    crashlytics().recordError(error);

    return undefined;
  }
};

// export const fetchImageGptResponse = async (
//   messages: GPTVisionMessage[],
//   model: gptModels,
//   OPENAI_API_KEY: string,
//   temperature: number = 1,
//   top_p: number = 1,
//   max_tokens: number = 4000,
//   presence_penalty: number = 0,
//   frequency_penalty: number = 0,
//   uid: string,
//   prompt: string
// ) => {
//   try {
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${OPENAI_API_KEY}`,
//     };

//     console.log("using model", model);
//     Sentry.addBreadcrumb({
//       category: "gpt",
//       level: "info",
//       message: `messages:${messages.length} | model:${model} | temperature:${temperature} | top_p:${top_p} | max_tokens:${max_tokens}`,
//     });

//     const data = {
//       model: model,
//       messages: messages,
//       temperature: temperature,
//       top_p: top_p,
//       max_tokens: max_tokens,
//       presence_penalty: presence_penalty,
//       frequency_penalty: frequency_penalty,
//     };

//     const response = await axios({
//       url: "https://api.openai.com/v1/chat/completions",
//       method: "POST",
//       headers,
//       data: data,
//     });

//     const formatted = response.data as TurboResponse;

//     archiveResponse(
//       formatted,
//       uid,
//       prompt,
//       model,
//       OPENAI_API_KEY,
//       messages[messages.length - 1],
//       temperature,
//       top_p,
//       max_tokens,
//       presence_penalty,
//       frequency_penalty
//     );

//     return formatted;
//   } catch (error: any) {
//     console.log(error);
//     crashlytics().recordError(error);
//   }
// };

export const createDummyResponse = () => {
  let id = uuidv4();
  let response: TurboResponse = {
    id: id,
    created: Date.now(),
    model: "gpt-4-1106-preview",
    usage: {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0,
    },
    object: "chat.completion",
    choices: [
      {
        message: {
          role: "user",
          content: "IT IS A DUMMY RESPONSE CREATED FOR DASHBOARD STABILITY.",
        },
        finish_reason: "stop",
        index: 0,
      },
    ],
  };

  return response;
};
