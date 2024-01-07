import { CoachRank, UserRank } from "@models/Activity/Activity";
import { viewTypes } from "@utils/leaderboard/utils";
// import { useState } from "react";
import PlayersWise from "./PlayersWise";
import TeamsWise from "./TeamsWise";
import { useGameContext } from "@providers/game/GameProvider";
// import DetailsModal from "../../DetailsModal";
import { useCoachRank } from "@hooks/rank/useCoachRank";
import { useTeamContext } from "@providers/team/TeamProvider";
import { useUserRank } from "@hooks/rank/useUserRank";
import { useUserContext } from "@providers/user/UserProvider";
// import ContributionModal from "@modules/ProgressState/ContributionModal";
import { useNavigation } from "@react-navigation/native";
// import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  selectedView: viewTypes;
  selectedSprint?: string;
  heightFromBottom: number;
  isRankingScreen: boolean;
}

const LeaderboardDetails: React.FC<Props> = ({
  selectedView,
  selectedSprint,
  heightFromBottom,
  isRankingScreen,
}) => {
  const { user } = useUserContext();
  const { game } = useGameContext();
  const { teamLeader } = useTeamContext();
  // const [rankObj, setRankObj] = useState<UserRank>();
  const { myUserRank } = useUserRank(game?.id, user?.uid);
  const { myCoachRank } = useCoachRank(game?.id, teamLeader?.uid);

  const navigation = useNavigation();

  const onRankClick = (rank: UserRank) => {
    navigation.navigate("ContributionScreen", {
      uid: rank.uid,
      sprintId: selectedSprint ? selectedSprint : "",
    });
  };

  return (
    <>
      {selectedView === "players" ? (
        <PlayersWise
          parentId={game?.id}
          myUserRank={myUserRank}
          setUserRank={onRankClick}
          currentSprint={selectedSprint}
          heightFromBottom={heightFromBottom}
          isRankingScreen={isRankingScreen}
        />
      ) : selectedView === "teams" ? (
        <TeamsWise
          parentId={game?.id}
          myCoachRank={myCoachRank}
          after={game?.configuration?.starts}
          heightFromBottom={heightFromBottom}
          setCoachRank={(rank: CoachRank) =>
            navigation.navigate("ProgressScreen", {
              teamId: rank.coachEventId,
              captainId: rank.uid,
              sprintId: selectedSprint ? selectedSprint : "",
            })
          }
          currentSprint={selectedSprint}
          isTeam={teamLeader ? true : false}
          isRankingScreen={isRankingScreen}
        />
      ) : null}
    </>
  );
};

export default LeaderboardDetails;
