import { dayRecommendationType } from "@models/User/User";
import { useEffect } from "react";
import { makeGeneratorCall } from "./generatorCall";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { format } from "date-fns";
import firestore from "@react-native-firebase/firestore";

export const useFutureRecs = (
  unix: number,
  type?: dayRecommendationType,
  badgeId?: string
) => {
  const uid = useUserStore((state) => state.user?.uid, shallow);
  useEffect(() => {
    if (uid && type) {
      const date = format(new Date(unix), "yyyy-MM-dd");
      firestore()
        .collection("users")
        .doc(uid)
        .collection("dayRecommendations")
        .where("date", "==", date)
        .where("type", "==", type)
        .where("badgeId", "==", badgeId)
        .get()
        .then((res) => {
          if (res.docs.length === 0) {
            console.log("autogenerating");
            makeGeneratorCall(uid, type, false, false, badgeId);
          }
        });
    }
  }, [uid, type, badgeId]);
};
