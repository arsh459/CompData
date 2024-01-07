import React from "react";
import TaskListByNutri from "./TaskListByNutri";
// import { selectedNutriType, selectedViewRangeType } from ".";
import { useTopContributors } from "@hooks/activity/useTopContributors";
import { View, Text } from "react-native";
import LoadingSpinner from "@components/LoadingSpinner";
import useContributionLeaderboard from "./store/useContributionLeaderboard";
import { shallow } from "zustand/shallow";

const ViewNutriContribution = () => {
  const { type, nutriType } = useContributionLeaderboard(
    (state) => ({
      type: state.selectedViewRange,
      nutriType: state.selectedView,
    }),
    shallow
  );
  const { userNutritionData } = useTopContributors(type, nutriType);
  return (
    <View className="flex-1">
      {userNutritionData ? (
        userNutritionData.length > 0 ? (
          <TaskListByNutri
            activities={userNutritionData}
            nutriType={nutriType}
          />
        ) : (
          <View className="h-full items-center justify-center">
            <Text className="text-[#fff]">No Item to Show</Text>
          </View>
        )
      ) : (
        <LoadingSpinner />
      )}
    </View>
  );
};

export default ViewNutriContribution;
