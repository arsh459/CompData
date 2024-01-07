import { GPTChoice } from "@models/ChatBot/interface";
import * as Sentry from "@sentry/react-native";

export const parseItemsResponse = (response: GPTChoice[]) => {
  try {
    let parsedContentReceived = JSON.parse(response[0].message.content) as
      | { items: string[] }
      | { error?: string };

    return parsedContentReceived;
  } catch (error) {
    Sentry.addBreadcrumb({
      category: "gpt",
      level: "error",
      message: "invalid json imageItemsGeneration parser",
    });
    console.log("error", error);
    return undefined;
  }
};
export const parseItemsResponseV2 = (response: GPTChoice[]) => {
  try {
    let parsedContentReceived = JSON.parse(response[0].message.content) as
      | { items: string[][] }
      | { error?: string };

    return parsedContentReceived;
  } catch (error) {
    Sentry.addBreadcrumb({
      category: "gpt",
      level: "error",
      message: "invalid json imageItemsGenerationV2 parser",
    });
    console.log("error", error);
    return undefined;
  }
};

export const validateItemsParsed = (
  content: { items: string[] } | { error?: string } | undefined
) => {
  // console.log(content);
  if (content && content.hasOwnProperty("items")) {
    let updatedContent = content as { items: string[] };
    if (
      Array.isArray(updatedContent.items) &&
      updatedContent.items.length > 0
    ) {
      return content as { items: string[] };
    }
  }

  Sentry.addBreadcrumb({
    category: "gpt",
    level: "error",
    message: "validateItemsParsed format error",
  });
  console.log("error", "validateItemsParsed format error");
  return undefined;
};

export const validateItemsParsedV2 = (
  content: { items: string[][] } | { error?: string } | undefined
) => {
  // console.log(content);
  if (content && content.hasOwnProperty("items")) {
    let updatedContent = content as { items: string[][] };
    if (
      Array.isArray(updatedContent.items) &&
      updatedContent.items.length > 0 &&
      validateEachItem(updatedContent.items)
    ) {
      return content as { items: string[][] };
    }
  }

  Sentry.addBreadcrumb({
    category: "gpt",
    level: "error",
    message: "validateItemsParsed format error",
  });
  console.log("error", "validateItemsParsed format error");
  return undefined;
};

export const validateEachItem = (items: string[][]) => {
  let flag = true;
  items.forEach((item) => {
    if (
      !(Array.isArray(item) && item.length > 0 && validateEachSubItem(item))
    ) {
      flag = false;
    }
  });

  return flag;
};
export const validateEachSubItem = (item: string[]) => {
  let subItemFlag = true;
  item.forEach((subItem) => {
    if (typeof subItem !== "string") {
      subItemFlag = false;
    }
  });

  return subItemFlag;
};
