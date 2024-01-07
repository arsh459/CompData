import { createContext, useContext } from "react";
import { TeamContextInterface, TeamContextProps } from "./interface";
import { useSelectedTeam } from "./hooks/useSelectedTeam";
import { useTeamCaptain } from "./hooks/useTeamCaptain";
import { useTeamMembers } from "./hooks/useTeamMembers";
import { useJoinStatus } from "./hooks/useJoinStatus";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserContext } from "@providers/user/UserProvider";

const TeamContext = createContext<TeamContextInterface | undefined>(undefined);

function TeamProvider({
  children,
  selectedTeamId,
  initTeamMembers,
  orderTeamMembersByImg,
}: TeamContextProps) {
  const { loading, team } = useSelectedTeam(selectedTeamId);
  const { state } = useAuthContext();
  const { user: signedInUser } = useUserContext();
  const { user } = useTeamCaptain(team?.ownerUID);
  const { members, onNextMember } = useTeamMembers(
    selectedTeamId,
    orderTeamMembersByImg,
    initTeamMembers
  );
  const membersCount = team?.enrolledUserUIDs
    ? team.enrolledUserUIDs.length
    : 0;

  const { memberStatus } = useJoinStatus(
    team,
    signedInUser,
    state.status ? state.status : "PENDING"
  );

  const value = {
    loading,
    team,
    teamLeader: user,
    teamMembers: members,
    teamMembersCount: membersCount,
    onNext: onNextMember,
    memberStatus,
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
}

function useTeamContext() {
  const context = useContext(TeamContext);

  if (context === undefined) {
    throw new Error("useTeamContext must be used within TeamProvider");
  }

  return context;
}

export { TeamProvider, useTeamContext };
