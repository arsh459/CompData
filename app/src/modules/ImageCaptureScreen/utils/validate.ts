import { GPTChoice, TurboResponse } from "@models/ChatBot/interface";
import * as Sentry from "@sentry/react-native";
export function validateResponse(gptResponse: TurboResponse | undefined) {
  try {
    Sentry.addBreadcrumb({
      category: "gpt",
      level: "info",
      message: `gpt response fetched`,
    });
    if (!gptResponse) {
      Sentry.addBreadcrumb({
        category: "gpt",
        level: "info",
        message: `gpt response undefined`,
      });
      console.log("gpt Response Undefined");
      return undefined;
    }

    let response = gptResponse.choices as GPTChoice[];

    if (response.length === 0) {
      console.log("No item present");
      Sentry.addBreadcrumb({
        category: "gpt",
        level: "error",
        message: `No item present`,
      });
      return undefined;
    }

    if (!response[0].message || !response[0].message.content) {
      console.log("No message or content");
      Sentry.addBreadcrumb({
        category: "gpt",
        level: "error",
        message: `No Message or content present`,
      });
      return undefined;
    }
    return gptResponse;
  } catch (error) {
    console.log("Error thrown While validation");
    return undefined;
  }
}
