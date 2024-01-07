import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ListItem from "./InsightsListItem";
import { useCurrentPeriodStore } from "@providers/period/periodStore";
import SkeletonInsight from "./SkeletonInsight";
import { shallow } from "zustand/shallow";
import { useSakhiInsightsV3 } from "@hooks/chatbot/insights/useSakhiInsightsV3";

interface Props {
  heading?: string;
  itemBGColor?: string;
  view: "month" | "day";
}

const BasedOnCurrentCycle: React.FC<Props> = ({
  heading,
  itemBGColor,
  view,
}) => {
  const { loadingDiet, loadingYoga } = useSakhiInsightsV3(view);

  const { periodDateId, recsExist } = useCurrentPeriodStore((state) => {
    const dtStore =
      state.periodDateObjStore[
        view === "day"
          ? state.currentlySelected
          : state.currentlySelectedInMonth
      ];

    return {
      periodDateId: dtStore?.id || "",
      recsExist:
        dtStore?.recommendations?.DIET || dtStore?.recommendations?.YOGA,
    };
  }, shallow);

  return (
    <>
      {recsExist ? (
        <Text
          className="text-base text-white pl-6 "
          style={{
            fontFamily: "Nunito-Bold",
          }}
        >
          {heading ? heading : "Based on you current cycle"}
        </Text>
      ) : null}
      <ScrollView
        bounces={false}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="py-4"
      >
        <View className="w-4" />
        {loadingDiet ? (
          <SkeletonInsight />
        ) : (
          <ListItem
            // item={dietInsight}
            type="DIET"
            itemBGColor={itemBGColor}
            periodDateId={periodDateId}
          />
        )}
        <View className="w-4" />
        {loadingYoga ? (
          <SkeletonInsight />
        ) : (
          <ListItem
            // item={workoutInsight}
            type="YOGA"
            itemBGColor={itemBGColor}
            periodDateId={periodDateId}
          />
        )}
        <View className="w-4" />
      </ScrollView>
    </>
  );
};

export default BasedOnCurrentCycle;
