import { createContext, useContext } from "react";
// import { BadgeContextProps, BadgeContextInterface } from "./interface";
// import { useGameContext } from "@providers/game/GameProvider";
// import { getRoundsForHome } from "./utils";
// import { useHomeBadges } from "./hooks/useHomeBadges";

// import { useBadge } from "@providers/badges/hooks/useBadge";
import {
  InteractionContextInterface,
  InteractionContextProps,
} from "./interface";

import { useInteractionManager } from "./hooks/useInteractionManager";

const InteractionContext = createContext<
  InteractionContextInterface | undefined
>(undefined);

function InteractionProvider({ children }: InteractionContextProps) {
  //   const { badge } = useBadge(state.gameId, badgeId);

  const { interactionStatus } = useInteractionManager();

  const value = {
    interactionStatus,
  };

  return (
    <InteractionContext.Provider value={value}>
      {children}
    </InteractionContext.Provider>
  );
}

function useInteractionContext() {
  const context = useContext(InteractionContext);

  if (context === undefined) {
    throw new Error(
      "useInteractionContext must be used within InteractionProvider"
    );
  }

  return context;
}

export { InteractionProvider, useInteractionContext };
