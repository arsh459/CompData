import { TeamProvider } from "@providers/team/TeamProvider";
import { Leaderboard } from "@modules/Community/Leaderboard";
import { GameProvider } from "@providers/game/GameProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";

const RankingScreen = () => {
  const { state } = useAuthContext();
  return (
    <GameProvider selectedGameId={state.gameId}>
      <TeamProvider selectedTeamId={""} initTeamMembers={3}>
        <Leaderboard
          isViewClick={true}
          heightFromBottom={0}
          isRankingScreen={true}
        />
      </TeamProvider>
    </GameProvider>
  );
};

export default RankingScreen;
