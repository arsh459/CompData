import { createContext, useContext } from "react";
// import { BadgeContextProps, BadgeContextInterface } from "./interface";
// import { useGameContext } from "@providers/game/GameProvider";
// import { getRoundsForHome } from "./utils";
// import { useHomeBadges } from "./hooks/useHomeBadges";

// import { useBadge } from "@providers/badges/hooks/useBadge";
import { ChatContextInterface, ChatContextProps } from "./interface";
// import { useNewAntStream } from "./hooks/useNewAntStream";

const ChatContext = createContext<ChatContextInterface | undefined>(undefined);

function ChantProvider({ children }: ChatContextProps) {
  //   const { badge } = useBadge(state.gameId, badgeId);

  //   const { antStream } = useNewAntStream();

  const value = {
    // antStream,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

function useChatContext() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("useChatContext must be used within ChantProvider");
  }

  return context;
}

export { ChantProvider, useChatContext };
