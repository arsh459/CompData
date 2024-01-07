// import * as t from 'io-ts';
// import {MomentFromString} from '../../models/CustomTypes/Date';

// import { boolean } from "fp-ts";
import { difficulty } from "../../main/Https/addBadge/addBadgeFunc";
import { actionSourceTypes } from "../../main/Https/fb/interface";
import { MenstrualPhaseDays } from "../../main/Https/period/utils";
import { waTemplateNames } from "../../main/PubSub/notifications/constants";
import { BookingSnippet } from "../BookingRequestISO/BookingRequestISO";
import { MediaInterface } from "../Collection/Collection";
import { AWSMedia, CloudinaryMedia } from "../sbEvent/CloudinaryMedia";
import { TerraUser } from "../Terra/TerraUser";
import { symptomId } from "./symptoms";

/**
// type
const userMandatory = t.type({
  uid: t.string,
});

const userPartial = t.partial({
  email: t.string,
  name: t.string,
  phone: t.string,
  os: t.string,
  ip: t.string,
  createdOn: MomentFromString,
  hasPlanned: t.boolean,
  hasBooked: t.boolean,
  hasTripSaved: t.boolean,
  tags: t.array(t.string),
  gender: t.string,
  role: t.string,
  access_code: t.string,
  access_code_usage: t.number,
  selectedStay: t.object,
  imageURI: t.string,
  inviteURL: t.string,
});

export const User = t.intersection([userMandatory, userPartial]);
 */

export interface EnrolledEventWithTime {
  eventId: string;
  enrolledTime: number;
}

export interface ParticipatingWithTeamObj {
  teamId: string;
  ownerUID: string; // to be kept updated
  enrolledTime: number; // to be used in future
}

export interface goalObj {
  targetFP: number;
  achievedFP: number;
  date: string;
  nbWorkouts: number;
  id: string;
  unix: number;

  // nbWorkoutsPlanDone: number;
  // nbWorkoutsPlanGiven: number;
}

export type diagnosedPeriodType =
  | "not_diagnosed"
  | "just_got_diagnosed"
  | "3_6_months"
  | "more_than_6_months";

export type cycleLengthTyps =
  | "21_less"
  | "21_35"
  | "35_45"
  | "45_60"
  | "60_more";
export type pcosSymptoms =
  | "acne"
  | "darkening_skin"
  | "facial_and_excess_hair"
  | "hairfall"
  | "bad_mood"
  | "fatigue";
export type workoutFrequencyTypes = "none" | "1_3" | "2_5" | "everyday";

export type userSlotStatus =
  | "DONE"
  | "NOT_INTERESTED"
  | "NO_PICKUP"
  | "RESCHEDULED"
  | "PENDING"
  | "SCHEDULED";

export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export const allDays: Day[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const defaultDays: Day[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const dayMap: { [dayNumber: number]: Day } = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

export interface RecommendationConfig {
  primaryWorkoutCoach?: string;
  start?: number;
  baseTier?: number; // basis user difficulty

  nutritionStart?: number;

  timezone?: {
    // offset?: number;
    tzString?: string;
  };

  workoutDays?: Day[];
  workoutNotificationTime?: string;

  badgeConfig?: { [badgeId: string]: BadgeConfig };
}

export interface BadgeConfig {
  start?: number;
  baseTier?: number;
}

export type periodDateType =
  | "PERIOD"
  | "ESTIMATED_PERIOD"
  | "UNKNOWN"
  | "OVULATION"
  | "FOLLICULAR"
  | "LUTEAL";

interface LoggedSymptom {
  text: string;
  image: string;
  symptomId?: symptomId;
}

export type AutoRoomIDs = "YOGA" | "DIET";

export interface EmojiItem {
  name: string;
  reason: string;
  body: string;
  type: AutoRoomIDs;
}

export interface PeriodDateObj {
  id: string;
  date: string;
  unix: number;

  type: periodDateType;

  dayNumber?: number;
  cycleLength: number;
  cycleProgress?: number;

  phaseProgress?: number;
  phaseDay: number;
  phaseLength: number;
  loggedSymptoms?: LoggedSymptom[];

  // recommendations?: EmojiItem[];
  recommendations?: Partial<Record<AutoRoomIDs, EmojiItem>>;
  insight?: string;

  // insight?: string;
  // expected?: boolean;

  // to fetch relevant cycle
  cycleId: string;
}

export type periodPrompts =
  | "pastPeriod"
  | "didYouGetPeriod"
  | "flowInfo"
  | symptomId
  | "symptomCheck"
  | "didYourPeriodEnd"
  | "symptomRelief"
  // | "energeticAndGoodMood"
  // | "ovulationCramp"
  // | "ovulationDischarge"
  // | "ovulationSpotting"
  // | "headache"
  | "pmsCheck"
  // | "anxious"
  | "questionApology";

type promptsAsked = Record<periodPrompts, number>;

// export interface phaseSymptom {
//   id: symptomId;
//   status: symptomStatus;
//   day: number;
//   phase: periodDateType;
// }

// users/uid/loggedSymptoms/id

export interface Cycle {
  length: number;
  startDate: string; // yyyy-mm-dd
  endDate: string;

  id: string;

  startUnix: number;
  endUnix: number;
  status: "regular" | "irregular";

  phaseSplits: MenstrualPhaseDays;
  promptStatus?: promptsAsked;
  lastPromptAsked?: periodPrompts;

  delayLength?: number;

  // flow?: flowTypes;
  // cycleSymptoms?: phaseSymptom[]; // sorted by day. last element to have latest
}

export type flowTypes = "light" | "medium" | "heavy";
// x, x,
// x, n, a, end, a, a, a, end, a, a, a, end
// a, a, a, end, a, a, a, end, a, a, a, end
// a, b, b, b, end, b, b, b, end.
export type periodTrackerGoal =
  | "PCOS_MANAGEMENT"
  | "PREGNANCY"
  | "PREGNANCY_PREVENTION"
  | "PERIOD_PREDUCTION";

export type optOutStates = "SCHEDULED" | "FAILED" | "DONE"; // boolean;

export interface FlagObj {
  goToday?: boolean;
  chatScreenOnboard?: boolean;
  // guided onboard
  // guidedOnboardDone?: boolean;
  swapMealGuidedOnboardDone?: string;
  knowMoreSakhi?: boolean;
  // workout onboard
  workoutCardOnboard?: boolean;
  workoutProgOnboard?: string | "DONE";
  workoutDoneOnboard?: string | "DONE";
  introReelsOnboard?: boolean;
  // nutrition onboard
  dietCardOnboard?: boolean;
  dietFormFilled?: boolean;
  dietDoneOnboard?: boolean;
  recipesOnboard?: boolean;
  // day selector
  daySelectorOnboard?: boolean;
  // Pro welcome
  seenWelcomePro?: boolean;
  // period

  periodTrackerCalender?: boolean;
  periodTrackerInsight?: boolean;

  sbPlanId?: string; // overwritten when plan is upgraded

  // bootcamp
  bootcampOnboarded?: boolean;
}

export interface NutritionTarget {
  carbs?: number;
  fats?: number;
  fiber?: number;
  id: string;
  kcal?: number;
  protein?: number;
  start?: number;
  end?: number;
}

export type deliverableType =
  | "initial_flags_checked"
  | "welcome_paid_message"
  | "invoice_sent"
  // doctor
  | "doc_consultation_booked"
  | "doc_consultation_done"
  | "call_user_for_pending_doc"
  | "message_user_for_pending_doc"
  | "doc_fyi_message" // to book diet cons
  | "prescription_sent"
  // slip flag
  | "doc_consultation_skip"
  // diet
  | "diet_consultation_booked"
  | "first_diet_consultation"
  | "call_user_for_diet_cons"
  | "message_user_for_pending_diet_cons"
  | "diet_plan_created"
  | "diet_fyi_message"
  // roadmap creation
  | "diet_consultation_skip"
  | "roadmap_updated"
  // habit coach
  | "roadmap_consultation_time"
  | "first_workout_consultation"
  | "call_user_for_pending_roadmap"
  | "message_user_for_pending_roadmap_cons"
  | "workout_fyi_message"
  | "yoga_pdf";

export type paidUserDeliverables = Partial<Record<deliverableType, boolean>>;

export type consultationInventoryKeys =
  | "nbDoctorConsultationsTotal"
  | "nbDietConsultationsTotal"
  | "nbDoctorConsultationsDone"
  | "nbDietConsultationsDone";

export type consultationInventory = Record<
  consultationInventoryKeys,
  number | undefined
>;

export type workoutStyleTypes = "HIIT" | "Yoga" | "Running";

export interface UserInterface {
  uid: string;
  name?: string;
  unsubscribe?: boolean;
  lastGameId?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  os?: "android" | "ios" | "macos" | "windows" | "web";
  socialBoat?: boolean;
  ip?: string;
  hasPlanned?: boolean;
  hasBooked?: boolean;
  hasTripSaved?: boolean;
  role?: string;
  imageURI?: string;
  inviteURL?: string;
  onboardingCallStatus?: userSlotStatus;
  gifter?: boolean;

  origins?: string[];

  hmsRoomId?: string;
  invitedPageId?: string;

  // influencer program
  referrerId?: string;
  userType?: "influencer" | "member" | "InfluencerRequest";
  bookings?: number;
  fpDebit?: number;

  onboarded?: boolean;

  gptPrompts?: string[];

  // trSoftUUID?: string;
  communityMemberType?: "manager";
  fpCredit?: number;
  coverMedia?: MediaInterface[];
  groups?: string[];

  userKey?: string;

  height?: number;
  weight?: number;

  gender?: genderType;
  age?: number;
  fitnessGoals?: fitnessGoalObj;
  fitnessGoalText?: string;

  sakhiUnreadMessages?: number;

  // target to reach
  dailyFPTarget?: number;
  dailyStepTarget?: number;
  dailyKCalTarget?: number;
  dailyProteinTarget?: number;
  dailyFatsTarget?: number;
  dailyCarbTarget?: number;
  dailyFiberTarget?: number;

  blockedUIDs?: string[];
  blockedPostIds?: string[];

  // dishRestrictions

  // moved to leaderboard
  // storeSales?: number;
  // discoverySales?: number;
  // totalStoreVisits?: number;
  // activeCustomers?: number;
  // totalEarnings?: number;
  // tripsPlanned?: number;
  // discoveries?: number;

  allFollowers?: number;
  instagramHandle?: string;
  coverImages?: string[];
  facebookProfile?: string;
  youtubeLink?: string;
  externalLink?: string;
  instagramLink?: string;
  linkedInLink?: string;

  difficulty?: difficulty;

  judge?: boolean;
  badgeId?: string;
  badgeIdEnrolled?: string; // set after user has enrolled in badge
  nutritionBadgeId?: string;
  nutritionBadgeIdEnrolled?: string;

  // profile
  knownFor?: string;
  expertIn?: string;
  bio?: string;
  tagline?: string;
  verified?: boolean;

  // ga
  acquiredBy?:
    | "dn_collection"
    | "dn_listing"
    | "dn"
    | "social"
    | "organic"
    | "dn_trip";
  isCreator?: boolean;

  // circuitIds
  // circuitIds?: [];
  tokens?: string[];
  unreadPushNotifications?: boolean;
  unreadMessages?: boolean;
  activeGroups?: { [gId: string]: boolean };
  activeOnGroup?: string | undefined;

  // activeOnGroup?: string | undefined;

  sbEarnings?: number;
  sbStudents?: number;
  sbEvents?: number;
  sbViews?: number;

  coverCloudinary?: CloudinaryMedia[];
  profileImage?: CloudinaryMedia;

  favIcon?: string;
  favIconImg?: CloudinaryMedia;

  // unix times of email
  unixWelcomeEmail?: number;
  unixDay2Email?: number;
  unixDay3Email?: number;

  numClaps?: number;
  numCheckins?: number;

  enrolledCohorts?: string[];
  enrolledCommunities?: string[];
  enrolledEvents?: string[];
  enrolledEventsWithTime?: EnrolledEventWithTime[];
  enrolledCourses?: string[];

  participatingWithObj?: {
    [eventId: string]: string;
  };

  // object map of game to team mapping
  participatingInGameWithTeam?: {
    [gameId: string]: ParticipatingWithTeamObj;
  };

  welcomeMessagesForEvents?: string[];
  teamCreateMessage?: string[];
  welcomeMessagesForCourses?: string[];
  inviteMessagesForEvents?: string[];

  optOutSent?: optOutStates;

  terraUser?: TerraUser;

  totalCalories?: number;
  totalFitPoints?: number;
  level?: number;

  regularityScore?: number;

  // new levels
  totalFitPointsV2?: number;
  userLevelV2?: number;
  activeFitPointsV2?: number;

  numActivities?: number;
  userLevel?: userLevel;
  progress?: number;
  progressV2?: number;
  testimonial?: string;
  wins?: number;
  teamWins?: number;

  // sevenDayStreak?: number;
  // dayGoalTarget?: { [day: string]: goalObj };
  dayPointObj?: { [day: string]: number };
  dayCalObj?: { [day: string]: number };
  userRazorPlans?: string[];

  // badges
  independentBadgesWon?: string[];
  relativeBadgesWon?: string[];
  otherBadgesWon?: string[];

  // leadgen form
  fitnessGoal?: fitnessGoalTypes[];
  preferredWorkoutLocation?: workoutLocation[];
  paceOfAchievement?: achievementPace;
  paceOfAchievementInMonth?: number;

  cycleLength?: cycleLengthTyps;
  pcosSymptoms?: pcosSymptoms[];
  workoutFrequency?: workoutFrequencyTypes;
  workoutStyle?: workoutStyleTypes;
  companyCodes?: string[];
  diagnosedPeriod?: diagnosedPeriodType;

  // use on referral screen
  inviteMedia?: CloudinaryMedia | AWSMedia;
  motivatedBy?: string; // greesha
  adSource?: string; // drkuldeep
  myAdSourceKey?: string; // db
  motivatedOn?: number;

  repsCount?: number;
  desiredWeight?: number;

  permissionUpdate?: number;
  googleFit?: GoogleFitOAuth;

  buildNumber?: number;
  version?: string;
  firstInstallTime?: number;

  allExpirationDatesMillis?: { [id: string]: number | null };
  //shopScreen
  purchasedRewards?: string[];
  lastPurchasedUnix?: number;

  currentBodyType?: BodyTypesId;
  desiredBodyType?: BodyTypesId;
  lastCronRun?: number;
  authSignupTime?: number;
  authSigninTime?: number;
  fitnessConcerns?: fcsTypes[];
  iosSteps?: boolean;

  periodTrackerObj?: periodTrackerObjectInterface;

  // coach detail
  description?: string;
  awards?: string[];
  profileImgWithoutBG?: CloudinaryMedia | AWSMedia;

  landingContent?: landingContentInterface;

  guidedOnboardDone?: boolean;
  flags?: FlagObj;
  recommendationConfig?: RecommendationConfig;

  previousSearches?: string[];
  // periodDates?: PeriodDates;
  // cycles?: Cycle[];
  unseenAwards?: string[];

  sleepQuality?: number;
  waMessageStatus?: userCheckpoints;
  thingsToWorkOn?: workType[];
  templatesSent?: Partial<Record<waTemplateNames, number>>;

  noPrivateQu?: boolean;
  // if user is in bootcamp

  plusTrial?: boolean;
  bootcampDetails?: userBootcampObj;

  sbPlanId?: string; // overwritten when plan is upgraded
  consultations?: consultationInventory;

  doctorForm?: doctorForm;

  doctorIds?: string[];
  dietForm?: DietForm;

  // it shows completion progress on roadmap
  // roadmapProgress?: number;
  totalTargets?: number;
  completedTargets?: number;
  activitySync?: boolean;

  deliverableFlags?: paidUserDeliverables;

  dietFollowupDay?: number; // sunday, monday, tuesday...
  lastFollowupTime?: number;
  nextFollowupTime?: number;

  testUser?: boolean;

  // slot booking intervention
  slotIntervention?: slotInterventionInterface | "none";
  challengeJoined?: number;
  attribution?: AttributionObj;

  //
}

export type slotInterventionTypes =
  | "managePCOS"
  | "looseWeight"
  | "pearsnolTeam";

export interface slotInterventionInterface {
  type: slotInterventionTypes;
  lastShown: number;
}

export interface DietForm {
  familyHistory?: {
    Diabetes?: boolean;
    Cholesterol?: boolean;
    BloodPressure?: boolean;
  };
  workingHour?: number;
  medication?: {
    Vitamins?: boolean;
    Minerals?: boolean;
    Protein?: boolean;
    Nutritional?: boolean;
  };
  waterIntakeDaily?: number;
  outsideFoodInWeek?: number;
  exerciseDayInWeek?: number;
  addiction?: {
    Smoking?: boolean;
    Alcohol?: boolean;
  };
  dailyIssues?: {
    Anxiety?: boolean;
    Stress?: boolean;
    Depression?: boolean;
    Insomnia?: boolean;
    Gastric?: boolean;
  };
  dietPreference?: {
    Vegan?: boolean;
    Vegetarian?: boolean;
    NonVegetarian?: boolean;
    Eggetarian?: boolean;
  };
  cuisinePreference?: {
    NorthIndian?: boolean;
    SouthIndian?: boolean;
    Rajasthani?: boolean;
    Gujarati?: boolean;
    Maharashtrian?: boolean;
    Bengali?: boolean;
    Mughlai?: boolean;
    Continental?: boolean;
  };
  allergies?: {
    Lactose?: boolean;
    Gluten?: boolean;
    Nuts?: boolean;
  };
  foodItems?: Partial<Record<MealTypesDietForm, Record<string, boolean>>>;
  userLikesToSee?: string;
  familyHistoryText?: string;
  medicationText?: string;
  addictionText?: string;
  dailyIssuesText?: string;
  dietPreferenceText?: string;
  allergiesText?: string;

  foodTimings?: Partial<Record<MealTypesDietForm, number>>;
  // foodTimingsV2?: Partial<Record<MealTypes, string>>;
  uploadedReports?: uploadReport[];
}

export interface uploadReport {
  filename: string;
  size?: number;
  url?: string;
  progress: number;
  id: string;
  uploadedOn: number;
  // id: string;
}

export type MealTypesDietForm =
  | "preBreakfast"
  | "postBreakfast"
  | "breakfast"
  | "lunch"
  | "eveningSnacks"
  | "dinner"
  | "postDinner";

export interface doctorForm {
  pregnantHistory?: boolean;
  pregnancyDate?: string;
  surgicalHistory?: boolean;
  sexuallyActive?: boolean;
  surgeryBrief?: string;
  chiefComplain?: string;
}

export interface landingContentInterface {
  heading?: string;
  subtitle?: string;
  img?: AWSMedia | CloudinaryMedia;
  qualification?: string;
  superWomanLeader?: boolean;
  superWomanIncentive?: number;
  experienceYears?: number;
}

export type achievementPace =
  | "1_month"
  | "2_months"
  | "3_months"
  | "4_months"
  | "6_months"
  | "just_for_fun";

export interface AttributionObj {
  event_source_url?: string;
  action?: actionSourceTypes;
  event_id?: string;

  // web attribution
  fbp?: string;
  fbc?: string;

  // app attribution
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: utmContent;
  installer_package?: string;
  unix: number;
}

export interface utmContent {
  app?: string;
  t?: string;
  source?: {
    data?: string;
    nonce?: string;
  };
}

export type workoutLocation = "at_home" | "at_gym" | "outdoors";

export interface periodTrackerObjectInterface {
  // predictedCycleLength?: number;
  // preductedPeriodLength?: number;

  // lastKnownCycleLength?: number;
  // lastKnownPeriodLength?: number;

  // given by user
  cycleRegularity?: "CAN_PREDICT" | "CHANGES";

  // to be calculated from inputs
  inputCycleLength?: number;
  inputPeriodLength?: number;
  goal?: periodTrackerGoal;

  initialFlow?: flowTypes;
  symptomsBeforePeriod?: symptomId[];
  symptomsDuringPeriod?: symptomId[];

  // all logged symptoms

  lastRefresh?: string;

  // paymentDone, no_workout, no_followup_in_four_days
}

export interface userFollowup {
  followupDate: string;
  followupTime: number;
  id: string;
  createdOn: number;
  followupAgent: followupAgent;
  notes: string;
  type?: "diet" | "habit";
}

export type followupAgent = "jayti" | "saurav" | "swapnil";
// interface phaseSymptomMap {
//   PERIOD: daySymptom;
//   FOLLICULAR: daySymptom;
//   OVULATION: daySymptom;
//   LUTEAL: daySymptom;
//   ESTIMATED_PERIOD: daySymptom;
// }

// interface daySymptom {
//   [day: number]: symptomCount;
// }

// type symptomCount = Partial<Record<symptomId, number>>;

interface userBootcampObj {
  bootcampId: string;
  bootcampName?: string;
  started?: number;
}

export type checkpoints =
  | "bootcamp"
  | "paymentDone"
  | "stepsDone"
  | "bootcampEnrolled"
  | "periodSync"
  | "oneWorkoutDone"
  | "oneNutritionDone"
  | "recipeSeen"
  | "reelSeen"
  | "triedSakhi"
  | "joinedWellnessCommunity";

type userCheckpoints = Record<checkpoints, boolean>;

export interface cronState {
  id: string;
  uid: string;
  lastRun: number;
}

export type BodyTypesId =
  | "apple_shaped"
  | "pear_shaped"
  | "rectangle_shaped"
  | "endomorph"
  | "overweight"
  | "underweight"
  | "fit"
  | "hourglass_shaped"
  | "mesomorph";

export type fitnessGoalTypes =
  | "lose_weight"
  | "gain_muscle"
  | "increase_stamina"
  | "recovery_from_injury"
  | "keep_fit"
  | "regularise_cycle"
  | "pcos_pcod";

export const fitnessScope =
  "https://www.googleapis.com/auth/fitness.activity.read";

export interface GoogleFitOAuth {
  serverAuthCode?: string;
  idToken?: string;
  scopes: string[];
  user?: GoogleUser;

  // server side code
  refreshToken?: string;
  accessToken?: string;
  expiresOnUnix?: number;

  forceRefreshToken?: boolean;
}

export interface GoogleUser {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}

export type fcsTypes =
  | "pcos"
  | "bodyToning"
  | "postPregnancy"
  | "perimenopause";

// users/uid/subscriptions/{gameId}
export interface Subscription {
  gameId: string; // document reference
  // teamId: string;
  paidOnUnix: number;
  paidSprints: string[];
  paidRounds?: string[];
}

export type userLevel = "rookie" | "enthusiast" | "athlete" | "champion";

export type genderType = "male" | "female" | "notSpecified";

export type goalKeys =
  | "weightloss"
  | "muscleGain"
  | "longevity"
  | "diabetes"
  | "pcos"
  | "backPain"
  | "otherSportsInjury";

export interface fitnessGoalObj {
  weightloss?: boolean;
  muscleGain?: boolean;
  longevity?: boolean;
  diabetes?: boolean;
  pcos?: boolean;
  backPain?: string;
  otherSportsInjury?: string;
}

export interface Visitor {
  visitorId: string;
  visitTime: number;
  visitorName: string;
  visitorImageURI: string;
  visitorPhone: string;
  visitorEmail: string;
  storeId: string;
}

export interface InfluencerBookingRequest {
  commissionPercentage: number;
  commissionStatus: commissionStatus;
  storeVisit: boolean;
  referrerVisit: boolean;
  bookingRequestId: string;
  influencerId: string;
  visitorId: string;

  bookingSnippet?: BookingSnippet;
}

export type commissionStatus =
  | "PENDING"
  | "PROCESSING"
  | "PAID"
  | "BOOKING_CANCELLED";

export interface ListingView {
  listingName: string;
  viewTime: number;
  // checkIn: string;
  // checkOut: string;
  // qty: number;
}

// users/uid/recommendations/dayRecommendation
export interface TaskRec {
  id: string;
  manual?: boolean;
  swappedWith?: string;
}

export interface NutritionConsumption {
  protein?: number;
  fiber?: number;
  fats?: number;
  carbs?: number;
  kcal?: number;
}

export interface dayRecommendation {
  id: string;
  date: string; // yyyy-mm-dd
  type: "workout" | "nutrition";
  tasks: TaskRec[];

  // recommendations for date
  unix: number;
  updatedOn: number;
  manual?: boolean;

  // tier: number;
  day: number;
  badgeId: string;

  // to over ride manual generation
  overrideBadgeId?: string;
  overrideDay?: number;
  propagateDate?: boolean;
  // splCoach?: string;

  // to calculate progress
  taskFP: number;
  doneFP?: number;

  consumedNutrition?: NutritionConsumption;
}

export type AchievementPathDataItemStatusType = "DONE" | "PENDING";

export type transformationIconTypes =
  | pcosSymptoms
  | "weight"
  | "cycleLength"
  | "periodLength"
  | "mood"
  | "energy"
  | "sleep";

export interface workType {
  text: string;
  target: number;
  type: transformationIconTypes;
  delta: number;

  minValue?: number;
  countNeeded: number;
  action: goalActionType;
  // comparisonType: roadmapComparisons;
}

export type goalActionType =
  | "increase"
  | "reduce"
  | "equate"
  | "maintain"
  | "streak";

export type AchievementPathDataItemTypes =
  | transformationIconTypes
  | "customised_plan"
  | "nutritionStreak"
  | "workoutStreak"
  | "sleep";

// export type roadmapComparisons = "<=" | ">=";
// roadmap can have task. 7 day streak.
// roadmap can have task. 14 day streak.

export interface AchievementPathDataItem {
  icon: string; // icon
  text: string; // lose 4 kgs
  type?: AchievementPathDataItemTypes;

  // in addBadgeFunc
  target?: number; // finalValue 65Kg
  comparisonType?: goalActionType;

  // delta: number; // delta to achieve
  // backend
  status?: AchievementPathDataItemStatusType;
  countNeeded?: number;
}

export interface TitleInterface {
  icon?: string; // icon
  text: string; // lose 4 kgs
}

export interface TimelineInterface extends TitleInterface {
  align?: "start" | "end";
}

export interface AchievementPathData {
  id?: string;
  startTime?: number;
  endTime?: number;
  items?: AchievementPathDataItem[];
  title?: TitleInterface;

  // no need on backend
  timeline?: TimelineInterface;
}
