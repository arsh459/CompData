import { makeInsightsCall } from "@hooks/chatbot/insights/api";
import {
  fetchAllMessages,
  messegesToGPTMessages,
} from "@hooks/chatbot/insights/utils";
import { AutoRoomIDs } from "@models/ChatBot/insights";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export const useSuggestedPrompt = (roomId: AutoRoomIDs) => {
  const { state } = useAuthContext();
  const { config } = useConfigContext();
  const [prompts, setPrompts] = useState<string[]>([]);

  useEffect(() => {
    const getSuggestedPrompt = async () => {
      if (state.uid && config?.sakhiInsights && config.apiKey) {
        const allDocs = await firestore()
          .collection("users")
          .doc(state.uid)
          .collection("autoRooms")
          .doc(roomId)
          .collection("autoMessages")
          .where("inContext", "==", true)
          .orderBy("createdOn", "desc")
          .get();

        const { chatMessages } = fetchAllMessages(allDocs);
        const gpt = messegesToGPTMessages(chatMessages);

        const response = await makeInsightsCall(
          [
            { role: "user", content: config?.sakhiInsights[roomId] },
            ...gpt,
            {
              role: "user",
              content: `Based on the above, create 3 prompt questions that I can ask you. Each prompt should be less than 50 words and something that we have not discussed before. Respond in the following format  - "Prompts: 1. [PROMPT 1] 2. [PROMPT 2] 3. [PROMPT 3]"`,
            },
          ],
          "gpt-3.5-turbo",
          config.apiKey
        );

        if (response?.choices && response.choices.length) {
          setPrompts(getPromptArray(response.choices[0].message.content));
        }
      }
    };
    getSuggestedPrompt();
  }, [state.uid, config?.sakhiInsights]);

  return { prompts };
};

const getPromptArray = (prompts: string) => {
  const promptResponse = prompts.split("Prompts:");
  if (promptResponse.length === 2) {
    // let regex = /(\d+\.\d*)\s?(.*?)(?=\d+\.|$)/gs;

    let matches = promptResponse[1].split(/\d+\.\s+/);
    // let matches = promptResponse[1].match(regex);

    // const promptArray = promptResponse[1].split(",");
    if (matches.length) {
      const matchesTrim = matches.map((item) =>
        item.replace(/[“”‘’"'\[\]`]/g, "").trim()
      );
      const filtered = matchesTrim.filter((item) => item !== "");
      if (filtered.length) {
        return filtered;
      } else {
        return [];
      }
    }
  }

  return [];
};
