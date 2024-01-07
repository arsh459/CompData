import { ScrollView, View, useWindowDimensions } from "react-native";
import { useOnboardContext } from "@modules/Workout/GuidedOnboard/OnboardProvider";
import NutritionMeters from "./NutritionMeters/NutritionMeters";
import PlanList from "./PlanList/PlanList";
import BottomDietView from "./BottomDietView/BottomDietView";
import HorizontalDayComp from "@modules/Nutrition/V2/HorizontalDaySelector/HorizontalDayComp";
import HorizontalDayHeading from "./HorizontalDaySelector/HorizontalDayHeading";
import NutritionStageComp from "./StageComponents/NutritionStageComp";
import useDietPlanStage from "../store/useDietPlanStage";
import { shallow } from "zustand/shallow";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useDayRec } from "@hooks/dayRecs/useDayRec";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useAuthContext } from "@providers/auth/AuthProvider";
import Loading from "@components/loading/Loading";
import ErrorStageComp from "./StageComponents/ErrorStageComp";
import BotFloatingContent from "@modules/HomeScreen/SakhiComponents/BotFloatingContent";

interface Props {}

const DietPlan: React.FC<Props> = ({}) => {
  const { width } = useWindowDimensions();
  const { daySelector } = useOnboardContext();
  const { planStage } = useDietPlanStage(
    (state) => ({
      planStage: state.planStage,
    }),
    shallow
  );
  const { nutritionStart } = useUserStore((state) => {
    return {
      nutritionStart: state.user?.recommendationConfig?.nutritionStart,
    };
  }, shallow);
  const { today } = useAuthContext();
  const { badgeId } = useSignleBadgeContext();

  const { error, fetch } = useDayRec(today, "nutrition", badgeId);

  return (
    <View className="flex-1">
      {badgeId && nutritionStart ? (
        <ScrollView className="flex-1" style={{ width }}>
          <View ref={daySelector} collapsable={false}>
            <HorizontalDayHeading />
            <HorizontalDayComp />
          </View>
          <View>
            <NutritionMeters />
          </View>
          {planStage !== "notSubscribed" && (
            <View className="">
              <NutritionStageComp />
            </View>
          )}
          <View className="">
            <PlanList />
          </View>
          {planStage === "notSubscribed" && (
            <View className="">
              <NutritionStageComp />
            </View>
          )}
          {planStage === "subscribedHasPlan" && (
            <View className="">
              <BottomDietView />
            </View>
          )}
        </ScrollView>
      ) : error && fetch ? (
        <View className="flex-1 items-center justify-center">
          <Loading />
        </View>
      ) : error ? (
        <ErrorStageComp error={error} />
      ) : null}

      <BotFloatingContent offsetBottom={20} />
    </View>
  );
};

export default DietPlan;
