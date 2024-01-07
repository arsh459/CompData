import { createContext, useContext } from "react";
// import { BadgeContextProps, BadgeContextInterface } from "./interface";
// import { useGameContext } from "@providers/game/GameProvider";
// import { getRoundsForHome } from "./utils";
// import { useHomeBadges } from "./hooks/useHomeBadges";

// import { useBadge } from "@providers/badges/hooks/useBadge";

import { useMonthlyStreak } from "@providers/streak/hooks/useMonthlyStreak";
import {
  MonthlyStreakContextInterface,
  MonthlyStreakContextProps,
} from "./interface";
// import { useAuthContext } from "@providers/auth/AuthProvider";

const MonthlyStreakContext = createContext<
  MonthlyStreakContextInterface | undefined
>(undefined);

function MonthlyStreakProvider({ children }: MonthlyStreakContextProps) {
  //   const { badge } = useBadge(state.gameId, badgeId);

  // const { today } = useAuthContext();
  const { onMonthChange, goalObjs, loading } = useMonthlyStreak();
  // const [selDate, setSelDate] = useState<string>(today);

  const value = {
    onMonthChange,
    goalObjs,
    loading,
    // selDate,
    // setSelDate,
  };

  return (
    <MonthlyStreakContext.Provider value={value}>
      {children}
    </MonthlyStreakContext.Provider>
  );
}

function useMonthlyStreakContext() {
  const context = useContext(MonthlyStreakContext);

  if (context === undefined) {
    throw new Error(
      "useMonthlyStreakContext must be used within MonthlyStreakProvider"
    );
  }

  return context;
}

export { MonthlyStreakProvider, useMonthlyStreakContext };
