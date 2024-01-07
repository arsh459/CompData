import { AutoRoomIDs } from "@models/ChatBot/insights";
import {
  guidelinesForDiet,
  guidelinesForYoga,
  prefixForDiet,
  prefixForYoga,
} from "./constants";
import { EmojiItem } from "@hooks/chatbot/insights/useSakhiInsightsV2";

export const yogaDetailCreator = (name: string) => {
  return `${prefixForYoga}${name}.${guidelinesForYoga}`;
};

export const dietDetailCreator = (name: string, reason: string) => {
  return `${prefixForDiet}
  ${name}
  ${reason}
  .${guidelinesForDiet}`;
};

export const initPromptCreator = (roomId: AutoRoomIDs, item: EmojiItem) => {
  if (roomId === "DIET") {
    return dietDetailCreator(item.name, item.reason);
  } else {
    return yogaDetailCreator(item.name);
  }
};

export const createPrompts = (roomId: AutoRoomIDs, item: EmojiItem) => {
  if (roomId === "DIET") {
    return [
      `Suggest recipes similar to ${item.name}`,
      `Suggest a recipee that can regularise my cycle`,
      // `Suggest a super foods that help in cramps`,
    ];
  } else {
    return [
      `Suggest asans similar to ${item.name}`,
      `Suggest asans that can help in stress`,
      // `Should I be working out in periods?`,
    ];
  }
};
