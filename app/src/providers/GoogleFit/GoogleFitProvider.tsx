import { createContext, useContext } from "react";
// import { useGoogleFit } from "./hooks/useGoogleFit";
import { GoogleFitContextInterface, GoogleFitContextProps } from "./interface";
// import { BadgeContextProps, BadgeContextInterface } from "./interface";
// import { useGameContext } from "@providers/game/GameProvider";
// import { getRoundsForHome } from "./utils";
// import { useHomeBadges } from "./hooks/useHomeBadges";

// import { useBadge } from "@providers/badges/hooks/useBadge";

// import { useNewAntStream } from "./hooks/useNewAntStream";

const GoogleFitContext = createContext<GoogleFitContextInterface | undefined>(
  undefined
);

function GoogleFitProvider({ children }: GoogleFitContextProps) {
  //   const { badge } = useBadge(state.gameId, badgeId);

  // useGoogleFit();

  const value = {};

  return (
    <GoogleFitContext.Provider value={value}>
      {children}
    </GoogleFitContext.Provider>
  );
}

function useGoogleFitContext() {
  const context = useContext(GoogleFitContext);

  if (context === undefined) {
    throw new Error(
      "useGoogleFitContext must be used within GoogleFitProvider"
    );
  }

  return context;
}

export { GoogleFitProvider, useGoogleFitContext };
