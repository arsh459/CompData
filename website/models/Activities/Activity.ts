import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { SystemKPIs } from "@models/Tasks/SystemKPIs";
// import { SystemKPIs } from "@models/Tasks/SystemKPIs";
import { KPIValue } from "@models/Tasks/Task";
import { DocumentReference } from "firebase/firestore";

// activities -> goalKPIValues
// task 1 -> uid:progress1
// task 2 -> uid:progress2
// task 3 -> uid:progress3
// uid -> unitLabel: value across tasks
// user/uid/kpis/{KPI}

// users/uid/activities/id

export interface SubTaskScore {
  [subTaskId: string]: number;
}

export interface Activity {
  id?: string;
  calories?: number;
  fitPoints?: number;
  fitPointsV2?: number;

  stepsActive?: boolean;

  subTaskQty?: SubTaskScore;

  // goalScore?: number;
  goalScores?: KPIValue;
  // activityUnit?: string;
  trueUnix?: number;
  date: string;
  activityName: string;
  // communityId: string;
  authorUID: string;
  // eventId: string;
  // cohortId?: string;
  createdOn?: number;
  updatedOn: number;

  // coachEventId?: string;
  // coachCohortId?: string;

  taskDay?: number;
  teamId?: string;
  postId: string;
  games?: string[];

  notifyUser?: "PENDING" | "SUCCESS" | "FAILED" | "TBD";
  // gameId?: string;

  // references
  postRef?: DocumentReference;
  taskId?: string;
  streamId?: string;

  source?: "terra" | "task" | "checkin" | "steps" | "nutrition";

  distanceInMeters?: number;
  timeInSeconds?: number;

  // review parameters
  reviewStatus?: reviewStatus;
  activeMessage?: ReviewMessage;
  reviewRequestedBy?: string[];

  pointsSeen?: boolean;
  videoWatchedSeconds?: number;

  // progress
  progress?: number;
  fpProgress?: number;
}

export interface AlgoliaActivity extends Omit<Activity, "postRef"> {
  postRef: string;
  objectID: string;
}

export type reviewStatus =
  | "PENDING"
  | "IN_REVIEW" // dep
  | "REVIEWED" // moved to saved
  | "REVIEW_REQUEST" // move to TICKET_REVIEWED
  // | "TICKET_REVIEWED" // move to reviewed without date change
  | "NEED_MORE_DATA" // move to discarded_saved
  | "SAVED"
  | "TRY_AGAIN" // move to discarded_saved
  | "DISCARDED" // move to discarded_saved
  | "DISCARDED_SAVED";

export const reviewStates: reviewStatus[] = [
  "PENDING",
  "IN_REVIEW", // dep
  "REVIEWED",
  "REVIEW_REQUEST",
  // "TICKET_REVIEWED",
  "NEED_MORE_DATA",
  "SAVED",
  "TRY_AGAIN",
  "DISCARDED",
  "DISCARDED_SAVED",
];

export type reviewTicketStatus = "PENDING" | "REVIEWED";

//
export interface ActivityTicket {
  id: string;
  // activityId: string;
  reviewStatus: reviewTicketStatus;
  isActive: boolean;
  createdOn: number;
  createdBy: string;
  createdByName: string;
  createdByPhone: string;
  userMessage: string;
  judgeMessage?: string;
}

// reviewRequestedBy (add entry)
// show ticket basis that ()

export interface ReviewMessage {
  id: string;
  media?: AWSMedia[];
  text?: string;
  tags?: { [tag: string]: boolean };
  createdOn: number; // assignment time

  authorUID: string;
  authorName?: string;
  authorImg?: AWSMedia | CloudinaryMedia;

  // for internal review purposes only
  goalScores?: KPIValue;
  // goalScoresList?: GoalScore[];
  score?: number;
  activityTimeAdded?: number | null; // activity added time
  reviewStatus?: reviewStatus;
  taskId?: string;
}

export type ActivityKPIScore = {
  [sprintId: string]: Partial<Record<SystemKPIs, number>>;
};

export interface GoalScore {
  taskId: string;
  loggedValue: number;
  unitLabel: string;
}

// only in parent event
// sbEvents/{eventId}/userRanks/{rankObj}
export interface UserRank {
  rank: number;
  avgSpeedRank?: number;
  streakRank?: number;
  distanceRank?: number;
  currentWeekRank?: number;

  communityRank: number;
  uid: string;

  eventId?: string;
  cohortId?: string;

  coachCommunityId: string;
  coachEventId: string;
  coachCohortId?: string;

  numActivities: number;

  userKey?: string;

  totalCalories?: number;
  lastTotalCalories?: number;
  totalFitPoints?: number;
  updatedOn: number;

  prizes: string[];

  authorName?: string;
  authorImg?: CloudinaryMedia | AWSMedia;
  progressV2?: number;

  specialPrize?: boolean;
  onStreak?: boolean;

  numStreaks?: number;
  dayCalObj?: { [dayString: string]: number };
  weekCalObj?: { [weekString: string]: number };
  weekCalMin?: { [weekString: string]: number };
  avgSpeed?: number;
  totalDistance?: number;
  scoreMinCal?: number;

  teamName?: string;
  teamKey?: string;

  // phase 1 additions
  fitPointsV2?: number;
  dayPointObj?: { [dayString: string]: number }; // get from user
  weekPointObj?: { [weekString: string]: number }; // get from user
  monthPointObj?: { [monthString: string]: number };
  // monthPointObj?: { [monthString: string]: number }; // get from user
  userLevelV2?: number; // keep updated from hook

  weeklyRank?: { [week: string]: number };
  monthlyRank?: { [month: string]: number };

  userProgress?: number;
  kpiScoresV2?: ActivityKPIScore;
}

// only in parent event
// sbEvents/{eventId}/userRanks/{rankObj}
export interface CoachRank {
  rank: number;
  currentWeekRank?: number;
  uid: string;

  numTransformations?: number;
  totalCalories?: number;
  lastTotalCalories?: number;
  totalFitPoints?: number;

  coachEventId: string;
  coachCohortId?: string;

  teamName?: string;
  teamKey?: string;

  updatedOn: number;

  prizes: string[]; // wining prizes

  authorName?: string;
  authorImg?: CloudinaryMedia | AWSMedia;

  dayCalObj?: { [day: string]: number };
  weekCalObj?: { [weekString: string]: number };
  weekCalMin?: { [weekString: string]: number };

  // phase 1 additions
  totalFitPointsV2?: number;
  dayPointObj?: { [dayString: string]: number };
  weekPointObj?: { [weekString: string]: number };
  monthPointObj?: { [monthString: string]: number };

  weeklyRank?: { [week: string]: number };
  monthlyRank?: { [month: string]: number };
  kpiScoresV2?: ActivityKPIScore;
}

/**
 * 
  inputs: dateStart-dateEnd
  Game: select-game (gameName)
  Team: select-team (all | teamName)
  Round/Season filter ()
  Player: select player (All | select a player)
  task: taskId (filter by task)
  agent: all | select-agent

  reviewStatus: "PENDING"
    | "IN_REVIEW"
    | "REVIEWED"
    | "REVIEW_REQUEST"
    | "SAVED"
    | "DISCARDED" 
    | "DO_AGAIN"
    | "ALL"

  exportCSV()

  getActivitiesForRange()

  assign-agent-form
  - assign agent. Only admin can assign agent

  formChanges
  - Show rules & tables
  Add review Form 
  - text (optional)
  - image (optional)
  - fitPoints
  - taskName / taskId
  - update createdOn
  - update taskStatus to REVIEWED | !REVIEW_REQUEST && !SAVED


  Crons (to all-reviewers)
  - All reviewed tasks older than 24 hours to move to Saved (every minute)
  - tasks in_review && review_request for older than 10 minutes (every 10 minutes) (First notification outside period)
  - tasks change updates (every minute)
 * 
 * 
 * 
 */
