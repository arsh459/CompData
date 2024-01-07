import Header from "@modules/Header";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { GameProvider } from "@providers/game/GameProvider";

// import { UserProvider } from "@providers/user/UserProvider";
import StepsTargetMain from "@modules/StepsTargetMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
const StepsTargetScreen = () => {
  const { state } = useAuthContext();
  useScreenTrack();

  return (
    <GameProvider selectedGameId={state.gameId}>
      {/* <UserProvider> */}
      <>
        <Header
          back={true}
          headerColor={"#13121E"}
          tone="dark"
          headerType="solid"
          //   setHeaderHeight={setHeaderHeight}
        />
        <StepsTargetMain />
      </>
      {/* </UserProvider> */}
    </GameProvider>
  );
};

export default StepsTargetScreen;
