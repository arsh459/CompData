import { useEffect } from "react";
import database from "@react-native-firebase/database";

export const useRTConnection = (castId?: string) => {
  useEffect(() => {
    if (castId) {
      const ref = database().ref(`casts/${castId}`);
      ref.update({
        appStatus: "LIVE",
      });

      ref
        .onDisconnect()
        .update({
          appStatus: "DISCONNECTED",
        })
        .then(() => console.log("On disconnect function configured."));
    }
  }, [castId]);
};
