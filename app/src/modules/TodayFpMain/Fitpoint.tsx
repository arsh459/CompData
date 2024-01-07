import { useTodaysGoal } from "@providers/streak/hooks/useTodaysGoal";
import { useUserContext } from "@providers/user/UserProvider";
import { View, Text, Dimensions } from "react-native";
import HexaPercent from "@components/HexaPercent";
import { useAuthContext } from "@providers/auth/AuthProvider";
// import {
// getLabelsForNutrition,
// getLabelsForWorkout,
// } from "@hooks/program/utils";
import { useDayRec } from "@hooks/dayRecs/useDayRec";
import {
  StepsPermissionProvider,
  // useStepsPermissionContext,
} from "@providers/steps/StepsPermissionProvider";
import { useSteps } from "@hooks/steps/useSteps";
import { useGoogleFitV2 } from "@providers/GoogleFit/hooks/useGoogleFitV2";
import { useUserSteps } from "@hooks/steps/useUserSteps";
// import { getViewSteps } from "@modules/HomeScreen/MyProgress/utils";
// import { defaultStepTarget } from "@modules/HomeScreen/MyPlanV2/StepElement";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageWithURL from "@components/ImageWithURL";
import { useNavigation } from "@react-navigation/native";
import { infoBtnRingBlack } from "@constants/imageKitURL";

const { width } = Dimensions.get("window");
const size = (width - 100) * 0.45;

const Fitpoint = () => {
  const { user } = useUserContext();
  const { today } = useAuthContext();
  const navigation = useNavigation();
  const { todaysObj } = useTodaysGoal();

  const achievedFP = todaysObj?.achievedFP ? todaysObj.achievedFP : 0;

  const dailyFPTarget = user?.dailyFPTarget ? user.dailyFPTarget : 35;

  return (
    <View className="bg-[#F3E8FF] rounded-2xl p-4">
      <View className="flex flex-row items-center gap-4">
        <Text
          className="text-[#232136] text-xl"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Today's Fitpoint
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("WhatIsFpScreen")}>
          <ImageWithURL
            source={{ uri: infoBtnRingBlack }}
            className="w-5 aspect-square"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View className="h-px bg-[#2626261A] my-4" />

      <View className="flex flex-row">
        <View className="flex items-center justify-center">
          <HexaPercent
            width={size}
            height={size}
            percent={achievedFP / dailyFPTarget}
            activeColor={"#fff"}
            inActiveColor={"#00000033"}
          >
            <View className="w-full h-full flex justify-center items-center">
              <Text
                className="text-lg text-white"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {`${achievedFP}/${dailyFPTarget}`}
              </Text>
              <Text
                className="text-xs text-white"
                style={{ fontFamily: "Nunito-Regular" }}
              >
                Fitpoints
              </Text>
            </View>
          </HexaPercent>
        </View>

        <View className="w-px bg-[#2626261A] mx-4" />

        <View className="flex-1 flex justify-around pr-2">
          <Workout
            badgeId={user?.badgeId || ""}
            date={today}
            // achievedFP={achievedFP}
          />
          <Nutrition
            badgeId={user?.nutritionBadgeId || ""}
            date={today}
            // achievedFP={achievedFP}
          />
          <StepsPermissionProvider>
            <Steps date={today} />
          </StepsPermissionProvider>
        </View>
      </View>
    </View>
  );
};

export default Fitpoint;

interface Param {
  date: string;
  badgeId: string;
  // achievedFP: number;
}

const Workout: React.FC<Param> = ({ badgeId, date }) => {
  const { recomendation } = useDayRec(date, "workout", badgeId, true);

  const fp = recomendation?.doneFP ? recomendation?.doneFP : 0;

  return <Element text="Workout" fp={fp} />;
};

const Nutrition: React.FC<Param> = ({ badgeId, date }) => {
  const { recomendation } = useDayRec(date, "nutrition", badgeId, true);
  const fp = recomendation?.doneFP ? recomendation?.doneFP : 0;

  return <Element text="Nutrition" fp={fp} />;
};

const Steps: React.FC<{
  date: string;
  // targetSteps: number;
  // achievedFP: number;
}> = ({ date }) => {
  const { daySteps } = useUserSteps(date);

  const fp = Math.round((daySteps?.steps ? daySteps?.steps : 0) / 1000);

  useSteps();
  useGoogleFitV2();

  // const { permission, gFitAuth } = useStepsPermissionContext();
  // const { progress } = getViewSteps(
  //   permission,
  //   gFitAuth,
  //   targetSteps,
  //   daySteps
  // );

  return <Element text="Steps" fp={fp} />;
};

const Element: React.FC<{ text: string; fp: number }> = ({ text, fp }) => {
  return (
    <View className="flex flex-row justify-between items-center">
      <Text
        numberOfLines={1}
        className="text-[#242424B2] text-base"
        style={{ fontFamily: "Nunito-Medium" }}
      >
        {text}
      </Text>
      <Text
        numberOfLines={1}
        className="text-[#242424E5] text-base"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {fp}FP
      </Text>
    </View>
  );
};
