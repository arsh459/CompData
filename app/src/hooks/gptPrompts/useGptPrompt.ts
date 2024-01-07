import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { gptPrompts, gptTaskType } from "@models/config/config";
import { Tool } from "@models/config/Tools";
import { fetchToolObjects } from "@utils/GptToolsFunction";

export const useGPTPrompt = (type: gptTaskType) => {
  const [gptPrompt, setGPTPrompt] = useState<gptPrompts>();
  const [tools, setTools] = useState<Tool[]>([]);
  useEffect(() => {
    const listener = firestore()
      .collection("gptPrompts")
      .where("type", "==", type)
      .onSnapshot((remodocs) => {
        if (remodocs.docs.length) {
          const gptPromptFetched = remodocs.docs[0].data() as gptPrompts;
          const toolObjectArray = fetchToolObjects(gptPromptFetched.tools);
          setTools(toolObjectArray);
          setGPTPrompt(gptPromptFetched);
        }
      });

    return () => {
      listener();
    };
  }, [type]);

  return {
    gptPrompt,
    tools,
  };
};
