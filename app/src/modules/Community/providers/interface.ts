export interface UnlockedLvl2ContextInterface {
  navState: "program" | "leaderboard" | "prizes";
  programScrollPosition?: number;
}

export interface UnlockedLvl2ContextProps {
  children: React.ReactNode;
}
