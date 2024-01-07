import { useUserStore } from "@providers/user/store/useUserStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "react-native-dotenv";
import { shallow } from "zustand/shallow";
import firestore from "@react-native-firebase/firestore";

export const useActivitySync = () => {
  const { shouldSync, uid } = useUserStore(
    (state) => ({ shouldSync: state.user?.activitySync, uid: state.user?.uid }),
    shallow
  );
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!shouldSync) {
      setLoading(true);
      axios({
        url: `${BACKEND_URL}/userActivitySearch`,
        method: "POST",
        params: {},
        data: {
          uid: uid,
        },
      })
        .then(() => {
          setLoading(false);
          firestore()
            .collection("users")
            .doc(uid)
            .update({ activitySync: true });
        })
        .catch(() => setLoading(false));
    }
  }, [uid, shouldSync]);

  return {
    loading,
  };
};
