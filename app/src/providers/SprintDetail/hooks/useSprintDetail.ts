import { SprintDetail } from "@models/SprintDetails/SprintDetail";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

import { useAuthContext } from "@providers/auth/AuthProvider";

export const useSprintDetail = (sprintId?: string) => {
  const [sDetail, setSprintDetail] = useState<SprintDetail>();

  const { state } = useAuthContext();

  useEffect(() => {
    if (state.gameId && sprintId) {
      const unsub = firestore()
        .collection("sbEvents")
        .doc(state.gameId)
        .collection("sprintDetails")
        .where("sprintId", "==", sprintId)
        .onSnapshot((snapshot) => {
          if (snapshot && snapshot.docs && snapshot.docs.length) {
            setSprintDetail(snapshot.docs[0].data() as SprintDetail);
          }
        });

      return () => {
        unsub();
      };
    }
  }, [sprintId, state.gameId]);

  return {
    sDetail,
  };
};
