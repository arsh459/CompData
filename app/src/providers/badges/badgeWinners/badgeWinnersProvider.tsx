import { useBadgeUsers } from "@hooks/badges/useBadgeUsers";
import { createContext, useContext } from "react";

import {
  BadgeWinnersContextInterface,
  BadgeWinnersContextProps,
} from "./interface";

const BadgeWinnersContext = createContext<
  BadgeWinnersContextInterface | undefined
>(undefined);

function BadgeWinnersProvider({
  children,
  badgeId,
  badgeType,
}: BadgeWinnersContextProps) {
  const value = useBadgeUsers(badgeId, badgeType);

  return (
    <BadgeWinnersContext.Provider value={value}>
      {children}
    </BadgeWinnersContext.Provider>
  );
}

function useBadgeWinnersContext() {
  const context = useContext(BadgeWinnersContext);

  if (context === undefined) {
    throw new Error("useBadgeWinners context issue");
  }

  return context;
}

export { BadgeWinnersProvider, useBadgeWinnersContext };
