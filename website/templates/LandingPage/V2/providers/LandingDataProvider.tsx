import { dataBySlug } from "@templates/LandingPage/constants";
import { createContext, useContext } from "react";
// import { BadgeContextProps, BadgeContextInterface } from "./interface";
// import { useGameContext } from "@providers/game/GameProvider";
// import { getRoundsForHome } from "./utils";
// import { useHomeBadges } from "./hooks/useHomeBadges";

// import { useBadge } from "@providers/badges/hooks/useBadge";
import {
  LandingDataContextInterface,
  LandingDataContextProps,
} from "./interface";

const LandingDataContext = createContext<
  LandingDataContextInterface | undefined
>(undefined);

function LandingDataProvider({ children, slug }: LandingDataContextProps) {
  //   const { badge } = useBadge(state.gameId, badgeId);

  // console.log("game", game?.name, activeFutureRounds);

  const value = {
    data: dataBySlug[slug],
    slug,
  };

  //   console.log("v", value);

  return (
    <LandingDataContext.Provider value={value}>
      {children}
    </LandingDataContext.Provider>
  );
}

function useLandingDataContext() {
  const context = useContext(LandingDataContext);

  if (context === undefined) {
    throw new Error(
      "useLandingDataContext must be used within LandingDataProvider"
    );
  }

  return context;
}

export { LandingDataProvider, useLandingDataContext };
