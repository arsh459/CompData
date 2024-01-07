import { createContext, useContext } from "react";
import { BootcampContextProps, BootcampContextInterface } from "./interface";
import { useBootCamp } from "@hooks/bootcamp/useBootCamp";
import { useUserContext } from "@providers/user/UserProvider";
// import { useGameContext } from "@providers/game/GameProvider";
// import { getRoundsForHome } from "./utils";
// import { useHomeBadges } from "./hooks/useHomeBadges";

const BootcampContext = createContext<BootcampContextInterface | undefined>(
  undefined
);

function BootcampProvider({ children }: BootcampContextProps) {
  //   const { badge } = useBadge(state.gameId, badgeId);

  const { user } = useUserContext();
  const value = useBootCamp(user?.bootcampDetails?.bootcampId);

  return (
    <BootcampContext.Provider value={value}>
      {children}
    </BootcampContext.Provider>
  );
}

function useBootcampContext() {
  const context = useContext(BootcampContext);

  if (context === undefined) {
    throw new Error("useBootcampContext must be used within BootcampProvider");
  }

  return context;
}

export { BootcampProvider, useBootcampContext };
