import { gptPrompts, gptTaskType } from "@models/config/config";
import { Tool } from "@models/config/Tools";
import firestore from "@react-native-firebase/firestore";
import { fetchToolObjects } from "@utils/GptToolsFunction";
export const fetchGptPromptByType = async (type: gptTaskType) => {
  let toolObjectArray: Tool[] = [];
  let gptPromptFetched: gptPrompts | undefined = undefined;
  let gptPrompt = await firestore()
    .collection("gptPrompts")
    .where("type", "==", type)
    .get();

  if (gptPrompt && gptPrompt.docs && gptPrompt.docs.length) {
    gptPromptFetched = gptPrompt.docs[0].data() as gptPrompts;
    toolObjectArray = fetchToolObjects(gptPromptFetched.tools);
  }

  return {
    gptPromptFetched: gptPromptFetched,
    toolObjectArray: toolObjectArray,
  };
};
