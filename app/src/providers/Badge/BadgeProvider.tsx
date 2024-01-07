import { createContext, useContext } from "react";
import { BadgeContextProps, BadgeContextInterface } from "./interface";
// import { useGameContext } from "@providers/game/GameProvider";
// import { getRoundsForHome } from "./utils";
// import { useHomeBadges } from "./hooks/useHomeBadges";

import { useBadge } from "@providers/badges/hooks/useBadge";
import { useAuthContext } from "@providers/auth/AuthProvider";

const BadgeContext = createContext<BadgeContextInterface | undefined>(
  undefined
);

function SingleBadgeProvider({ children, badgeId }: BadgeContextProps) {
  const { state } = useAuthContext();
  const { badge, fetched } = useBadge(state.gameId, badgeId);

  const value = {
    badge,
    fetched,
    badgeId,
  };

  return (
    <BadgeContext.Provider value={value}>{children}</BadgeContext.Provider>
  );
}

function useSignleBadgeContext() {
  const context = useContext(BadgeContext);

  if (context === undefined) {
    throw new Error(
      "useSignleBadgeContext must be used within SingleBadgeProvider"
    );
  }

  return context;
}

export { SingleBadgeProvider, useSignleBadgeContext };
