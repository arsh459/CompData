import { View } from "react-native";
import { useState } from "react";
import GoalWidgetNav, { navItemsType } from "./GoalWidgetNav";
import { getGoalProgressParams } from "@utils/goalprogram/utils";
import GoalProgressWidget from "./GoalProgressWidget";
import TeamNotifications from "./TeamNotifications";
import PrizeList from "./PrizeList";
import BottomButtons from "./BottomButtons";
import { useUserContext } from "@providers/user/UserProvider";
import { useUserRank } from "@hooks/rank/useUserRank";
import { useGameContext } from "@providers/game/GameProvider";
import { useCoachRank } from "@hooks/rank/useCoachRank";
import { useTeamContext } from "@providers/team/TeamProvider";
import { useNavigation } from "@react-navigation/native";

interface Props {
  navItems: navItemsType[];
  bottomButtons?: boolean;
  hidePlayNow?: boolean;
}

const GoalWidgetWorkout: React.FC<Props> = ({
  navItems,
  bottomButtons,
  hidePlayNow,
}) => {
  const { user } = useUserContext();
  const { game, monthParams, weekParams } = useGameContext();
  const { teamLeader } = useTeamContext();
  const [selectedNav, setSelectedNav] = useState<navItemsType>("goal");
  const navigation = useNavigation();
  const { myUserRank } = useUserRank(game?.id, user?.uid);
  const { myCoachRank } = useCoachRank(
    game?.id,
    game?.configuration?.gameType === "team" ? teamLeader?.uid : undefined
  );

  const kpiList = getGoalProgressParams(
    game?.configuration?.kpis ? game.configuration.kpis : [],
    monthParams?.sprintId,
    myUserRank,
    monthParams?.lastSprintId,
    myCoachRank,
    game?.configuration?.gameType
  );

  return (
    <>
      <View className="pb-4">
        <GoalWidgetNav
          selectedNav={selectedNav}
          navItems={navItems}
          setSelectedNav={setSelectedNav}
        />
      </View>

      {selectedNav === "goal" ? (
        <>
          <GoalProgressWidget data={kpiList} />
          {bottomButtons ? (
            <View className="pt-4">
              <BottomButtons
                leftLink={() => navigation.navigate("Ranking")}
                rightLink={() => {
                  // navigation.navigate("Workout", {
                  // gameId: game ? game.id : "",
                  // teamId: team ? team.id : "",
                  // });
                }}
              />
            </View>
          ) : null}
        </>
      ) : selectedNav === "prizes" ? (
        <PrizeList
          sprintId={monthParams?.sprintId}
          roundId={weekParams?.roundId}
          gameKPIs={game?.configuration?.kpis ? game.configuration.kpis : []}
          hidePlayNow={hidePlayNow}
          isGoalWidget={true}
          myUserRank={myUserRank}
        />
      ) : selectedNav === "team" ? (
        <TeamNotifications />
      ) : null}
    </>
  );
};

export default GoalWidgetWorkout;
