// import HallOfFame from "@modules/HallOfFame/HallOfFame";
import BlurBG from "@components/BlurBG";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import HallOfFameV2 from "@modules/HallOfFame/V2/HallOfFameV2";
import Header from "@modules/Header";
import HeaderText from "@modules/Header/HeaderText";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import { HallOfFameProvider } from "@providers/badges/HallOfFamePriver";
// import { GameProvider } from "@providers/game/GameProvider";
// import { UserProvider } from "@providers/user/UserProvider";
import { useState } from "react";

const HallOfFameScreen = () => {
  // const { state } = useAuthContext();
  const [isBlured, setIsBlured] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  useScreenTrack();

  const handleScroll = (yOffset: number) => {
    if (yOffset > 0) {
      setIsBlured(true);
    } else {
      setIsBlured(false);
    }
  };

  return (
    <>
      <Header
        back={true}
        headerColor={"#100F1A"}
        tone="dark"
        headerType="transparent"
        setHeaderHeight={setHeaderHeight}
        titleNode={<HeaderText text="Hall of Fame" />}
        centerTitle={true}
      />
      {/* <GameProvider selectedGameId={state.gameId}> */}
      <HallOfFameProvider>
        <HallOfFameV2 handleScroll={handleScroll} />
      </HallOfFameProvider>
      {/* </GameProvider> */}
      {isBlured ? (
        <BlurBG
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: headerHeight,
          }}
          blurType="dark"
          blurAmount={10}
          fallbackColor="#100F1A"
        />
      ) : null}
    </>
  );
};

export default HallOfFameScreen;
