import { createContext, useContext } from "react";
import {
  BadgeProgressContextProps,
  BadgeProgressContextInterface,
} from "./interface";
// import { useGameContext } from "@providers/game/GameProvider";
// import { getRoundsForHome } from "./utils";
// import { useHomeBadges } from "./hooks/useHomeBadges";
import { useBadgeProgress } from "@hooks/program/useBadgeProgress";

const BadgeProgressContext = createContext<
  BadgeProgressContextInterface | undefined
>(undefined);

function BadgeProgressProvider({
  children,
  badgeId,
}: // nutritionBadgeId,
BadgeProgressContextProps) {
  //   const { state } = useAuthContext();
  const { progress, summaryProgress } = useBadgeProgress(badgeId);
  // const nutritionProgressObj = useBadgeProgress(nutritionBadgeId);

  const value = {
    badgeProgress: progress,
    badgeId,
    // nutritionBadgeId,
    summaryProgress,
    // nutritionProgress: nutritionProgressObj.progress,
    // nutritionSummaryProgress: nutritionProgressObj.summaryProgress,
  };

  return (
    <BadgeProgressContext.Provider value={value}>
      {children}
    </BadgeProgressContext.Provider>
  );
}

function useBadgeProgressContext() {
  const context = useContext(BadgeProgressContext);

  if (context === undefined) {
    throw new Error(
      "useBadgeProgressContext must be used within BadgeProgressProvider"
    );
  }

  return context;
}

export { BadgeProgressProvider, useBadgeProgressContext };
