import { View, Text } from "react-native";
import { getGoalProgressParams, GoalKPIList } from "@utils/goalprogram/utils";
import { useGameContext } from "@providers/game/GameProvider";
import { getCurrentMonthV3 } from "@utils/challange/challengeWeekUtils";
import { useEffect, useState } from "react";
import { KPIConfig } from "@models/Tasks/SystemKPIs";
import { UserRank } from "@models/Activity/Activity";
import clsx from "clsx";
import SvgIcons from "@components/SvgIcons";

interface Props {
  userRank: UserRank;
}

const PlyerGoalProgress: React.FC<Props> = ({ userRank }) => {
  const { game } = useGameContext();
  const [goalKpiList, setGoalKpiList] = useState<GoalKPIList[]>([]);

  useEffect(() => {
    if (game?.configuration?.kpis) {
      const { sprintId, lastSprintId } = getCurrentMonthV3(
        game?.configuration?.sprints,
        game?.configuration?.starts,
        game?.configuration?.challengeLength,
        game?.configuration?.rounds
      );

      const kpiList = getGoalProgressParams(
        game?.configuration?.kpis,
        sprintId,
        userRank,
        lastSprintId
      );
      setGoalKpiList(kpiList);
    }
  }, [game]);

  return (
    <View className="flex flex-row flex-wrap p-2 text-sm iphoneX:text-base">
      <Text className="text-white font-semibold p-2">Goal Progress</Text>
      {goalKpiList.length ? (
        <View className="flex-1 flex flex-row flex-wrap bg-[#00253F] rounded-lg px-2 py-1">
          {goalKpiList.map((each, index) => (
            <>
              <View
                key={index}
                className="self-center flex flex-row items-center p-1"
              >
                <View
                  className={clsx(
                    "h-4 iphoneX:h-6",
                    KPIConfig[each.systemKPI]?.icon === "characters" ||
                      KPIConfig[each.systemKPI]?.icon === "words" ||
                      KPIConfig[each.systemKPI]?.icon === "sentencesphy"
                      ? "w-10 iphoneX:w-16"
                      : "w-4 iphoneX:w-6"
                  )}
                >
                  <SvgIcons
                    iconType={KPIConfig[each.systemKPI]?.icon}
                    color={each.color}
                  />
                </View>
                <Text className="ml-2" style={{ color: each.color }}>
                  {each.actualValue ? each.actualValue : "0"} / {each.targetVal}{" "}
                  {KPIConfig[each.systemKPI]?.unit}
                </Text>
              </View>
              {index !== goalKpiList.length - 1 ? (
                <View className="w-px mx-4 my-1 bg-white/25" />
              ) : null}
            </>
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default PlyerGoalProgress;
