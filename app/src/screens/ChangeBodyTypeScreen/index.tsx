import Header from "@modules/Header";

import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import ChangeBodyTypeMain from "@modules/ChangeBodyTypeMain";
import { StreakProvider } from "@providers/streak/StreakProvider";
const ChangeBodyTypeScreen = () => {
  //   const { state } = useAuthContext();
  useScreenTrack();

  return (
    // <GameProvider selectedGameId={state.gameId}>
    <>
      <Header
        back={true}
        headerColor={"#13121E"}
        tone="dark"
        // headerType="solid"
        headerType="transparent"
        //   setHeaderHeight={setHeaderHeight}
        title="Today’s Fitpoints"
      />
      <StreakProvider>
        <ChangeBodyTypeMain />
      </StreakProvider>
    </>
    // </GameProvider>
  );
};

export default ChangeBodyTypeScreen;
