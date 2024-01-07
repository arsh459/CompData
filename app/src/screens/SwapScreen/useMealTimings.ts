import { MealTypes } from "@models/Tasks/Task";
import { scrollTime } from "@modules/Nutrition/V2/PlanList/scrollTime";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

export const useMealTiming = () => {
  const [mealType, setMealType] = useState<MealTypes | undefined>();
  const { timings } = useUserStore((state) => {
    return {
      timings: state.user?.dietForm?.foodTimings,
    };
  }, shallow);

  const { config } = useConfigContext();
  useEffect(() => {
    if (config?.mealTimings) {
      const resp = scrollTime(
        config?.mealTimings,
        timings,
        config.mealTypeOrder
      );
      if (resp && resp.selectedMealtype) {
        setMealType(resp.selectedMealtype);
      }
    }
  }, [config?.mealTimings, config?.mealTimings, timings]);

  return {
    mealType,
  };
};
