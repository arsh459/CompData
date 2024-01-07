import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "@screens/Auth/AuthScreen";
import { GameLandingParams } from "@screens/GameLanding/GameLanding";
import Workout, { WorkoutParams } from "@screens/Workout";
import WritePost, { WritePostParams } from "@screens/Community/WritePost";
import Reply, { ReplyParams } from "@screens/Reply";
import TaskPreviewScreen, {
  TaskPreviewParamsTypes,
} from "@screens/Workout/TaskPreviewScreen";
import PostDetails, { PostDetailsParams } from "@screens/Community/PostDetails";
import CustomRecipeIngredientsScreen, {
  TaskIdParams,
} from "@screens/CustomRecipeIngredientsScreen";
import User, { UserParams } from "@screens/User";
import EditUserProfile from "@screens/Profile";
import { useAuthContext } from "@providers/auth/AuthProvider";
import DrawerNavigator from "./DrawerNavigator";
import { UploadTaskParams } from "@screens/Workout/UploadTask";
import LoadingScreen from "@screens/Loading/Loading";
import HallOfFameScreen from "@screens/HallOfFame";
import MotivateEarn, { ViewerParams } from "@screens/Motivate";
import WebViewScreen, {
  WebviewParamsProps,
} from "@screens/WebView/WebViewScreen";
import InviteScreen, { InviteScreenProps } from "@screens/Invite";
import TeamBrowseScreen from "@screens/TeamBrowse.tsx";
import TeamScreen, { TeamScreenParams } from "@screens/TeamScreen";
import TeamFitPoint, { TeamFitPointParams } from "@screens/TeamFitPoint";
import TeamConsistency from "@screens/TeamConsistency";
import ProgramScreen, {
  ProgramScreenParams,
} from "@screens/Community/FilteredProgram";
import UniverseSelector from "@screens/UniverseSelector";
import InviteCode, { InviteCodeParams } from "../screens/InviteCode";
import Notification from "@screens/Notification";
import GameInviteScreen, {
  GameInviteScreenProps,
} from "@screens/GameInvite/GameInvite";
import CastScreen, { CastScreenParams } from "@screens/Workout/CastScreen";
import PostInteraction, {
  PostInteractionProps,
} from "@screens/PostInteraction/PostInteraction";
import ProgressScreen, { TeamProgParams } from "@screens/ProgressScrean";
import StepsTaskScreen from "@screens/StepsTaskScreen/StepsTaskScreen";
import StreakDaysScreen from "@screens/StreakDaysScreen";
import StepsHistoryScreen from "@screens/StepsHistoryScreen";
import StepsTargetScreen from "@screens/StepsTargetScreen";
import SelectWorkoutsScreen, {
  WorkoutUserParams,
} from "@screens/SelectWorkoutsScreen";
import FitPointExpanderScreen from "@screens/FitPointExpander";
import UploadTaskV2 from "@screens/Workout/UploadTaskV2";
import CreateTeamEnterNameScreen from "@screens/CreateTeamEnterNameScreen";
import ChampionshipExplainer from "@screens/ChampionshipExplainer";
import { usePurchases } from "@hooks/purchases/usePurchases";
import ProScreen, { ProParams } from "@screens/ProScreen";
import GetAccessScreen from "@screens/GetAccessScreen";
import MapTaskDetailScreen from "@screens/MapTaskDetail";
import MapTaskRunningScreen from "@screens/MapTaskRunning";
import AllWorkouts from "@screens/AllWorkouts";
import WorkoutHistoryExpanderScreen, {
  WorkoutHistoryExpanderScreenParamsTypes,
} from "@screens/WorkoutHistoryExpander";
// import { JoinBoatParams } from "@screens/JoinBoat";
import ShopScreen, { ShopScreenParams } from "@screens/ShopScreen";
import VoucherPurchaseScreen, {
  VoucherPurchaseParams,
} from "@screens/VoucherPurchaseScreen";
import PurchasedVoucherScreen, {
  PurchasedVoucherScreenParams,
} from "@screens/PurchasedVoucherScreen";
import PurchaserScreen, {
  PurchaserScreenParams,
} from "@screens/PurchaserScreen";
import PurchaseForm, { PurchaseFormParams } from "@screens/PurchaseForm";
import NewJourney, { NewJourneyProps } from "@screens/Journey/NewJourney";
import ChangeDetailScreen from "@screens/Journey/ChangeDetailScreen";
import ContributionScreen, {
  UserProgParams,
} from "@screens/ContributionScreen/Contribution";
import ReOnBoard from "@screens/ReOnBoard";
import NutritionScreen, { NutritionParams } from "@screens/NutritionScreen";
import Knowledge, { KnowledgeScreenParams } from "@modules/Knowledge";
import NutritionWorkoutsScreen, {
  NutritionUserParams,
} from "@screens/NutritionWorkoutsScreen";
import NutriCameraScreen, {
  NutritionCameraParams,
} from "@screens/NutriCameraScreen";
import StepInfoScreen from "@screens/StepInfoScreen";
import ChangeBodyTypeScreen from "@screens/ChangeBodyTypeScreen";
import KnowledgeDetails, {
  KnowledgeDetailsProps,
} from "@screens/KnowledgeDetails";
import BlogScreen, { BlogParamsProps } from "@screens/BlogScreen";
import CoursePageScreen, { CoursePageProps } from "@screens/CoursePageScreen";
import CourseTaskPreviewScreen, {
  CourseTaskPreviewScreenTypes,
} from "@screens/Workout/CourseTaskPreviewScreen";
import CourseNutritionPreviewScreen, {
  CourseNutritionPreviewScreenTypes,
} from "@screens/Workout/CourseNutritionPreviewScreen";
import RecipeeDetailScreen, {
  RecipeeDetailScreenParams,
} from "@screens/RecipeeDetailScreen";
import SwapScreen, { NutritionSwapParams } from "@screens/SwapScreen";
import JoinBoatV3, { JoinBoatParamsV3 } from "@screens/JoinBoat/JoinBoatV3";
import WalkToEarnScreen from "@screens/WalkToEarnScreen";
import StepFaqMain from "@modules/StepFaqMain";
import CongoScreen from "@screens/CongoScreen";
import WhatIsFpScreen from "@screens/WhatIsFpScreen";
import RankingScreen from "@screens/RankingScreen";
import MealScreen, { MealScreenTypes } from "@screens/MealScreen";
import WorkoutOnboardingScreen, {
  WorkoutOnboardingScreenParams,
} from "@screens/WorkoutOnboardingScreen";
import NotificationTimeScreen, {
  NotificationTimeScreenParams,
} from "@screens/NotificationTimeScreen";
import ReelView, { ReelViewParams } from "@screens/ReelView";
import AddMoodScreen, { AddMoodParams } from "@screens/AddMoodScreen";
import MoodTrackerScreen from "@screens/MoodTrackerScreen";
import EnergyTrackerScreen from "@screens/EnergyTrackerScreen";
import WeightTrackerScreen from "@screens/WeightTrackerScreen";
import AddEnergyScreen, { AddEnergyParams } from "@screens/AddEnergyScreen";
import AddWeightScreen from "@screens/AddWeightScreen";
import WorkoutStartScreen, {
  WorkoutStartScreenParams,
} from "@screens/WorkoutStartScreen";
import WorkoutSettingScreen, {
  WorkoutSettingScreenParams,
} from "@screens/WorkoutSettingScreen";
import Congratulations, {
  CongratulationsParams,
} from "@screens/Congratulations";
import { SubscriptionProvider } from "@providers/subscription/SubscriptionProvider";
import WorkoutDoneScreen, {
  WorkoutDoneScreenTypes,
} from "@screens/Workout/WorkoutDoneScreen";
import DayCalander, { DayCalanderParams } from "@screens/DayCalander";
import { useRegisterDeviceToken } from "@hooks/notification/useRegisterDeviceForRemoteMessages";
import { useNotificationEvent } from "@providers/notificationPermissions/hooks/useNotificationEvent";
import PeriodTrackerScreen from "@screens/PeriodTrackerScreen";
import PeriodCalenderLogScreen, {
  PeriodCalenderLogScreenProps,
} from "@screens/PeriodCalenderLog";
import StartNewChat from "@screens/StartNewChat";
import ChatRoom, { ChatRoomProps } from "@screens/ChatRoom";
import AwardWon, { AwardWonParams } from "@screens/Awards/AwardWon";
import AwardReport, { AwardReportParams } from "@screens/Awards/AwardReport";
import ProCommunityGatewayScreen from "@screens/ProCommunityGatewayScreen";
import ReminderScreen from "@screens/ReminderScreen";
import WeeklyChekinsGatewayScreen from "@screens/WeeklyChekinsGatewayScreen";
import SheduleAmaGatewayScreen from "@screens/SheduleAmaGatewayScreen";
import BiWeeklyLiveGatewayScreen from "@screens/BiWeeklyLiveGatewayScreen";
import WelcomePro from "@screens/WelcomePro";
import { HomeParams } from "@screens/Home/Home";
import SearchScreens from "@screens/SearchScreens";
import SymptomTrackerScreen, {
  SymptomTrackerScreenProps,
} from "@screens/SymptomTrackerScreen";
import HealthQuestionsScreen from "@screens/HealthQuestionsScreen";
import PeriodStartScreen from "@screens/PeriodStartScreen";
import PeriodGoalScreen from "@screens/PeriodGoalScreen";
import AddCurrentCycleLength from "@screens/AddCurrentCycleLength";
import AddCurrentPeriodLength from "@screens/AddCurrentPeriodLength";
import PeriodOnboardSettingScreen from "@screens/PeriodOnboardSettingScreen";
import InsightDetail, { InsightDetailProps } from "@screens/InsightsDetail";
import Testimonial, { TestimonialProps } from "@screens/Testimonial";
import SakhiExplainer, { SakhiExplainerProps } from "@screens/SakhiExplainer";
import UpgradeScreen from "@screens/Upgrade";
import BatterySaverScreen from "@screens/BatterySaverScreen";
import TodayFpScreen from "@screens/TodayFpScreen";
import BootCamp, { BootCampParams } from "@screens/BootCamp";
import BootCampDetail from "@screens/BootCampDetail";
import ViewWorkout, { ViewWorkoutProps } from "@screens/ViewWorkout";
import DailyWaterIntakeScreen from "@screens/DailyWaterIntakeScreen";
import OutsideFoodIntake from "@screens/OutsideFoodIntake";
import DailyAddictions from "@screens/DailyAddictions";
import DailyExercise from "@screens/DailyExercise";
import DailyIssues from "@screens/DailyIssues";
import DailyWorkHours from "@screens/DailyWorkHours";
import TargetWeight from "@screens/TargetWeight";
import FamilyHistory from "@screens/FamilyHistory";
import TakingSupplements from "@screens/TakingSupplements";
import UploadReports from "@screens/UploadReports";
import DietPreference from "@screens/DietPreference";
import CuisinePreference from "@screens/CuisinePreference";
import Allergies from "@screens/Allergies";
import SelectFoodItems from "@screens/SelectFoodItems";
import SelectFoodTimings from "@screens/SelectFoodTimings";
import DontSeeWhatLike from "@screens/DontSeeWhatLike";
import DailyFocusStart from "@screens/DailyFocusStart";
import DailyLifeStyleStart from "@screens/DailyLifeStyleStart";
import DietHistoryStart from "@screens/DietHistoryStart";
import NutritionSettingScreen from "@screens/NutritionSettingScreen";
import { GoBackParams, ReinitParams } from "@modules/NutritionSettingMain";
import DietFormInitiatorScreen from "@screens/DietFormInitiatorScreen";
import MedicalProfileScreen from "@screens/MedicalProfileScreen";
import PregnancyHistoryScreen from "@screens/PregnancyHistoryScreen";
import PregnantDateLogScreen from "@screens/PregnantDateLogScreen";
import SurgicalHistoryScreen from "@screens/SurgicalHistoryScreen";
import SurgeryBriefScreen from "@screens/SurgeryBriefScreen";
import SexualActivityStatusScreen from "@screens/SexualActivityStatusScreen";
import ChiefComplaintLogScreen from "@screens/ChiefComplaintLogScreen";
import BookAppointmentSlotScreen, {
  BookRequestProps,
} from "@screens/BookAppointmentSlotScreen";
import AppointmentBookedScreen, {
  AppointmentBookedScreenProps,
} from "@screens/AppointmentBookedScreen";
import AppointmentsScreen, {
  AppointmentsScreenProps,
} from "@screens/AppointmentsScreen";
import DoctorConsultationScreen from "@screens/DoctorConsultation";
import MyGoalRoadmap from "@screens/MyGoalRoadmap";
import CastPreview from "@screens/CastPreview";
import SlotConfirmation from "@screens/SlotConfirmation/SlotConfirmation";
import FreeHealthConsulation from "@screens/FreeHealthConsulation";
import CircularProgressScreen, {
  CircularProgressScreenInterface,
} from "@screens/CircularProgressScreen";

import TopContributionScreen, {
  TopContributionProps,
} from "@screens/TopContributionScreen";
import StreakAwardScreen, {
  StreakAwardScreenProps,
} from "@screens/StreakAwardScreen/StreakAwardScreen";
import BookZohoSlot, { BookZohoSlotProps } from "@screens/BookZohoSlot";
import SkipSlotBookScreen from "@screens/SkipSlotBookScreen";
import ClaimScreen from "@screens/ClaimScreen";
import ChallengeScreen, {
  ChallengeScreenParams,
} from "@screens/ChallengeScreen";
import UnlockedLeagueScreen from "@screens/UnlockedLeagueScreen/UnlockedLeagueScreen";
import EarnedFpScreen from "@screens/EarnedFpScreen/EarnedFpScreen";
import ChallengeDetailScreen, {
  ChallengeDetailScreenProps,
} from "@screens/ChallengeDetailScreen";
import LevelDetailScreen, {
  LevelDetailScreenProps,
} from "@screens/LevelDetailScreen";
import TreasureRewardScreen from "@screens/TreasureRewardScreen/TreasureRewardScreen";
import CustomRecipeCookingTime from "@screens/CustomRecipeCookingTime";
import CustomRecipeLoadingScreen from "@screens/CustomRecipeLoadingScreen";
import CustomRecipeeDetailScreen from "@screens/CustomRecipeDetailsScreen";
import { useDeviceStoreDateInit } from "@providers/device/hooks/useDeviceStoreInit";
import PrescriptionsView from "@screens/PrescriptionsView/PrescriptionsView";
import MedicalReportScreen from "@screens/MedicalReportScreen";
import DailyQuestScreen from "@screens/DailyQuestScreen/DailyQuestScreen";
import FeedLikesScreen, {
  FeedLikesScreenParams,
} from "@screens/FeedLikesScreen";
import StartStreakScreen from "@screens/StreaksScreenV2/StartStreakScreen";
import StreakGoalScreen from "@screens/StreaksScreenV2/StreakGoalScreen";
import StreakV2Screen from "@screens/StreaksScreenV2/StreakV2Screen";
import StreakFreezeScreen from "@screens/StreaksScreenV2/StreakFreezeScreen";
import StreakTodayCompeleteScreen from "@screens/StreaksScreenV2/StreakTodayCompleteScreen";
import { AddNewItemScreenParams } from "@screens/AddNewItemSearchScreen";
import AddNewItemSearchScreen from "@screens/AddNewItemSearchScreen";
import AddNewItemScreen from "@screens/AddNewItemScreen";
import AddNewItemLoadingScreen from "@screens/AddNewItemLoadingScreen";
import FormAddressDetailScreen from "@screens/PurchaseFormV2/FormAddressDetailScreen";
import FormProductVariantScreen from "@screens/PurchaseFormV2/FormProductVariantScreen";
import PeriodOnboarding, {
  PeriodOnboardingProps,
} from "@screens/PeriodOnboarding";
import AddNewItemMealTypeScreen from "@screens/AddNewItemMealTypeScreen";
import AlgoliaMealTypeScreen, {
  AlgoliaMealTypeScreenParams,
} from "@screens/AlgoliaMealTypeScreen";
import AiScanOnboardingScreen, {
  AiScanOnboardinScreenParams,
} from "@screens/AiScanOnboardingScreen";
import ImageCaptureScreen, {
  ImageCaptureScreenParams,
} from "@screens/ImageCaptureScreen";
import AiScanMealTypeScreen from "@screens/AiScanMealTypeScreen";
import AiScanItemSelectionScreen, {
  AiScanItemSelectionScreenParams,
} from "@screens/AiScanItemsSelectionScreen";
import AiScanItemAddScreen from "@screens/AiScanItemAddScreen";
import AiScanLoadingScreen from "@screens/AiScanLoadingScreen";
import ChatVoiceScreen from "@screens/ChatVoiceScreen";

export type RouteKeys =
  | "Home"
  | "Ranking"
  | "Community"
  | "Journey"
  | "Shop"
  | "ProgramScreen"
  | "ProgressScreen"
  | "Reward"
  | "ReOnBoard"
  | "UniverseSelector"
  | "InviteCode"
  | "ChampionshipExplainer"
  | "ChangeDetail"
  | "NewJourney"
  | "JoinBoat"
  | "GameLanding"
  | "GameInviteScreen"
  | "Auth"
  | "Onboarding"
  | "AllWorkouts"
  | "WritePost"
  | "PostDetails"
  | "Reply"
  | "NutritionScreen"
  | "Loading"
  | "Workout"
  | "StepsTaskScreen"
  | "MapTaskDetailScreen"
  | "TaskPreviewScreen"
  | "CourseTaskPreviewScreen"
  | "WorkoutDoneScreen"
  | "CourseNutritionPreviewScreen"
  | "UploadTask"
  | "User"
  | "Onboarding"
  | "EditUserProfile"
  | "WebViewScreen"
  | "BlogScreen"
  | "InviteScreen"
  | "GameInviteScreen"
  | "ChampionshipExplainer"
  | "MyCurrentPlan"
  | "HallOfFameScreen"
  | "Motivate"
  | "TeamBrowseScreen"
  | "TeamScreen"
  | "TeamFitPoint"
  | "TeamConsistency"
  | "Notification"
  | "CastScreen"
  | "PostInteraction"
  | "StreakDaysScreen"
  | "StepHistoryScreen"
  | "StepsTargetScreen"
  | "SelectWorkoutsScreen"
  | "FitPointExpanderScreen"
  | "CreateTeamEnterNameScreen"
  | "ProScreen"
  | "UpgradeScreen"
  | "GetAccessScreen"
  | "MapTaskRunningScreen"
  | "ShopScreen"
  | "VoucherPurchaseScreen"
  | "PurchasedVoucherScreen"
  | "PurchaserScreen"
  | "PurchaseForm"
  | "ContributionScreen"
  | "WorkoutHistoryExpanderScreen"
  | "NutriCameraScreen"
  | "Upgrade"
  | "RankingScreen"
  | "Knowledge"
  | "KnowledgeScreen"
  | "StepInfoScreen"
  | "KnowledgeDetails"
  | "ReelView"
  | "DayCalander"
  | "RecipeeDetailScreen"
  | "AwardWon"
  | "AwardReport"
  | "HowToAchieve"
  | "WelcomePro"
  | "InsightDetail"
  | "ChatRoom"
  | "StartNewChat"
  | "Period"
  | "Progress"
  | "SakhiExplainer"
  | "Testimonial"
  | "TodayFpScreen"
  | "BootCamp"
  | "BootCampDetail"
  | "ViewWorkout"
  | "SheduleAmaGatewayScreen"
  | "WorkoutSettingScreen"
  | "ProCommunityGatewayScreen"
  | "BiWeeklyLiveGatewayScreen"
  | "DoctorConsultation"
  | "WeeklyChekinsGatewayScreen"
  | "Testimonial"
  | "MedicalProfileScreen"
  | "PregnancyHistoryScreen"
  | "PregnantDateLogScreen"
  | "SurgicalHistoryScreen"
  | "SurgeryBriefScreen"
  | "SexualActivityStatusScreen"
  | "ChiefComplaintLogScreen"
  | "BookAppointmentSlotScreen"
  | "AppointmentBookedScreen"
  | "AppointmentsScreen"
  | "DailyWaterIntakeScreen"
  | "OutsideFoodIntake"
  | "DailyAddiction"
  | "DailyExercise"
  | "DailyIssues"
  | "DailyWorkHours"
  | "TargetWeight"
  | "FamilyHistory"
  | "TakingSupplements"
  | "UploadReports"
  | "DietPreference"
  | "CuisinePreference"
  | "Allergies"
  | "SelectFoodItems"
  | "SelectFoodTimings"
  | "DontSeeWhatLike"
  | "DailyFocusStart"
  | "DailyLifeStyleStart"
  | "DietHistoryStart"
  | "NutritionSettingScreen"
  | "MyGoalRoadmap"
  | "SlotConfirmation"
  | "CastPreview"
  | "FreeHealthConsulation"
  | "CircularProgressScreen"
  | "AddNewItemScreen"
  | "BookZohoSlot"
  | "PrescriptionsView"
  | "SkipSlotBookScreen"
  | "MedicalReportScreen"
  | "SkipSlotBookScreen"
  | "CustomRecipeIngredientsScreen"
  | "CustomRecipeCookingTime"
  | "CustomRecipeLoadingScreen"
  | "CustomRecipeDetailScreen"
  | "DailyQuestScreen"
  | "ChallengeScreen"
  | "ChallengeDetailScreen"
  | "LevelDetailScreen"
  | "FeedLikesScreen"
  | "StartStreakScreen"
  | "StreakGoalScreen"
  | "StreakV2Screen"
  | "StreakFreezeScreen"
  | "StreakTodayCompleteScreen"
  | "AddNewItemSearchScreen"
  | "AddNewItemMealTypeScreen"
  | "AddNewItemLoadingScreen"
  | "PurchaseFormAddress"
  | "PurchaseProdVariant"
  | "PeriodOnboarding"
  | "FeedLikesScreen"
  | "AiScanOnboardingScreen"
  | "ImageCaptureScreen"
  | "AlgoliaMealTypeScreen"
  | "AiScanMealTypeScreen"
  | "AiScanItemSelectionScreen"
  | "AiScanItemAddScreen"
  | "AiScanLoadingScreen"
  | "ChatVoiceScreen"
  | "MealScreen";

export type RootStackParamList = {
  Home: HomeParams | undefined;
  Ranking: undefined;
  Community: undefined;
  Journey: undefined;
  Shop: undefined;
  ProgramScreen: ProgramScreenParams;
  ProgressScreen: TeamProgParams;
  Reward: undefined;
  ReOnBoard: undefined;
  UniverseSelector: undefined;
  InviteCode: InviteCodeParams;
  ChampionshipExplainer: undefined;
  ChangeDetail: undefined;
  NewJourney: NewJourneyProps | undefined;
  JoinBoat: JoinBoatParamsV3;
  GameLanding: GameLandingParams;
  GameInviteScreen: GameInviteScreenProps;
  Auth: undefined;
  Onboarding: undefined;
  AllWorkouts: undefined;
  WritePost: WritePostParams;
  PostDetails: PostDetailsParams;
  Reply: ReplyParams;
  NutritionScreen: NutritionParams;
  Loading: undefined;
  Workout: WorkoutParams;
  StepsTaskScreen: UploadTaskParams;
  MapTaskDetailScreen: UploadTaskParams;
  TaskPreviewScreen: TaskPreviewParamsTypes;
  CourseTaskPreviewScreen: CourseTaskPreviewScreenTypes;
  WorkoutDoneScreen: WorkoutDoneScreenTypes;
  CourseNutritionPreviewScreen: CourseNutritionPreviewScreenTypes;
  UploadTask: UploadTaskParams;
  User: UserParams;
  EditUserProfile: undefined;
  MyCurrentPlan: undefined;
  HallOfFameScreen: undefined;
  Motivate: ViewerParams;
  WebViewScreen: WebviewParamsProps;
  BlogScreen: BlogParamsProps;
  InviteScreen: InviteScreenProps;
  TeamBrowseScreen: undefined;
  TeamScreen: TeamScreenParams;
  TeamFitPoint: TeamFitPointParams;
  TeamConsistency: undefined;
  Notification: undefined;
  CastScreen: CastScreenParams;
  PostInteraction: PostInteractionProps;
  StreakDaysScreen: undefined;
  StepHistoryScreen: undefined;
  StepsTargetScreen: undefined;
  SelectWorkoutsScreen: WorkoutUserParams;
  FitPointExpanderScreen: undefined;
  CreateTeamEnterNameScreen: undefined;
  ProScreen: ProParams;
  UpgradeScreen: undefined;
  GetAccessScreen: undefined;
  MapTaskRunningScreen: UploadTaskParams;
  ShopScreen: ShopScreenParams;
  VoucherPurchaseScreen: VoucherPurchaseParams;
  PurchasedVoucherScreen: PurchasedVoucherScreenParams;
  PurchaserScreen: PurchaserScreenParams;
  PurchaseForm: PurchaseFormParams | undefined;
  ContributionScreen: UserProgParams;
  WorkoutHistoryExpanderScreen: WorkoutHistoryExpanderScreenParamsTypes;
  NutriCameraScreen: NutritionCameraParams;
  NutritionWorkoutsScreen: NutritionUserParams;
  StepInfoScreen: undefined;
  ChangeBodyTypeScreen: undefined;
  CoursePageScreen: CoursePageProps;
  Upgrade: undefined;
  KnowledgeDetails: KnowledgeDetailsProps;
  KnowledgeScreen: KnowledgeScreenParams;
  RecipeeDetailScreen: RecipeeDetailScreenParams;
  SwapScreen: NutritionSwapParams;
  WalkToEarnScreen: undefined;
  StepFaqScreen: undefined;
  Period: undefined;
  Progress: undefined;
  CongoScreen: undefined;
  WhatIsFpScreen: undefined;
  RankingScreen: undefined;
  MealScreen: MealScreenTypes;
  WorkoutSettingScreen: WorkoutSettingScreenParams;
  WorkoutStartScreen: WorkoutStartScreenParams;
  WorkoutOnboardingScreen: WorkoutOnboardingScreenParams;
  NotificationTimeScreen: NotificationTimeScreenParams;
  ReelView: ReelViewParams;
  AddMoodScreen: AddMoodParams;
  AddEnergyScreen: AddEnergyParams;
  WeightTrackerScreen: undefined;
  MoodTrackerScreen: undefined;
  EnergyTrackerScreen: undefined;
  AddWeightScreen: undefined;
  Congratulations: CongratulationsParams;
  DayCalander: DayCalanderParams;
  PeriodTrackerScreen: undefined;
  AwardWon: AwardWonParams;
  AwardReport: AwardReportParams;
  PeriodCalenderLogScreen: PeriodCalenderLogScreenProps;
  StartNewChat: undefined;
  ChatRoom: ChatRoomProps | undefined;
  ProCommunityGatewayScreen: undefined;
  ReminderScreen: undefined;
  DoctorConsultation: undefined;
  BiWeeklyLiveGatewayScreen: undefined;
  SheduleAmaGatewayScreen: undefined;
  WeeklyChekinsGatewayScreen: undefined;
  WelcomePro: undefined;
  SearchScreens: undefined;
  SymptomTrackerScreen: SymptomTrackerScreenProps;
  HealthQuestionsScreen: undefined;
  PeriodStartScreen: undefined;
  PeriodGoalScreen: GoBackParams | undefined;
  AddCurrentCycleLength: GoBackParams | undefined;
  AddCurrentPeriodLength: GoBackParams | undefined;
  PeriodOnboardSettingScreen: undefined;
  PeriodOnboarding: PeriodOnboardingProps;
  InsightDetail: InsightDetailProps;
  SakhiExplainer: SakhiExplainerProps;
  Testimonial: TestimonialProps;
  BatterySaverScreen: undefined;
  TodayFpScreen: undefined;
  BootCamp: BootCampParams;
  BootCampDetail: BootCampParams;
  ViewWorkout: ViewWorkoutProps;
  MedicalProfileScreen: undefined;
  PregnancyHistoryScreen: ReinitParams | undefined;
  PregnantDateLogScreen: ReinitParams | undefined;
  SurgicalHistoryScreen: ReinitParams | undefined;
  SurgeryBriefScreen: ReinitParams | undefined;
  SexualActivityStatusScreen: ReinitParams | undefined;
  ChiefComplaintLogScreen: undefined;
  BookAppointmentSlotScreen: BookRequestProps;
  AppointmentBookedScreen: AppointmentBookedScreenProps;
  AppointmentsScreen: AppointmentsScreenProps;
  DailyWaterIntakeScreen: GoBackParams | undefined;
  OutsideFoodIntake: GoBackParams | undefined;
  DailyAddiction: GoBackParams | undefined;
  DailyExercise: GoBackParams | undefined;
  DailyIssues: GoBackParams | undefined;
  DailyWorkHours: GoBackParams | undefined;
  TargetWeight: GoBackParams | undefined;
  FamilyHistory: GoBackParams | undefined;
  TakingSupplements: GoBackParams | undefined;
  UploadReports: GoBackParams | undefined;
  DietPreference: GoBackParams | undefined;
  CuisinePreference: GoBackParams | undefined;
  Allergies: GoBackParams | undefined;
  SelectFood: GoBackParams | undefined;
  SelectFoodItems: GoBackParams | undefined;
  SelectFoodTimings: GoBackParams | undefined;
  DontSeeWhatLike: undefined;
  DailyFocusStart: undefined;
  DailyLifeStyleStart: undefined;
  DietHistoryStart: undefined;
  NutritionSettingScreen: undefined;
  DietFormInitiatorScreen: undefined;
  MyGoalRoadmap: undefined;
  CastPreview: undefined;
  SlotConfirmation: undefined;
  FreeHealthConsulation: undefined;
  CircularProgressScreen: CircularProgressScreenInterface;
  AddNewItemScreen: AddNewItemScreenParams;
  AddNewItemSearchScreen: AddNewItemScreenParams;
  TopContributionScreen: TopContributionProps;
  StreakAwardScreen: StreakAwardScreenProps;
  BookZohoSlot: BookZohoSlotProps;
  SkipSlotBookScreen: undefined;
  PrescriptionsView: undefined;
  MedicalReportScreen: undefined;
  ClaimScreen: undefined;
  ChallengeScreen: ChallengeScreenParams;
  UnlockedLeagueScreen: undefined;
  EarnedFpScreen: undefined;
  ChallengeDetailScreen: ChallengeDetailScreenProps;
  LevelDetailScreen: LevelDetailScreenProps;
  TreasureRewardScreen: undefined;
  DailyQuestScreen: undefined;
  FeedLikesScreen: FeedLikesScreenParams;
  StartStreakScreen: undefined;
  StreakGoalScreen: undefined;
  StreakV2Screen: undefined;
  StreakFreezeScreen: undefined;
  StreakTodayCompleteScreen: undefined;
  AddNewItemMealTypeScreen: AddNewItemScreenParams;
  AddNewItemLoadingScreen: AddNewItemScreenParams;
  CustomRecipeIngredientsScreen: TaskIdParams;
  CustomRecipeCookingTime: TaskIdParams;
  CustomRecipeLoadingScreen: undefined;
  CustomRecipeDetailScreen: TaskIdParams;
  AiScanOnboardingScreen: AiScanOnboardinScreenParams;
  AiScanMealTypeScreen: ImageCaptureScreenParams;
  ImageCaptureScreen: ImageCaptureScreenParams;
  PurchaseFormAddress: undefined;
  PurchaseProdVariant: undefined;
  AlgoliaMealTypeScreen: AlgoliaMealTypeScreenParams;
  AiScanItemSelectionScreen: AiScanItemSelectionScreenParams;
  AiScanItemAddScreen: undefined;
  AiScanLoadingScreen: AiScanItemSelectionScreenParams;
  ChatVoiceScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  const { state } = useAuthContext();
  const { loaded } = usePurchases();

  // device register
  useRegisterDeviceToken();
  useNotificationEvent();
  useDeviceStoreDateInit();

  return (
    <SubscriptionProvider loaded={loaded}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <>
          {state.status === "AUTH_REQUEST" || state.status === "FAILED" ? (
            <>
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Loading" component={LoadingScreen} />
              <Stack.Screen name="InviteScreen" component={InviteScreen} />
              <Stack.Screen
                name="GameInviteScreen"
                component={GameInviteScreen}
              />
              <Stack.Screen name="JoinBoat" component={JoinBoatV3} />
              {/* <Stack.Screen name="JoinBoat" component={DrawerNavigator} /> */}

              <Stack.Screen
                name="FeedLikesScreen"
                component={FeedLikesScreen}
              />
              <Stack.Screen
                name="AiScanOnboardingScreen"
                component={AiScanOnboardingScreen}
              />
              <Stack.Screen
                name="AiScanMealTypeScreen"
                component={AiScanMealTypeScreen}
              />

              <Stack.Screen
                name="ImageCaptureScreen"
                component={ImageCaptureScreen}
              />

              <Stack.Screen
                name="AiScanItemSelectionScreen"
                component={AiScanItemSelectionScreen}
              />
              <Stack.Screen
                name="AiScanItemAddScreen"
                component={AiScanItemAddScreen}
              />
              <Stack.Screen
                name="AiScanLoadingScreen"
                component={AiScanLoadingScreen}
              />
              <Stack.Screen
                name="AddNewItemSearchScreen"
                component={AddNewItemSearchScreen}
              />
              <Stack.Screen
                name="AddNewItemMealTypeScreen"
                component={AddNewItemMealTypeScreen}
              />
              <Stack.Screen
                name="AlgoliaMealTypeScreen"
                component={AlgoliaMealTypeScreen}
              />
              <Stack.Screen
                name="AddNewItemLoadingScreen"
                component={AddNewItemLoadingScreen}
              />
              <Stack.Screen name="Home" component={DrawerNavigator} />
              <Stack.Screen name="ReOnBoard" component={ReOnBoard} />
              <Stack.Screen name="AllWorkouts" component={AllWorkouts} />
              <Stack.Screen
                name="ChangeDetail"
                component={ChangeDetailScreen}
              />
              <Stack.Screen name="NewJourney" component={NewJourney} />
              <Stack.Screen name="ProgressScreen" component={ProgressScreen} />
              <Stack.Screen
                name="ContributionScreen"
                component={ContributionScreen}
              />
              <Stack.Screen
                name="UniverseSelector"
                component={UniverseSelector}
              />
              <Stack.Screen name="InviteCode" component={InviteCode} />
              <Stack.Screen name="WritePost" component={WritePost} />
              <Stack.Screen name="PostDetails" component={PostDetails} />
              <Stack.Screen name="User" component={User} />
              <Stack.Screen
                name="EditUserProfile"
                component={EditUserProfile}
              />
              <Stack.Screen name="Reply" component={Reply} />
              <Stack.Screen name="Workout" component={Workout} />
              <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
              <Stack.Screen name="BlogScreen" component={BlogScreen} />
              <Stack.Screen
                name="TaskPreviewScreen"
                component={TaskPreviewScreen}
              />
              <Stack.Screen name="CastScreen" component={CastScreen} />
              <Stack.Screen
                name="HallOfFameScreen"
                component={HallOfFameScreen}
              />
              <Stack.Screen
                name="UploadTask"
                options={{
                  gestureEnabled: false,
                }}
                component={UploadTaskV2}
              />
              <Stack.Screen
                name="StepsTaskScreen"
                component={StepsTaskScreen}
              />
              <Stack.Screen name="Motivate" component={MotivateEarn} />
              <Stack.Screen
                name="ChampionshipExplainer"
                component={ChampionshipExplainer}
              />
              <Stack.Screen
                name="TeamBrowseScreen"
                component={TeamBrowseScreen}
              />
              <Stack.Screen name="TeamScreen" component={TeamScreen} />
              <Stack.Screen
                name="PostInteraction"
                component={PostInteraction}
              />
              <Stack.Screen name="TeamFitPoint" component={TeamFitPoint} />
              <Stack.Screen
                name="TeamConsistency"
                component={TeamConsistency}
              />
              <Stack.Screen name="ProgramScreen" component={ProgramScreen} />
              <Stack.Screen name="Notification" component={Notification} />
              <Stack.Screen
                name="StreakDaysScreen"
                component={StreakDaysScreen}
              />
              <Stack.Screen
                name="StepHistoryScreen"
                component={StepsHistoryScreen}
              />
              <Stack.Screen
                name="StepsTargetScreen"
                component={StepsTargetScreen}
              />
              <Stack.Screen
                name="PrescriptionsView"
                component={PrescriptionsView}
              />
              <Stack.Screen
                name="MedicalReportScreen"
                component={MedicalReportScreen}
              />
              <Stack.Screen
                name="SelectWorkoutsScreen"
                component={SelectWorkoutsScreen}
              />
              <Stack.Screen name="ShopScreen" component={ShopScreen} />
              <Stack.Screen
                name="VoucherPurchaseScreen"
                component={VoucherPurchaseScreen}
              />
              <Stack.Screen
                name="CustomRecipeIngredientsScreen"
                component={CustomRecipeIngredientsScreen}
              />
              <Stack.Screen
                name="CustomRecipeCookingTime"
                component={CustomRecipeCookingTime}
              />
              <Stack.Screen
                name="CustomRecipeLoadingScreen"
                component={CustomRecipeLoadingScreen}
              />
              <Stack.Screen
                name="CustomRecipeDetailScreen"
                component={CustomRecipeeDetailScreen}
              />
              <Stack.Screen
                name="FitPointExpanderScreen"
                component={FitPointExpanderScreen}
              />
              <Stack.Screen
                name="CreateTeamEnterNameScreen"
                component={CreateTeamEnterNameScreen}
              />
              <Stack.Screen name="ProScreen" component={ProScreen} />
              <Stack.Screen name="UpgradeScreen" component={UpgradeScreen} />
              <Stack.Screen
                name="SlotConfirmation"
                component={SlotConfirmation}
              />
              <Stack.Screen
                name="GetAccessScreen"
                component={GetAccessScreen}
              />
              <Stack.Screen
                name="MapTaskDetailScreen"
                component={MapTaskDetailScreen}
              />
              <Stack.Screen
                name="MapTaskRunningScreen"
                component={MapTaskRunningScreen}
              />
              <Stack.Screen
                name="PurchasedVoucherScreen"
                component={PurchasedVoucherScreen}
              />
              <Stack.Screen
                name="PurchaserScreen"
                component={PurchaserScreen}
              />
              <Stack.Screen name="PurchaseForm" component={PurchaseForm} />
              <Stack.Screen
                name="PurchaseFormAddress"
                component={FormAddressDetailScreen}
              />
              <Stack.Screen
                name="PurchaseProdVariant"
                component={FormProductVariantScreen}
              />
              <Stack.Screen
                name="WorkoutHistoryExpanderScreen"
                component={WorkoutHistoryExpanderScreen}
              />
              <Stack.Screen
                name="NutritionScreen"
                component={NutritionScreen}
              />
              <Stack.Screen
                name="NutriCameraScreen"
                component={NutriCameraScreen}
              />
              <Stack.Screen
                name="NutritionWorkoutsScreen"
                component={NutritionWorkoutsScreen}
              />
              <Stack.Screen
                name="ChangeBodyTypeScreen"
                component={ChangeBodyTypeScreen}
              />
              <Stack.Screen
                name="DoctorConsultation"
                component={DoctorConsultationScreen}
              />
              <Stack.Screen name="StepInfoScreen" component={StepInfoScreen} />
              <Stack.Screen
                name="KnowledgeDetails"
                component={KnowledgeDetails}
              />
              <Stack.Screen name="KnowledgeScreen" component={Knowledge} />

              <Stack.Screen
                name="CoursePageScreen"
                component={CoursePageScreen}
              />
              <Stack.Screen
                name="CourseTaskPreviewScreen"
                component={CourseTaskPreviewScreen}
              />
              <Stack.Screen
                name="CourseNutritionPreviewScreen"
                component={CourseNutritionPreviewScreen}
              />
              <Stack.Screen
                name="RecipeeDetailScreen"
                component={RecipeeDetailScreen}
              />
              <Stack.Screen name="SwapScreen" component={SwapScreen} />
              <Stack.Screen
                name="WalkToEarnScreen"
                component={WalkToEarnScreen}
              />

              <Stack.Screen name="StepFaqScreen" component={StepFaqMain} />
              <Stack.Screen name="CongoScreen" component={CongoScreen} />
              <Stack.Screen name="WhatIsFpScreen" component={WhatIsFpScreen} />
              <Stack.Screen name="RankingScreen" component={RankingScreen} />
              <Stack.Screen name="MealScreen" component={MealScreen} />
              <Stack.Screen
                name="WorkoutSettingScreen"
                component={WorkoutSettingScreen}
              />
              <Stack.Screen
                name="WorkoutStartScreen"
                component={WorkoutStartScreen}
              />
              <Stack.Screen
                name="WorkoutOnboardingScreen"
                component={WorkoutOnboardingScreen}
              />
              <Stack.Screen
                name="NotificationTimeScreen"
                component={NotificationTimeScreen}
              />
              <Stack.Screen name="AddMoodScreen" component={AddMoodScreen} />
              <Stack.Screen
                name="AddEnergyScreen"
                component={AddEnergyScreen}
              />
              <Stack.Screen
                name="AddWeightScreen"
                component={AddWeightScreen}
              />
              <Stack.Screen
                name="WeightTrackerScreen"
                component={WeightTrackerScreen}
              />
              <Stack.Screen
                name="MoodTrackerScreen"
                component={MoodTrackerScreen}
              />
              <Stack.Screen
                name="EnergyTrackerScreen"
                component={EnergyTrackerScreen}
              />
              <Stack.Screen name="ReelView" component={ReelView} />
              <Stack.Screen
                name="Congratulations"
                component={Congratulations}
              />
              <Stack.Screen
                name="WorkoutDoneScreen"
                component={WorkoutDoneScreen}
              />
              <Stack.Screen name="DayCalander" component={DayCalander} />
              <Stack.Screen
                name="PeriodTrackerScreen"
                component={PeriodTrackerScreen}
              />
              <Stack.Screen
                name="PeriodCalenderLogScreen"
                component={PeriodCalenderLogScreen}
              />

              <Stack.Screen name="StartNewChat" component={StartNewChat} />
              <Stack.Screen name="ChatRoom" component={ChatRoom} />
              <Stack.Screen name="AwardWon" component={AwardWon} />
              <Stack.Screen name="AwardReport" component={AwardReport} />
              <Stack.Screen
                name="SymptomTrackerScreen"
                component={SymptomTrackerScreen}
              />
              <Stack.Screen name="SearchScreens" component={SearchScreens} />
              <Stack.Screen
                name="ProCommunityGatewayScreen"
                component={ProCommunityGatewayScreen}
              />
              <Stack.Screen
                name="WeeklyChekinsGatewayScreen"
                component={WeeklyChekinsGatewayScreen}
              />
              <Stack.Screen
                name="SheduleAmaGatewayScreen"
                component={SheduleAmaGatewayScreen}
              />

              <Stack.Screen
                name="BiWeeklyLiveGatewayScreen"
                component={BiWeeklyLiveGatewayScreen}
              />
              <Stack.Screen name="ReminderScreen" component={ReminderScreen} />
              <Stack.Screen name="WelcomePro" component={WelcomePro} />
              <Stack.Screen
                name="HealthQuestionsScreen"
                component={HealthQuestionsScreen}
              />
              <Stack.Screen
                name="PeriodStartScreen"
                component={PeriodStartScreen}
              />

              <Stack.Screen
                name="PeriodGoalScreen"
                component={PeriodGoalScreen}
              />
              <Stack.Screen
                component={PeriodOnboarding}
                name="PeriodOnboarding"
              />
              <Stack.Screen
                name="AddCurrentCycleLength"
                component={AddCurrentCycleLength}
              />
              <Stack.Screen
                name="AddCurrentPeriodLength"
                component={AddCurrentPeriodLength}
              />
              <Stack.Screen
                name="PeriodOnboardSettingScreen"
                component={PeriodOnboardSettingScreen}
              />
              <Stack.Screen name="InsightDetail" component={InsightDetail} />
              <Stack.Screen name="SakhiExplainer" component={SakhiExplainer} />
              <Stack.Screen name="Testimonial" component={Testimonial} />
              <Stack.Screen
                name="BatterySaverScreen"
                component={BatterySaverScreen}
              />
              <Stack.Screen name="TodayFpScreen" component={TodayFpScreen} />
              <Stack.Screen name="BootCamp" component={BootCamp} />
              <Stack.Screen name="BootCampDetail" component={BootCampDetail} />
              <Stack.Screen name="ViewWorkout" component={ViewWorkout} />
              <Stack.Screen
                name="MedicalProfileScreen"
                component={MedicalProfileScreen}
              />
              <Stack.Screen
                name="PregnancyHistoryScreen"
                component={PregnancyHistoryScreen}
              />
              <Stack.Screen
                name="PregnantDateLogScreen"
                component={PregnantDateLogScreen}
              />
              <Stack.Screen
                name="SurgicalHistoryScreen"
                component={SurgicalHistoryScreen}
              />
              <Stack.Screen
                name="SurgeryBriefScreen"
                component={SurgeryBriefScreen}
              />
              <Stack.Screen
                name="SexualActivityStatusScreen"
                component={SexualActivityStatusScreen}
              />
              <Stack.Screen
                name="ChiefComplaintLogScreen"
                component={ChiefComplaintLogScreen}
              />
              <Stack.Screen
                name="BookAppointmentSlotScreen"
                component={BookAppointmentSlotScreen}
              />
              <Stack.Screen
                name="AppointmentBookedScreen"
                component={AppointmentBookedScreen}
              />
              <Stack.Screen
                name="AppointmentsScreen"
                component={AppointmentsScreen}
              />
              <Stack.Screen
                name="DailyWaterIntakeScreen"
                component={DailyWaterIntakeScreen}
              />
              <Stack.Screen
                name="OutsideFoodIntake"
                component={OutsideFoodIntake}
              />
              <Stack.Screen name="DailyAddiction" component={DailyAddictions} />
              <Stack.Screen name="DailyExercise" component={DailyExercise} />
              <Stack.Screen name="DailyIssues" component={DailyIssues} />
              <Stack.Screen name="DailyWorkHours" component={DailyWorkHours} />
              <Stack.Screen name="TargetWeight" component={TargetWeight} />
              <Stack.Screen name="FamilyHistory" component={FamilyHistory} />
              <Stack.Screen
                name="TakingSupplements"
                component={TakingSupplements}
              />
              <Stack.Screen name="UploadReports" component={UploadReports} />
              <Stack.Screen name="DietPreference" component={DietPreference} />
              <Stack.Screen
                name="CuisinePreference"
                component={CuisinePreference}
              />
              <Stack.Screen name="Allergies" component={Allergies} />
              <Stack.Screen
                name="SelectFoodItems"
                component={SelectFoodItems}
              />
              <Stack.Screen
                name="SelectFoodTimings"
                component={SelectFoodTimings}
              />
              <Stack.Screen
                name="DontSeeWhatLike"
                component={DontSeeWhatLike}
              />
              <Stack.Screen
                name="DailyFocusStart"
                component={DailyFocusStart}
              />
              <Stack.Screen
                name="DailyLifeStyleStart"
                component={DailyLifeStyleStart}
              />
              <Stack.Screen
                name="DietHistoryStart"
                component={DietHistoryStart}
              />
              <Stack.Screen
                name="NutritionSettingScreen"
                component={NutritionSettingScreen}
              />
              <Stack.Screen
                name="DietFormInitiatorScreen"
                component={DietFormInitiatorScreen}
              />
              <Stack.Screen name="MyGoalRoadmap" component={MyGoalRoadmap} />
              <Stack.Screen name="CastPreview" component={CastPreview} />
              <Stack.Screen
                name="FreeHealthConsulation"
                component={FreeHealthConsulation}
              />
              <Stack.Screen
                name="AddNewItemScreen"
                component={AddNewItemScreen}
              />
              <Stack.Screen
                name="CircularProgressScreen"
                component={CircularProgressScreen}
              />
              <Stack.Screen
                name="TopContributionScreen"
                component={TopContributionScreen}
              />
              <Stack.Screen
                name="StreakAwardScreen"
                component={StreakAwardScreen}
              />
              <Stack.Screen name="BookZohoSlot" component={BookZohoSlot} />
              <Stack.Screen
                name="SkipSlotBookScreen"
                component={SkipSlotBookScreen}
              />
              <Stack.Screen name="ClaimScreen" component={ClaimScreen} />
              <Stack.Screen
                name="ChallengeScreen"
                component={ChallengeScreen}
              />
              <Stack.Screen
                name="DailyQuestScreen"
                component={DailyQuestScreen}
              />
              <Stack.Screen
                name="UnlockedLeagueScreen"
                component={UnlockedLeagueScreen}
              />
              <Stack.Screen name="EarnedFpScreen" component={EarnedFpScreen} />
              <Stack.Screen
                name="ChallengeDetailScreen"
                component={ChallengeDetailScreen}
              />
              <Stack.Screen
                name="LevelDetailScreen"
                component={LevelDetailScreen}
              />
              <Stack.Screen
                name="TreasureRewardScreen"
                component={TreasureRewardScreen}
              />
              <Stack.Screen
                name="StartStreakScreen"
                component={StartStreakScreen}
              />
              <Stack.Screen
                name="StreakGoalScreen"
                component={StreakGoalScreen}
              />
              <Stack.Screen name="StreakV2Screen" component={StreakV2Screen} />
              <Stack.Screen
                name="StreakFreezeScreen"
                component={StreakFreezeScreen}
              />
              <Stack.Screen
                name="StreakTodayCompleteScreen"
                component={StreakTodayCompeleteScreen}
              />
              <Stack.Screen
                name="ChatVoiceScreen"
                component={ChatVoiceScreen}
              />
            </>
          )}
        </>
      </Stack.Navigator>
    </SubscriptionProvider>
  );
};

export default MainStackNavigator;
