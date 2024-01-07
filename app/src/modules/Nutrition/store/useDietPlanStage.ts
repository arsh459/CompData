import { Badge } from "@models/Prizes/Prizes";
import { create } from "zustand";

// plan stages
export type planStageInterface =
  | "unknown"
  | "subscribedHasPlan"
  | "subscribedHasNoPlan"
  | "subscribedFormNotFilled"
  | "notSubscribed";

interface DietPlanStageInterface {
  planStage: planStageInterface;
  badge?: Badge;
  setPlanStage: (planStage: planStageInterface) => void;
  setBadge: (newBadge?: Badge) => void;
}
const useDietPlanStage = create<DietPlanStageInterface>((set, get) => {
  return {
    planStage: "unknown",
    setPlanStage: (planStage: planStageInterface) => {
      set((state) => ({
        ...state,
        planStage: planStage,
      }));
    },
    badge: undefined,
    setBadge: (newBadge?: Badge) => {
      set((state) => ({
        ...state,
        badge: newBadge,
      }));
    },
  };
});

export default useDietPlanStage;
