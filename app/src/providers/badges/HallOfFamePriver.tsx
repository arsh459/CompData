import { createContext, useContext } from "react";
import { BadgeContextProps, HallOfFameContextInterface } from "./interface";
// import { useGameContext } from "@providers/game/GameProvider";
// import { getRoundsForHome } from "./utils";
// import { useHomeBadges } from "./hooks/useHomeBadges";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import { useHallOfFameBadges } from "./hooks/useHallOfFameBadges";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";

const BadgeContext = createContext<HallOfFameContextInterface | undefined>(
  undefined
);

function HallOfFameProvider({ children }: BadgeContextProps) {
  //   const { state } = useAuthContext();
  // const { state } = useAuthContext();

  const value = useHallOfFameBadges(TEAM_ALPHABET_GAME);

  return (
    <BadgeContext.Provider value={value}>{children}</BadgeContext.Provider>
  );
}

function useHallOfFameContext() {
  const context = useContext(BadgeContext);

  if (context === undefined) {
    throw new Error("useGameContext must be used within GameProvider");
  }

  return context;
}

export { HallOfFameProvider, useHallOfFameContext };
