import { View, Text } from "react-native";

import GoalCard from "./GoalCard";
import { useGameContext } from "@providers/game/GameProvider";
import { useTeamProgressContext } from "@providers/teamProgress/TeamProgressProvider";
import { getCurrentTeamPts } from "../NewHome/utils";
import { getEndingIn } from "../BadgeScroll/utils";
interface Props {
  // endingInTimeStr?: string;
}
const MyGoalHome: React.FC<Props> = ({}) => {
  const { params, weekParams } = useGameContext();

  const currentSprintId = params?.currentSprint?.id;

  const { coachRank } = useTeamProgressContext();

  const { fps } = getCurrentTeamPts(coachRank, currentSprintId);

  const { timeStr } = getEndingIn(
    weekParams?.roundId,
    weekParams?.roundEndUnix,
    params?.currentRound ? [params.currentRound.id] : []
  );

  return (
    <View className="px-4 pt-4">
      <View className="flex flex-row items-baseline justify-between py-2">
        <Text
          className="text-[#F4F4F4] text-xl"
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          Weekly Challenge
        </Text>
        <Text
          className="text-[#F4F4F4] text-xs"
          style={{ fontFamily: "BaiJamjuree-Medium" }}
        >
          Ending in <Text className="text-[#FF586F]">{timeStr}</Text>
        </Text>
      </View>

      <GoalCard
        fpString={`${fps} FP`}
        rank={coachRank?.rank}
        teamName={
          coachRank?.teamName
            ? coachRank.teamName
            : coachRank?.authorName
            ? `${coachRank.authorName}'s team`
            : "My team"
        }
        teamId={coachRank?.coachEventId ? coachRank?.coachEventId : ""}
        captainId={coachRank?.uid ? coachRank?.uid : ""}
        sprintId={params?.currentSprint ? params.currentSprint.id : ""}
      />
    </View>
  );
};

export default MyGoalHome;
