import { AWSMedia, CloudinaryMedia } from "../sbEvent/CloudinaryMedia";
import * as admin from "firebase-admin";
// import { SystemKPIs } from "../Task/SystemKPIs";
// import { KPIValue } from "../Task/Task";
import { SystemKPIs } from "../Task/SystemKPIs";
import { KPIValue, NutritionFacts, TaskTypes } from "../Task/Task";
import { genderType } from "../User/User";

export interface SubTaskScore {
  [subTaskId: string]: number;
}

// users/activities
export interface Activity {
  calories?: number;
  id?: string;
  fitPoints?: number;
  fitPointsV2?: number;

  subTaskQty?: SubTaskScore;
  macros?: NutritionFacts;
  totalKcalConsumed?: number;

  taskDay?: number;

  userWeight?: number;
  teamId?: string;

  goalScores?: KPIValue;
  date: string;
  activityName: string;
  placeholderImg?: CloudinaryMedia | AWSMedia;
  // communityId: string;
  authorUID: string;
  // eventId: string;
  // cohortId?: string;
  createdOn?: number;
  updatedOn: number;

  stepsActive?: boolean;

  notifyUser?: "PENDING" | "SUCCESS" | "FAILED" | "TBD";
  // gameId?: string;

  // coachEventId?: string;
  // coachCohortId?: string;
  postRef?: admin.firestore.DocumentReference;
  taskId?: string;
  streamId?: string;

  postId: string;
  eventId?: string;
  source?:
    | "terra"
    | "manual"
    | "ondemandVideo"
    | "live"
    | "task"
    | "nutrition"
    | "steps";
  // fetchSource?: fetchTypeSource;
  distanceInMeters?: number;
  timeInSeconds?: number;

  games?: string[];
  // review parameters
  reviewStatus?: reviewStatus;
  activeMessage?: ReviewMessage;
  canFetch?: boolean;
}

// export type fetchTypeSource = "steps" | "workoutANDSteps" | "nutrition";

export type ActivityKPIScore = {
  [sprintId: string]: Partial<Record<SystemKPIs, number>>;
};

export type reviewTicketStatus = "PENDING" | "REVIEWED";

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

export interface AlgoliaTaskSearch {
  id: string;
  type: "TASK" | "BLOG";

  taskType: TaskTypes;
  tags: string[];
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
  score?: number;
  activityTimeAdded?: number | null; // activity added time
  reviewStatus?: reviewStatus;
  taskId?: string;
}

export interface UserPrizes {
  [week: string]: { first?: UserRank; second?: UserRank; third?: UserRank };
}

export interface CoachPrizes {
  [week: string]: { first?: CoachRank; second?: CoachRank; third?: CoachRank };
}

export interface ActivityUserPts {
  actId: string;
  fp: number;
  uid: string;
}

// only in parent event
// sbEvents/{eventId}/userRanks/{rankObj}
export interface UserRank {
  rank: number;
  currentWeekRank?: number;
  weeklyRank?: { [week: string]: number };
  monthlyRank?: { [month: string]: number };
  previousRanks?: { [id: string]: number };

  gender?: genderType;

  // individual ranks
  streakRank?: number;
  avgSpeedRank?: number;
  distanceRank?: number;

  communityRank: number;
  uid: string;

  streakScore?: number;

  eventId?: string;
  cohortId?: string;

  coachCommunityId: string;
  // coachKey: string;
  coachEventId: string;
  coachCohortId?: string;

  totalCalories?: number;
  lastTotalCalories?: number;
  totalFitPoints?: number;
  updatedOn: number;

  numActivities: number;

  prizes: string[];

  authorName?: string;
  authorImg?: CloudinaryMedia | AWSMedia;
  progressV2?: number;

  onStreak?: boolean;

  numStreaks?: number;
  dayCalObj?: { [dayString: string]: number };
  weekCalObj?: { [weekString: string]: number };
  weekCalMin?: { [weekString: string]: number };

  // entire map of all activities for month
  monthActPts?: {
    [monthString: string]: ActivityUserPts[];
  };
  // monthTaskPts?: { [monthString: string]: { [taskId: string]: number } };

  avgSpeed?: number;
  totalDistance?: number;
  scoreMinCal?: number;

  // phase 1 additions
  fitPointsV2?: number;
  dayPointObj?: { [dayString: string]: number }; // get from user
  weekPointObj?: { [weekString: string]: number }; // get from user
  monthPointObj?: { [monthString: string]: number };
  monthCalObj?: { [monthString: string]: number };
  // monthPointObj?: { [monthString: string]: number }; // get from user
  userLevelV2?: number; // keep updated from hook
  // fitPointRank?: number;
  // currentWeekFitPointRank?: number;

  userKey?: string;
  teamName?: string;
  teamKey?: string;

  kpiScoresV2?: ActivityKPIScore;
}

// only in parent event
// sbEvents/{eventId}/userRanks/{rankObj}
export interface CoachRank {
  rank: number;
  currentWeekRank?: number;
  uid: string;

  streakRank?: number;

  numTransformations?: number;
  numTotalStreaks?: number;
  totalCalories?: number;
  lastTotalCalories?: number;
  totalFitPoints?: number;

  coachEventId: string;
  coachCohortId?: string;

  updatedOn: number;

  prizes: string[]; // wining prizes

  authorName?: string;
  authorImg?: CloudinaryMedia | AWSMedia;

  dayCalObj?: { [day: string]: number };
  weekCalObj?: { [weekString: string]: number };
  weekCalMin?: { [weekString: string]: number };
  monthCalObj?: { [monthString: string]: number };

  // phase 1 additions
  totalFitPointsV2?: number;
  dayPointObj?: { [dayString: string]: number };
  weekPointObj?: { [weekString: string]: number };
  monthPointObj?: { [monthString: string]: number };
  previousRanks?: { [id: string]: number };

  weeklyRank?: { [week: string]: number };
  monthlyRank?: { [month: string]: number };
  // taskUIDMap?: { [month: string]: { [taskId: string]: string } };
  monthActPts?: {
    [monthString: string]: { actId: string; fp: number; uid: string }[];
  };

  teamName?: string;
  teamKey?: string;

  // fitPointRank?: number;
}

export type engineChoice = "calories" | "streaks";

/**
 * monthlyPointObj
 * monthlyRank
 * monthActPts
 *
 */
