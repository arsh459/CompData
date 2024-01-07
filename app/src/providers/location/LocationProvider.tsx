import { createContext, useContext } from "react";
import { openSettings } from "react-native-permissions";
import { useElapsedTime } from "./hooks/useElapsedTime";
import { useLocationPermission } from "./hooks/useLocationPermission";
import { useLocationValues } from "./hooks/useLocationValues";
// import { BadgeContextProps, BadgeContextInterface } from "./interface";
// import { useGameContext } from "@providers/game/GameProvider";
// import { getRoundsForHome } from "./utils";
// import { useHomeBadges } from "./hooks/useHomeBadges";

// import { useBadge } from "@providers/badges/hooks/useBadge";
import { LocationContextInterface, LocationContextProps } from "./interface";

const LocationContext = createContext<LocationContextInterface | undefined>(
  undefined
);

function LocationProvider({ children }: LocationContextProps) {
  //   const { badge } = useBadge(state.gameId, badgeId);

  //   const { antStream } = useNewAntStream();
  const { status, requestPermission } = useLocationPermission();

  const {
    locResponse,
    apState,
    onStart,
    onFinish,
    onPause,
    onRemoveSubscription,
  } = useLocationValues(status);
  const { secondsElapsed } = useElapsedTime(apState);

  const value = {
    status,
    requestPermission,
    openSettings: openSettings,
    secondsElapsed,
    locResponse,
    onStart,
    onFinish,
    onPause,
    onRemoveSubscription,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

function useLocationContext() {
  const context = useContext(LocationContext);

  if (context === undefined) {
    throw new Error("useGameContext must be used within GameProvider");
  }

  return context;
}

export { LocationProvider, useLocationContext };
