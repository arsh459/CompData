import ViewSelectorGeneric from "@components/ViewSelector/Generic/ViewSelectorGeneric";
import { View } from "react-native";
import { shallow } from "zustand/shallow";
import { selectedNutriType } from "..";
import useContributionLeaderboard from "../store/useContributionLeaderboard";

export const NutriTypeSelector = () => {
  const { selectedView, setSelectedView } = useContributionLeaderboard(
    (state) => ({
      selectedView: state.selectedView,
      setSelectedView: state.setSelectedView,
    }),
    shallow
  );
  const views: { label: selectedNutriType; onPress: () => void }[] = [
    {
      label: "protein",
      onPress: () => setSelectedView("protein"),
    },
    {
      label: "carbs",
      onPress: () => setSelectedView("carbs"),
    },
    {
      label: "fats",
      onPress: () => setSelectedView("fats"),
    },
    {
      label: "fibre",
      onPress: () => setSelectedView("fibre"),
    },
  ];

  return (
    <View className="relative z-0">
      <View className="z-10">
        <ViewSelectorGeneric
          views={views}
          currView={selectedView}
          bgColor="bg-[#232136]  "
          selectedViewHighlightColors={["#FF9A02", "#F97C20"]}
          fitToWidth={true}
        />
      </View>
      <View className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#343150] z-20 opacity-30" />
    </View>
  );
};
