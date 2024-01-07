import { checkpoints } from "@models/User/User";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useEffect } from "react";
import { updateReelView } from "./utils";

export const useView = (type: checkpoints) => {
  const { state } = useAuthContext();
  useEffect(() => {
    if (state.uid) {
      updateReelView(state.uid, type);
    }
  }, [state.uid]);
};
