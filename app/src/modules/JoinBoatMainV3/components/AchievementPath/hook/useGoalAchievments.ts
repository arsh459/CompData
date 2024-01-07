import { useEffect, useState } from "react";
import { GetDataType } from "../utils/constants";
import { updateUserBadgeIdV2 } from "@models/User/updateUtils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useRoadmapUpdateStore } from "@providers/progress/roadmapUpdateStore";
import { AchievementPathData } from "../utils/interface";
import { fetchMonthsData, refactorData } from "../utils/utils";

export const useGoalAchievments = (type: GetDataType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AchievementPathData[]>([]);
  const [rawData, setRawData] = useState<AchievementPathData[]>([]);

  const { uid, nutritionBadgeId, badgeId, roadmapProgress } = useUserStore(
    (state) => {
      const prog =
        (state.user?.completedTargets ? state.user?.completedTargets : 0) /
        (state.user?.totalTargets ? state.user?.totalTargets : 1);
      return {
        uid: state.user?.uid,
        nutritionBadgeId: state.user?.nutritionBadgeId,
        badgeId: state.user?.badgeId,
        roadmapProgress: Math.round(prog * 100),
      };
    },
    shallow
  );

  const updateMap = useRoadmapUpdateStore((state) => state.updateMap);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      let data: AchievementPathData[] = [];
      if (type === "genrate" && uid) {
        await updateUserBadgeIdV2(uid, updateMap);
        data = await fetchMonthsData(uid);
      } else if (uid) {
        data = await fetchMonthsData(uid);
      }

      setRawData(data);
      setData(refactorData(data, nutritionBadgeId, badgeId, roadmapProgress));

      setLoading(false);
    };

    getData();
  }, [type, uid, nutritionBadgeId, badgeId, roadmapProgress]);

  return { data, rawData, loading };
};
