export type awardTypes =
  | "rank"
  | "tree"
  | "streak"
  | "weeklyRank"
  | "monthlyRank";

export interface Prize {
  id: string;
  parentId: string;
  earnedInCommunityId: string;
  eventId: string;

  prizeName: string;

  awardedToUID: string; // user ID
  awardedToName: string; // user name to display
  awardedByUID: string; // creator to user
  awardedByName: string; // coach name to display
  isTeamAward: boolean; // coach rank vs user rank

  createdOn: number;
  isAtStake: boolean;

  prizeType: awardTypes;
  week?: string;

  // rank prize
  rank: number; // add rank

  // tree prize
  numTrees?: number; // tree prize

  // streak prize
  streakStartTime?: number;
  streakLength?: number;
  priority: number;
}

export interface PrizeSummary {
  numTeamGold?: number;
  numTeamSilver?: number;
  numTeamBronze?: number;

  numMemberGold?: number;
  numMemberSilver?: number;
  numMemberBronze?: number;

  numConsistent?: number;
  numTrees?: number;
  numMotivators?: number;

  communityId: string;
}

export interface EventPrizeSummary {
  // numTeamGold?: number;
  // numTeamSilver?: number;
  // numTeamBronze?: number;

  // numMemberGold?: number;
  // numMemberSilver?: number;
  // numMemberBronze?: number;

  numConsistent?: number;
  numTrees?: number;
  numMotivators?: number;

  totalCalories?: number;
  numTeams?: number;

  // communityId: string;
}
