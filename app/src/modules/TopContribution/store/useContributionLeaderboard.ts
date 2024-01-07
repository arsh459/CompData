import { create } from "zustand";
import { selectedNutriType, selectedViewRangeType } from "..";

export interface ContributionLeaderBoard {
  selectedView: selectedNutriType;
  setSelectedView: (newValue: selectedNutriType) => void;
  selectedViewRange: selectedViewRangeType;
  setSelectedViewRange: (newValue: selectedViewRangeType) => void;
}
const useContributionLeaderboard = create<ContributionLeaderBoard>((set) => {
  return {
    selectedView: "protein",
    selectedViewRange: "Day",
    setSelectedView: (newValue: selectedNutriType) => {
      set((state) => ({
        ...state,
        selectedView: newValue,
      }));
    },
    setSelectedViewRange: (newValue: selectedViewRangeType) => {
      set((state) => ({
        ...state,
        selectedViewRange: newValue,
      }));
    },
  };
});

export default useContributionLeaderboard;
