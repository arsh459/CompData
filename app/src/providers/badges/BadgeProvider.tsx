import { createContext, useContext } from "react";
import { BadgeContextInterface, BadgeContextProps } from "./interface";
// import { useGameContext } from "@providers/game/GameProvider";
// import { getRoundsForHome } from "./utils";
// import { useHomeBadges } from "./hooks/useHomeBadges";
import { useHomeBadgesV2 } from "./hooks/useHomeBadgesV2";
import { useAuthContext } from "@providers/auth/AuthProvider";

const BadgeContext = createContext<BadgeContextInterface | undefined>(
  undefined
);

function BadgeProvider({ children, allCards }: BadgeContextProps) {
  //   const { state } = useAuthContext();
  const { state } = useAuthContext();

  const value = useHomeBadgesV2(
    state.gameId
    // activeFutureRounds,
    // allCards,
    // allRounds
  );

  return (
    <BadgeContext.Provider value={value}>{children}</BadgeContext.Provider>
  );
}

function useBadgeContext() {
  const context = useContext(BadgeContext);

  if (context === undefined) {
    throw new Error("useBadgeContext must be used within BadgeProvider");
  }

  return context;
}

export { BadgeProvider, useBadgeContext };
