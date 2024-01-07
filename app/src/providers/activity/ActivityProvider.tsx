import { useUserActivity } from "@hooks/activity/useUserActivity";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { createContext, useContext } from "react";
// import { BadgeContextProps, BadgeContextInterface } from "./interface";
// import { useGameContext } from "@providers/game/GameProvider";
// import { getRoundsForHome } from "./utils";
// import { useHomeBadges } from "./hooks/useHomeBadges";

// import { useBadge } from "@providers/badges/hooks/useBadge";
import { ActivityContextInterface, ActivityContextProps } from "./interface";

const ActivityContext = createContext<ActivityContextInterface | undefined>(
  undefined
);

function ActivityProvider({ children, id }: ActivityContextProps) {
  //   const { badge } = useBadge(state.gameId, badgeId);

  const { state } = useAuthContext();
  const { activity } = useUserActivity(id, state.uid);

  const value = {
    activity: activity,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}

function useActivityContext() {
  const context = useContext(ActivityContext);

  if (context === undefined) {
    throw new Error("useActivityContext must be used within ActivityProvider");
  }

  return context;
}

export { ActivityProvider, useActivityContext };
