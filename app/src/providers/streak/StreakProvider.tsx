import { createContext, useContext } from "react";
import { useUserStreak } from "./hooks/useUserStreak";
import { StreakContextInterface, StreakContextProps } from "./interface";

const StreakContext = createContext<StreakContextInterface | undefined>(
  undefined
);

function StreakProvider({ children }: StreakContextProps) {
  //   const { user } = useUserV2(userId);
  //   const [selectedGameId, setSelectedGameId] = useState<string | undefined>();
  const value = useUserStreak();
  return (
    <StreakContext.Provider value={value}>{children}</StreakContext.Provider>
  );
}

function useStreakContext() {
  const context = useContext(StreakContext);

  if (context === undefined) {
    throw new Error("useStreakContext must be used within Streak Provider");
  }

  return context;
}

export { StreakProvider, useStreakContext };
