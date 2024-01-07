import { Activity } from "@models/Activity/Activity";
import { StepsDoc } from "@models/User/StepsDoc";
import { useAuthContext } from "@providers/auth/AuthProvider";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import {
  createUIElementData,
  getActivityForStep,
  getStartEndForStep,
} from "./utils";
import crashlytics from "@react-native-firebase/crashlytics";
import { useConfigContext } from "@providers/Config/ConfigProvider";

export interface DayStepDoc {
  fp: number;
  steps: number;
  unix: number;
  dtString: string;
  isActive?: boolean;
  id: string;
  stepDtString: string;
}

export const useUserPreviousSteps = () => {
  const { state } = useAuthContext();
  const [dayStepDocs, setDayDocs] = useState<DayStepDoc[]>([]);
  // const [init, setInit] = useState<boolean>(false);
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();
  const [loading, toggleLoading] = useState<boolean>(true);

  // const { game } = useGameContext();
  const { config } = useConfigContext();

  useEffect(() => {
    if (state.uid && config?.stepTaskId) {
      const list = firestore()
        .collection("users")
        .doc(state.uid)
        .collection("steps")
        .orderBy("unix", "desc")
        .limit(1)
        .onSnapshot((topEl) => {
          if (topEl.docs && topEl.docs.length && state.uid) {
            const latestDoc = topEl.docs[0].data() as StepsDoc;
            const { start } = getStartEndForStep(latestDoc);

            getActivityForStep(
              state.uid,
              latestDoc.date,
              config?.stepTaskId
            ).then((act: Activity | undefined) => {
              if (act) {
                const newUIDoc = createUIElementData(latestDoc, start, act);
                setDayDocs((p) => {
                  if (p.length && p[0].stepDtString !== latestDoc.date) {
                    return [newUIDoc, ...p];
                  } else if (p.length && p[0].steps !== latestDoc.steps) {
                    return [
                      { ...p[0], ...newUIDoc },
                      ...p.slice(1, p.length - 1),
                    ];
                  } else {
                    return p;
                  }
                });
              }
            });
          }
        });
      return () => {
        list();
      };
    }
  }, [state.uid, config?.stepTaskId]);

  useEffect(() => {
    const getInitSteps = async () => {
      const nextSteps = await firestore()
        .collection("users")
        .doc(state.uid)
        .collection("steps")
        .orderBy("unix", "desc")
        .limit(7)
        .get();

      const nextDocs: DayStepDoc[] = [];
      for (const stepObj of nextSteps.docs) {
        if (stepObj.data() && state.uid) {
          const relStepDoc = stepObj.data() as StepsDoc;

          const { start } = getStartEndForStep(relStepDoc);

          const act = await getActivityForStep(
            state.uid,
            relStepDoc.date,
            // start,
            // end,
            config?.stepTaskId
          );

          nextDocs.push(createUIElementData(relStepDoc, start, act));
        }
      }

      setDayDocs(nextDocs);
      // setInit(true);
      toggleLoading(false);
      if (nextDocs.length === 7) {
        setLastDoc(nextSteps.docs[nextSteps.docs.length - 1]);
      } else {
        setLastDoc(undefined);
      }
      // };
    };

    try {
      if (state.uid && config?.stepTaskId) {
        getInitSteps();
      }
    } catch (error: any) {
      console.log("errored in init");
      crashlytics().recordError(error);
    }
  }, [state.uid, config?.stepTaskId]);

  const onNext = async () => {
    if (lastDoc && state.uid) {
      const nextSteps = await firestore()
        .collection("users")
        .doc(state.uid)
        .collection("steps")
        .orderBy("unix", "desc")
        .startAfter(lastDoc)
        .limit(7)
        .get();

      if (nextSteps) {
        const nextDocs: DayStepDoc[] = [];
        for (const stepObj of nextSteps.docs) {
          if (stepObj.data()) {
            const relStepDoc = stepObj.data() as StepsDoc;

            const { start } = getStartEndForStep(relStepDoc);

            const act = await getActivityForStep(
              state.uid,
              relStepDoc.date,
              config?.stepTaskId
            );

            // next docs
            nextDocs.push(createUIElementData(relStepDoc, start, act));
          }
        }

        setDayDocs((p) => [...p, ...nextDocs]);
        toggleLoading(false);
        if (nextDocs.length === 7) {
          setLastDoc(nextSteps.docs[nextSteps.docs.length - 1]);
        } else {
          setLastDoc(undefined);
        }
      }
    }
  };

  return {
    dayStepDocs,
    onNext,
    loading,
  };
};
