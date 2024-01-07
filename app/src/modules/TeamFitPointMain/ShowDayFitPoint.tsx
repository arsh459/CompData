import { View } from "react-native";

import { useGameContext } from "@providers/game/GameProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { useTeamContext } from "@providers/team/TeamProvider";
import { useUserRank } from "@hooks/rank/useUserRank";
import { useCoachRank } from "@hooks/rank/useCoachRank";
import TeamPlayersWise from "./TeamPlayerWise";
import TeamChallangePointsDetails from "./TeamChallengePointsDetail";
interface Props {
  ListHeaderComponent: () => JSX.Element;
  selectedView: "Days Fitpoints" | "Total Fitpoints";
  handleScroll: (val: number) => void;
}
const ShowDayFitPoint: React.FC<Props> = ({
  ListHeaderComponent,
  selectedView,
  handleScroll,
}) => {
  const { params } = useGameContext();
  const { user } = useUserContext();
  const { game } = useGameContext();
  const { teamLeader } = useTeamContext();

  const { myUserRank } = useUserRank(game?.id, user?.uid);
  const { myCoachRank } = useCoachRank(game?.id, teamLeader?.uid);

  const sprints = game?.configuration?.sprints
    ? game?.configuration?.sprints
    : [];
  const leaderboardMonth = params?.currentSprint?.id;
  return (
    <View className="bg-[#100F1A] flex-1">
      {selectedView === "Days Fitpoints" ? (
        <TeamChallangePointsDetails
          name={myCoachRank?.authorName}
          dayPointObj={myCoachRank?.dayPointObj}
          leaderboardMonth={leaderboardMonth}
          sprints={sprints}
          gameStarts={game?.configuration?.starts}
          ListHeaderComponent={ListHeaderComponent}
          handleScroll={handleScroll}
        />
      ) : null}
      {selectedView === "Total Fitpoints" ? (
        <TeamPlayersWise
          parentId={game?.id}
          myUserRank={myUserRank}
          isTeam={true}
          ListHeaderComponent={ListHeaderComponent}
          handleScroll={handleScroll}
        />
      ) : null}
    </View>
  );
};

export default ShowDayFitPoint;
