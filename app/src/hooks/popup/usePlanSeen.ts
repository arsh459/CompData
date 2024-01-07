import { useAuthContext } from "@providers/auth/AuthProvider";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";

export const usePlanSeen = () => {
  const { state } = useAuthContext();

  useEffect(() => {
    if (state.uid) {
      firestore()
        .collection("users")
        .doc(state.uid)
        .update({
          planSeen: true,
        })
        .catch((e) => {
          console.log("error updating", e);
          crashlytics().recordError(e);
        });
    }
  }, [state.uid]);
};
