import { BodyTypesId } from "@constants/Avatar/utils";
import { EmojiItem } from "@hooks/chatbot/insights/useSakhiInsightsV2";
import { Day } from "@hooks/task/useWorkoutPreference";
import { AutoRoomIDs } from "@models/ChatBot/insights";
import { userLevel } from "@models/Leader/LeaderBoard";
import { MediaInterface } from "@models/Media/MediaInterface";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { TerraUser } from "@models/Terra/TerraUser";
import { workType } from "@modules/JoinBoatMainV3/components/utils";
import { DNParseResult } from "@providers/dnLinks/hooks/handleLink";
import { symptomId } from "./symptoms";
import { MealTypes } from "@models/Tasks/Task";

export interface EnrolledEventWithTime {
  eventId: string;
  // gameId: string;

  enrolledTime: number;
  // ownerUID: string;
}
export interface ParticipatingWithTeamObj {
  teamId: string;
  ownerUID: string; // to be kept updated
  enrolledTime: number; // to be used in future
}
export type moodTypes = "Sad" | "Bit Low" | "Meh" | "Good" | "Great";
export type energyTypes = "low" | "moderate" | "very high";

export type userSlotStatus =
  | "REACHED_OUT"
  | "DONE"
  | "NOT_INTERESTED"
  | "NO_PICKUP"
  | "SCHEDULED"
  | "RESCHEDULED"
  | "PENDING";
export interface goalObj {
  targetFP: number;
  achievedFP: number;
  date: string;
  nbWorkouts: number;
  id: string;
  unix: number;
  mood?: number;
  energy?: number;
  weight?: number;
}

export interface localGoalObj extends goalObj {
  isFuture: boolean;
}

export interface dailyMoodObj {
  date: string;
  id: string;
  unix: number;
  mood?: number;
}
export interface dailyWeightObj {
  date: string;
  id: string;
  unix: number;
  weight?: number;
}
export interface dailyEnergyObj {
  date: string;
  id: string;
  unix: number;
  energy?: number;
}

export interface dailySleepObj {
  date: string;
  id: string;
  unix: number;
  sleepHours?: number;
}

export type diagnosedPeriodType =
  | "not_diagnosed"
  | "just_got_diagnosed"
  | "3_6_months"
  | "more_than_6_months";

export type fcsTypes =
  | "pcos"
  | "bodyToning"
  | "postPregnancy"
  | "perimenopause";

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
export type workoutStyleTypes = "HIIT" | "LiveYoga" | "Yoga" | "Running";

export interface MixpanelUser {
  mixpanel_id: string;
  tokens: string[];
}

export const allDays: Day[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export interface RecommendationConfig {
  primaryWorkoutCoach?: string;
  start?: number; // defaultValue
  baseTier?: number; // basis user difficulty

  nutritionStart?: number; // default value

  timezone?: {
    offset?: number;
    tzString?: string;
  };

  workoutDays?: Day[];
  workoutNotificationTime?: string;

  // badge level config
  badgeConfig?: { [badgeId: string]: BadgeConfig };
}

export interface BadgeConfig {
  start?: number;
  baseTier?: number;
}

export type flowTypes = "light" | "medium" | "heavy";

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
  // do not ask private questions
  noPrivateQu?: boolean;

  sbPlanId?: string; // overwritten when plan is upgraded

  // bootcamp
  bootcampOnboarded?: boolean;
  // appointment
  appointmentFlag?: boolean;

  //Ai Meal Tracking
  mealTrackOnboarding?: boolean;
}

export interface doctorForm {
  pregnantHistory?: boolean;
  pregnancyDate?: string;
  surgicalHistory?: boolean;
  sexuallyActive?: boolean;
  surgeryBrief?: string;
  chiefComplain?: string;
}

export type MealTypesDietForm =
  | "preBreakfast"
  | "postBreakfast"
  | "breakfast"
  | "lunch"
  | "eveningSnacks"
  | "dinner"
  | "postDinner";

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

export type periodTrackerGoal =
  | "PCOS_MANAGEMENT"
  | "PREGNANCY"
  | "PREGNANCY_PREVENTION"
  | "PERIOD_PREDUCTION";

export type difficulty = "Easy" | "Medium" | "Not Easy" | "Hard";

export interface UserInterface {
  uid: string;
  name?: string;
  unsubscribe?: boolean;
  lastGameId?: string;
  email?: string;
  phone?: string;
  state?: string;
  city?: string;
  fullAddress?: string;
  pincode?: string;
  gptPrompts?: string[];

  trSoftUUID?: string;
  onboarded?: boolean;

  difficulty?: difficulty;

  fpCredit?: number; // total fp
  fpDebit?: number;

  planSeen?: boolean;
  pendingNav?: DNParseResult;

  tags?: string[];
  os?: "android" | "ios" | "macos" | "windows" | "web";
  ip?: string;
  hasPlanned?: boolean;
  hasBooked?: boolean;
  hasTripSaved?: boolean;
  role?: string;
  imageURI?: string;
  inviteURL?: string;
  socialboat?: boolean;
  onboardingCallStatus?: userSlotStatus;

  // influencer program
  referrerId?: string;
  userType?: "influencer" | "member" | "InfluencerRequest";
  bookings?: number;

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
  // activeOnGroup?: string | undefined;

  sbEarnings?: number;
  sbStudents?: number;
  sbViews?: number;

  coverCloudinary?: CloudinaryMedia[];
  profileImage?: CloudinaryMedia | AWSMedia;
  favIconImg?: CloudinaryMedia | AWSMedia;

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

  // if user is in bootcamp
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

  // slot booking intervention
  slotIntervention?: slotInterventionInterface | "none";
  challengeJoined?: number;

  //
}

export type consultationInventoryKeys =
  | "nbDoctorConsultationsTotal"
  | "nbDietConsultationsTotal"
  | "nbDoctorConsultationsDone"
  | "nbDietConsultationsDone";

export type consultationInventory = Record<
  consultationInventoryKeys,
  number | undefined
>;
export interface slotInterventionInterface {
  type: slotInterventionTypes;
  lastShown: number;
}

export type slotInterventionTypes =
  | "managePCOS"
  | "looseWeight"
  | "pearsnolTeam";

export type waTemplateNames =
  | "opt_in_communications"
  | "bootcamp_invite_1"
  | "period_tracker_invite"
  | "period_tracker_tip_1"
  | "sb_success"
  | "sakhi_ai_invite"
  | "sakhi_question_1"
  | "share_health_goals"
  | "what_is_sb_1"
  | "slot_booking_invite"
  | "yogacommunity_3"
  | "free_workout"
  | "coach_reachout"
  | "workout_done_market"
  | "free_reel_x"
  | "try_another_workout"
  | "workout_done_2"
  | "retry_demo";

interface userBootcampObj {
  bootcampId: string;
  started?: number;
}

export type checkpoints =
  | "bootcamp"
  | "bootcampEnrolled"
  | "paymentDone"
  | "stepsDone"
  | "periodSync"
  | "oneWorkoutDone"
  | "oneNutritionDone"
  | "recipeSeen"
  | "reelSeen"
  | "triedSakhi"
  | "joinedWellnessCommunity";

export type CycleRegularityTypes = "CAN_PREDICT" | "CHANGES";
type userCheckpoints = Record<checkpoints, boolean>;
export interface periodTrackerObjectInterface {
  // predictedCycleLength?: number;
  // preductedPeriodLength?: number;

  // lastKnownCycleLength?: number;
  // lastKnownPeriodLength?: number;

  // given by user
  cycleRegularity?: CycleRegularityTypes;

  // to be calculated from inputs
  inputCycleLength?: number;
  inputPeriodLength?: number;
  goal?: periodTrackerGoal;

  initialFlow?: flowTypes;
  symptomsBeforePeriod?: symptomId[];
  symptomsDuringPeriod?: symptomId[];
  lastRefresh?: string;
}
// users/uid/periodDates/dateObj
// export interface PeriodDateObj {
//   id: string;
//   date: string;
//   unix: number;
//   dayNumber?: number;
//   type: periodDateType;
//   estimationType: "GENERATED" | "USER";
//   insight?: string;
// }

export type PeriodFlow = "light" | "medium" | "heavy";

export interface LoggedSymptom {
  text: string;
  image: string;
}

export interface PeriodDateObj {
  id: string;
  date: string;
  unix: number;

  type: periodDateType;

  dayNumber?: number;
  cycleLength?: number;
  cycleProgress?: number;

  phaseProgress?: number;
  phaseDay?: number;
  phaseLength?: number;
  loggedSymptoms?: { [id: string]: LoggedSymptom };
  periodFlow?: PeriodFlow;

  // emoji items
  recommendations?: Partial<Record<AutoRoomIDs, EmojiItem>>; //  {[id: AutoRoomIDs]: EmojiItem};

  // to fetch relevant cycle
  cycleId: string;
}

export interface MenstrualPhaseDays {
  PERIOD: number[];
  FOLLICULAR: number[];
  OVULATION: number[];
  LUTEAL: number[];
  ESTIMATED_PERIOD: number[];
  UNKNOWN: number[];
}

export type periodPrompts =
  | "pastPeriod"
  | "didYouGetPeriod"
  | "flowInfo"
  | symptomId
  | "symptomCheck"
  | "didYourPeriodEnd"
  | "symptomRelief"
  | "pmsCheck"
  | "questionApology";

export type promptsAsked = Record<periodPrompts, number>;

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
}

export type periodDateType =
  | "PERIOD"
  | "ESTIMATED_PERIOD"
  | "UNKNOWN"
  | "OVULATION"
  | "FOLLICULAR"
  | "LUTEAL";
export interface landingContentInterface {
  heading?: string;
  subtitle?: string;
  img?: AWSMedia | CloudinaryMedia;
  qualification?: string;
  superWomanLeader?: boolean;
  superWomanIncentive?: number;
  experienceYears?: number;
}

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

export type fitnessGoalTypes =
  | "lose_weight"
  | "gain_muscle"
  | "increase_stamina"
  | "recovery_from_injury"
  | "keep_fit"
  | "pcos_pcod"
  | "regularise_cycle";
export type workoutLocation = "at_home" | "at_gym" | "outdoors";
export type achievementPace =
  | "1_month"
  | "2_months"
  | "3_months"
  | "4_months"
  | "6_months"
  | "just_for_fun";

export type genderType = "male" | "female" | "notSpecified";

// users/uid/subscriptions/{gameId}
export interface Subscription {
  gameId: string; // document reference
  // teamId: string;
  startFreeTrial?: number; // trial started on
  paidOnUnix?: number;
  paidSprints?: string[];
  paidRounds?: string[];
}

export interface fitnessGoalObj {
  weightloss?: boolean;
  muscleGain?: boolean;
  longevity?: boolean;
  diabetes?: boolean;
  pcos?: boolean;
  backPain?: string;
  otherSportsInjury?: string;
}

export type fitnessGoalKeys =
  | "weightloss"
  | "muscleGain"
  | "longevity"
  | "diabetes"
  | "pcos"
  | "backPain"
  | "otherSportsInjury";

export type dayRecommendationType = "workout" | "nutrition";

// users/uid/dayRecommendations/id
export interface dayRecommendation {
  id: string;
  date: string; // yyyy-mm-dd
  type: dayRecommendationType;
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

  // to calculate progress
  taskFP: number;
  doneFP?: number;

  consumedNutrition?: NutritionConsumption;
}

export type nutritionConsumptionKeys =
  | "protein"
  | "fiber"
  | "fats"
  | "carbs"
  | "kcal";

export interface NutritionConsumption {
  protein?: number;
  fiber?: number;
  fats?: number;
  carbs?: number;
  kcal?: number; // to consume daily
}

export type walkTypes = "slow" | "medium" | "brisk";

export interface UserNutritionTarget {
  start: number;
  end?: number;
  id: string;

  // inputs
  initWeight?: number; // weight at start
  age?: number; // age at start
  weightDelta?: number;
  targetWalkDays?: Day[];
  targetWalkType?: walkTypes;
  targetWalkSteps?: number;

  // outputs
  targetWeeklyDeficit?: number;
  bmr?: number;
  targetWeeklyWorkoutBurn?: number;
  targetWeeklyWalkBurn?: number;
  targetWeeklyBurn?: number;
  targetWeeklyIntage?: number;
  ////////
  avgTargetDailyIntake?: number; // avg
  avgTargetDailyProtein?: number;
  avgTargetDailyCarbs?: number;
  avgTargetDailyFats?: number;
  avgTargetDailyFiber?: number;
  ////////
  manualDailyInputs?: Record<Day, NutritionConsumption>; // if manual targets
}

export interface TaskRec {
  id: string;
  manual?: boolean;
  overrideMealType?: MealTypes;
}
