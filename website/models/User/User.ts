import { BodyTypesId } from "@constants/Avatar/utils";
import { userLevel } from "@models/LeaderBoard/Leaderboard";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { MediaInterface } from "@models/Media/media";
import { TerraUser } from "@models/Terra/TerraUser";
import { goalActionType } from "@modules/Bookings/AchievementPath/utils/interface";
import { DietAndWorkoutType } from "@templates/DietAndWorkout";
import { HowItWorksType } from "@templates/HowItWorks";
import { SelectItem } from "@templates/joinBoatTemplate/RadioInput";
import { symptomId } from "./symptom";

export interface EnrolledEventWithTime {
  eventId: string;
  // gameId: string;

  enrolledTime: number;
  // ownerUID: string;
}

// will fix clash braker on server
// will fix post create
// will check object before creating team
// on demand post creation to be handled with this
export interface ParticipatingWithTeamObj {
  teamId: string;
  ownerUID: string; // to be kept updated
  enrolledTime: number; // to be used in future
}

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

export type targetType =
  | "weightloss"
  | "fix_acne"
  | "reduce_hairfall"
  | "regularise_periods"
  | "bad_mood"
  | "fatigue";

export interface targetDataType {
  type: targetType;
  text: string;
}

export interface UnauthUser {
  id: string;
  mixpanelId?: string;
}

export interface LocalUser {
  name?: string;
  phone?: string;
  gender?: genderType;
  height?: number;
  weight?: number;
  desiredWeight?: number;
  profileImage?: CloudinaryMedia | AWSMedia;
  email?: string;
  contentTags?: string;
  difficulty?: difficulty;
  bio?: string;
  fitnessGoal?: fitnessGoalTypes[];
  repsCount?: number;
  currentBodyType?: BodyTypesId;
  desiredBodyType?: BodyTypesId;
  paceOfAchievementInMonth?: number;
  uid?: string;
  userKey?: string;
  organisation?: string;
  fitnessConcerns?: fcsTypes[];
  badgeId?: string;
  nutritionBadgeId?: string;
  fpCredit?: number;
  fpDebit?: number;
  dailyFPTarget?: number;
  landingContent?: landingContentInterface;
  recommendationConfig?: RecommendationConfig;

  myAdSourceKey?: string; // db
}

export type diagnosedPeriodType =
  | "not_diagnosed"
  | "just_got_diagnosed"
  | "3_6_months"
  | "more_than_6_months";

export type userSlotStatus =
  | "REACHED_OUT"
  | "DONE"
  | "NOT_INTERESTED"
  | "NO_PICKUP"
  | "SCHEDULED"
  | "RESCHEDULED"
  | "PENDING";

export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
export interface dailyIssues {
  Anxiety?: boolean;
  Stress?: boolean;
  Depression?: boolean;
  Insomnia?: boolean;
  Gastric?: boolean;
}
export interface dailyHealthIssues {
  pcos?: boolean;
  thyroid?: boolean;
  irregularPeriods?: boolean;
  backIssues?: boolean;
  arthritis?: boolean;
  highBp?: boolean;
  cholestrol?: boolean;
}
export interface RecommendationConfig {
  primaryWorkoutCoach?: string;
  start?: number;
  baseTier?: number; // basis user difficulty

  nutritionStart?: number;

  timezone?: {
    offset?: number;
    tzString?: string;
  };
  workoutTimeStr?: string;
  workoutDays?: Day[];
  workoutNotificationTime?: string;
  // badge level config
  badgeConfig?: { [badgeId: string]: BadgeConfig };
}
export interface BadgeConfig {
  start?: number;
  baseTier?: number;
}
export interface StepsDoc {
  id: string;
  date: string;
  uid: string;
  steps: number;
  updatedOn: number;
  unix: number;
}

export interface goalObj {
  targetFP: number;
  achievedFP: number;
  date: string;
  nbWorkouts: number;
  id: string;
  unix: number;
}

export interface localGoalObj extends goalObj {
  isFuture: boolean;
}

export enum FamilyHistoryEnum {
  "Diabetes" = "Diabetes",
  "Cholesterol" = "Cholesterol",
  "BloodPressure" = "BloodPressure",
}
export enum MedicationEnum {
  "Vitamins" = "Vitamins",
  "Minerals" = "Minerals",
  "Protein" = "Protein",
  "Nutritional" = "Nutritional",
}
export enum AddictionEnum {
  "Smoking" = "Smoking",
  "Alcohol" = "Alcohol",
}
export enum DailyIssuesEnum {
  "Anxiety" = "Anxiety",
  "Stress" = "Stress",
  "Depression" = "Depression",
  "Insomnia" = "Insomnia",
  "Gastric" = "Gastric",
}
export enum DietPreferenceEnum {
  "Vegan" = "Vegan",
  "Vegetarian" = "Vegetarian",
  "NonVegetarian" = "NonVegetarian",
  "Eggetarian" = "Eggetarian",
}
export enum CuisinePreferenceEnum {
  "NorthIndian" = "NorthIndian",
  "SouthIndian" = "SouthIndian",
  "Rajasthani" = "Rajasthani",
  "Gujarati" = "Gujarati",
  "Maharashtrian" = "Maharashtrian",
  "Bengali" = "Bengali",
  "Mughlai" = "Mughlai",
  "Continental" = "Continental",
}
export enum AllergiesEnum {
  "Lactose" = "Lactose",
  "Gluten" = "Gluten",
  "Nuts" = "Nuts",
}
export enum FoodEnum {
  "preBreakfast" = "pre breakfast",
  "breakfast" = "breakfast",
  "lunch" = "lunch",
  "eveningSnacks" = "evening snacks",
  "dinner" = "dinner",
  "postDinner" = "post dinner",
}
export interface DietForm {
  familyHistory?: Partial<Record<FamilyHistoryEnum, boolean>>;
  workingHour?: number;
  medication?: Partial<Record<MedicationEnum, boolean>>;
  waterIntakeDaily?: number;
  outsideFoodInWeek?: number;
  exerciseDayInWeek?: number;
  addiction?: Partial<Record<AddictionEnum, boolean>>;
  dailyIssues?: Partial<Record<DailyIssuesEnum, boolean>>;
  dietPreference?: Partial<Record<DietPreferenceEnum, boolean>>;
  cuisinePreference?: Partial<Record<CuisinePreferenceEnum, boolean>>;
  allergies?: Partial<Record<AllergiesEnum, boolean>>;
  foodItems?: Partial<Record<FoodEnum, Record<string, boolean>>>;
  userLikesToSee?: string;
  familyHistoryText?: string;
  medicationText?: string;
  addictionText?: string;
  dailyIssuesText?: string;
  dietPreferenceText?: string;
  allergiesText?: string;
  foodTimings?: Partial<Record<FoodEnum, number>>;
  uploadedReports?: uploadReport[];
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

export type moodTypes = "Sad" | "Bit Low" | "Meh" | "Good" | "Great";
export type energyTypes = "low" | "moderate" | "very high";
export interface uploadReport {
  filename: string;
  size?: number;
  url?: string;
  progress: number;
  id: string;
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
  | "yoga_pdf"
  | "watch_user";

export type paidUserDeliverables = Partial<Record<deliverableType, boolean>>; // {
//   welcome_paid_message: boolean;
//   call_user_for_pending_doc: boolean;
//   prescription_sent: boolean;
//   call_user_for_diet_doc: boolean;
//   explain_roadmap: boolean;
//   roadmap_consultation_time: boolean;
//   call_user_for_pending_roadmap: boolean;
//   first_workout_consultation: boolean;
//   roadmap_updated: boolean;
//   diet_plan_created: boolean;
//   first_diet_consultation: boolean;
// }

export type flowTypes = "light" | "medium" | "heavy";
export type CycleRegularityTypes = "CAN_PREDICT" | "CHANGES";
export type workoutStyleTypes = "HIIT" | "Yoga" | "Running";
export type difficulty = "Easy" | "Medium" | "Not Easy" | "Hard";

export type consultationInventoryKeys =
  | "nbDoctorConsultationsTotal"
  | "nbDietConsultationsTotal"
  | "nbDoctorConsultationsDone"
  | "nbDietConsultationsDone";

export type consultationInventory = Record<
  consultationInventoryKeys,
  number | undefined
>;

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
}

export interface UserInterface {
  uid: string;
  authSignupTime?: number;
  authSigninTime?: number;
  name?: string;
  unsubscribe?: boolean;
  email?: string;
  phone?: string;
  sbInviteURL?: string;
  reasonForDeletion?: string;
  state?: string;
  city?: string;
  fullAddress?: string;
  pincode?: string;

  onboarded?: boolean;

  invitedPageId?: string;
  collegeName?: string;

  gifter?: boolean;

  // gender?: string;
  tags?: string[];
  os?: "android" | "ios" | "macos" | "windows" | "web";
  ip?: string;
  hasPlanned?: boolean;
  hasBooked?: boolean;
  hasTripSaved?: boolean;
  role?: string;
  isDoctor?: boolean;

  imageURI?: string;
  inviteURL?: string;
  socialBoat?: boolean;

  origins?: string[];
  hasOrigin?: boolean;

  // influencer program
  referrerId?: string;
  userType?: "influencer" | "member" | "InfluencerRequest";
  bookings?: number;

  coverMedia?: MediaInterface[];
  groups?: string[];

  userKey?: string;
  motivatedBy?: string;
  motivatedOn?: number;
  adSource?: string;
  myAdSourceKey?: string;

  height?: number;
  weight?: number;
  gender?: genderType;
  age?: number;

  dob?: string; //yyyy-mm-dd

  fitnessGoals?: fitnessGoalObj;
  fitnessGoalText?: string;

  fitnessConcerns?: fcsTypes[];
  onboardingCallStatus?: userSlotStatus;
  diagnosedPeriod?: diagnosedPeriodType;

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

  fpCredit?: number; // total fp
  fpDebit?: number;
  badgeId?: string;
  badgeIdEnrolled?: string;
  nutritionBadgeId?: string;

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

  dayPointObj?: { [day: string]: number };
  dayCalObj?: { [day: string]: number };
  userRazorPlans?: string[];

  difficulty?: difficulty;

  otherBadgesWon?: string[];
  relativeBadgesWon?: string[];
  independentBadgesWon?: string[];

  // leadgen form
  fitnessGoal?: fitnessGoalTypes[];
  preferredWorkoutLocation?: workoutLocation[];
  paceOfAchievement?: achievementPace;
  paceOfAchievementInMonth?: number;

  inviteMedia?: CloudinaryMedia | AWSMedia;
  companyCodes?: string[];
  desiredWeight?: number;
  repsCount?: number;
  currentBodyType?: BodyTypesId;
  desiredBodyType?: BodyTypesId;

  organisation?: string;

  dailyFPTarget?: number;

  // coach detail
  description?: string;
  awards?: string[];
  profileImgWithoutBG?: CloudinaryMedia | AWSMedia;
  dailyStepTarget?: number;
  dailyKCalTarget?: number;

  // name?: string;
  // gender?: genderType;
  // fitnessGoal?: fitnessGoalTypes[];

  // pcos
  // age?: number;
  // height?: number;
  // weight?: number;
  cycleLength?: cycleLengthTyps;
  pcosSymptoms?: pcosSymptoms[];
  workoutFrequency?: workoutFrequencyTypes;
  workoutStyle?: workoutStyleTypes;

  // weightloss
  // desiredWeight?: number;
  // currentBodyType?: BodyTypesId;
  // desiredBodyType?: BodyTypesId;

  targets?: string[]; // auto generated

  // email
  // email?: string;
  contentTags?: string;

  // landing content
  landingContent?: landingContentInterface;

  cycles?: Cycle[];
  recommendationConfig?: RecommendationConfig;
  unseenAwards?: string[];

  waMessageStatus?: userCheckpoints;

  // cycleLengthAverage?: number;
  // lastPeriodLength?: number;
  sleepQuality?: number;
  bootcampDetails?: userBootcampObj;

  thingsToWorkOn?: workType[];

  sbPlanId?: string; // overwritten when plan is upgraded
  plusTrial?: boolean;
  consultations?: consultationInventory;
  periodTrackerObj?: periodTrackerObjectInterface;
  dietForm?: DietForm;

  doctorIds?: string[];
  doctorForm?: doctorForm;
  accurateGoal?: accurateGoal;
  pastUsedMethod?: pastUsedMethod;
  howBusy?: howBusy;
  isOkWithPaidPlan?: boolean;
  leadFormFlags?: {
    seen: boolean;
    completed: boolean;
  };
  flags?: FlagObj;
  dailyHealthIssues?: dailyHealthIssues;
  // it shows completion progress on roadmap
  roadmapProgress?: number;
  completedTargets?: number;
  totalTargets?: number;

  lastFollowupTime?: number;
  nextFollowupTime?: number;
  deliverableFlags?: paidUserDeliverables;

  testUser?: boolean;

  // slot booking intervention
  slotIntervention?: slotInterventionInterface | "none";
  challengeJoined?: number;
}

export interface slotInterventionInterface {
  type: slotInterventionTypes;
  lastShown: number;
}

export type slotInterventionTypes =
  | "managePCOS"
  | "looseWeight"
  | "pearsnolTeam";

// followups
export interface userFollowup {
  followupDate: string;
  followupTime: number;
  id: string;
  createdOn: number;
  followupAgent: followupAgent;
  notes: string;
  type?: "diet" | "habit";
}

export type followupAgent = "jayti" | "saurav" | "swapnil" | "mansi";

export type accurateGoalType =
  | "looseWeight"
  | "regularisePeriod"
  | "gainWeight"
  | "motherBackInShape"
  | "getFitToConceive";
export interface accurateGoal {
  looseWeight?: boolean;
  regularisePeriod?: boolean;
  gainWeight?: boolean;
  motherBackInShape?: boolean;
  getFitToConceive?: boolean;
}

export type pastUsedMethodTypes = keyof pastUsedMethod;
export interface pastUsedMethod {
  gym?: boolean;
  paidDiet?: boolean;
  doctorConsult?: boolean;
  selfDiagnose?: boolean;
  homeWorkoutDiet?: boolean;
  notTried?: boolean;
}
export type howBusyTypes = keyof howBusy;

export type DailyIssuesType =
  | "Anxiety"
  | "Stress"
  | "Depression"
  | "Insomnia"
  | "Gastric";
export interface howBusy {
  workingNoTime?: boolean;
  workingSomeTime?: boolean;
  allTime?: boolean;
  otherAndLessTime?: boolean;
}
export type periodTrackerGoal =
  | "PCOS_MANAGEMENT"
  | "PREGNANCY"
  | "PREGNANCY_PREVENTION"
  | "PERIOD_PREDUCTION";

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

export interface workType {
  // text: string;
  // icon: string;
  // type: transformationIconTypes;

  text: string;
  target: number;
  type: transformationIconTypes;
  delta: number;

  minValue?: number;
  countNeeded: number;
  action: goalActionType;
}

export type transformationIconTypes =
  | "weight"
  | "cycleLength"
  | "periodLength"
  | "mood"
  | "energy"
  | "sleep"
  | pcosSymptoms;

interface userBootcampObj {
  bootcampId: string;
  started: number;
}
export interface doctorForm {
  pregnantHistory?: boolean;
  pregnancyDate?: string;
  surgicalHistory?: boolean;
  sexuallyActive?: boolean;
  surgeryBrief?: string;
  chiefComplain?: string;
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

type userCheckpoints = Record<checkpoints, boolean>;

export interface landingContentInterface {
  heading?: string;
  subtitle?: string;
  img?: AWSMedia | CloudinaryMedia;
  qualification?: string;
  superWomanLeader?: boolean;
  superWomanIncentive?: number;
  dietAndWorkout?: DietAndWorkoutType[];
  howItWorks?: HowItWorksType[];
  experienceYears?: number;
  docRegistrationId?: string;
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
  | "3_months"
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

export const FitnessGoalSelect: SelectItem[] = [
  {
    heading: "Lose weight",
    text: "",
    key: "weightloss",
  },
  {
    heading: "Gain muscle",
    text: "",
    key: "muscleGain",
  },
  {
    heading: "Live longer",
    text: "",
    key: "longevity",
  },
  {
    heading: "Reverse diabetes",
    text: "",
    key: "diabetes",
  },
  {
    heading: "PCOS/PCOD",
    text: "",
    key: "pcos",
  },
  {
    heading: "Back/Neck pain",
    text: "",
    key: "backPain",
  },
  {
    heading: "Sports injury",
    text: "",
    key: "otherSportsInjury",
  },
];

export interface TaskRec {
  id: string;
  manual?: boolean;
}

// users/uid/dayRecommendations/id
export type dayRecommendationType = "workout" | "nutrition";

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

  propagateDate?: boolean;

  // to calculate progress
  taskFP: number;
  doneFP?: number;
}
export interface dayRecommendationWithNutrition extends dayRecommendation {
  doneFPNutri?: number;
  taskFPNutri?: number;
  nutriRecId?: string;
  workoutRecId?: string;
}

export interface MenstrualPhaseDays {
  PERIOD: number[];
  FOLLICULAR: number[];
  OVULATION: number[];
  LUTEAL: number[];
  ESTIMATED_PERIOD: number[];
  UNKNOWN: number[];
}

export interface Cycle {
  length: number;
  startDate: string; // yyyy-mm-dd
  endDate: string;

  id: string;

  startUnix: number;
  endUnix: number;
  status: "regular" | "irregular";

  phaseSplits: MenstrualPhaseDays;
}

export type periodDateType =
  | "PERIOD"
  | "ESTIMATED_PERIOD"
  | "UNKNOWN"
  | "OVULATION"
  | "FOLLICULAR"
  | "LUTEAL";

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

  // emoji items
  // recommendations?: Partial<Record<AutoRoomIDs, EmojiItem>>;

  // to fetch relevant cycle
  cycleId: string;
}
