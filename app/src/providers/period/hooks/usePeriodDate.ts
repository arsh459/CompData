import { LoggedSymptom, PeriodDateObj, PeriodFlow } from "@models/User/User";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useCurrentPeriodStore } from "../periodStore";
import { AutoRoomIDs } from "@models/ChatBot/insights";
import { EmojiItem } from "@hooks/chatbot/insights/useSakhiInsightsV2";

export const usePeriodDate = (date: string) => {
  const [periodDateObj, setPeriodDateObj] = useState<PeriodDateObj>();

  const { state } = useAuthContext();

  useEffect(() => {
    if (state.uid) {
      const listener = firestore()
        .collection("users")
        .doc(state.uid)
        .collection("periodDates")
        .where("date", "==", date)
        .onSnapshot((doc) => {
          if (doc.docs.length) {
            const newObj = doc.docs[0].data() as PeriodDateObj;

            setPeriodDateObj(newObj);
          }
        });

      return () => {
        listener();
      };
    }
  }, [state.uid]);

  const onUpdateFlow = (periodFlow: PeriodFlow) => {
    setPeriodDateObj((prev) => {
      if (prev) {
        return { ...prev, periodFlow };
      }
    });
  };

  const onUpdateSymptoms = (symptom: LoggedSymptom) => {
    setPeriodDateObj((prev) => {
      if (prev)
        if (prev.loggedSymptoms && prev.loggedSymptoms[symptom.text]) {
          const { [symptom.text]: _, ...rest } = prev.loggedSymptoms;

          return {
            ...prev,
            loggedSymptoms: {
              ...rest,
            },
          };
        } else if (prev?.loggedSymptoms && !prev.loggedSymptoms[symptom.text]) {
          return {
            ...prev,
            loggedSymptoms: {
              ...prev.loggedSymptoms,
              [symptom.text]: symptom,
            },
          };
        } else if (prev && !prev.loggedSymptoms) {
          return {
            ...prev,
            loggedSymptoms: {
              [symptom.text]: symptom,
            },
          };
        } else {
          return prev;
        }
    });
  };

  const onRefreshSymptoms = useCurrentPeriodStore(
    (state) => state.onRefreshSymptoms
  );

  const onSave = async () => {
    if (periodDateObj && state.uid) {
      const updatedPeriodObj: PeriodDateObj = {
        ...periodDateObj,
        recommendations: [] as Partial<Record<AutoRoomIDs, EmojiItem>>,
      };

      await firestore()
        .collection("users")
        .doc(state.uid)
        .collection("periodDates")
        .doc(periodDateObj?.id)
        .update(updatedPeriodObj);

      await onRefreshSymptoms(date);
    }
  };

  return {
    periodDateObj,
    onSave,
    onUpdateSymptoms,
    onUpdateFlow,
  };
};
