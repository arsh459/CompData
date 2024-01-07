import { View, Text, Image, useWindowDimensions } from "react-native";
import GradientText from "@components/GradientText";
import ProgressBar from "@components/ProgressBar";
import SpreadColorBall from "@components/SpreadColorBall";
import { iPhoneX } from "@constants/screen";
import { useGameContext } from "@providers/game/GameProvider";
import { useTeamProgressContext } from "@providers/teamProgress/TeamProgressProvider";
import { getCurrentTeamPts } from "@modules/HomeScreen/NewHome/utils";
import { goldenTrophy } from "@constants/imageKitURL";

const TrophyCard = () => {
  const { width } = useWindowDimensions();
  const { params, game } = useGameContext();

  const currentSprintId = params?.currentSprint?.id;

  const { coachRank } = useTeamProgressContext();

  const { nbWorkouts } = getCurrentTeamPts(coachRank, currentSprintId);

  return (
    <View className="flex justify-center items-center relative py-4 iphoneX:py-6">
      <View className="absolute left-0 right-0 top-0 bottom-0">
        <SpreadColorBall color1="#FFE292" color2="#100F1A" opacity={0.25} />
      </View>
      <GradientText
        text={"Get Team Rank 1 and Win Trophy"}
        colors={["#D1B76E", "#FFE292"]}
        textStyle={{
          fontFamily: "BaiJamjuree-SemiBold",
          fontSize: width > iPhoneX ? 20 : 18,
          textAlign: "center",
        }}
      />
      <Image
        source={{ uri: goldenTrophy }}
        className="w-1/2 aspect-square"
        resizeMode="contain"
      />
      {game?.configuration?.kpis &&
        game.configuration.kpis.map((item) => {
          if (item.kpi === "nb_workouts") {
            return (
              <View key={item.kpi} className="w-full px-8">
                <ProgressBar
                  height={8}
                  heightOfContainer={8}
                  progress={
                    (nbWorkouts / (item.targetValue ? item.targetValue : 1)) *
                    100
                  }
                  activeColor="#FEE191"
                  inActiveColor="#3D3318"
                  padding={2}
                />
                <View className="flex flex-row justify-between items-center pt-2">
                  <Text
                    className="text-[#FFF1A5] text-xs iphoneX:text-sm"
                    style={{ fontFamily: "BaiJamjuree-Regular" }}
                  >
                    Best {item.targetValue} workouts of team{" "}
                  </Text>
                  <Text
                    className="text-[#FFF1A5] text-xs iphoneX:text-sm"
                    style={{ fontFamily: "BaiJamjuree-SemiBold" }}
                  >
                    {nbWorkouts}/{item.targetValue}
                  </Text>
                </View>
              </View>
            );
          }
        })}
    </View>
  );
};

export default TrophyCard;
