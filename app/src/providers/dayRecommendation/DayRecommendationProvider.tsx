import { useDayRec } from "@hooks/dayRecs/useDayRec";
import { createContext, useContext } from "react";

import {
  DayRecommendationContextInterface,
  DayRecommendationContextProps,
} from "./interface";

const DayRecommendationContext = createContext<
  DayRecommendationContextInterface | undefined
>(undefined);

function DayRecommendationProvider({
  children,
  date,
  type,
  badgeId,
  dontFetch,
}: DayRecommendationContextProps) {
  //   const { badge } = useBadge(state.gameId, badgeId);

  const { recomendation, error, fetch } = useDayRec(
    date,
    type,
    badgeId,
    dontFetch
  );

  const value = {
    recomendation,
    error,
    fetch,
  };

  return (
    <DayRecommendationContext.Provider value={value}>
      {children}
    </DayRecommendationContext.Provider>
  );
}

function useDayRecommendationContext() {
  const context = useContext(DayRecommendationContext);

  if (context === undefined) {
    throw new Error(
      "useDayRecommendationContext must be used within DayRecommendationProvider"
    );
  }

  return context;
}

export { DayRecommendationProvider, useDayRecommendationContext };
