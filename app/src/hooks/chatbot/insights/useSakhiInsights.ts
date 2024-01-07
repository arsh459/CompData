import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { useUserContext } from "@providers/user/UserProvider";
import { useEffect, useState } from "react";
import {
  createBaseUserMessage,
  createInitialGPTMessages,
  makeInsightsCall,
  parseInsightsFromResponse,
} from "./api";
import { useConfigContext } from "@providers/Config/ConfigProvider";

export interface EmojiItem_dep {
  emoji: string;
  text: string;
}

export const useSakhiInsights = () => {
  // const { state } = useAuthContext();
  const { user } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [insightsToShow, setInsightsToShow] = useState<EmojiItem_dep[]>([]);
  const { config } = useConfigContext();

  const { type, dayNumber, currentCycleLength } = useCurrentPeriodStore(
    (state) => {
      const dp = state.periodDateObjStore[state.currentlySelected];
      const currentCycleId = dp?.cycleId;
      const currentCycle = currentCycleId && state.cycles[currentCycleId];

      return {
        type: dp?.type ? dp.type : "UNKNOWN",
        dayNumber: dp?.dayNumber,
        currentCycleLength: currentCycle ? currentCycle.length : undefined,
      };
    }
  );

  useEffect(() => {
    if (typeof dayNumber === "number" && config?.apiKey) {
      const handleInsightsCall = async () => {
        setLoading(true);
        const cL = currentCycleLength
          ? currentCycleLength
          : user?.periodTrackerObj?.inputCycleLength
          ? user?.periodTrackerObj?.inputCycleLength
          : 30;

        const baseMessage = createBaseUserMessage(type, dayNumber, cL);

        const gpt = createInitialGPTMessages(baseMessage);

        const response = await makeInsightsCall(
          gpt,
          "gpt-3.5-turbo",
          config?.apiKey
        );

        if (response) {
          const finalResponse = parseInsightsFromResponse(
            response.choices[0].message.content
          );
          setInsightsToShow(finalResponse);
        }

        setLoading(false);
      };

      const timer = setTimeout(() => {
        handleInsightsCall();
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [
    // user?.periodTrackerObj?.inputCycleLength,
    // user?.periodTrackerObj?.goal,
    // user?.fitnessGoal,
    type,
    dayNumber,
    currentCycleLength,
    config?.apiKey,
    // insightsToShow,
  ]);

  return {
    insightsToShow,
    loading,
  };
};

/**
 *
 * initConv with GPT to get recommendations
 *
 * PeriodDateObj {
 * insight: LONGER_PERIOD | MISSED_PERIOD | EARLY_PERIOD | SHORTER_PERIOD
 * }
 *
 *
 *
 *
 * marked a symptom
 *
 * take previous messages
 * add marked symptom message and fetch, save response message
 *
 *
 * CheckForBelow()
 * Longer than expected periods
 * Missed Period
 * Early Period
 * Shorter than usual period
 *
 * add marked message and fetch, save response message
 *
 *
 * checkForDay and ask
 *
 * add marked message and fetch, save response message
 */
