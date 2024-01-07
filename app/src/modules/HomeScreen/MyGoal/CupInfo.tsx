import { View, Text, Image } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import GradientText from "@components/GradientText";
import ProgressBar from "@components/ProgressBar";
import { useTeamProgressContext } from "@providers/teamProgress/TeamProgressProvider";
import { getCurrentTeamPts } from "../NewHome/utils";
import { useGameContext } from "@providers/game/GameProvider";
import SpreadColorBall from "@components/SpreadColorBall";

const CupInfo = () => {
  const { params, game } = useGameContext();

  const currentSprintId = params?.currentSprint?.id;
  const { coachRank } = useTeamProgressContext();

  const { nbWorkouts } = getCurrentTeamPts(coachRank, currentSprintId);

  return (
    <LinearGradient
      colors={["#1F1700", "#010101"]}
      className="px-2 rounded-t-[10px] rounded-b"
    >
      <View className="flex flex-row items-center   justify-between ">
        <GradientText
          text={"Get Team Rank 1 and Win Trophy"}
          colors={["#D1B76E", "#FFE292"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          textStyle={{ fontFamily: "BaiJamjuree-SemiBold", fontSize: 15 }}
          // txtTlStyle=" text-base flex-1  "
        />
        <View className="relative py-2 ">
          <View className="absolute left-0 right-0 top-0 bottom-0">
            <SpreadColorBall color1="#FFE292" color2="#100F1A" opacity={0.5} />
          </View>
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/trophy_2_j9jJEWm4j.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664263365111",
            }}
            className="w-9 aspect-[33/25]"
            resizeMode="contain"
          />
        </View>
      </View>
      <View className="flex flex-row items-center justify-between  pb-2">
        <View className=" flex flex-row items-center">
          <Text
            className="text-[#FFF1A5] text-sm"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            Best workouts by team{" "}
          </Text>
          <View className="flex-1">
            {game?.configuration &&
              game.configuration.kpis &&
              game?.configuration?.kpis.map((item) => {
                if (item.kpi === "nb_workouts") {
                  return (
                    <View
                      key={item.kpi}
                      className=" flex flex-row items-center justify-evenly "
                    >
                      <Text
                        className="text-[#FFF1A5] text-sm pr-2 pl-8"
                        style={{ fontFamily: "BaiJamjuree-SemiBold" }}
                      >
                        {nbWorkouts}/{item.targetValue}
                      </Text>
                      <View className="flex-1">
                        <ProgressBar
                          height={10}
                          progress={(nbWorkouts / item.targetValue) * 100}
                          activeColor="#FEE191"
                          inActiveColor="#3D3318"
                        />
                      </View>
                    </View>
                  );
                }
              })}
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CupInfo;
