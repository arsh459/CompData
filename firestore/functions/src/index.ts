import * as functions from "firebase-functions";
// import { makePlacesCall } from "./placesCall/placesCall";
import * as cors from "cors";

// import { RequestInterface } from "./placesCall/interface";
// import { RevRequest } from "./reverseGeocoding/interface";
import { getTripById_UNSAFE } from "./models/TripObj/Methods";
import { getDetail_UNSAFE } from "./models/ListingDetail/Methods";

import * as admin from "firebase-admin";
// import { MembershipRequest } from "./membership/interface";
// import { makeRevCall } from "./reverseGeocoding/reverseCall";
import { BookingRequestInterface } from "./sendgrid/bookingRequest/interface";
import { bookingRequestEmailMessage } from "./sendgrid/bookingRequest/main";
import { removeUserFromList } from "./mailchimp/index";
import {
  audienceId,
  // audienceStatus,
} from "./constants/mailchimp/audienceDetails";
// import { addEmail } from "./membership";
// import { TripInviteUrl } from "./addTripInviteUrl/interface";
// import { addTripInvite } from "./addTripInviteUrl/main";
import { isDuplicateInvocation } from "./eventIds/isDuplicateInvocation";
// import { ReconcileRequest } from "./userLedger/interface";
// import { reconcileReferrerStats } from "./userLedger/reconcileUtils";
import { UGCListing } from "./models/UGCListing/UGCListing";
import { updateDiscoveries } from "./models/LeaderBoard/ContentKPIs";
// import {
// reconcileUser,
// reconcileAllUsers,
// } from "./models/LeaderBoard/reconcile";
import { addBookingLedgerEntry } from "./models/BookingLedger/Method";
import { updateBookingEarnings } from "./models/LeaderBoard/bookingRelated";
// import { addInviteToAllUsers } from "./user/addInviteToAllUsers";
// import { reconcileAllUGCListings } from "./models/User/reconcile";
import { onDiscoveryUpdateFunc } from "./main/FirestoreTriggers/onDiscoveryUpdate";
import { addInviteURLToUserFunc } from "./main/Https/addUserInviteLink/addUserInviteLink";
import { onUserCreateFunc } from "./main/FirestoreTriggers/onUserCreate/onUserCreate";
import {
  createTripFunc,
  deleteInTripFunc,
  fetchTripRecommendationsFunc,
  insertInTripFunc,
} from "./createTrip";
import { onUserUpdateFunc } from "./main/FirestoreTriggers/onUserUpdate/onUserUpdate";
import { onBookingCreateFunc } from "./main/FirestoreTriggers/onBookingCreate/index";
import { onDiscoveryCreateFunc } from "./main/FirestoreTriggers/onDiscoveryCreate";
import { addListingLinkFunc } from "./main/Https/addListingLink.ts/addListingLink";
import { addListingThumbnailFunc } from "./main/Https/addListingThmbnail/addListingThumbnail";
import {
  onListingCoverImageCreateFunc,
  onStayCoverImageCreateFunc,
} from "./main/FirestoreTriggers/onListingCoverImage/onListingCoverImageCreate";
import {
  onListingCoverImageUpdateFunc,
  onStayCoverImageUpdateFunc,
} from "./main/FirestoreTriggers/onListingCoverImageUpdate";
import { onReferrerUpdateFunc } from "./main/FirestoreTriggers/onReferrerUpdate/onReferrerUpdate";
import { onCollectionCreateFunc } from "./main/FirestoreTriggers/onCollectionCreate/index";
import { createCollectionLinkFunc } from "./main/Https/createCollectionLink/createCollectionLink";
import { onCollectionListingCreateFunc } from "./main/FirestoreTriggers/onCollectionListingCreate";
import { onCollectionListingDeleteFunc } from "./main/FirestoreTriggers/onCollectionListingDelete";
import { onCollectionDeleteFunc } from "./main/FirestoreTriggers/onCollectionDelete/onCollectionDelete";
import { ugcToCollectionFunc } from "./main/Https/ugcToCollection";
import { duplicateCollectionFunc } from "./main/Https/duplicateCollection";
import { onVisitorCreateFunc } from "./main/FirestoreTriggers/onVisitorCreate";
import { onBookingUpdateFunc } from "./main/FirestoreTriggers/onBookingUpdate";
import { onInfluencerCreationRequestFunc } from "./main/FirestoreTriggers/onInfluencerCreationRequest/index";
import { onInfluencerCreationSuccessFunc } from "./main/FirestoreTriggers/onInfluencerCreationSuccess";
import { createScrapperInputFunc } from "./main/Https/createScrapperInput";
import { createHotelScrapperInputFunc } from "./main/Https/createHotelScrapperInput/index";
import { seedHotelScrappedDataFunc } from "./main/Https/seedHotelScrapperData";
import { createHotelScrapperObjsFunc } from "./main/Https/createHotelScrapperObj/index";
import {
  onListingAddAlgolia,
  onStayAddAlgolia,
} from "./main/FirestoreTriggers/algolia/onListingCreate";
import {
  onListingUpdateAlgoliaFunc,
  onStayUpdateAlgoliaFunc,
} from "./main/FirestoreTriggers/algolia/onListingUpdate";
import { moveListingToAlgoliaFunc } from "./main/Https/algolia/moveListingToAlgolia";
import { moveStaysToAlgoliaFunc } from "./main/Https/algolia/moveListingsToAlgolia/addStaysToAlgolia";
import { moveListingsToAlgoliaFunc } from "./main/Https/algolia/moveListingsToAlgolia/addListingsToAlgolia";
import { moveCircuitsToAlgoliaFunc } from "./main/Https/algolia/moveCircuitsToAlgolia/moveCircuitsToAlgolia";
import { onCircuitAddAlgoliaFunc } from "./main/FirestoreTriggers/algolia/onCircuitCreate/index";
import { onCircuitUpdateAlgoliaFunc } from "./main/FirestoreTriggers/algolia/onCircuitUpdate/index";
import { onCollectionUpdateFunc } from "./main/FirestoreTriggers/onCollectionUpdate";
import {
  onListingUpdateFunc,
  onStayUpdateFunc,
} from "./main/FirestoreTriggers/onListingUpdate";
import {
  onListingCreateFunc,
  onStayCreateFunc,
} from "./main/FirestoreTriggers/onListingCreate";
import { onGooglePlaceCreateFunc } from "./main/FirestoreTriggers/onGooglePlaceCreate";
import { reconcileUsersToLeaderboard } from "./main/Https/Reconcile/UsersToLeaderboard";
import { onNewUserFunc } from "./main/FirestoreTriggers/newUser";
import { generateSignatureFunc } from "./main/Https/generateSignature/index";
import {
  onMediaProcessCreateFunc,
  onMediaProcessUpdateFunc,
} from "./main/FirestoreTriggers/onCollectionCreate/onMediaProcess";
import { onCollectionAddAlgoliaFunc } from "./main/FirestoreTriggers/algolia/onCollectionCreate/index";
import { onCollectionUpdateAlgoliaFunc } from "./main/FirestoreTriggers/algolia/onCollectionUpdate/index";
import { moveCollectionToAlgoliaFunc } from "./main/Https/algolia/moveCollectionToAlgolia";
import { moveCollectionsToAlgoliaFunc } from "./main/Https/algolia/moveCollectionsToAlgolia";
import { onCollectionDeleteAlgoliaFunc } from "./main/FirestoreTriggers/algolia/onCollectionDelete";
import { cloudinaryNotificationFunc } from "./main/Https/cloudinaryNotification";
import { onCollectionLikeCreateFunc } from "./main/FirestoreTriggers/onCollectionLikeCreate";
import { onCollectionLikeDeleteFunc } from "./main/FirestoreTriggers/onCollectionLikeDelete";
import { onViewCreateFunc } from "./main/FirestoreTriggers/onViewCreate";
import { onListingViewCreateFunc } from "./main/FirestoreTriggers/onListingViewCreate/index";
import { onTripCreateFunc } from "./main/FirestoreTriggers/onTripCreate";
import { onTripUpdateFunc } from "./main/FirestoreTriggers/onTripUpdate";
import {
  onTripMediaProcessCreateFunc,
  onTripMediaProcessUpdateFunc,
} from "./main/FirestoreTriggers/onTripCreate/onTripMediaProcess";
import { onTripDeleteFunc } from "./main/FirestoreTriggers/onTripDelete";
import { onTripLikeCreateFunc } from "./main/FirestoreTriggers/onTripLikeCreate";
import { onTripLikeDeleteFunc } from "./main/FirestoreTriggers/onTripLikeDelete";
import { onTripGooglePlaceCreateFunc } from "./main/FirestoreTriggers/onTripGooglePlaceCreateFunc";
import { onTripViewCreateFunc } from "./main/FirestoreTriggers/onTripViewCreate";
import { variantSeederFunc } from "./main/Https/variantSeeder/variantSeeder";
import { createTripLinkFunc } from "./main/Https/createTripLink";
import { onTripAddAlgoliaFunc } from "./main/FirestoreTriggers/algolia/onTripCreate";
import { onTripUpdateAlgoliaFunc } from "./main/FirestoreTriggers/algolia/onTripUpdate";
import { onTripDeleteAlgoliaFunc } from "./main/FirestoreTriggers/algolia/onTripDelete";
import { cloudinaryTripNotificationFunc } from "./main/Https/cloudinaryTripNotification";
import { onLeadCreateFunc } from "./main/FirestoreTriggers/onLeadWrite";
// import { variantSeederFunc } from "./main/Https/variantSeeder/variantSeeder";
import { cronViewsLeadsEarningFunc } from "./main/PubSub/ViewUpdate/index";
import { onEarningUpdateFunc } from "./main/FirestoreTriggers/onEarningUpdate";
import { onBookingValueUpdateFunc } from "./main/FirestoreTriggers/onBookingValueUpdate";
import {
  onListingVariantWriteFunc,
  onStayVariantWriteFunc,
} from "./main/FirestoreTriggers/onListingVariantWrite";
import {
  onListingVariantOptionWriteFunc,
  onStayVariantOptionWriteFunc,
} from "./main/FirestoreTriggers/onVariantOptionWrite";
import {
  onListingVariantDeleteFunc,
  onStayVariantDeleteFunc,
} from "./main/FirestoreTriggers/onListingVariantDelete";
import {
  onListingVariantOptionDeleteFunc,
  onStayVariantOptionDeleteFunc,
} from "./main/FirestoreTriggers/onVariantOptionDelete";
import { reconcileEarningsForAllUsers } from "./main/Https/Reconcile/Leaderboard";
import { reconcileViewsFunc } from "./main/Https/Reconcile/Views";
import {
  onListingDeleteAlgoliaFunc,
  onStayDeleteAlgoliaFunc,
} from "./main/FirestoreTriggers/algolia/onListingDelete";
import { onErrorCreateFunc } from "./main/FirestoreTriggers/onErrorCreate";
import { seedSingleListingFunc } from "./main/Https/variantSeeder/seedSingleListing";
import { addURLKeyFunc } from "./main/Https/addURLKey";
import { reAddCollectionListingsFunc } from "./main/Https/readdCollectionListings/reAddCollectionListings";
import { reconcileAllCollectionsFunc } from "./main/Https/Reconcile/Collections/reconcileAllCollections";
import { moveTripsToAlgoliaFunc } from "./main/Https/algolia/moveTripsToAlgolia";
import { onMessageCreateFunc } from "./main/FirestoreTriggers/onMessageCreate";
import { recreateSiteMap } from "./main/Https/siteMap/updateSiteMap";
import { newMessageFunc } from "./main/Https/messagebird/newMessage/newMessage";
import { newConversationFunc } from "./main/Https/messagebird/newConversation/newConversation";
import { reportFunc } from "./main/Https/messagebird/report/report";
import { onGhostMessageReplyFunc } from "./main/FirestoreTriggers/onGhostMessageReply";
import { testFunc } from "./main/Https/testURL";
import { cronExpiryMessageFunc } from "./main/PubSub/messagebird/endOfChat/index";
import { onSbEventUpdateFunc } from "./main/FirestoreTriggers/onSbEventUpdate.ts";
import { onPaymentCreateFunc } from "./main/FirestoreTriggers/onPaymentCreate/onPaymentCreate";
import { onPaymentTestFunc } from "./main/Https/onPaymentTest/onPaymentTest";
import { signFreeUserUpFunc } from "./main/Https/signFreeUserUp/signFreeUserUp";
import { addHocUserMessage } from "./main/Https/adhocUserMessage/adHocUserMessage";
import { signUpEmailScheduler } from "./main/PubSub/userEmails/userEmailScheduler";
import { onNewClapperFunc } from "./main/FirestoreTriggers/onNewClapper";
import { whatsappMessageFunc } from "./main/Https/whatsappHSM";
import { addHocWelcomeMessageFunc } from "./main/Https/communityWelcome";
import { onSessionCreateFunc } from "./main/FirestoreTriggers/onSessionCreate";
import { reminderCronFunc } from "./main/PubSub/reminders/reminderCron";
import { onPostReplyFunc } from "./main/FirestoreTriggers/onPostReplyCreate";
import { onActivityCreateFunc_dep } from "./main/FirestoreTriggers/onActivityCreate";
import { onActivityUpdateFunc_dep } from "./main/FirestoreTriggers/onActivityUpdate";
import { reconcileEventsFunc } from "./main/PubSub/reconcile/reconcile";
import { onReplyDegree2Func } from "./main/FirestoreTriggers/onPostReplyCreate/onReplyDegree2";
import { morningCronFunc } from "./main/PubSub/morning";
import { eveningCronFunc } from "./main/PubSub/evening";
import { streakCronFunc } from "./main/PubSub/streakReward";
import { prizeCronFunc } from "./main/PubSub/prizeCeramony";
import { terraCentralFunc } from "./main/Https/terraCentral";
import { activityCronFunc } from "./main/PubSub/activityTracker/activityCron";
import { addUserToLeaderFunc } from "./main/Https/adhoc/addUserToLeaderboard";
import { pastActivityCronFunc } from "./main/PubSub/activityTracker/pastActivityCron";
import { reconcileLeaderboardFunc } from "./main/Https/adhoc/reconcileLeaderboard";
import { reconcileCoachLeaderboardFunc } from "./main/Https/adhoc/reconcileCoaches";
import { reconcileTerraUserFunc } from "./main/Https/reconcileTerraUser";
import { reconcileTerraDayUserFunc } from "./main/Https/reconcileTerraDayUser/index";
import { assignmentFunc } from "./main/Https/assignment";
import { reconcileUserKPIsFunc } from "./main/PubSub/reconcileUserKPIs";
import { assignmentPostFunc } from "./main/Https/assignmentPost";
import { assignmentGetFunc } from "./main/Https/assignmentGet";
import { onWorkoutActivityCreateFunc } from "./main/FirestoreTriggers/onWorkoutActivityCreate";
import { onWorkoutActivityUpdateFunc } from "./main/FirestoreTriggers/onWorkoutActivityUpdate";
import { onLiveWorkoutUpdateFunc } from "./main/FirestoreTriggers/onLiveWorkoutUpdate";
import { onLiveWorkoutCreateFunc } from "./main/FirestoreTriggers/onLiveWorkoutCreate";
import { handleEventEndFunc } from "./main/Https/handleEventEnd";
import { createUserRanksFunc } from "./main/Https/createUserRanks";
import { urgentReminderCronFunc } from "./main/PubSub/reminders/urgentCron";
import { refreshCoachLeaderboardFunc } from "./main/Https/refreshCoachLeaderboard";
import { ajuMessageFunc } from "./main/Https/adhoc/ajuMessage";
import { refreshUserLeaderboardFunc } from "./main/Https/reconcileUserLeaderboard";
import { refreshPrizesFunc } from "./main/Https/refreshPrizes";
import { refreshUserEventFunc } from "./main/Https/refreshUserEvents";
import { refreshLeaderKPIsFunc } from "./main/Https/refreshLeaderKPIs";
// import { refreshLeaderboardCronFunc } from "./main/PubSub/refreshLeaderboardCron/index";
import { onTaskWriteFunc } from "./main/FirestoreTriggers/onTaskWrite/index";
import { refreshUserLevelsFunc } from "./main/Https/refreshUserLevels";
import { levelReconcileFunc } from "./main/PubSub/levelReconcile";
import { onActivityWriteFunc_dep } from "./main/FirestoreTriggers/onActivityWrite";
import { refreshUserLeaderboardV2Func } from "./main/Https/reconcileUserLeaderboard/v2";
import { refreshCoachLeaderboardV2Func } from "./main/Https/refreshCoachLeaderboard/v2";
import { refreshPrizesV2Func } from "./main/Https/refreshPrizes/v2";
import { rewardPostFunc } from "./main/Https/rewardPostFunc";
import { getAllUserLevelsFunc } from "./main/Https/refreshUserLevels/getAllUserLevels";
import { getAllUserDumpFunc } from "./main/Https/refreshUserLevels/getUserDump";
import { getAllTeamDumpFunc } from "./main/Https/reconcileUserLeaderboard/getAllTeamDump";
import { removeFromTeamFunc } from "./main/Https/removeFromTeam";
import { postReconcileCronFunc } from "./main/PubSub/postReconcile/postReconcileFunc";
import { wodCronFunc } from "./main/PubSub/handleWOD";
import { onBaseTaskWriteFunc } from "./main/FirestoreTriggers/onBaseTaskWrite";
import { activityQueueRequestFunc } from "./main/Https/reconcileUserLeaderboard/v2Inc";
import { onActivityTaskQueueEnterFunc } from "./main/FirestoreTriggers/onActivityQueueEnter";
import { activityQueueFunc } from "./main/PubSub/ActivityQueue";
import { taskUserDetailsFunc } from "./main/Https/taskUserDetailsFunc";
import { getAllUserActivitiesFunc } from "./main/Https/reconcileUserLeaderboard/getAllUserActivities";
import { onTicketUpdateFunc } from "./main/FirestoreTriggers/onTicketUpdateFunc";
import { generateUserRecFunc } from "./main/Https/userRecommendation/generateUserRec";
import { alotSubscriptionFunc } from "./main/Https/alotSubscription";
import { onTaskKPIUpdateFunc } from "./main/FirestoreTriggers/onTaskKPIUpdate";
import { summariseKPIsFunc } from "./main/Https/summariseKPIs/summariseKPIs";
import { seedUserDataFunc } from "./main/Https/seedUserData/seedUserDataFunc";
import { onNewPaymentFunc } from "./main/FirestoreTriggers/onNewGamePayment";
import { kpiCronFunc } from "./main/PubSub/kpiCronFunc";
import { alotSubscriptionByUIDFunc } from "./main/Https/alotSubscription/alotByUID";
import { deleteUserFunc } from "./main/Https/deleteUser/deleteUserFunc";
import { switchUserTeamFunc } from "./main/Https/removeFromTeam/switchUserTeam";
import { moveUserToOtherTeamFunc } from "./main/Https/removeFromTeam/moveUserToOtherTeam";
import { reconcileUserPtsFunc } from "./main/Https/reconcileUserPts/reconcileUserPts";
import { alotAccessFunc } from "./main/Https/alotAccess/alotAccessFunc";
import { sbAssetFunc } from "./main/Https/sbAssetFunc/sbAssetFunc";
import { updateBadgeProgressFunc } from "./main/Https/updateBadgeProgress";
import { onBadgeProgressUpdateFunc } from "./main/FirestoreTriggers/onBadgeProgressUpdate";
import { updateBadgeLevelsFunc } from "./main/Https/updateBadgeLevels";
// import { addTaskDaysFunc } from "./main/Https/adhoc/addTaskDaysFunc";
// import { updateUserProgFunc } from "./main/Https/adhoc/updateUserProg";
import { hundredMSInitFunc } from "./main/Https/hundredMs/hundredMSInit";
import { antAssetFunc } from "./main/Https/antAssetFunc";
import { turnServerFunc } from "./main/Https/twilio";
import { locationFunc } from "./main/Https/location";
import { addStepsFunc } from "./main/Https/addSteps";
import { onStepUpdateFunc } from "./main/FirestoreTriggers/stepUpdate/onStepUpdate";
import { onActivityUpdateV2Func } from "./main/FirestoreTriggers/onActivityUpdateV2";
import { onPurchaseUpdateFunc } from "./main/FirestoreTriggers/onPurchaseUpdate";
import { userFPUpdateFunc } from "./main/Https/userFPUpdate/userFPUpdate";
import { allUserFPUpdateFunc } from "./main/Https/userFPUpdate/allUserFPUpdate";
import { addBadgeFunc } from "./main/Https/addBadge/addBadgeFunc";
import { applicationDefault } from "firebase-admin/app";
import { consoleUsersFunc } from "./main/Https/getUsersWithSubscription/getAllUsers";
import { createUserTeamFunc } from "./main/Https/createTeam";
import { sendSBNotificationFunc } from "./main/Https/sendSBNotification";
import { googleFitFunc } from "./main/Https/googleFit";
import { googleFitCronFunc } from "./main/PubSub/FitAPI/googleFitCron";
import { paidUserDumpFunc } from "./main/Https/refreshUserLevels/paidUserDump";
import { activityToAlgoliaFunc } from "./main/Https/activityToAlgolia";
import { onRunBugFunc_dep } from "./main/FirestoreTriggers/runBug/onRunBug";
import { addNutritionFunc } from "./main/Https/addNutritions";
import { dailyStepHandlerFunc } from "./main/Https/dailyStepHandlerFunc";
import { onNutritionActivityUpdateFunc } from "./main/FirestoreTriggers/onNutritionActivityUpdate";
import { onBadgeBugFunc } from "./main/FirestoreTriggers/runBug/badgeBug";
import { onSlotBookingWriteFunc } from "./main/FirestoreTriggers/onSlotBookingWrite/onSlotBookingWrite";
import { revenueCatFunc } from "./main/Https/revenueCat";
import { onSbPaymentCreateFunc } from "./main/FirestoreTriggers/onSbPayment";
import { mixpanelSyncFunc } from "./main/Https/mixpanel";
import { sendOnDemandNotificationFunc } from "./main/Https/sendOnDemandNotification";
import { onMixpanelCohortMemberUpdateFunc } from "./main/FirestoreTriggers/onMixpanelCohortMemberUpdate";
import { onSlotBookingCreateFunc } from "./main/FirestoreTriggers/onSlotBookingCreate";
import { newMessageV2Func } from "./main/Https/messagebird/newMessage/newMessageV2";
import { waStatusFunc } from "./main/Https/waStatus";
import { taskGeneratorFunc } from "./main/Https/taskGenerator";
import { dayTaskGeneratorFunc } from "./main/Https/taskGenerator/dayTaskGenerator";
import { recGeneratorFunc } from "./main/PubSub/recGenerator";
import { seedUserStartFunc } from "./main/Https/seedUserStarts/index";
import { onBadgeUpdateFunc } from "./main/FirestoreTriggers/onBadgeUpdate";
import { refreshAllUserRecsFunc } from "./main/Https/refreshAllUserRecs";
import { generateTitleForRoomFunc } from "./main/Https/chat";
import { onActivityMainFunc } from "./main/FirestoreTriggers/onActivityMain";
import { generateUserPromptsFunc } from "./main/Https/chat/generateUserPrompts";
import { generateRoomPromptsFunc } from "./main/Https/chat/generateRoomPrompts";
import { periodTrackerFunc } from "./main/Https/period";
import { recalculateRingsFunc } from "./main/Https/recalculateRings";
import { waMessageAdHocFunc } from "./main/Https/waMessage";
import { refreshPeriodFunc } from "./main/Https/period/refreshPeriod";
import { getNextCycleFunc } from "./main/Https/period/nextCycle/getNextCycle";
import { awardBadgeFunc } from "./main/Https/awardBadge";
import { reminderCheckFunc } from "./main/Https/notificationDebug/reminderCheck";
import { onPurchaseCreateFunc } from "./main/FirestoreTriggers/onPurchaseCreate";
import { sendNotificationCheckFunc } from "./main/Https/sendNotificationCheck";
import { onRoomCreateFunc } from "./main/FirestoreTriggers/onRoomCreate";
import { bootcampFunc } from "./main/Https/bootcamp";
import { messageStatusFunc } from "./main/Https/sendNotificationCheck/waMessageStatus";
import { bootcampAdhocFunc } from "./main/Https/bootcamp/bootcampAdhoc";
import { minxpanelFlagUpdateFunc } from "./main/Https/adhoc/mixpanelFlagUpdate";
import { seedWhatsappFlagsFunc } from "./main/Https/adhoc/seedWhatsappFlags";
import { fireConvPaidFunc } from "./main/Https/adhoc/fireConvPaid";
import { onBaseTaskWriteTestFunc } from "./main/FirestoreTriggers/onBaseTaskWrite/test";
import { notificationCronFunc } from "./main/PubSub/notifications";
import { getPeriodQuestionFunc } from "./main/Https/period/getPeriodQuestionFunc";
import { markPeriodFunc } from "./main/Https/period/markPeriod";
import { onCycleUpdateFunc } from "./main/FirestoreTriggers/onCycleUpdate";
import { onAppointmentUpdateFunc } from "./main/FirestoreTriggers/onAppointmentUpdate/onAppointmentUpdateFunc";
import { roadmapStatusUpdateFunc } from "./main/Https/roadmapStatusUpdate";
import { tasksToAlgoliaFunc } from "./main/Https/tasksToAlgolia";
import { blogToAlgoliaFunc } from "./main/Https/blogToAlgolia";
import { updateRoadmapFunc } from "./main/Https/updateRoadmap";
import { onWeightAddFunc } from "./main/FirestoreTriggers/onProgressAdd/onWeightAdd";
import { onMoodAddFunc } from "./main/FirestoreTriggers/onProgressAdd/onMoodAdd";
import { onEnergyAddFunc } from "./main/FirestoreTriggers/onProgressAdd/onEnergyAdd";
import { getNutritionTasksFunc } from "./main/Https/getNutritionTasks";
import { reconfigureRoadmapFunc } from "./main/Https/addBadge/reconfigureRadmapFunc";
import { updateSubtaskFunc } from "./main/Https/getNutritionTasks/updateSubTask";
import { exportFunc } from "./main/Https/export";
import { monthlyReconfigureMapFunc } from "./main/Https/addBadge/monthlyReconfigureMapFunc";
import { activitySearchFunc } from "./main/Https/activitySearch";
import { userActivitySearchFunc } from "./main/Https/activitySearch/userActivitySearch";
import { activityProgressFunc } from "./main/Https/export/activityProgress";
import { onFollowupWriteMainFunc } from "./main/FirestoreTriggers/onFollowupWrite";
import { onFollowupTestFunc } from "./main/FirestoreTriggers/onFollowupWrite/testFunc";
import { onAccessUpdateFunc } from "./main/FirestoreTriggers/onNewGamePayment/onAccessUpdateFunc";
import { updateUserFlagsFunc } from "./main/Https/getNutritionTasks/updateUserFlags";
import { updateRecipeFunc } from "./main/Https/getNutritionTasks/updateRecipeTask";
import { seedFlagFunc } from "./main/Https/getNutritionTasks/seedFlagFunc";
import { workoutCronFunc } from "./main/PubSub/WorkoutCron";
import { onCalendlyWriteFunc } from "./main/FirestoreTriggers/onAppointmentUpdate/onCalendlyWrite";
import { razorPaymentFunc } from "./main/Https/revenueCat/razorPayment";
import { zohoAvailabilityFunc } from "./main/Https/zoho/zohoAvailability";
import { refreshZohoTokenFunc } from "./main/Https/zoho/refreshToken";
import { refreshZohoCronFunc } from "./main/Https/zoho/refreshZohoCron";
import { updateZohoWorkspaceFunc } from "./main/Https/zoho/updateZohoWorkspace";
import { updateZohoServiceFunc } from "./main/Https/zoho/updateZohoService";
import { makeBookingFunc } from "./main/Https/zoho/makeBooking";
import { zohoCancelFunc } from "./main/Https/zoho/zohoCancel";
import { zohoRescheduleFunc } from "./main/Https/zoho/zohoReschedule";
import { refreshAchieverForUserFunc } from "./main/Https/addBadge/refreshAchiever/refreshAchiever";
import { streakFunc } from "./main/Https/addBadge/streak";
import { markCommunityFlagFunc } from "./main/Https/markCommunityFlag";
import { updateLeaderboardFunc } from "./main/Https/challenges/update/updateLeaderboard";
import { seedLeaderboardFunc } from "./main/Https/challenges/seed/seedLeaderboard";
import { refreshLeaderboardFunc } from "./main/Https/challenges/refresh/refreshLeaderboard";
import { clearLeaderboardFunc } from "./main/Https/challenges/clear/clearLeaderboard";
import { updateUserRankTestFunc } from "./main/Https/challenges/updateUserRankTest/updateUserRank";
import { rankUserFunc } from "./main/Https/challenges/rankUser/rankUser";
import { onLeaderboardUpdateTaskCreateFunc } from "./main/FirestoreTriggers/onLeaderboardTaskCreate";
import { clearTaskQueueFunc } from "./main/Https/challenges/clearTaskQueue/clearTaskQueue";
import { addAchieversToUserFunc } from "./main/Https/addBadge/awardCreator/addAchieversToUsers";
import { removeAchieversFromUserFunc } from "./main/Https/addBadge/achieverRemover/removeAchieversFromUser";
import { addFBEventFunc } from "./main/Https/fb/addFbEvent";
import { allUserLevelUpdateFunc } from "./main/Https/challenges/levelUpdate/levelUpdate";
import { onActivityTestFunc } from "./main/FirestoreTriggers/onActivityMain/test/onActivityTestFunc";
import { badgeUpdateFunc } from "./main/FirestoreTriggers/onBadgeUpdate/https";
import { userProgressReconcileFunc } from "./main/Https/progress/userProgressReconcile";
import { fpDumpFunc } from "./main/Https/challenges/fpDump";
import { beforesigninfunc } from "./main/FirestoreTriggers/newUser/beforesignin";
import { removeUserFunc } from "./main/Https/challenges/removeUser/removeUser";
import { getSubTaskFunc } from "./main/Https/tasks/getSubtasks";
import { paidUserFactsFunc } from "./main/Https/tasks/paidUsersFacts";
import { getWorkoutsFunc } from "./main/Https/tasks/workouts/getWorkouts";
import { taskImageFunc } from "./main/Https/imageAdder/task";
import { subTaskImageFunc } from "./main/Https/imageAdder/subtask";
import { reconcileStreakFunc } from "./main/Https/streak/reconcile";
import { onGptTaskCreationFunc } from "./main/FirestoreTriggers/onGptTaskCreation";
import { onGptSubTaskCreationFunc } from "./main/FirestoreTriggers/onGptSubTaskCreation";
import { seedSubtasksFunc } from "./main/Https/tasks/seedSubtasks";
import { reconcileNutritionTasksFunc } from "./main/Https/tasks/reconcileTasks";
import { reconcileDietPlansFunc } from "./main/Https/tasks/reconcileDietPlans";
import { getDietPlanFactsFunc } from "./main/Https/tasks/getDietPlanFacts";
import { updateRoundFunc } from "./main/Https/challenges/updateRound";
import { challengeActivityFunc } from "./main/Https/challenges/challengeActivity";
import { reconcileNutritionTasksOnSubFunc } from "./main/Https/tasks/reconcileTasksAtSubTaskUpdate";
import { dailyStreakCronTestFunc } from "./main/PubSub/dailyStreak/test";
import { sakhiFunc } from "./main/Https/sakhi/chat";
import { subTaskAIGenerationFunc } from "./main/Https/subTaskGeneration/gptRequest";
import { timezoneDbUpdateFunc } from "./main/Https/timezoneDbUpdate";
import { onDailyGoalUpdateFunc } from "./main/FirestoreTriggers/onDailyGoalUpdate";
import { dailyStreakCronFunc } from "./main/PubSub/dailyStreak";
import { onStreakWriteFunc } from "./main/FirestoreTriggers/onStreakWrite";
import { streakMixpanelFunc } from "./main/FirestoreTriggers/onStreakWrite/test";
import { getSakhiQuestionsFunc } from "./main/Https/sakhi/fetch";
import { lastPaidUpdateFunc } from "./main/Https/lastPaidUpdate";
import { getAllAppointmentsFunc } from "./main/Https/getAllAppointments";
import { onRoomUpdateFunc } from "./main/RealtimeDBTriggers/onRoomUpdate";
import { dietPlanCreationFunc } from "./main/Https/dietPlanCreation";

// import { refreshLeaderboardCronFunc } from "./main/PubSub/refreshLeaderboardCron";
// import { onPaymentTestFunc } from "./main/Https/onPaymentTest/onPaymentTest";
// import { onCollectionInListingsGenerateFunc } from "./main/FirestoreTriggers/onCollectionInListingsGenerate";

const corsHandler = cors({ origin: true });

admin.initializeApp({
  credential: applicationDefault(), // admin.credential.applicationDefault(),
});

const client = new admin.firestore.v1.FirestoreAdminClient();
const bucket = "gs://holidaying-backup";

// trip planning - dep
export const insertInTrip = insertInTripFunc;
export const deleteInTrip = deleteInTripFunc;
export const createTrip = createTripFunc;
export const fetchTripRecommendations = fetchTripRecommendationsFunc;

// calls

export const placesCall = functions
  .region("asia-east2")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // const result = await tPromise.decode(RequestInterface, request.body);
        // // console.log('result', result);

        // // make places call
        // const finalResult = await makePlacesCall(result);

        // if (finalResult.status) {
        //   // response with success
        //   return response.status(200).send(finalResult);
        // }

        // // server error
        // return response.status(500).send({ error: finalResult.errors });
        return response.status(400).send({ error: "Invalid request" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

export const reverseGeocode = functions
  .region("asia-east2")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // const result = await tPromise.decode(RevRequest, request.body);
        // // console.log('result', result);

        // // make places call
        // const finalResult = await makeRevCall(result);

        // if (finalResult.status) {
        //   // response with success
        //   return response.status(200).send(finalResult);
        // }

        // // server error
        // return response.status(500).send({ error: finalResult.errors });
        return response.status(400).send({ error: "Invalid request" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

export const bookingEmail = functions
  .region("asia-south1")
  .firestore.document("bookingRequests/{bookingRequestId}")
  .onCreate(async (change, context) => {
    try {
      // parse booking request
      // const bookingRequest = await tPromise.decode(
      //BookingRequest,
      //change.data()
      // );

      const bookingRequest = change.data() as BookingRequestInterface;

      // get tripObj
      const tripObj = await getTripById_UNSAFE(bookingRequest.tripId);

      const listingObj = await getDetail_UNSAFE(
        bookingRequest.listingType,
        bookingRequest.listingId,
      );

      if (tripObj && listingObj) {
        // create message
        await bookingRequestEmailMessage(tripObj, listingObj, bookingRequest);
        if (bookingRequest.referrerId) {
          await Promise.all([
            addBookingLedgerEntry(
              bookingRequest,
              listingObj.listingName,
              bookingRequest.referrerId,
              "BOOKING",
              0.08,
            ),
            updateBookingEarnings(
              bookingRequest.referrerId,
              bookingRequest.amount,
            ),
          ]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

// booking related

export const removeMailChimpUser = functions.auth
  .user()
  .onDelete(async (user) => {
    try {
      await removeUserFromList(audienceId, user.email);
    } catch (error) {
      console.error(error);
    }
  });

export const onMembershipRequest = functions
  .region("asia-east2")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // console.log('request.body', request.body);
        // const result = await tPromise.decode(MembershipRequest, request.body);
        // // add email
        // await addEmail(result);

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: `Invalid request` });
      }
    });
  });

export const newMemberRequest = functions.firestore
  .document("membershipRequests/{userId}")
  .onCreate(async (change, context) => {
    try {
      // parse booking request
      // const membershipRequest = await tPromise.decode(
      //   MembershipRequest,
      //   change.data(),
      // );
      // // create message
      // await addMemberRequest(membershipRequest, audienceId, audienceStatus);
    } catch (error) {
      console.error(error);
    }
  });

export const addTripInviteLink = functions
  .region("asia-east2")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // parse booking request
        // const TripInviteUrlRequest = await tPromise.decode(
        //   TripInviteUrl,
        //   request.body,
        // );
        // // console.log('TripInviteUrlRequest', TripInviteUrlRequest);

        // const status = await addTripInvite(
        //   TripInviteUrlRequest.tripId,
        //   TripInviteUrlRequest.circuitId,
        //   TripInviteUrlRequest.access_code,
        //   TripInviteUrlRequest.uid,
        // );
        // return response.status(200).send({ status: status });
        return response.status(400).send({ error: "Invalid request" });
      } catch (error) {
        console.error(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

export const backupDatabase = functions.pubsub
  .schedule("0 0 1 * *")
  .onRun(() => {
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;

    if (projectId) {
      const databaseName = client.databasePath(projectId, "(default)");

      return client
        .exportDocuments({
          name: databaseName,
          outputUriPrefix: bucket,
          // Leave collectionIds empty to export all collections
          // or set to a list of collection IDs to export,
          // collectionIds: ['users', 'posts']
          collectionIds: [],
        })
        .then((responses: any) => {
          const response = responses[0];
          console.log(`Operation Name: ${response["name"]}`);
        })
        .catch((err: any) => {
          console.error(err);
          throw new Error("Export operation failed");
        });
    }

    return;
  });
// add userLedger entry

export const ugcListingUserDataReconcile = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 300, memory: "1GB" })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // await tPromise.decode(ReconcileRequest, request.body);
        // await reconcileAllUGCListings();

        // server error
        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

export const userLedgerReconciliation = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // const result = await tPromise.decode(ReconcileRequest, request.body);
        // await reconcileReferrerStats(result.uid);

        // server error
        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

export const reconcileLeaderUser = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // const result = await tPromise.decode(ReconcileRequest, request.body);
        // await reconcileUser(result.uid);

        // server error
        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

export const reconcileAllLeaderUsers = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 300, memory: "1GB" })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // await tPromise.decode(ReconcileRequest, request.body);
        // await reconcileAllUsers();
        // server error
        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

export const updateAllUserInvite = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 300, memory: "1GB" })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // await tPromise.decode(ReconcileRequest, request.body);
        // await addInviteToAllUsers();
        // server error
        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

export const onDiscoveryDelete = functions
  .region("asia-south1")
  .firestore.document("ugcListings/{ugcListingId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onDiscoveryDelete")) {
        return;
      }

      const discNow = change.after.data() as UGCListing;
      const discPrev = change.before.data() as UGCListing;

      // deleted and first invocation
      if (!discNow.saved && discNow.saved !== discPrev.saved) {
        await updateDiscoveries(discNow.uid, -1);
      } else if (discNow.saved === true && discNow.saved !== discPrev.saved) {
        await updateDiscoveries(discNow.uid, 1);
      }
    } catch (error) {
      console.log("error", error);
    }
  });

// misc
export const addListingLink = addListingLinkFunc;
export const onDiscoveryUpdate = onDiscoveryUpdateFunc;
export const onDiscoveryCreate = onDiscoveryCreateFunc;
export const onReferrerUpdate = onReferrerUpdateFunc;
export const addInviteURLToUser = addInviteURLToUserFunc;
export const onBookingCreate = onBookingCreateFunc;
export const onBookingUpdate = onBookingUpdateFunc;
export const onBookingValueUpdate = onBookingValueUpdateFunc;

export const onListingViewCreate = onListingViewCreateFunc;
export const onErrorMessageCreate = onErrorCreateFunc;

// thumbnail related
export const addListingThumbnail = addListingThumbnailFunc;
export const onListingDetailCoverCreate = onListingCoverImageCreateFunc;
export const onStayCoverCreate = onStayCoverImageCreateFunc;
export const onListingDetailCoverUpdate = onListingCoverImageUpdateFunc;
export const onStayCoverUpdate = onStayCoverImageUpdateFunc;

// collections
export const onCollectionCreate = onCollectionCreateFunc;
export const createCollectionLink = createCollectionLinkFunc;
export const onCollectionListingCreate = onCollectionListingCreateFunc;
export const onCollectionListingDelete = onCollectionListingDeleteFunc;
export const onCollectionDelete = onCollectionDeleteFunc;
export const onCollectionUpdate = onCollectionUpdateFunc;

export const ugcToCollection = ugcToCollectionFunc;
export const duplicateCollection = duplicateCollectionFunc;
export const onCollectionLikeCreate = onCollectionLikeCreateFunc;
export const onCollectionLikeDelete = onCollectionLikeDeleteFunc;
// export const onCollectionInListingsGenerate = onCollectionInListingsGenerateFunc;

// googlePlaces
export const onGooglePlaceCreate = onGooglePlaceCreateFunc;
export const onTripGooglePlaceCreate = onTripGooglePlaceCreateFunc;

// listing update
export const onListingUpdate = onListingUpdateFunc;
export const onStayUpdate = onStayUpdateFunc;
export const onListingCreate = onListingCreateFunc;
export const onStayCreate = onStayCreateFunc;

// visitors
export const onVisitorCreate = onVisitorCreateFunc;
export const onViewCreate = onViewCreateFunc;

// new user creation
export const onInfluencerCreationRequest = onInfluencerCreationRequestFunc;
export const onInfluencerCreationSuccess = onInfluencerCreationSuccessFunc;
export const onUserCreate = onUserCreateFunc;
export const onUserUpdate = onUserUpdateFunc;

// scrapping
export const createScrapperInput = createScrapperInputFunc;
export const seedHotelScrappedInformation = seedHotelScrappedDataFunc;
export const createHotelScrapperObjs = createHotelScrapperObjsFunc;
export const createHotelScrapperInput = createHotelScrapperInputFunc;

// algolia
export const onListingCreateAlgolia = onListingAddAlgolia;
export const onStayCreateAlgolia = onStayAddAlgolia;
export const onListingUpdateAlgolia = onListingUpdateAlgoliaFunc;
export const onStayUpdateAlgolia = onStayUpdateAlgoliaFunc;
export const onCircuitAddAlgolia = onCircuitAddAlgoliaFunc;
export const onCircuitUpdateAlgolia = onCircuitUpdateAlgoliaFunc;
export const onCollectionAddAlgolia = onCollectionAddAlgoliaFunc;
export const onCollectionUpdateAlgolia = onCollectionUpdateAlgoliaFunc;
export const onCollectionDeleteAlgolia = onCollectionDeleteAlgoliaFunc;
export const onTripAddAlgolia = onTripAddAlgoliaFunc;
export const onTripUpdateAlgolia = onTripUpdateAlgoliaFunc;
export const onTripDeleteAlgolia = onTripDeleteAlgoliaFunc;
export const onListingDeleteAlgolia = onListingDeleteAlgoliaFunc;
export const onStayDeleteAlgolia = onStayDeleteAlgoliaFunc;

// https algolia
export const moveListingToAlgolia = moveListingToAlgoliaFunc;
export const moveStaysToAlgolia = moveStaysToAlgoliaFunc;
export const moveListingsToAlgolia = moveListingsToAlgoliaFunc;
export const moveCircuitsToAlgolia = moveCircuitsToAlgoliaFunc;
export const moveCollectionToAlgolia = moveCollectionToAlgoliaFunc;
export const moveCollectionsToAlgolia = moveCollectionsToAlgoliaFunc;
export const moveTripsToAlgolia = moveTripsToAlgoliaFunc;
export const seedSingleListing = seedSingleListingFunc;

// ad-hoc
export const addHocAddStoreLink = reconcileUsersToLeaderboard;

// cloudinary
export const generateCloudinarySignature = generateSignatureFunc;
export const onCollectionMediaCreate = onMediaProcessCreateFunc;
export const onCollectionMediaUpdate = onMediaProcessUpdateFunc;
export const onTripMediaCreate = onTripMediaProcessCreateFunc;
export const onTripMediaUpdate = onTripMediaProcessUpdateFunc;
export const cloudinaryNotification = cloudinaryNotificationFunc;
export const cloudinaryTripNotification = cloudinaryTripNotificationFunc;

// listingViewCreate

// trips
export const onTripCreate = onTripCreateFunc;
export const onTripUpdate = onTripUpdateFunc;
export const onTripDelete = onTripDeleteFunc;
export const onTripLikeCreate = onTripLikeCreateFunc;
export const onTripLikeDelete = onTripLikeDeleteFunc;
export const onTripViewCreate = onTripViewCreateFunc;
export const createTripLink = createTripLinkFunc;

// leads
export const onLeadWrite = onLeadCreateFunc;
export const cronViewsLeadsEarning = cronViewsLeadsEarningFunc;
export const onEarningUpdate = onEarningUpdateFunc;

//message
export const onMessageCreate = onMessageCreateFunc;

// legacy maintain
export const onListingVariantWrite = onListingVariantWriteFunc;
export const onStayVariantWrite = onStayVariantWriteFunc;
export const onListingVariantOptionWrite = onListingVariantOptionWriteFunc;
export const onStayVariantOptionWrite = onStayVariantOptionWriteFunc;
export const onStayVariantDelete = onStayVariantDeleteFunc;
export const onListingVariantDelete = onListingVariantDeleteFunc;
export const onStayVariantOptionDelete = onStayVariantOptionDeleteFunc;
export const onListingVariantOptionDelete = onListingVariantOptionDeleteFunc;

//adhoc
export const reconcileEarnings = reconcileEarningsForAllUsers;
export const variantSeeder = variantSeederFunc;
export const reconcileViews = reconcileViewsFunc;
export const addURLKey = addURLKeyFunc;
export const reAddCollectionListings = reAddCollectionListingsFunc;
export const reconcileAllCollections = reconcileAllCollectionsFunc;
export const updateSiteMap = recreateSiteMap;

// messagebird
export const newMessage = newMessageFunc;
export const newMessageV2 = newMessageV2Func;
export const newConversation = newConversationFunc;
export const reportURL = reportFunc;
export const onGhostMessageReply = onGhostMessageReplyFunc;
export const cronExpiryMessage = cronExpiryMessageFunc;
export const rewardPost = rewardPostFunc;

export const testURL = testFunc;

// socialboat
export const onSbEventUpdate = onSbEventUpdateFunc;
export const onPaymentCreate = onPaymentCreateFunc;
export const onPaymentTest = onPaymentTestFunc;
export const onFreeUserSignUp = signFreeUserUpFunc;
export const addHocWhatsapp = addHocUserMessage;
export const emailScheduler = signUpEmailScheduler;
export const onNewClapper = onNewClapperFunc;
export const whatsappMessage = whatsappMessageFunc;

export const adHocWelcomeMessage = addHocWelcomeMessageFunc;
export const onSessionCreate = onSessionCreateFunc;
export const reminderCron = reminderCronFunc;
export const urgentReminderCron = urgentReminderCronFunc;
export const onPostReply = onPostReplyFunc;
export const onActivityCreate = onActivityCreateFunc_dep;
export const onActivityUpdate = onActivityUpdateFunc_dep;
export const onActivityWrite = onActivityWriteFunc_dep;
export const reconcileEvents = reconcileEventsFunc;
export const onReplyDefree2 = onReplyDegree2Func;

export const morningCron = morningCronFunc;
export const eveningCron = eveningCronFunc;
export const streakCron = streakCronFunc;
export const prizeCron = prizeCronFunc;

// terra
export const terraCentral = terraCentralFunc;
export const activityCron = activityCronFunc;
export const pastActivityCron = pastActivityCronFunc;
export const reconcileTerraUser = reconcileTerraUserFunc;
export const reconcileTerraDayUser = reconcileTerraDayUserFunc;

export const reconcileUserKPIs = reconcileUserKPIsFunc;

// streaming
export const onWorkoutActivityCreate = onWorkoutActivityCreateFunc;
export const onWorkoutActivityUpdate = onWorkoutActivityUpdateFunc;
export const onLiveWorkoutUpdate = onLiveWorkoutUpdateFunc;
export const onLiveWorkoutCreate = onLiveWorkoutCreateFunc;
export const handleEventEnd = handleEventEndFunc;
export const onTaskWrite = onTaskWriteFunc;

// fpoints
export const levelReconcile = levelReconcileFunc;

// adhoc
export const addUserToLeaderboard = addUserToLeaderFunc;
export const reconcileLeaderboard = reconcileLeaderboardFunc;
export const reconcileCoaches = reconcileCoachLeaderboardFunc;
export const createUserRanks = createUserRanksFunc;
export const interviewAssignment = assignmentFunc;
export const assignmentPost = assignmentPostFunc;
export const assignmentGet = assignmentGetFunc;
export const refreshCoachLeaderboard = refreshCoachLeaderboardFunc;
export const refreshUserLeaderboard = refreshUserLeaderboardFunc;
export const refreshPrizes = refreshPrizesFunc;
export const refreshCoachLeaderboardV2 = refreshCoachLeaderboardV2Func;
export const refreshUserLeaderboardV2 = refreshUserLeaderboardV2Func;
export const refreshUserLeaderboardInc = activityQueueRequestFunc;

export const refreshPrizesV2 = refreshPrizesV2Func;
export const refreshUserEvents = refreshUserEventFunc;
export const refreshLeaderKPIs = refreshLeaderKPIsFunc;
// export const refreshLeaderBoardCron = refreshLeaderboardCronFunc;
export const refreshUserLevels = refreshUserLevelsFunc;
export const getUserLevels = getAllUserLevelsFunc;
export const getAllUserDump = getAllUserDumpFunc;
export const getPaidUserDump = paidUserDumpFunc;
export const getAllTeamDump = getAllTeamDumpFunc;
export const removeUserFromTeam = removeFromTeamFunc;

export const handleWOD = wodCronFunc;

export const ajuMessage = ajuMessageFunc;
export const postReconcileCron = postReconcileCronFunc;

export const onActivityTaskQueueEnter = onActivityTaskQueueEnterFunc;
export const activityToAlgolia = activityToAlgoliaFunc;

export const activityQueueCron = activityQueueFunc;
export const taskUserDetails = taskUserDetailsFunc;
export const getAllUserActivities = getAllUserActivitiesFunc;
export const onTicketUpdate = onTicketUpdateFunc;
export const generateUserRec = generateUserRecFunc;
export const alotSubscription = alotSubscriptionFunc;
export const alotSubscriptionByUID = alotSubscriptionByUIDFunc;
export const onTaskKPIUpdate = onTaskKPIUpdateFunc;
export const summariseKPIs = summariseKPIsFunc;

export const seedUserData = seedUserDataFunc;
export const kpiCron = kpiCronFunc;
export const onNewPayment = onNewPaymentFunc;
export const deleteUser = deleteUserFunc;
export const switchUserTeam = switchUserTeamFunc;
export const moveUserToOtherTeam = moveUserToOtherTeamFunc;
export const reconcileUserPts = reconcileUserPtsFunc;
export const alotAccess = alotAccessFunc;
export const sbAsset = sbAssetFunc;
export const antAsset = antAssetFunc;
export const updateBadgeLevels = updateBadgeLevelsFunc;
// export const addTaskDays = addTaskDaysFunc;
// export const updateUserProg = updateUserProgFunc;
export const hundredMsInit = hundredMSInitFunc;
export const turn = turnServerFunc;
export const location = locationFunc;
export const addSteps = addStepsFunc;
export const onStepUpdate = onStepUpdateFunc;
export const onActivityUpdateV2 = onActivityUpdateV2Func;
export const onPurchaseUpdate = onPurchaseUpdateFunc;
export const onPurchaseCreate = onPurchaseCreateFunc;
export const userFPUpdate = userFPUpdateFunc;
export const allUserFpUpdate = allUserFPUpdateFunc;

// onboarding
export const addBadge = addBadgeFunc;
export const reconfigureRoadmap = reconfigureRoadmapFunc;
export const updateRoadmap = updateRoadmapFunc;
export const monthlyReconfigureMap = monthlyReconfigureMapFunc;
export const onWeightAdd = onWeightAddFunc;
export const onMoodAdd = onMoodAddFunc;
export const onEnergyAdd = onEnergyAddFunc;
export const refreshAchieverForUser = refreshAchieverForUserFunc;
export const streak = streakFunc;
export const addAchieversToUser = addAchieversToUserFunc;
export const removeAchieversFromUser = removeAchieversFromUserFunc;

export const consoleUsers = consoleUsersFunc;
export const createUserTeam = createUserTeamFunc;
export const googleFit = googleFitFunc;
export const googleFitCron = googleFitCronFunc;
export const onRunBug = onRunBugFunc_dep;
export const addNutrition = addNutritionFunc;
export const onNutritionActivityUpdate = onNutritionActivityUpdateFunc;
export const onUserBadgeBug = onBadgeBugFunc;
export const dailyStepHandler = dailyStepHandlerFunc;
export const onSlotBookingWrite = onSlotBookingWriteFunc;
export const onSlotBookingCreate = onSlotBookingCreateFunc;

// each conversation must have last updated field

// cron to send message just before chat expiry

// reads: 25000 * 12 = 300,000
// reads: 2000 * 9 = 3,20,000

// Func for send Notification
export const sendSBNotification = sendSBNotificationFunc;
export const revenueCat = revenueCatFunc;
export const onSbPaymentCreate = onSbPaymentCreateFunc;
export const mixpanelSync = mixpanelSyncFunc;

export const sendOnDemandNotification = sendOnDemandNotificationFunc;
export const onMixpanelCohortMemberUpdate = onMixpanelCohortMemberUpdateFunc;
export const waStatus = waStatusFunc;

// rec generators
export const onBaseTaskWrite = onBaseTaskWriteFunc;
export const onBaseTaskWriteTest = onBaseTaskWriteTestFunc;
export const taskGenerator = taskGeneratorFunc;
export const dayTaskGenerator = dayTaskGeneratorFunc;
export const recGenerator = recGeneratorFunc;
export const refreshAllUserRecs = refreshAllUserRecsFunc;
export const updateBadgeProgress = updateBadgeProgressFunc;
export const onBadgeProgressUpdate = onBadgeProgressUpdateFunc; // to update rec doneFP
export const seedUserStarts = seedUserStartFunc;
export const onBadgeUpdate = onBadgeUpdateFunc;

// ai chat
// messages -> contextMessages: [{}, {}, {}, {}] (can be upto 4096 characters)
export const generateTitleForRoom = generateTitleForRoomFunc;
export const generateUserPrompts = generateUserPromptsFunc;
export const generateRoomPrompts = generateRoomPromptsFunc;

// activity function
export const onActivityMain = onActivityMainFunc;
export const recalculateRings = recalculateRingsFunc;

export const periodTracker = periodTrackerFunc;
export const markPeriod = markPeriodFunc;
export const refreshPeriod = refreshPeriodFunc;
export const getPeriodQuestion = getPeriodQuestionFunc;
export const getNextCycle = getNextCycleFunc;
export const onCycleUpdate = onCycleUpdateFunc;

export const waMessageAdHoc = waMessageAdHocFunc;
export const awardBadge = awardBadgeFunc;
export const reminderCheck = reminderCheckFunc;

// marketing notifications
export const notificationCheck = sendNotificationCheckFunc;
export const messageStatus = messageStatusFunc;
export const onRoomCreate = onRoomCreateFunc;
export const bootcamp = bootcampFunc;
export const mixpanelFlagUpdate = minxpanelFlagUpdateFunc;
export const seedWhatsappFlags = seedWhatsappFlagsFunc;
export const bootcampAdHoc = bootcampAdhocFunc;
export const fireConvPaid = fireConvPaidFunc;
export const notificationCron = notificationCronFunc;
export const roadmapStatusUpdate = roadmapStatusUpdateFunc;

export const onAppointmentUpdate = onAppointmentUpdateFunc;
export const onCalendlyWrite = onCalendlyWriteFunc;
export const tasksToAlgolia = tasksToAlgoliaFunc;
export const blogToAlgolia = blogToAlgoliaFunc;

export const getNutritionTasks = getNutritionTasksFunc;
export const updateSubtasks = updateSubtaskFunc;
export const updateRecipe = updateRecipeFunc;
export const updateUserFlags = updateUserFlagsFunc;
export const seedFlag = seedFlagFunc;
export const exportData = exportFunc;
export const activityProgress = activityProgressFunc;
export const onFollowupWriteMain = onFollowupWriteMainFunc;
export const onFollowupTest = onFollowupTestFunc;

export const activitySearch = activitySearchFunc;
export const userActivitySearch = userActivitySearchFunc;
export const onAccessUpdate = onAccessUpdateFunc;

export const workoutCron = workoutCronFunc;
export const razorPayment = razorPaymentFunc;

//// zoho
export const zohoAvailability = zohoAvailabilityFunc;
export const refreshZohoToken = refreshZohoTokenFunc;
export const refreshZohoCron = refreshZohoCronFunc;
export const updateZohoWorkspace = updateZohoWorkspaceFunc;
export const updateZohoService = updateZohoServiceFunc;
export const makeBooking = makeBookingFunc;
export const zohoCancel = zohoCancelFunc;
export const zohoReschedule = zohoRescheduleFunc;

// seed
export const markCommunityFlag = markCommunityFlagFunc;

// challenges
export const updateRound = updateRoundFunc;
export const updateLeaderboard = updateLeaderboardFunc;
export const seedLeaderboard = seedLeaderboardFunc;
export const refreshLeaderboard = refreshLeaderboardFunc;
export const clearLeaderboard = clearLeaderboardFunc;
export const updateUserRankTest = updateUserRankTestFunc;
export const rankUser = rankUserFunc;
export const removeUser = removeUserFunc;
export const onLeaderboardUpdateTaskCreate = onLeaderboardUpdateTaskCreateFunc;
export const clearTaskQueue = clearTaskQueueFunc;
export const allUserLevelUpdate = allUserLevelUpdateFunc;
export const fpDump = fpDumpFunc;
export const challengeActivity = challengeActivityFunc;

// fb
export const addFBEvent = addFBEventFunc;

// test funcs
export const onActivityTest = onActivityTestFunc;
export const badgeUpdate = badgeUpdateFunc;
export const userProgressReconcile = userProgressReconcileFunc;
export const getSubtasks = getSubTaskFunc;
export const paidUserFacts = paidUserFactsFunc;
export const getWorkouts = getWorkoutsFunc;
export const seedSubtask = seedSubtasksFunc;
export const reconcileNutritionTasks = reconcileNutritionTasksFunc;
export const getSakhiQuestions = getSakhiQuestionsFunc;

export const reconcileDietPlans = reconcileDietPlansFunc;
export const getDietPlanFacts = getDietPlanFactsFunc;

// auth
export const onNewUserAuth = onNewUserFunc;
export const beforesignincode = beforesigninfunc;

// image generator
export const taskImage = taskImageFunc;
export const subTaskImage = subTaskImageFunc;
export const onGPTTaskCreation = onGptTaskCreationFunc;
export const onGPTSubTaskCreation = onGptSubTaskCreationFunc;

// diet co-pilot
export const reconcileNutritionTasksOnSubtask =
  reconcileNutritionTasksOnSubFunc;
export const subTaskAIGeneration = subTaskAIGenerationFunc;

// streak
export const reconcileStreak = reconcileStreakFunc;
export const onDailyGoalUpdate = onDailyGoalUpdateFunc;
export const dailyStreakCronTest = dailyStreakCronTestFunc;
export const dailyStreakCron = dailyStreakCronFunc; // cron every 15 minutes. TEST PENDING
export const onStreakWrite = onStreakWriteFunc;
export const streakMixpanel = streakMixpanelFunc;
// sakhi
export const sakhi = sakhiFunc;
export const onRoomUpdate = onRoomUpdateFunc;

// timezones
export const timezoneDbUpdate = timezoneDbUpdateFunc;
export const lastPaidUpdate = lastPaidUpdateFunc;

// appointments
export const getAllAppointments = getAllAppointmentsFunc;

// diet plan creation
export const dietPlanCreation = dietPlanCreationFunc;

// SubTaskAIGeneration

// export const onTaskImageGenerate=
/**
 *
 * rateLimitAPI
 * isAppCheckRequest
 *
 * phone, countryCode
 *
 * isNumberBlocked
 *
 * checkCountryCode
 * isBlockedCountry
 *
 * checkIfNumberRequest
 *
 *
 *
 *
 * savePhoneNumber
 *
 *
 *
 *
 */
