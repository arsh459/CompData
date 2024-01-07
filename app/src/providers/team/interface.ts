import { EventInterface } from "@models/Event/Event";
import { UserInterface } from "@models/User/User";

export interface TeamContextInterface {
  team?: EventInterface;
  loading?: boolean;
  teamMembers: UserInterface[];
  teamMembersCount: number;
  onNext: () => void;
  teamLeader?: UserInterface;
  memberStatus: "PENDING" | "SUCCESS" | "FAILED";
}

export interface TeamContextProps {
  selectedTeamId?: string;
  initTeamMembers?: number;
  orderTeamMembersByImg?: boolean;
  children: React.ReactNode;
}
