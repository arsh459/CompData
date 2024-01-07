import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { useUserContext } from "@providers/user/UserProvider";
import { promptInputCreator } from "./promptInputCreator";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { getNewPrompt } from "./mainHandler";
import { useEffect, useState } from "react";
import { handleGPTInsight, parseResultsForFrontend } from "./utils";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import {
  remoteUpdatePeriodObj,
  // remoteUpdatePeriodObjInsight,
} from "./callHandler";
import { shallow } from "zustand/shallow";
import crashlytics from "@react-native-firebase/crashlytics";

export interface EmojiItem {
  name: string;
  reason: string;
  body?: string;
}

export interface EmojiItemLocal extends EmojiItem {
  fetchingState?: "FETCHING" | "FAILED" | "COMPLETE" | "REFETCH";
}

export const useSakhiInsightsV2 = (view: "month" | "day") => {
  const { user } = useUserContext();
  const { todayUnix } = useAuthContext();
  const { config } = useConfigContext();

  const zResponse = useCurrentPeriodStore((zState) => {
    const selectedPObj =
      zState.periodDateObjStore[
        view === "day"
          ? zState.currentlySelected
          : zState.currentlySelectedInMonth
      ];

    if (selectedPObj) {
      const insightsPrompt = promptInputCreator(
        todayUnix,
        selectedPObj,
        zState.cycles,
        zState.cyclesArray,
        user?.periodTrackerObj?.inputCycleLength,
        user?.periodTrackerObj?.inputPeriodLength
      );

      if (insightsPrompt) {
        const promptResponse = getNewPrompt(insightsPrompt);

        return {
          ...promptResponse,
          id: selectedPObj.id,
          date: selectedPObj.date,
          fetchDiet: selectedPObj.recommendations?.DIET ? false : true,
          fetchYoga: selectedPObj.recommendations?.YOGA ? false : true,
        };
      }
    }
  }, shallow);

  // const [updateObjStore, updateInsight] = useCurrentPeriodStore((state) => [
  //   state.updateObjStore,
  //   state.updateInsightOnDate,
  // ], shallow);

  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);

  //   const [insightsToShow, setInsightsToShow] = useState<EmojiItem[]>([]);

  useEffect(() => {
    const handleInsightsCall = async (uid?: string) => {
      if (
        zResponse?.id &&
        zResponse.prompt &&
        zResponse.yogaPrompt &&
        uid &&
        config?.sakhiInsights
      ) {
        // update insight
        // updateInsight(zResponse.date, zResponse.insight);
        // remoteUpdatePeriodObjInsight(uid, zResponse.id, zResponse.insight);

        try {
          if (zResponse.fetchDiet) {
            setLoading(true);
            handleGPTInsight(
              uid,
              "DIET",
              zResponse.prompt,
              config.sakhiInsights["DIET"],
              config.apiKey
            )
              .then((diet) => {
                if (diet?.content) {
                  const resultD = parseResultsForFrontend(diet.content);

                  // resultD && updateObjStore(zResponse?.date, resultD, "DIET");
                  setLoading(false);

                  resultD &&
                    remoteUpdatePeriodObj(uid, zResponse?.id, resultD, "DIET");
                }
              })
              .catch((e) => {
                console.log(e);
                setLoading(false);
                crashlytics().recordError(e);
              });
          }

          if (zResponse.fetchYoga) {
            setLoading2(true);
            handleGPTInsight(
              uid,
              "YOGA",
              zResponse?.yogaPrompt,
              config.sakhiInsights["YOGA"],
              config.apiKey
            )
              .then((yoga) => {
                if (yoga) {
                  const resultY = parseResultsForFrontend(yoga.content);
                  // resultY && updateObjStore(zResponse?.date, resultY, "YOGA");

                  setLoading2(false);
                  resultY &&
                    remoteUpdatePeriodObj(uid, zResponse?.id, resultY, "YOGA");
                }
              })
              .catch((e) => {
                console.log(e);
                setLoading2(false);
                crashlytics().recordError(e);
              });
          }
        } catch (error: any) {
          console.log("hi error", error);
          setLoading(false);
          crashlytics().recordError(error);
        }
      }
    };

    handleInsightsCall(user?.uid);
  }, [
    user?.uid,

    zResponse?.prompt,
    zResponse?.yogaPrompt,
    zResponse?.insight,
    zResponse?.date,
    zResponse?.id,
    zResponse?.fetchDiet,
    zResponse?.fetchYoga,
    config?.sakhiInsights,
  ]);

  return {
    loading,
    loading2,
  };
};
