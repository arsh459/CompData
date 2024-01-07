import { useAuthContext } from "@providers/auth/AuthProvider";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export type periodLoadingStates = "NEEDS_INIT" | "LOADING" | "READY";

export const useCycleExists = () => {
  const [periodState, setPeriodState] =
    useState<periodLoadingStates>("LOADING");

  const { state } = useAuthContext();

  useEffect(() => {
    if (state.uid) {
      const listener = firestore()
        .collection("users")
        .doc(state.uid)
        .collection("cycles")
        .limit(1)
        .onSnapshot((docs) => {
          if (docs && docs.docs.length) {
            setPeriodState("READY");
          } else {
            setPeriodState("NEEDS_INIT");
          }
        });

      return () => {
        listener();
      };
    }
  }, [state.uid]);

  return {
    periodState,
  };
};
