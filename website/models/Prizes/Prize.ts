import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

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

  // rank prize
  rank: number; // add rank

  // tree prize
  numTrees?: number; // tree prize

  // streak prize
  streakStartTime?: number;
  streakLength?: number;
  priority: number;
  week?: string;
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

export type badgeTypes = "rank1" | "rank2" | "rank3" | "tier" | "";

export interface Badge {
  id: string;
  description: string;
  badgeId: badgeTypes;

  prizes: SBPrize[];

  rankStart?: number;
  rankEnd?: number;
  name: string;

  frequency: "daily" | "weekly" | "monthly" | "anytime";
  priority: number;
  hallOfFamePriority?: number;

  // drop parameters
  rounds?: string[];
  baseValue?: number; // base value for badge
  athleteImage?: AWSMedia | CloudinaryMedia;
  brandImage?: AWSMedia | CloudinaryMedia;
  overlayAthleteImage?: AWSMedia | CloudinaryMedia;
  badgeImage?: AWSMedia | CloudinaryMedia;

  // current winner (dynamic)
  winner?: {
    uid: string;
    winnerName: string;
    points: string;
    image?: CloudinaryMedia | AWSMedia;
  };
}

// prizes/
export interface BadgeAward extends Badge {
  id: string;
  state: "CLAIMED" | "WON";
  createdOn: number;

  // performance stats
  fitPoints?: number;
  nbParticipants?: number;
  rank?: number;

  // team information
  teamId: string;
  teamName?: string;

  // game stats
  gameId: string;
  roundId: string;
  sprintId: string;
}

export interface SBPrize {
  media: (CloudinaryMedia | AWSMedia)[];
  name: string;
  description: string;
}

export type reconStrategy = "anyBadge" | "specificBadge";

export interface SBPrizeV2 {
  id: string;
  media?: CloudinaryMedia | AWSMedia;
  brand?: string;
  name: string;
  description: string;
  badgeIds: string[]; // must have the following badgeIds
  minNumBadges: number; // minimum 1 badge to unlock
  strategy: reconStrategy; // any minBadges (cult etc) | specific minBadges()
  priority: number;
  // gameId: string;
  // level?: number;
}
