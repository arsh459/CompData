import { View } from "react-native";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useState } from "react";
import DietPlan from "./V2/DietPlan";
import RecipeSelected from "./V2/RecipeSelected";
import NutritionHeader from "./NutritionHeader";
import ViewSelectorV3 from "@components/ViewSelector/V3";
import EnableNotificationPopup from "@modules/notifee/EnableNotificationPopup";
import HomeGuidedOnboard from "./GuidedOnboard";

import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useDietStageInit } from "./hooks/useDietStageInit";

interface Props {}

const NutritionMain: React.FC<Props> = ({}) => {
  const { fetched } = useSignleBadgeContext();
  const [selectedView, setSelectedView] = useState<"Diet Plan" | "Recipes">(
    "Diet Plan"
  );
  const { hasFilledForm } = useUserStore((state) => {
    return {
      hasFilledForm: state.user?.flags?.dietFormFilled ? true : false,
    };
  }, shallow);

  useDietStageInit();
  // console.log("Create a meal tool", create_a_meal_tool);
  return (
    <>
      <NutritionHeader showSetting={hasFilledForm} />
      <View className="flex-1 bg-[#232136]">
        <ViewSelectorV3
          view1="Diet Plan"
          view2="Recipes"
          currView={selectedView}
          onView1={() => setSelectedView("Diet Plan")}
          onView2={() => setSelectedView("Recipes")}
          selectedViewHighlightColors={["#FF9A02", "#F97C20"]}
          bgColor=""
          lineStyle="h-1"
          showLine={true}
        />
        {selectedView === "Diet Plan" && fetched ? (
          <DietPlan />
        ) : selectedView === "Recipes" ? (
          <RecipeSelected />
        ) : null}
      </View>
      <HomeGuidedOnboard />
      <EnableNotificationPopup text="Don't miss a meal. Enable notifications to get daily reminders and messages from your coach." />
    </>
  );
};

export default NutritionMain;
