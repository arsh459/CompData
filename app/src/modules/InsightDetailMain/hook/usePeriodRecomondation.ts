import { EmojiItem } from "@hooks/chatbot/insights/useSakhiInsightsV2";
import { insightGPTData } from "@hooks/chatbot/insights/utilsV2";
import { makeSSECall } from "@hooks/chatbot/utils";
import { AutoRoomIDs } from "@models/ChatBot/insights";
import { PeriodDateObj } from "@models/User/User";
import { useAuthContext } from "@providers/auth/AuthProvider";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { createPrompts, initPromptCreator } from "./promptCreator";
import { useConfigContext } from "@providers/Config/ConfigProvider";

// const constants: { [key in AutoRoomIDs]: string } = {
//   // YOGA: `You are Sakhi AI, a menstrual health assistant. get me instruction for aasan I provided in form of title: name of asanas, benefits: what benefits aasan provide me for menstrual health`,
//   DIET: `You are Sakhi AI, a menstrual health assistant. get me instruction for cooking recipe and ingredients for single serving I provided in form of title: name of recipe, benefits: what benifit diet provide me for menstrual health`,
// };

export const usePeriodRecomondation = (
  periodDateId: string,
  type: AutoRoomIDs
) => {
  const { state } = useAuthContext();
  const [insightData, setInsightData] = useState<EmojiItem>();
  const [loading, setLoading] = useState<boolean>(true);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const { config } = useConfigContext();

  useEffect(() => {
    const getSuggestedPrompt = async () => {
      if (state.uid && config?.apiKey) {
        const doc = await firestore()
          .collection("users")
          .doc(state.uid)
          .collection("periodDates")
          .doc(periodDateId)
          .get();

        if (doc.data()) {
          const remoteInsightData = doc.data() as PeriodDateObj;
          const targetData =
            remoteInsightData?.recommendations &&
            remoteInsightData.recommendations[type];

          if (targetData) {
            setInsightData(targetData);
            setPrompts(createPrompts(type, targetData));

            if (!targetData.body) {
              const initPrompt = initPromptCreator(type, targetData);
              setFetching(true);
              makeSSECall(
                [
                  { role: "user", content: initPrompt },
                  {
                    role: "user",
                    content: `title: ${targetData.name}, benefits: ${targetData.reason}`,
                  },
                ],
                (body: string) =>
                  setInsightData((prev) => {
                    setFetching(false);
                    if (prev) {
                      return { ...prev, body };
                    }
                  }),
                async (body: string) =>
                  setInsightData((prev) => {
                    if (prev) {
                      firestore()
                        .collection("users")
                        .doc(state.uid)
                        .collection("periodDates")
                        .doc(periodDateId)
                        .update({
                          [`recommendations.${type}.body`]: body,
                        });
                      return {
                        ...prev,
                        body,
                      };
                    }
                  }),
                (message: string) => {
                  console.log(message);
                },
                1,
                "gpt-3.5-turbo",
                config?.apiKey,
                insightGPTData
              );
            }
          }
        }
      }

      setLoading(false);
    };

    getSuggestedPrompt();
  }, [state.uid, periodDateId, type, config?.apiKey]);

  return { insightData, loading, fetching, prompts };
};
