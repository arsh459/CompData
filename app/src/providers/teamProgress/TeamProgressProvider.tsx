import { createContext, useContext } from "react";
import { TeamContextProps, TeamProgressInterface } from "./interface";
import { useCoachRank } from "@hooks/rank/useCoachRank";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { getTeamCaptainId } from "@utils/utills";
import { useTeamRanks } from "./hooks/useTeamRanks";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const TeamProgressContext = createContext<TeamProgressInterface | undefined>(
  undefined
);

function TeamProgressProvider({ children, captainId }: TeamContextProps) {
  const { state } = useAuthContext();

  const participatingInGameWithTeam = useUserStore(
    ({ user }) => user?.participatingInGameWithTeam,
    shallow
  );

  const captainIdFinal = captainId
    ? captainId
    : getTeamCaptainId(participatingInGameWithTeam, state.gameId);

  const { myCoachRank } = useCoachRank(state.gameId, captainIdFinal);
  const { rankMembers } = useTeamRanks(state.gameId, captainIdFinal);

  const value = {
    userRanks: rankMembers,
    coachRank: myCoachRank,
  };

  return (
    <TeamProgressContext.Provider value={value}>
      {children}
    </TeamProgressContext.Provider>
  );
}

function useTeamProgressContext() {
  const context = useContext(TeamProgressContext);

  if (context === undefined) {
    throw new Error(
      "useTeamProgressContext must be used within TeamProgressProvider"
    );
  }

  return context;
}

export { TeamProgressProvider, useTeamProgressContext };
