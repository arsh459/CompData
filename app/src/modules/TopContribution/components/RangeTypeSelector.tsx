import ViewSelectorGeneric from "@components/ViewSelector/Generic/ViewSelectorGeneric";
import useDietCalendar from "@hooks/dietPlan/useDietCalendar";
import { View } from "react-native";
import { shallow } from "zustand/shallow";
import { selectedViewRangeType } from "..";
import useContributionLeaderboard from "../store/useContributionLeaderboard";

const RangeTypeSelector = () => {
  const { selectedViewRange, setSelectedViewRange } =
    useContributionLeaderboard(
      (state) => ({
        selectedViewRange: state.selectedViewRange,
        setSelectedViewRange: state.setSelectedViewRange,
      }),
      shallow
    );

  const { isTodayActive, activeDate } = useDietCalendar(
    (state) => ({
      isTodayActive: state.today?.unix === state.active?.unix,
      activeDate: state.active?.visibleDate,
    }),
    shallow
  );
  const rangeViews: {
    label: selectedViewRangeType;
    onPress: () => void;
    overRideLabel?: string;
  }[] = [
    {
      label: "Day",
      onPress: () => setSelectedViewRange("Day"),
      overRideLabel: isTodayActive ? "Today" : activeDate ? activeDate : "Day",
    },
    {
      label: "Week",
      onPress: () => setSelectedViewRange("Week"),
    },
  ];

  return (
    <View className="w-[80%] mx-auto my-7">
      <ViewSelectorGeneric
        views={rangeViews}
        currView={selectedViewRange}
        bgColor="bg-[#ffffff33] rounded-2xl"
        selectedViewHighlightColors={["#FF9A02", "#F97C20"]}
        fitToWidth={true}
        itemBgColor={"bg-[#FFF] my-2 rounded-xl"}
        fontSize={""}
        showLine={false}
        selectedTextColor={"text-[#6D55D1]"}
        paddingText={"p-2.5"}
      />
    </View>
  );
};

export default RangeTypeSelector;
