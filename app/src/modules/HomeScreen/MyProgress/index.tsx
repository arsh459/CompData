import { View, Text, TouchableOpacity } from "react-native";
import ProgressIndicators from "./ProgressIndicators";
import { exerciseLogo, nutriLogo, stepsLogo } from "@constants/imageKitURL";
import { useUserContext } from "@providers/user/UserProvider";
import { useStreakContext } from "@providers/streak/StreakProvider";
import { useUserSteps } from "@hooks/steps/useUserSteps";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useSteps } from "@hooks/steps/useSteps";
import { getViewSteps } from "./utils";
import { useStepsPermissionContext } from "@providers/steps/StepsPermissionProvider";
import { useGoogleFitV2 } from "@providers/GoogleFit/hooks/useGoogleFitV2";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserNutritions } from "@hooks/nutrition/useUserNutritions";
import { defaultStepTarget } from "../MyPlanV2/StepElement";

const MyProgress = () => {
  const { user } = useUserContext();
  const navigation = useNavigation();
  const { todaysObj } = useStreakContext();
  const { today } = useAuthContext();
  const { daySteps } = useUserSteps(today);
  const { dayNutritions } = useUserNutritions(today);

  useSteps();
  useGoogleFitV2();
  const { permission, gFitAuth } = useStepsPermissionContext();
  const { stepCt, subtitle } = getViewSteps(
    permission,
    gFitAuth,
    user?.dailyStepTarget ? user.dailyStepTarget : defaultStepTarget,
    daySteps
  );

  const onPressWorkouts = () => {
    user && navigation.navigate("SelectWorkoutsScreen", { userId: user?.uid });
    weEventTrack("home_clickTodayWorkouts", {});
  };

  const onPressSteps = () => {
    navigation.navigate("StepHistoryScreen");
    weEventTrack("home_clickTodaySteps", {});
  };

  const onPressNutrition = () => {
    user &&
      navigation.navigate("NutritionWorkoutsScreen", { userId: user?.uid });
    weEventTrack("home_clickTodayNutrition", {});
  };

  return (
    <View>
      <Text
        className="text-[#F1F1F1] text-xl p-4"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        Today's Progress
      </Text>
      <View className="flex-1 bg-[#2C2C37] mx-4 rounded-3xl">
        <View className="flex-1 flex flex-row  p-3 iphoneX:p-4">
          <TouchableOpacity
            className="flex-1 aspect-square"
            onPress={onPressSteps}
          >
            <ProgressIndicators
              numberString={stepCt}
              text={subtitle}
              startColor="#21BBDC"
              endColor="#00C797"
              imageUrl={stepsLogo}
            />
          </TouchableOpacity>

          <View className="w-3 iphoneX:w-4 aspect-square" />

          <TouchableOpacity
            className="flex-1 aspect-square"
            onPress={onPressWorkouts}
          >
            <ProgressIndicators
              startColor="#318CF7"
              endColor="#1E4CF6"
              numberString={
                todaysObj?.nbWorkouts && todaysObj.nbWorkouts < 10
                  ? `0${todaysObj?.nbWorkouts ? todaysObj?.nbWorkouts : 0}`
                  : !todaysObj?.nbWorkouts
                  ? "0"
                  : `${todaysObj?.nbWorkouts}`
              }
              text="Workouts"
              imageUrl={exerciseLogo}
            />
          </TouchableOpacity>

          <View className="w-3 iphoneX:w-4 aspect-square" />

          <TouchableOpacity
            className="flex-1 aspect-square"
            onPress={onPressNutrition}
          >
            <ProgressIndicators
              numberString={`${dayNutritions?.kcal || 0}`}
              text={`Calories`}
              startColor="#F1BA30"
              endColor="#FF6E1D"
              imageUrl={nutriLogo}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MyProgress;
