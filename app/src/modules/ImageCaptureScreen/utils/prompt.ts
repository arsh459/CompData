import firestore from "@react-native-firebase/firestore";
import { gptPrompts, gptTaskType } from "@models/config/config";
import * as Sentry from "@sentry/react-native";
export const fetchPromptByType = async (type: gptTaskType) => {
  const promptDocs = await firestore()
    .collection("gptPrompts")
    .where("type", "==", type)
    .get();

  if (promptDocs && promptDocs.docs[0]) {
    return promptDocs.docs[0].data() as gptPrompts;
  }

  console.log(`Not able to fetch ${type} prompt`);
  Sentry.addBreadcrumb({
    category: "gpt",
    level: "error",
    message: `Not able to fetch ${type} prompt`,
  });
  return undefined;
};
