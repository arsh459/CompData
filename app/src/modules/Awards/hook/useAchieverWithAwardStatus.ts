import firestore from "@react-native-firebase/firestore";
import { Achiever, awardStatus } from "@models/Awards/interface";
import { useEffect, useState } from "react";
import { AchievementPathDataItemTypes } from "@modules/JoinBoatMainV3/components/AchievementPath/utils/interface";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { format } from "date-fns";

export const useAchieverWithAwardStatus = (
  kpi: AchievementPathDataItemTypes,
  status: awardStatus
) => {
  const { config } = useConfigContext();
  const { state } = useAuthContext();

  const [achiever, setAchiever] = useState<Achiever>();
  const [loading, setLoading] = useState<
    "FETCHING" | "NONE" | "DONE" | "ERROR"
  >("NONE");

  useEffect(() => {
    if (kpi && config?.kpiAwardIds && config?.kpiAwardIds[kpi]) {
      const month = format(new Date(), "MMMM");

      setLoading("FETCHING");
      const list = firestore()
        .collection("achievers")
        .where("awardId", "==", config?.kpiAwardIds[kpi])
        .where("uid", "==", state.uid)
        .where("mainLabel", "==", month)
        .where("awardStatus", "==", status)
        .onSnapshot((snapshot) => {
          if (snapshot.docs.length) {
            const remoteAwardReport = snapshot.docs[0].data() as Achiever;
            setAchiever(remoteAwardReport);
          } else {
            setLoading("ERROR");
          }
        });

      return () => {
        list();
      };
    } else {
      setLoading("ERROR");
    }
  }, [kpi, state.uid, config?.kpiAwardIds, status]);

  return { achiever, loading };
};

//there will be "1":{"container": ND, "label": dayLabel:- Mon, "tickStatus": ""}
// if activity done tickStatus === "Hit"
// else streak break
