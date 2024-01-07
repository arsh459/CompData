import { View, Text, Dimensions } from "react-native";
import React from "react";
import Header from "@modules/Header";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
// import { useNavigation } from "@react-navigation/native";
import SvgIcons from "@components/SvgIcons";
import { CircularProgressScreenInterface } from "@screens/CircularProgressScreen";
import { getColor, getSubText } from "./utils";
import CirclePercent from "@components/CirclePercent";
import { useTodaysGoal } from "@providers/streak/hooks/useTodaysGoal";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import ImageWithURL from "@components/ImageWithURL";
import { springIconHexaFrame28 } from "@constants/imageKitURL";
import { getUserTotalFP } from "@modules/HomeScreen/utills/getUserTotalFP";
import { useDayRec } from "@hooks/dayRecs/useDayRec";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePostNavigationProvider } from "./providers/postNavigationProvider";
import { useForcePortrait } from "@hooks/orientation/useForcePortrait";
import Loading from "@components/loading/Loading";
import { useInteractionContext } from "@providers/InteractionProvider/InteractionProvider";

const { width } = Dimensions.get("window");
const remoteWidth = width / 2;
const strokeWidth = 12;
const iconSize = (remoteWidth - strokeWidth * 2) / 2;

const CircularProgressMain: React.FC<CircularProgressScreenInterface> = ({
  type,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { today } = useAuthContext();
  // const navigation = useNavigation();
  const { todaysObj } = useTodaysGoal();

  const { dailyFPTarget, fpCredit, fpDebit, nutritionBadgeId } = useUserStore(
    ({ user }) => {
      return {
        dailyFPTarget: user?.dailyFPTarget,
        fpCredit: user?.fpCredit,
        fpDebit: user?.fpDebit,
        nutritionBadgeId: user?.nutritionBadgeId,
      };
    },
    shallow
  );

  // use to continue
  const continueCallback = usePostNavigationProvider(
    (state) => state.continueCallback,
    shallow
  );

  const { recomendation } = useDayRec(
    today,
    "nutrition",
    nutritionBadgeId,
    true
  );

  const numanitor =
    type === "fitpoint"
      ? todaysObj?.achievedFP || 0
      : type === "nutrition"
      ? recomendation?.doneFP || 0
      : 0;
  const denominator =
    type === "fitpoint"
      ? dailyFPTarget || 35
      : type === "nutrition"
      ? recomendation?.taskFP || 0
      : 0;

  const percent = numanitor / denominator || 0;

  const color = getColor(type);

  const { interactionStatus } = useInteractionContext();
  const { state } = useForcePortrait();

  if (!state || !interactionStatus) {
    return (
      <View className="w-full h-full bg-black flex justify-center items-center">
        <Loading />
      </View>
    );
  }

  return (
    <>
      <Header
        headerColor="#232136"
        tone="dark"
        optionNode={
          type === "fitpoint" ? (
            <View className="flex flex-row justify-center items-center">
              <View className="w-5 aspect-square">
                <ImageWithURL
                  className="w-full h-full"
                  source={{ uri: springIconHexaFrame28 }}
                  resizeMode="contain"
                />
              </View>

              <Text
                style={{ color, fontFamily: "Nunito-Bold" }}
                className="text-base ml-2"
              >
                {`${getUserTotalFP(fpCredit, fpDebit)} FP`}
              </Text>
            </View>
          ) : null
        }
      />

      <View
        className="flex-1 bg-[#232136] px-4 pt-4"
        style={{ paddingBottom: bottom || 16 }}
      >
        <View className="flex-1 flex justify-center items-center">
          <CirclePercent
            circleSize={remoteWidth}
            percent={percent}
            showInactive={true}
            strokeWidth={strokeWidth}
            activeColor={color}
            inActiveColor={color ? `${color}33` : undefined}
          >
            <View style={{ width: iconSize }} className="aspect-square">
              {type === "fitpoint" ? (
                <ImageWithURL
                  className="w-full h-full"
                  source={{ uri: springIconHexaFrame28 }}
                  resizeMode="contain"
                />
              ) : (
                <SvgIcons iconType={type} color={color} />
              )}
            </View>
          </CirclePercent>

          <View className="h-8" />
          <Text
            style={{ color, fontFamily: "Nunito-Bold" }}
            className="text-center text-5xl leading-[60px]"
          >
            {`${numanitor}/${denominator} ${
              type === "fitpoint" ? "FP" : type === "nutrition" ? "Diet FP" : ""
            }`}
          </Text>

          <Text
            style={{ fontFamily: "Nunito-Regular" }}
            className="text-white/60 text-center text-xl"
          >
            {getSubText(type)}
          </Text>
        </View>

        <StartButton
          title="Continue"
          bgColor="bg-[#6D55D1]"
          textColor="text-white"
          fontFamily="Nunito-Bold"
          textStyle="py-3 text-center text-base"
          onPress={continueCallback}
        />
      </View>
    </>
  );
};

export default CircularProgressMain;

/**
 *
 * ProgressNavStore {
 * circularProgressNavTo?: keyof ReactNavigation.RootParamList;
 * circularProgressParams?: keyof ReactNavigation.RootParamList;
 * finalNavTo: keyof ReactNavigation.RootParamList;
 * finalNavToParams: RootStackParamList
 * setValues: (navTo, navToParams) => void
 * handleContinueHandler: () => {};
 * setHandleContinueHandler: (callbackFunc: () => void) => void;
 * }
 *
 * const getStreakStatus = (currentFP, targetFP, incFP, streakExists: boolean) => "START_STREAK" | "ACHIEVE_STREAK"
 *
 *
 *
 * MealScreen
 * -> CircularProgress
 * --> StartNewStreak -> ?
 * --> StreakAchieve -> ?
 * --> NutritionScreen
 *
 * Workout
 * -> CircularProgress
 * --> StartNewStreak
 * --> StreakAchieve
 * --> Workout
 *
 * ScreenX
 * -> CircularProgress
 * --> StartNewStreak
 * --> StreakAchieve
 * --> ScreenY
 *
 * CircularProgress <- lastScreen
 *
 *
 *
 *
 * func circularProgress = () => {
 *
 * }
 *
 * CIRCULAR PROGRESS
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
