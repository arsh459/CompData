import { View, Text } from "react-native";

import { useTeamProgressContext } from "@providers/teamProgress/TeamProgressProvider";
import { useGameContext } from "@providers/game/GameProvider";
import { getCurrentTeamPts } from "./utils";
interface Props {
  // totalFP: number;
  // yourFP: number;
}
const TeamStats: React.FC<Props> = ({}) => {
  const { params, game } = useGameContext();

  const currentSprintId = params?.currentSprint?.id;

  const { coachRank } = useTeamProgressContext();

  const { fps, streak } = getCurrentTeamPts(coachRank, currentSprintId);

  return (
    <View className="bg-[#FFFFFF17] rounded-xl ">
      <Text
        style={{ fontFamily: "BaiJamjuree-Medium" }}
        className=" py-2 px-4 text-xl font-semibold leading-tight text-white"
      >
        Your Team Stats
      </Text>
      <View className="bg-[#100F1A] h-0.5 " />
      <View className="flex flex-row">
        {game?.configuration &&
          game.configuration.kpis &&
          game?.configuration?.kpis.map((item, index) => {
            if (item.kpi === "fit_points" || item.kpi === "streak") {
              const label =
                item.kpi === "fit_points"
                  ? "FP Progress"
                  : "Team consistency rate";
              const value = item.kpi === "fit_points" ? fps : streak;
              return (
                <View className="flex-1  p-4" key={item.kpi}>
                  <Text
                    style={{ fontFamily: "BaiJamjuree-Medium" }}
                    className="text-center text-white text-2xl iphoneX:text-3xl"
                  >
                    {value}/{item.targetValue}
                  </Text>
                  <Text
                    style={{ fontFamily: "BaiJamjuree-Medium" }}
                    className="text-center text-white text-xs "
                  >
                    {label}
                  </Text>
                  {index === 0 ? <View className="bg-[#100F1A] w-px" /> : null}
                </View>
              );
            }
          })}

        {/* <View className="flex-1  p-4">
          <Text className="font-semibold text-center text-white text-2xl iphoneX:text-3xl">
            {(streak / totalFP) * 100}%
          </Text>
          <Text className=" font-semibold text-center text-white text-[10px] iphoneX:text-xs">
            Team consistency rate
          </Text>
        </View> */}
        {/* <View className="bg-[#100F1A] w-px" /> */}
        {/* <View className="flex-1 ml-px p-4">
          <Text className="font-semibold text-center text-white text-2xl iphoneX:text-3xl">
            {fps}/{totalFP}
          </Text>
          <Text className="font-semibold text-center text-white text-[10px] iphoneX:text-xs ">
            FP Progress
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default TeamStats;
