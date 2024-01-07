import { usePostsV3 } from "@providers/gamePosts/hooks/usePostsV3";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { createContext, useContext } from "react";
import { GamePostsContextProps, GamePostsontextInterface } from "./interface";

const GamePostContext = createContext<GamePostsontextInterface | undefined>(
  undefined
);

function GamePostsProvider({ children, postType }: GamePostsContextProps) {
  const { state } = useAuthContext();
  const { posts, onNext, fetched } = usePostsV3(state.gameId, postType);

  const value = {
    posts,
    onNext,
    fetched,
  };

  return (
    <GamePostContext.Provider value={value}>
      {children}
    </GamePostContext.Provider>
  );
}

function useGamePostsContext() {
  const context = useContext(GamePostContext);

  if (context === undefined) {
    throw new Error(
      "useGamePostsContext must be used within GamePostsProvider"
    );
  }

  return context;
}

export { GamePostsProvider, useGamePostsContext };
