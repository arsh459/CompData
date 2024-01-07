import firestore from "@react-native-firebase/firestore";
import { Activity } from "@models/Activity/Activity";
import { useEffect, useState } from "react";

// import { formatUnixTimestampByDateTime } from "@modules/DoctorFormMain/utils";
import {
  selectedNutriType,
  selectedViewRangeType,
} from "@modules/TopContribution";
import { useUserStore } from "@providers/user/store/useUserStore";
import { getWeekData } from "@modules/TopContribution/utils/data";
import useDietCalendar from "@hooks/dietPlan/useDietCalendar";
import { shallow } from "zustand/shallow";
import { dayMS } from "@providers/period/periodStore";

export const useTopContributors = (
  type: selectedViewRangeType,
  nutriType: selectedNutriType
) => {
  const { uid } = useUserStore((state) => ({ uid: state.user?.uid }), shallow);
  const { activeUnix } = useDietCalendar(
    (state) => ({
      activeUnix: state.active?.unix,
    }),
    shallow
  );
  const [userNutritionData, setUserNutritionData] = useState<Activity[]>([]);

  useEffect(() => {
    if (type && uid && activeUnix && nutriType) {
      const { weekStartUnix, weekEndUnix, todayUnix } = getWeekData();
      let startTimestamp;
      let endTimestamp;

      switch (type) {
        case "Day":
          startTimestamp = activeUnix;
          endTimestamp = activeUnix + dayMS;
          break;
        case "Week":
          startTimestamp = weekStartUnix;
          endTimestamp = weekEndUnix + dayMS;
          break;
        default:
          startTimestamp = todayUnix;
          endTimestamp = todayUnix + dayMS;
      }

      const unsub = firestore()
        .collection("users")
        .doc(uid)
        .collection("activities")
        .where("source", "==", "nutrition")
        .where("createdOn", ">=", startTimestamp)
        .where("createdOn", "<", endTimestamp)
        .orderBy("createdOn", "desc")
        .onSnapshot((userRelevantActsDocs) => {
          if (userRelevantActsDocs) {
            let result: Activity[] = [];

            userRelevantActsDocs.forEach((doc) => {
              const activity = doc.data() as Activity;
              if (activity.calories && activity?.calories > 0) {
                result.push(activity);
              }
            });

            result = result.sort((a, b) => {
              if (a.macros && b.macros) {
                let aMacros = a.macros[nutriType];
                let bMacros = b.macros[nutriType];
                return -((aMacros || 0) - (bMacros || 0));
              }
              return 0;
            });
            setUserNutritionData(result);
          }
        });
      return () => {
        unsub();
      };
    }
  }, [uid, type, activeUnix, nutriType]);

  return { userNutritionData };
};
