import { GPTChoice } from "@models/ChatBot/interface";
import { GptNutrientData } from "@modules/AddNewItemLoading/utils/gpt";
import { validateParsedContent } from "@modules/AddNewItemLoading/utils/validation";
import * as Sentry from "@sentry/react-native";

export const parseResponse = (response: GPTChoice[]) => {
  try {
    let parsedContentReceived = JSON.parse(response[0].message.content) as
      | GptNutrientData
      | GptNutrientData[]
      | { error?: string };

    return parsedContentReceived;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export function validateParsed(
  parsedContent:
    | GptNutrientData
    | GptNutrientData[]
    | {
        error?: string | undefined;
      }
) {
  Sentry.addBreadcrumb({
    category: "gpt",
    level: "info",
    message: `parsedContentReceived`,
    data: {
      response: parsedContent,
    },
  });

  if (typeof parsedContent !== "object") {
    console.log("NOT AN OBJECT", parsedContent);
    Sentry.addBreadcrumb({
      category: "gpt",
      level: "error",
      message: "Please Try again with valid meal name",
    });
    return undefined;
  }
  if (!Array.isArray(parsedContent)) {
    let updatedParsedContent = parsedContent as
      | GptNutrientData
      | {
          error?: string | undefined;
        };

    let errorParsedContent = updatedParsedContent as {
      error?: string | undefined;
    };
    if (errorParsedContent.error) {
      console.log("Error in response", parsedContent);
      Sentry.addBreadcrumb({
        category: "gpt",
        level: "error",
        message: "Please Try again with valid meal name",
      });
      return undefined;
    } else {
      let nutrientObject = [updatedParsedContent as GptNutrientData];
      if (!validateParsedContent(nutrientObject)) {
        console.log("dataValidationFailed", parsedContent);
        Sentry.addBreadcrumb({
          category: "gpt",
          level: "error",
          message: "validationFailed",
          data: {
            parsedData: parsedContent,
          },
        });
        return undefined;
      }
      return nutrientObject;
    }
  }

  let finalObject = parsedContent as GptNutrientData[];

  if (!finalObject[0]) {
    console.log("EMPTY ARRAY", parsedContent);
    Sentry.addBreadcrumb({
      category: "gpt",
      level: "error",
      message: "Please Try again with valid meal name II",
    });
    return undefined;
  }

  if (!validateParsedContent(finalObject)) {
    console.log("dataValidationFailed", parsedContent);
    Sentry.addBreadcrumb({
      category: "gpt",
      level: "error",
      message: "validationFailed",
      data: {
        parsedData: parsedContent,
      },
    });
    return undefined;
  }
  return finalObject;
}
