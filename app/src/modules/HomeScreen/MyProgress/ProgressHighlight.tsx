import { Text, useWindowDimensions, View } from "react-native";

import HexaPercent from "@components/HexaPercent";
import { useTodaysGoal } from "@providers/streak/hooks/useTodaysGoal";
import { useUserContext } from "@providers/user/UserProvider";
import { format } from "date-fns";
import {
  DayRecommendationProvider,
  useDayRecommendationContext,
} from "@providers/dayRecommendation/DayRecommendationProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { StepsPermissionProvider } from "@providers/steps/StepsPermissionProvider";
import { useUserSteps } from "@hooks/steps/useUserSteps";
import { useCurrentDayStore } from "@providers/monthlyStreak/CurrentDayStore";

// import { useMonthlyStreakContext } from "@providers/monthlyStreak/MonthlyStreakProvider";

function WorkoutFp() {
  const { recomendation } = useDayRecommendationContext();

  // const { progress } = getLabelsForNutrition(recomendation);
  return (
    <View className="flex flex-row justify-around w-full flex-1">
      <Text
        className="text-white text-sm iphoneX:text-base flex-1"
        style={{
          fontFamily: "Nunito-SemiBold",
        }}
      >
        Workout
      </Text>
      <Text
        className="text-white text-sm iphoneX:text-base "
        style={{
          fontFamily: "Nunito-SemiBold",
        }}
      >
        {recomendation?.doneFP ? recomendation?.doneFP : 0} FP
      </Text>
    </View>
  );
}

function NutritionFp() {
  const { recomendation } = useDayRecommendationContext();

  // const { progress } = getLabelsForNutrition(recomendation);

  return (
    <View className="flex flex-row justify-around w-full flex-1">
      <Text
        className="text-white text-sm iphoneX:text-base flex-1"
        style={{
          fontFamily: "Nunito-SemiBold",
        }}
      >
        Nutrition
      </Text>
      <Text
        className="text-white text-sm iphoneX:text-base"
        style={{
          fontFamily: "Nunito-SemiBold",
        }}
      >
        {recomendation?.doneFP ? recomendation?.doneFP : 0} FP
      </Text>
    </View>
  );
}

function StepsFp() {
  const { today } = useAuthContext();
  const { daySteps } = useUserSteps(today);
  // const { permission, gFitAuth } = useStepsPermissionContext();
  // const { user } = useUserContext();
  // const { progress } = getViewSteps(
  //   permission,
  //   gFitAuth,
  //   user?.dailyStepTarget ? user?.dailyStepTarget : defaultStepTarget,
  //   daySteps
  // );

  return (
    <View className="flex flex-row justify-around w-full">
      <Text
        className="text-white text-sm iphoneX:text-base flex-1"
        style={{
          fontFamily: "Nunito-SemiBold",
        }}
      >
        Steps
      </Text>
      <Text
        className="text-white text-sm iphoneX:text-base"
        style={{
          fontFamily: "Nunito-SemiBold",
        }}
      >
        {Math.round(daySteps?.steps ? daySteps?.steps / 1000 : 0)} FP
      </Text>
    </View>
  );
}

interface Props {
  //   selDate: string;
}

const ProgressHighlight: React.FC<Props> = ({}) => {
  const { width: Width } = useWindowDimensions();
  const { user } = useUserContext();
  const { today } = useAuthContext();

  const selDate = useCurrentDayStore((state) => state.selDate);

  //   const { selDate } = useMonthlyStreakContext();

  const { todaysObj } = useTodaysGoal(selDate);

  return (
    <View className="flex-1">
      <View className="rounded-3xl  bg-[#343150] mx-4 ">
        <View className="rounded-t-3xl bg-[#5D588C47]">
          <Text className=" text-white  p-4 pl-6 ">
            {today === selDate ? "Today, " : ""}
            {format(new Date(selDate), "do MMMM")}
          </Text>
        </View>
        <View className="flex flex-row p-4  ">
          <HexaPercent
            height={Width * 0.3}
            width={Width * 0.3}
            percent={
              (todaysObj?.achievedFP ? todaysObj.achievedFP : 0) /
              (todaysObj?.targetFP ? todaysObj?.targetFP : 35)
            }
            activeColor={"#fff"}
            noAnimation={false}
            inActiveColor={"#00000033"}
          >
            <View className="flex items-center justify-center absolute  inset-0">
              <Text
                className="text-sm iphoneX:text-base pl-2  text-white "
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {`${todaysObj?.achievedFP ? todaysObj.achievedFP : 0}/${
                  todaysObj?.targetFP ? todaysObj?.targetFP : 35
                }`}
              </Text>
              <Text
                className="text-xs iphoneX:text-sm pl-2  text-white "
                style={{ fontFamily: "Nunito-Medium" }}
              >
                FitPoints
              </Text>
            </View>
          </HexaPercent>
          <View className="flex flex-1  items-center px-4 py-2">
            {selDate ? (
              <>
                <DayRecommendationProvider
                  // badgeId={user?.badgeId}
                  type="workout"
                  dontFetch={false}
                  date={selDate}
                >
                  <WorkoutFp />
                </DayRecommendationProvider>
                <DayRecommendationProvider
                  badgeId={user?.nutritionBadgeId}
                  type="nutrition"
                  dontFetch={false}
                  date={selDate}
                >
                  <NutritionFp />
                </DayRecommendationProvider>
                <StepsPermissionProvider>
                  <StepsFp />
                </StepsPermissionProvider>
              </>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProgressHighlight;
