import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Badge } from "@models/Prizes/PrizeV2";
import { SystemKPIs } from "@models/Tasks/SystemKPIs";
import { navItemsType } from "@modules/WorkoutsV3/GoalProgramContainer/GoalWidgetNav";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";

export interface EventInterface {
  id: string;
  name: string;
  eventKey?: string;
  description: string;
  cost: number;
  currency: "₹";
  media: (CloudinaryMedia | AWSMedia)[];
  thumbnail?: CloudinaryMedia | AWSMedia;

  freeGame?: boolean;

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
  programDetails?: ListItem[]; // program details
  whoIsItFor?: ListItem[]; // what you get
  faq?: ListItem[];
  courseGoal?: string;
  courseGoalPrimary?: string;

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
  celebrityId?: string;

  state?: "active" | "finished";
  eventStarts?: number; // start time unix

  goalPoints?: string[];

  calCritieron?: number;
  nbTotalParticipants?: number;
  // engineChoice?: engineChoice;
  challengeLength?: number;
  calThForStreak?: number;
  streakLengthTh?: number;

  leaderboards?: LeaderboardDescription[];

  seriesAccess?: "GLOBAL";

  recentActivity?: UserActivitySnippet;
  challengeType?: "game";
  awardsWorth?: number;
  enrolledUserUIDs?: string[];

  manualRank?: number;
  sprintLength?: number;
  roundLength?: number;

  configuration?: GameConfiguration;

  badges?: Badge[];

  pricing?: PricingPlan[];
  nbWorkouts?: number;
  equipmentNeed?: string;
  goalKpiText?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  cost: number;
  currency: string;
  appliedOn: "round" | "sprint";
  moneyBackDays?: number;
  freeAccessDays?: number;
  durationInDays?: number;
  pointers?: string[];
}

export interface UserActivitySnippet {
  uid: string;
  createdOn: number;
  postId: string;
  text: string;
  createdBy?: string;
  img?: CloudinaryMedia;
}

export interface LeaderboardDescription {
  name: string;
  kpi: "streak" | "calories" | "avgSpeed" | "distance";
}

export type leaderboardKPIs = "streak" | "calories" | "avgSpeed" | "distance";

interface SessionKPIObj {
  [sessionId: string]: {
    numClaps?: number;
    numCheckins?: number;
  };
}

export interface EventKPIs {
  sessionKPIs: SessionKPIObj;
}

export type eventTypes = "challenge" | "course";

export interface Cohort {
  cohortStarts?: string;

  cohortSize: number;
  registerBy: string;
  // cohortStarts: string;
  seatsBooked: number;
  cohortName: string;
  id: string;
  cohortKey: string;
  uid: string;
  // sessions?: Session[];
  pinned?: boolean;

  cohortJoinURL?: string;
}

export interface LocalCohort {
  cohortStarts?: Date | null;

  cohortSize: number;
  registerBy: Date | null;
  // cohortStarts: string;
  seatsBooked: number;
  cohortName: string;
  id: string;
  cohortKey: string;
  uid: string;
  // sessions?: LocalSession[];
  pinned?: boolean;

  cohortJoinURL?: string;
}

export type sessionTypes = "live" | "ondemand" | "activity" | "post";

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

  numClaps?: number;
  numCheckins?: number;
  sessionStarts?: string;

  cohortId?: string;
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

export interface InviteCode {
  code: string;
  name?: string;
  description?: string;
  img?: string;

  discount?: number;
  maxUse?: number;
  timesUsed?: number;
}

/**
 *
 * Game configuration
 * <input /> DateTimePicker (Material UI) -> Date -> unix
 * <input /> challengeLength
 *
 * Add Round
 * <input for length>
 * <input for numPrizes> ...
 *
 * Setup environment
 * Form for game configuration
 *
 */

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
  tagTypes?: string[];
}

export interface GameKPITarget {
  kpi: SystemKPIs;
  targetValue: number;
}

// pullups - pullups, reps, targetVal

export interface RoundObject {
  length: number;
  numPrizes: number;
  name: string;
  id: string;

  type: "REST" | "ACTIVE";
  sprintId: string;
  isFinale?: boolean;
  isWarmup?: boolean;
}

export interface SprintObject {
  length: number;
  numPrizes: number;
  name: string;
  id: string;
  // registrationExpires?: number;
}
