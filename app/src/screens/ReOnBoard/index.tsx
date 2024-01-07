import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import Header from "@modules/Header";
import ReOnBoardMain from "@modules/ReOnBoardMain";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { GameProvider } from "@providers/game/GameProvider";
// import { UserProvider } from "@providers/user/UserProvider";

const ReOnBoard = () => {
  const { state } = useAuthContext();
  useScreenTrack();

  return (
    <GameProvider selectedGameId={state.gameId}>
      {/* <UserProvider> */}
      <>
        <Header back={true} headerColor="#100F1A" tone="dark" />
        <ReOnBoardMain />
      </>
      {/* </UserProvider> */}
    </GameProvider>
  );
};

export default ReOnBoard;
