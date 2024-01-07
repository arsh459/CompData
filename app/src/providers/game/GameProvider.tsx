import { createContext, useContext } from "react";
import { GameContextInterface, GameContextProps } from "./interface";
import { useSelectedGame } from "./hooks/useSelectedGame";

const GameContext = createContext<GameContextInterface | undefined>(undefined);

function GameProvider({ children, selectedGameId }: GameContextProps) {
  const {
    loading,
    game,
    gameParams,
    monthParams,
    weekParams,
    activeFutureRounds,
    allRounds,
  } = useSelectedGame(selectedGameId);

  const value = {
    loading,
    game,
    params: gameParams,
    monthParams,
    weekParams,
    selectedGameId,
    activeFutureRounds,
    allRounds,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

function useGameContext() {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGameContext must be used within GameProvider");
  }

  return context;
}

export { GameProvider, useGameContext };
