// import { useAuthContext } from "@providers/auth/AuthProvider";
import { createContext, useContext } from "react";
import { useBadgeProgressCalender } from "../hooks/useBadgeProgressCalender";
import { DayContextInterface, DayContextProps } from "../interface";

// const today = getMidnigthDate(Date.now());

const DayContext = createContext<DayContextInterface | undefined>(undefined);

function DayProvider({ children, startUnix }: DayContextProps) {
  const value = useBadgeProgressCalender(
    // todayUnix ? todayUnix : undefined,
    startUnix
  );

  return <DayContext.Provider value={value}>{children}</DayContext.Provider>;
}

function useDayContext() {
  const context = useContext(DayContext);

  if (context === undefined) {
    throw new Error("useDayContext must be used within Day Provider");
  }

  return context;
}

export { DayProvider, useDayContext };
