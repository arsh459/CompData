// import { UserProvider } from "@providers/user/UserProvider";
import Header from "@modules/Header";
import TeamBrowseMain from "@modules/TeamBrowseMain";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { GameProvider } from "@providers/game/GameProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

const TeamBrowseScreen = () => {
  const { state } = useAuthContext();
  useScreenTrack();
  return (
    <GameProvider selectedGameId={state.gameId}>
      {/* <UserProvider> */}
      <>
        <Header
          back={true}
          tone="dark"
          title="Team Browse"
          headerColor="#100F1A"
        />
        <TeamBrowseMain />
      </>
      {/* </UserProvider> */}
    </GameProvider>
  );
};

export default TeamBrowseScreen;
