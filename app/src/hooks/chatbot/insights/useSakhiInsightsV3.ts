import { useConfigContext } from "@providers/Config/ConfigProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { useUserContext } from "@providers/user/UserProvider";
import { useEffect, useState } from "react";
import { promptInputCreator } from "./promptInputCreator";
import { getNewPrompt } from "./mainHandler";
import { shallow } from "zustand/shallow";

import { handleGPTInsight } from "./utilsV2";

export const useSakhiInsightsV3 = (view: "month" | "day") => {
  const { user } = useUserContext();
  const { todayUnix } = useAuthContext();
  const { config } = useConfigContext();
  const [loadingDiet, setLoadingDiet] = useState<boolean>(true);
  const [loadingYoga, setLoadingYoga] = useState<boolean>(true);
  // const [dietInsight, setDietInsight] = useState<EmojiItem>();
  // const [workoutInsight, setWorkoutInsight] = useState<EmojiItem>();

  const zResponse = useCurrentPeriodStore((zState) => {
    // if (dtState.fetchingState)

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

        const dtState = zState.insights["DIET"][zState.currentlySelected];
        const ygState = zState.insights["YOGA"][zState.currentlySelected];

        return {
          ...promptResponse,
          id: selectedPObj.id,
          date: selectedPObj.date,
          fetchDiet:
            selectedPObj.recommendations?.DIET ||
            dtState?.fetchingState === "COMPLETE" ||
            dtState?.fetchingState === "FETCHING"
              ? false
              : true,
          fetchYoga:
            selectedPObj.recommendations?.YOGA ||
            ygState?.fetchingState === "COMPLETE" ||
            ygState?.fetchingState === "FETCHING"
              ? false
              : true,

          // dietInsight: selectedPObj.recommendations?.DIET,
          // yogaInsight: selectedPObj.recommendations?.YOGA,
        };
      }
    }
  }, shallow);

  // update state
  const {
    onStreamingInsight,
    onErrorInStream,
    onFinishStreamingInsight,
    setMainInsights,
  } = useCurrentPeriodStore(
    (state) => ({
      onStreamingInsight: state.onStreamingInsight,
      onErrorInStream: state.onErrorInStream,
      onFinishStreamingInsight: state.onFinishStreamingInsight,
      setMainInsights: state.setMainInsights,
    }),
    shallow
  );

  // useEffect(() => {
  //   setLoadingDiet(true);
  //   setLoadingYoga(true);
  // }, [zResponse?.date]);
  useEffect(() => {
    if (zResponse?.insight && zResponse.insightPrompt && zResponse.date) {
      setMainInsights(
        zResponse.insight,
        zResponse.insightPrompt,
        zResponse.date
      );
    }
  }, [zResponse?.insight, zResponse?.insightPrompt, zResponse?.date]);

  useEffect(() => {
    const handleDietInsightsCall = async () => {
      if (!zResponse?.fetchDiet) {
        setLoadingDiet(false);
      } else if (
        user?.uid &&
        config?.sakhiInsights?.DIET &&
        zResponse?.prompt &&
        zResponse.date &&
        zResponse.id
      ) {
        setLoadingDiet(true);

        handleGPTInsight(
          user.uid,
          "DIET",
          zResponse.prompt,
          config.sakhiInsights["DIET"],
          (val: string) => {
            setLoadingDiet(false);
            onStreamingInsight(val, "DIET", zResponse.date);
          },
          (val: string) => {
            setLoadingDiet(false);
            onFinishStreamingInsight(val, "DIET", zResponse.id, zResponse.date);
          },
          () => {
            setLoadingDiet(false);
            onErrorInStream("DIET", zResponse.date);
          },
          config.apiKey
        );

        // listener && listener();
      }
    };

    handleDietInsightsCall();
  }, [
    user?.uid,
    config?.sakhiInsights?.DIET,
    zResponse?.prompt,
    zResponse?.date,
    zResponse?.id,
    zResponse?.fetchDiet,
  ]);

  useEffect(() => {
    const handleYogaInsightsCall = async () => {
      if (!zResponse?.fetchYoga) {
        setLoadingYoga(false);
      } else if (
        user?.uid &&
        config?.sakhiInsights?.YOGA &&
        zResponse?.yogaPrompt &&
        zResponse.date &&
        zResponse.id
      ) {
        setLoadingYoga(true);

        handleGPTInsight(
          user.uid,
          "YOGA",
          zResponse.yogaPrompt,
          config.sakhiInsights["YOGA"],
          (val: string) => {
            setLoadingYoga(false);
            onStreamingInsight(val, "YOGA", zResponse.date);
          },
          (val: string) => {
            setLoadingYoga(false);
            onFinishStreamingInsight(val, "YOGA", zResponse.id, zResponse.date);
          },
          () => {
            setLoadingYoga(false);
            onErrorInStream("YOGA", zResponse.date);
          },
          config.apiKey
        );
      }
    };

    handleYogaInsightsCall();
  }, [
    user?.uid,
    config?.sakhiInsights?.YOGA,
    zResponse?.prompt,
    zResponse?.date,
    zResponse?.id,
    zResponse?.fetchYoga,
  ]);

  return {
    // dietInsight,
    // workoutInsight,
    loadingDiet,
    loadingYoga,
  };
};
