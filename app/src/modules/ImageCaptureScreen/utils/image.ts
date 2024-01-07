// import { fetchGptResponse } from "@hooks/chatbot/insights/api";
// import { useGPTPrompt } from "@hooks/gptPrompts/useGptPrompt";
import { gptPrompts } from "@models/config/config";
import { AWSMedia } from "@models/Media/MediaTypeInterface";
import { MealTypes } from "@models/Tasks/Task";
import { convertToTaskType } from "@modules/AddNewItemLoading/utils/parse";
import { storeInFireStoreDatabase } from "@modules/AddNewItemLoading/utils/saveUtils";
import { CookingType } from "@providers/AddNewItem/useAddNewItem";
import * as Sentry from "@sentry/react-native";
// import { parseResponse, validateParsed } from "./parse";
import {
  // fetchImageItems,
  fetchImageItemsV2,
  fetchImageNutrition,
} from "./subImageFunction";
// import { validateResponse } from "./validate";

// export const getImageAnalysisFromGpt = async (
//   imageUrl: string,
//   uid: string,
//   apiKey?: string,
//   cookingType?: CookingType,
//   mealType?: MealTypes,
//   media?: AWSMedia,
//   gptPrompt?: gptPrompts
// ) => {
//   if (!apiKey) {
//     return undefined;
//   }

//   let promptArr =
//     gptPrompt && gptPrompt?.prompt && gptPrompt.prompt ? gptPrompt.prompt : [];
//   let response = await fetchGptResponse(
//     [
//       ...promptArr,
//       {
//         role: "user",
//         content: [
//           {
//             type: "text",
//             text: "Give the result in format provided in previous response and provide it in an array or in error format ",
//           },
//           {
//             type: "image_url",
//             image_url: {
//               url: imageUrl,
//             },
//           },
//         ],
//       },
//     ],
//     gptPrompt?.model ? gptPrompt.model : "gpt-4-vision-preview",
//     apiKey,
//     gptPrompt?.temperature !== undefined ? gptPrompt?.temperature : 1,
//     gptPrompt?.top_p !== undefined ? gptPrompt?.top_p : 1,
//     gptPrompt?.max_tokens ? gptPrompt?.max_tokens : 4000,
//     gptPrompt?.presence_penalty !== undefined ? gptPrompt?.presence_penalty : 0,
//     gptPrompt?.frequency_penalty !== undefined
//       ? gptPrompt?.frequency_penalty
//       : 0,
//     uid,
//     imageUrl
//   );

//   let validatedResponse = validateResponse(response);

//   if (!validatedResponse) {
//     return undefined;
//   }

//   let parsedContent = parseResponse(validatedResponse.choices);
//   let ValidatedParsedContent = validateParsed(parsedContent);
//   if (!ValidatedParsedContent) {
//     return undefined;
//   }

//   const generateTask = convertToTaskType(
//     ValidatedParsedContent,
//     uid,
//     cookingType,
//     mealType,
//     media
//   );

//   Sentry.addBreadcrumb({
//     category: "gpt",
//     level: "info",
//     message: `generateTask`,
//     data: {
//       name: generateTask.taskObj.name,
//     },
//   });

//   const error = await storeInFireStoreDatabase(generateTask);

//   if (error) {
//     console.log("error in storing in firebase");
//     Sentry.addBreadcrumb({
//       category: "gpt",
//       level: "info",
//       message: `store in firestore`,
//       data: {
//         error: error,
//       },
//     });
//     return undefined;
//   }

//   return generateTask.taskObj.id;
// };

// export const getImageAnalysisFromGpt = async (
//   imageUrl: string,
//   uid: string,
//   apiKey?: string,
//   cookingType?: CookingType,
//   mealType?: MealTypes,
//   media?: AWSMedia,
//   gptPrompt?: gptPrompts
// ) => {
//   if (!apiKey) {
//     return undefined;
//   }

//   let itemsString = await fetchImageItems(apiKey, uid, imageUrl);
//   if (!itemsString) {
//     return undefined;
//   }

//   let ValidatedParsedContent = await fetchImageNutrition(
//     apiKey,
//     uid,
//     imageUrl,
//     itemsString
//   );

//   if (!ValidatedParsedContent) {
//     return undefined;
//   }

//   const generateTask = convertToTaskType(
//     ValidatedParsedContent,
//     uid,
//     cookingType,
//     mealType,
//     media
//   );

//   Sentry.addBreadcrumb({
//     category: "gpt",
//     level: "info",
//     message: `generateTask`,
//     data: {
//       name: generateTask.taskObj.name,
//     },
//   });

//   const error = await storeInFireStoreDatabase(generateTask);

//   if (error) {
//     console.log("error in storing in firebase");
//     Sentry.addBreadcrumb({
//       category: "gpt",
//       level: "info",
//       message: `store in firestore`,
//       data: {
//         error: error,
//       },
//     });
//     return undefined;
//   }

//   return generateTask.taskObj.id;
// };

export const getImageAnalysisFromGpt = async (
  imageUrl: string,
  uid: string,
  apiKey?: string,
  cookingType?: CookingType,
  mealType?: MealTypes,
  media?: AWSMedia,
  gptPrompt?: gptPrompts
) => {
  if (!apiKey) {
    return undefined;
  }
  console.log("imageUrl", imageUrl);
  let itemsStringArray = await fetchImageItemsV2(apiKey, uid, imageUrl);
  if (!itemsStringArray) {
    return undefined;
  }

  return itemsStringArray;

  // let ValidatedParsedContent = await fetchImageNutrition(
  //   apiKey,
  //   uid,
  //   imageUrl,
  //   itemsString
  // );

  // if (!ValidatedParsedContent) {
  //   return undefined;
  // }

  // const generateTask = convertToTaskType(
  //   ValidatedParsedContent,
  //   uid,
  //   cookingType,
  //   mealType,
  //   media
  // );

  // Sentry.addBreadcrumb({
  //   category: "gpt",
  //   level: "info",
  //   message: `generateTask`,
  //   data: {
  //     name: generateTask.taskObj.name,
  //   },
  // });

  // const error = await storeInFireStoreDatabase(generateTask);

  // if (error) {
  //   console.log("error in storing in firebase");
  //   Sentry.addBreadcrumb({
  //     category: "gpt",
  //     level: "info",
  //     message: `store in firestore`,
  //     data: {
  //       error: error,
  //     },
  //   });
  //   return undefined;
  // }

  // return generateTask.taskObj.id;
};

export const getImageNutritionAnalysisFromGpt = async (
  imageUrl: string,
  uid: string,
  itemsString: string,
  apiKey?: string,
  cookingType?: CookingType,
  mealType?: MealTypes,
  media?: AWSMedia,
  gptPrompt?: gptPrompts
) => {
  if (!apiKey) {
    return undefined;
  }

  let ValidatedParsedContent = await fetchImageNutrition(
    apiKey,
    uid,
    imageUrl,
    itemsString
  );

  if (!ValidatedParsedContent) {
    return undefined;
  }

  const generateTask = convertToTaskType(
    ValidatedParsedContent,
    uid,
    cookingType,
    mealType,
    media
  );

  Sentry.addBreadcrumb({
    category: "gpt",
    level: "info",
    message: `generateTask`,
    data: {
      name: generateTask.taskObj.name,
    },
  });

  const error = await storeInFireStoreDatabase(generateTask);

  if (error) {
    console.log("error in storing in firebase");
    Sentry.addBreadcrumb({
      category: "gpt",
      level: "info",
      message: `store in firestore`,
      data: {
        error: error,
      },
    });
    return undefined;
  }

  return generateTask.taskObj.id;
};
