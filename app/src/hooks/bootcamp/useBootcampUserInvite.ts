import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserContext } from "@providers/user/UserProvider";

export const useBootcampInvite = (id?: string) => {
  const { state } = useAuthContext();
  const { user } = useUserContext();
  useEffect(() => {
    const addInvite = async () => {
      await firestore()
        .collection("users")
        .doc(state.uid)
        .update({
          bootcampDetails: {
            bootcampId: id,
          },
        });
    };

    if (id && user?.bootcampDetails?.bootcampId !== id) {
      addInvite();
    }
  }, [id, state.uid, user?.bootcampDetails?.bootcampId]);
};
