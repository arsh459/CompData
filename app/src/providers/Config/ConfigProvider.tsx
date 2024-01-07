import { createContext, useContext } from "react";
import { useAppConfiguration } from "./hooks/useAppConfiguration";
import { ConfigContextInterface, ConfigContextProps } from "./interface";
// import { BadgeContextProps, BadgeContextInterface } from "./interface";
// import { useGameContext } from "@providers/game/GameProvider";
// import { getRoundsForHome } from "./utils";
// import { useHomeBadges } from "./hooks/useHomeBadges";

// import { useBadge } from "@providers/badges/hooks/useBadge";

const ConfigContext = createContext<ConfigContextInterface | undefined>(
  undefined
);

function ConfigProvider({ children }: ConfigContextProps) {
  //   const { badge } = useBadge(state.gameId, badgeId);

  const { config } = useAppConfiguration();

  const value = {
    config,
  };

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

function useConfigContext() {
  const context = useContext(ConfigContext);

  if (context === undefined) {
    throw new Error("useConfigContext must be used within ConfigProvider");
  }

  return context;
}

export { ConfigProvider, useConfigContext };
