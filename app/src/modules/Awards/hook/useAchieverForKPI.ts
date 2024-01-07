import firestore from "@react-native-firebase/firestore";
import { Achiever } from "@models/Awards/interface";
import { useEffect, useState } from "react";
import { AchievementPathDataItemTypes } from "@modules/JoinBoatMainV3/components/AchievementPath/utils/interface";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { format } from "date-fns";

export const useAchieverForKPI = (kpi: AchievementPathDataItemTypes) => {
  const { config } = useConfigContext();
  const { state } = useAuthContext();

  const [achiever, setAchiever] = useState<Achiever>();
  const [loading, setLoading] = useState<
    "FETCHING" | "NONE" | "DONE" | "ERROR"
  >("NONE");

  useEffect(() => {
    if (kpi && config?.kpiAwardIds && config?.kpiAwardIds[kpi]) {
      const month = format(new Date(), "MMM");
      setLoading("FETCHING");
      const list = firestore()
        .collection("achievers")
        .where("awardId", "==", config?.kpiAwardIds[kpi])
        .where("uid", "==", state.uid)
        .where("mainLabel", "==", month)
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
  }, [kpi, state.uid, config?.kpiAwardIds]);

  return { achiever, loading };
};
