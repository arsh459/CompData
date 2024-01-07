// import Confetti from "@components/Confetti";
import HexaPercent from "@components/HexaPercent";
import SpreadColorBall from "@components/SpreadColorBall";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useNavStore } from "@providers/nav/navStore";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@routes/MainStack";

import { WorkoutDoneScreenTypes } from "@screens/Workout/WorkoutDoneScreen";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { Text, View, useWindowDimensions } from "react-native";

interface Props {
  earnedFP: number;
  totalFP: number;
  type: "workout" | "nutrition";
  workoutProp: WorkoutDoneScreenTypes;
}

const CongratulationsMain: React.FC<Props> = ({
  earnedFP,
  totalFP,
  type,
  workoutProp,
}) => {
  const { width } = useWindowDimensions();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const toNavScreen = useNavStore((state) => state.workoutFinishNav);
  const currentRoundId = useUserStore((state) => state.currentRound?.id);

  const onNext = () => {
    if (toNavScreen && toNavScreen === "ChallengeScreen" && currentRoundId) {
      navigation.navigate("ChallengeScreen", { roundId: currentRoundId });
      // navigation.navigate(toNavScreen);
    } else if (type === "workout") {
      navigation.replace("WorkoutDoneScreen", workoutProp);
    } else if (type === "nutrition") {
      navigation.replace("Home");
    } else {
      navigation.replace("Home");
    }

    weEventTrack("congratulations_clickDetails", {});
  };

  return (
    <View className="flex-1 bg-black relative z-0">
      <View className="absolute left-0 right-0 top-0 bottom-0 -z-10 bg-[#1D1441]/50" />
      <View className="flex-1 flex justify-center items-center">
        <View className="relative z-0">
          <View className="absolute -left-1/4 -right-1/4 -top-1/4 -bottom-1/4 -z-10">
            <SpreadColorBall color1="#6D55D1" color2="#6D55D1" opacity2={0} />
          </View>
          <HexaPercent
            width={width / 1.5}
            height={width / 1.5}
            percent={earnedFP / totalFP}
            activeColor={"#fff"}
            inActiveColor={"#0000004D"}
          >
            <View className="flex justify-center items-center">
              <Text className="text-white text-4xl font-extrabold">
                {earnedFP}/{totalFP}
              </Text>
              <Text className="text-white text-2xl">Fitpoints</Text>
            </View>
          </HexaPercent>
        </View>
        <View className="flex justify-center items-center mt-10">
          <Text className="text-white text-2xl font-bold">
            Congratulations!
          </Text>
          <Text className="text-white text-2xl font-bold">You earned</Text>
        </View>
      </View>
      <View className="p-4">
        <StartButton
          title={
            toNavScreen === "WorkoutDoneScreen" ? "View Details" : "Continue"
          }
          bgColor="bg-[#6D55D1]"
          textColor="text-white"
          roundedStr="rounded-xl"
          textStyle="py-4 text-center text-base rounded-full"
          fontFamily="Nunito-Bold"
          onPress={onNext}
        />
      </View>
      {/* <Confetti /> */}
    </View>
  );
};

export default CongratulationsMain;
