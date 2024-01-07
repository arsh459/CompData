import { useEffect } from "react";
import { getDatabase, update, ref, onDisconnect } from "firebase/database";

const database = getDatabase();

export const useRTConnection = (castId?: string) => {
  useEffect(() => {
    if (castId) {
      const reference = ref(database, "casts/" + castId);
      update(reference, {
        webStatus: "LIVE",
      });

      // set disconnect
      onDisconnect(reference).update({
        webStatus: "DISCONNECTED",
      });
    }
  }, [castId]);
};
