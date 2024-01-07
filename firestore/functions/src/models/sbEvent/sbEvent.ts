// import { engineChoice } from "../Activity/Activity";
import { SystemKPIs } from "../Task/SystemKPIs";
import { labelType, tagType } from "../Task/Task";
import { CloudinaryMedia } from "./CloudinaryMedia";
import { ListItem } from "./ListItem";

export interface sbEventInterface {
  id: string;
  name: string;
  eventKey?: string;
  description: string;
  cost: number;
  currency: "₹";
  media: CloudinaryMedia[];

  awardsWorth?: number;

  ownerUID: string;
  createdOn: number;
  updatedOn: number;
  // status: "live" | "draft";
  joinURL: string;

  earnings: number;
  views: number;
  students: number;
  acceptInvites?: boolean;
  // eventDateTime?: string;
  soldOut?: boolean;
  eventDateTimeList?: string[];
  programDetails?: ListItem[];
  whoIsItFor?: ListItem[];
  faq?: ListItem[];
  courseGoal?: string;

  reminderTemplate?: "event_update";
  googleTitle?: string;
  googleDescription?: string;
  googleSEOImg?: CloudinaryMedia;

  eventType?: eventTypes;

  program?: SessionV2[];
  communityVisibility?: boolean;

  needsRegistration?: boolean;
  orderNumber?: number;
  parentId?: string;
  ownerDetails?: {
    name?: string;
    img?: CloudinaryMedia;
    userKey?: string;
  };

  state?: "active" | "finished" | "UNKNOWN";
  eventStarts?: number; // start time unix

  judgeCriterion?: judgeCriterion;
  calCritieron?: number;
  nbTotalParticipants?: number;
  // engineChoice?: engineChoice;
  challengeLength?: number;
  calThForStreak?: number;
  streakLengthTh?: number;

  challengeType?: "game";

  sprintLength?: number;
  roundLength?: number;

  enrolledUserUIDs?: string[];

  configuration?: GameConfiguration;
  pricing?: PricingPlan[];
}

export interface PricingPlan {
  id: string;
  name: string;
  cost: number;
  currency: string;
  appliedOn: "round" | "sprint";
  moneyBackDays?: number;
}

export type eventTypes = "challenge" | "course";
export type judgeCriterion = "streak" | "calories";

export interface Cohort {
  cohortSize: number;
  registerBy: string;
  // cohortStarts: string;
  seatsBooked: number;
  cohortName: string;
  id: string;
  cohortKey: string;
  uid: string;
  sessions?: Session[];
  pinned?: boolean;

  cohortJoinURL?: string;
}

export interface LocalCohort {
  cohortSize: number;
  registerBy: Date | null;
  // cohortStarts: string;
  seatsBooked: number;
  cohortName: string;
  id: string;
  cohortKey: string;
  uid: string;
  sessions?: LocalSession[];
  pinned?: boolean;

  cohortJoinURL?: string;
}

export interface Session {
  name?: string;
  description?: string;
  media?: CloudinaryMedia[];
  goal?: string;

  startTime: string;
  durationInMinutes?: number;
}

export interface LocalSession {
  name?: string;
  description?: string;
  media?: CloudinaryMedia[];
  goal?: string;

  startTime: Date | null;
  durationInMinutes?: number;
}

export type sessionTypes = "live" | "post" | "activity";

export interface SessionV2 {
  id: string;
  sessionType: sessionTypes;
  name?: string;
  description?: string;
  media?: CloudinaryMedia;
  youtubeLink?: string;

  dayNumber?: number;

  joinURL?: string;
  live?: boolean;
  free?: boolean;

  updatedOn: number;

  cohortId?: string;
  scheduledOnTime?: number;
}

export interface GameKPITarget {
  kpi: SystemKPIs;
  targetValue: number;
}

export type navItemsType = "goal" | "Track Goal" | "prizes" | "team";

// roundConfiguration

export type gameTypes = "team" | "individual";
export interface GameConfiguration {
  rounds: RoundObject[];
  starts: number; // unix
  challengeLength: number;

  sprints: SprintObject[];
  kpis?: GameKPITarget[];
  topNav?: navItemsType[];

  stepTaskId?: string;

  // payment collection for sprint
  activeSprintId?: string;
  pinnedSprintId?: string;

  gameType?: gameTypes;
  taskGroups?: TaskGroup[];

  tags?: tagType[];
}

export interface TaskGroup {
  field: "level";
  label: labelType;
  values: number[];
  name: string;
}

export interface RoundObject {
  length: number;
  numPrizes: number;
  numCoachPrizes?: number;
  name: string;
  id: string;

  type: "REST" | "ACTIVE";
  sprintId: string;
  filter?: "gender:female";
}

export interface SprintObject {
  length: number;
  numPrizes: number;
  name: string;
  id: string;
  filter?: "gender:female";
}
