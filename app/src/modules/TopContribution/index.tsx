import { View } from "react-native";
import { NutriTypeSelector } from "./components/NutriTypeSelector";
import RangeTypeSelector from "./components/RangeTypeSelector";
import ProgressContributionComponent from "./components/ProgressContributionComponent";
import ViewNutriContribution from "./ViewNutriContribution";

export type selectedNutriType = "protein" | "carbs" | "fats" | "fibre";
export type selectedViewRangeType = "Day" | "Week";

const TopContribution = () => {
  return (
    <View className="flex-1">
      <NutriTypeSelector />
      <RangeTypeSelector />
      <ProgressContributionComponent />
      <View className="flex-1 bg-[#100F1A]">
        <ViewNutriContribution />
      </View>
    </View>
  );
};

export default TopContribution;
