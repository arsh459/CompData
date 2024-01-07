import { createContext, useContext } from "react";
import { RoundContextProps, RoundContextInterface } from "./interface";
import { useRound } from "@hooks/rounds/useRound";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";

const RoundContext = createContext<RoundContextInterface | undefined>(
  undefined
);

function RoundProvider({ children, roundId }: RoundContextProps) {
  useRound(TEAM_ALPHABET_GAME, roundId);
  const value = {
    roundId,
  };

  return (
    <RoundContext.Provider value={value}>{children}</RoundContext.Provider>
  );
}

function useRoundContext() {
  const context = useContext(RoundContext);

  if (context === undefined) {
    throw new Error("useRoundContext must be used within RoundProvider");
  }

  return context;
}

export { RoundProvider, useRoundContext };
