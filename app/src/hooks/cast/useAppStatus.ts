import { useEffect } from "react";
import database from "@react-native-firebase/database";
import { useAuthContext } from "@providers/auth/AuthProvider";

export const useAppStatus = (isActive: boolean) => {
  const { state } = useAuthContext();

  useEffect(() => {
    if (state.uid && isActive) {
      const ref = database().ref(`users/${state.uid}`);
      ref.update({
        appStatus: "LIVE",
        started: Date.now(),
      });

      ref
        .onDisconnect()
        .update({
          appStatus: "DISCONNECTED",
          lastSeen: Date.now(),
        })
        .then(() => console.log("On disconnect function configured."));
    } else if (!isActive && state.uid) {
      const ref = database().ref(`users/${state.uid}`);
      ref.update({
        appStatus: "DISCONNECTED",
        lastSeen: Date.now(),
      });
    }
  }, [state.uid, isActive]);
};
