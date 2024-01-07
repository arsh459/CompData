import { createContext, useContext } from "react";
import { useSprintDetail } from "./hooks/useSprintDetail";
// import { BadgeContextProps, BadgeContextInterface } from "./interface";
// import { useGameContext } from "@providers/game/GameProvider";
// import { getRoundsForHome } from "./utils";
// import { useHomeBadges } from "./hooks/useHomeBadges";

// import { useBadge } from "@providers/badges/hooks/useBadge";
import {
  SprintDetailContextInterface,
  SprintDetailContextProps,
} from "./interface";

const SprintDetailContext = createContext<
  SprintDetailContextInterface | undefined
>(undefined);

function SprintDetailProvider({
  children,
  sprintId,
}: SprintDetailContextProps) {
  //   const { badge } = useBadge(state.gameId, badgeId);

  const { sDetail } = useSprintDetail(sprintId);

  const value = {
    sprintDetail: sDetail,
  };

  return (
    <SprintDetailContext.Provider value={value}>
      {children}
    </SprintDetailContext.Provider>
  );
}

function useSprintDetailContext() {
  const context = useContext(SprintDetailContext);

  if (context === undefined) {
    throw new Error(
      "useSprintDetailContext must be used within SprintDetailProvider"
    );
  }

  return context;
}

export { SprintDetailProvider, useSprintDetailContext };
