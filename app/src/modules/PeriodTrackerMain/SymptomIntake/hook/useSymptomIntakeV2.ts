import { useAuthContext } from "@providers/auth/AuthProvider";
import { useEffect, useState } from "react";
import { questionAPICallRequest } from "./api";
import { useCurrentPeriodStore } from "@providers/period/periodStore";
import {
  ButtonInterface,
  questionResponse,
} from "@models/User/questionResponseInterface ";
import { handleClickAsyncAction, updatePromptAsked } from "./handleClick";
import { periodPrompts } from "@models/User/User";
import {
  getCurrentQuestion,
  getQuestionSymptoms,
} from "./clickActions/getSymptomArray";
import { refreshPeriodTrackerData } from "@modules/PeriodCalenderLogMain/utils";
import { shallow } from "zustand/shallow";
import { format } from "date-fns";
import { updatePeriodSync } from "@models/User/updateUtils";
import { useIsForeground } from "@hooks/utils/useIsForeground";
import { useUserContext } from "@providers/user/UserProvider";
import { useSymptomIntakeStore } from "../store/SymptomIntakeStore";
import { symptomId } from "@models/User/symptoms";

export const useSymptomIntakeV2 = () => {
  const { state, today, todayUnix } = useAuthContext();
  const { user } = useUserContext();

  const [questions, setQuestions] = useState<questionResponse[]>([]);
  const { setQuestion } = useSymptomIntakeStore();

  const { currentObj, initialise } = useCurrentPeriodStore((zState) => {
    const vieweingPeriodObj =
      zState.periodDateObjStore[zState.currentlySelected];
    if (vieweingPeriodObj) {
      return {
        currentObj: vieweingPeriodObj,
        initialise: zState.initData,
      };
    }

    return {
      initialise: zState.initData,
    };
  }, shallow);
  const { appStateVisible } = useIsForeground();

  useEffect(() => {
    const makeQuestionAPICall = async (uid: string) => {
      const q = await questionAPICallRequest(uid);

      if (q.length) {
        setQuestions(q);
        setQuestion(q[0]);
      } else {
        await refreshPeriodTrackerData(uid);
        initialise(uid, todayUnix);
        await updatePeriodSync(uid, format(todayUnix, "yyyy-MM-dd"));
      }
    };

    if (
      state.uid &&
      appStateVisible === "active" &&
      today !== user?.periodTrackerObj?.lastRefresh
    ) {
      makeQuestionAPICall(state.uid);
    }
  }, [
    state.uid,
    todayUnix,
    appStateVisible,
    user?.periodTrackerObj?.lastRefresh,
  ]);

  // console.log("last refresh", user?.periodTrackerObj?.lastRefresh, today);

  const onClickResponse = async (
    clickButton: ButtonInterface,
    id: periodPrompts,
    symptopIdsArr?: symptomId[]
  ) => {
    if (currentObj && state.uid) {
      const currentQuestion = getCurrentQuestion(questions, id);

      // console.log("current q", currentQuestion?.question);

      if (currentQuestion) {
        const symptomIds =
          symptopIdsArr || getQuestionSymptoms(currentQuestion);

        // console.log("symptomIds", symptomIds, clickButton.action);
        // async action
        await handleClickAsyncAction(
          currentObj,
          clickButton.action,
          today,
          state.uid,
          symptomIds
        );

        const id = currentQuestion.id;

        await updatePromptAsked(state.uid, currentObj.cycleId, id);

        // handle next
        if (clickButton.nextId) {
          setQuestion(currentQuestion);
        } else {
          // hide popup
          setQuestion(undefined);
          await refreshPeriodTrackerData(state.uid);
          initialise(state.uid, todayUnix);
          await updatePeriodSync(state.uid, format(todayUnix, "yyyy-MM-dd"));
        }
      }
    }
  };

  return {
    onClickResponse,
  };
};
