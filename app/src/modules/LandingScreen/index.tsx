import Header, { headerTypes } from "@modules/Header";
import { useGameContext } from "@providers/game/GameProvider";
import { useState } from "react";
import LockedProgram from "./LockedProgram";

const LandingScreen = () => {
  const { game } = useGameContext();
  const [isTrasparent, setIsTrasparent] = useState<headerTypes>("overlay");

  return (
    <>
      <Header
        backIcon="arrow_circle"
        back={true}
        title={game?.name}
        tone="dark"
        headerType={isTrasparent}
      />
      <LockedProgram setIsTrasparent={setIsTrasparent} />
    </>
  );
};

export default LandingScreen;
