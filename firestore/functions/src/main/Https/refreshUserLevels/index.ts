import * as functions from "firebase-functions";
import * as cors from "cors";
// import { addPaidConv } from "../../FirestoreTriggers/onUserUpdate/updateFPConv";
// import // ALPHABET_GAME,
// // CHALLENGE_ONE,
// // FAT_BURNER_CHALLENGE,
// // FAT_BURNER_GAME,
// // RUNNER_GAME,
// // TEAM_ALPHABET_GAME,
// // WOMENS_GAME,
// STUDENT_OLYMPICS}
// // "../../../constants/challenge";
import * as admin from "firebase-admin";
import { UserInterface } from "../../../models/User/User";
// import { GREESHA_UID } from "../taskGenerator/constants";
import { sendHSMV2 } from "../../../models/Conversations/sendHSMV2";
// import { getUserById } from "../../../models/User/Methods";
// import { UserAppSubscription } from "../../../models/AppSubscription/Subscription";
// import { sleep } from "../../FirestoreTriggers/onLiveWorkoutUpdate/handleLiveUpdate";
// import { UserAppSubscription } from "../../../models/AppSubscription/Subscription";
// import { GREESHA_UID } from "../taskGenerator/constants";
import { sleep } from "../../FirestoreTriggers/onLiveWorkoutUpdate/handleLiveUpdate";
import { UserAppSubscription } from "../../../models/AppSubscription/Subscription";
import { getUserById } from "../../../models/User/Methods";
import { blockedUsers } from "../waMessage/sendUtils";
// import { getReminderByDateAndUID } from "../../../models/Reminders/createUtils";
// import { getTasksByStateAndTime } from "../../../models/Reminders/getUtils";
// import { generateRemindersAndGetRecs } from "../taskGenerator/generaterRemindersForRecs";
// import { generateRemindersAndGetRecs } from "../taskGenerator/generaterRemindersForRecs";
// import { getAllPendingTasks } from "../../../models/Reminders/getUtils";
// import { handleReminders } from "../../../models/Reminders/handleReminders";
// import { handleRemindersV2 } from "../../../models/Reminders/handleRemindersV2";
// import { getTasksByStateAndTime } from "../../../models/Reminders/getUtils";
// import { GREESHA_UID } from "../taskGenerator/constants";
// import { getTasksByStateAndTime } from "../../../models/Reminders/getUtils";
// import { generateWorkoutReminders } from "../taskGenerator/generateReminders";
// import { getUserById } from "../../../models/User/Methods";
// import { getAllPendingTasks } from "../../../models/Reminders/getUtils";
// import { handleRemindersV2 } from "../../../models/Reminders/handleRemindersV2";
// import { userRecProgress } from "../../FirestoreTriggers/onBadgeProgressUpdate/userRecProgress";
// import {
//   CHALLENGE_ONE,
//   FAT_BURNER_CHALLENGE,
//   FAT_BURNER_GAME,
//   RUNNER_GAME,
//   TEAM_ALPHABET_GAME,
//   WOMENS_GAME,
//   STUDENT_OLYMPICS,
//   ALPHABET_GAME,
// } from "../../../constants/challenge";
// // import axios from "axios";
// import { UserInterface } from "../../../models/User/User";
// // import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
// import { getAllUserRanks } from "../../../models/Activity/getUtils";
// import { getUserById } from "../../../models/User/Methods";
// // import { getFirestore } from "firebase-admin/firestore";
// // import { updateUserKPIs } from "../../FirestoreTriggers/onActivityUpdateV2/updateKPIs";
// // import { sendHSM } from "../../../models/Conversations/sendHSM";
// // import { whatsappChannelId } from "../messagebird/constants/identifiers";
// // import { getAllUserRanks } from "../../../models/Activity/getUtils";
// // import { getUserById } from "../../../models/User/Methods";
// // import { sendHSM } from "../../../models/Conversations/sendHSM";
// // import { whatsappChannelId } from "../messagebird/constants/identifiers";
// // import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
// // import { getSbEventById } from "../../../models/sbEvent/getUtils";
// // import * as admin from "firebase-admin";
// // import { Badge } from "../../../models/Prizes/Badges";
// // import { getAllPendingTasks } from "../../../models/Reminders/getUtils";
// // import { handleReminders } from "../../../models/Reminders/handleReminders";
// // import { getAllPendingTasks } from "../../../models/Reminders/getUtils";
// // import { handleWOD } from "./handleWOD";
// // import { handleTaskSummary } from "../../FirestoreTriggers/onBaseTaskWrite/handleTaskSummary";
// // import { handleWOD } from "./handleWOD";
// // import * as admin from "firebase-admin";
// // import { sendHSM } from "../../../models/Conversations/sendHSM";
// // import { whatsappChannelId } from "../messagebird/constants/identifiers";
// // import { createNewTeam } from "./createTeam";
// // import { getSbEventById } from "../../../models/sbEvent/getUtils";
// import { sendHSM } from "../../../models/Conversations/sendHSM";
// import { whatsappChannelId } from "../messagebird/constants/identifiers";
// import { sendHSMV2 } from "../../../models/Conversations/sendHSMV2";
// import { SubTask, Task } from "../../../models/Task/Task";
// import {
// //   // getAllTasksForBadge,
// //   getAllTasksForBadgeDay,
// // } from "../../FirestoreTriggers/onBaseTaskWrite/BadgeUpdater";
// // import { getBadge } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";
// // import { createBranchShortLink } from "../../../models/Reminders/whatsapp/workoutFinish/createBranchLink";
// import { ARJA_UID } from "../taskGenerator/constants";
// import { UserAppSubscription } from "../../../models/AppSubscription/Subscription";
// // import { generatorTrigger } from "../../PubSub/recGenerator/main";
// // import { getPendingTasks } from "../../../models/Reminders/getUtils";
// import { handleTaskState } from "../../../models/Reminders/taskState";
// import { Task } from "../../../models/Task/Task";
// import { SlotBooking, SlotObj } from "../../../models/slots/Slot";
// import { notifyAgent_slotBooking } from "../../../models/Reminders/pagerDuty/notifyAgents_pager";
// import { getFormattedDateForUnix } from "../../PubSub/activityTracker/utils";
// import { handleSlotReminder } from "../../../models/Reminders/whatsapp/slotReminder/handleSlotReminder";
// import { paymentWAHandler } from "../../../models/Reminders/whatsapp/payment/paymentWAHandler";
// import { handleWorkoutFinishV2 } from "../../../models/Reminders/whatsapp/workoutFinish/handleWorkoutFinishV2";
// import { handleTryAgain } from "../../../models/Reminders/whatsapp/workoutFinish/handleTicket";
// import { mixpanel } from "../../../mixpanel/mixpanel";
// import { getPendingTasks } from "../../../models/Reminders/getUtils";
// import { handleSlotReminder } from "../../../models/Reminders/whatsapp/slotReminder/handleSlotReminder";
// import { reRankUsers_month_FitPointsV2 } from "../../../models/Activity/handleRankingV2";
// import { createNewTeam } from "./createTeam";
// import { userDemoMessage } from "../../../models/Reminders/whatsapp/userDemo";
// import { createNewTeam } from "./createTeam";
// import { handleReminders } from "../../../models/Reminders/handleReminders";
// import { getUserActivity } from "../../PubSub/activityTracker/getUserActivity";
// import {
//   getAllActivityById,
//   getUserActivityAfter,
// } from "../../../models/Activity/getUtils";
// import { handleAlgoliaUpdate } from "../../FirestoreTriggers/onActivityQueueEnter/handleAlgoliaUpdate";
// import { Activity } from "../../../models/Activity/Activity";
// import { notifyAgents_pager } from "../../../models/Reminders/pagerDuty/notifyAgents_pager";
// import { handleWOD } from "./handleWOD";
// import { getPendingTasks } from "../../../models/Reminders/getUtils";
// import { refreshActivitiesWithPosts } from "./refreshActivitiesWithReviews";
// import { handleLevelUpdate } from "./handleLevelUpdate";
// import {
//   getAllPendingTasks,
//   // getPendingTasks,
//   updateTaskState,
// } from "../../../models/Reminders/getUtils";
// import { handleReminders } from "../../../models/Reminders/handleReminders";
// import { sendHSM } from "../../../models/Conversations/sendHSM";
// import { whatsappChannelId } from "../messagebird/constants/identifiers";
// import { firestore } from "firebase-admin";
// import { Reminder } from "../../../models/Reminders/Reminder";
// import { handleWODV2 } from "./handleWODV2";
// import { handleTaskSummary } from "../../FirestoreTriggers/onBaseTaskWrite/handleTaskSummary";
// import { getPendingTasks } from "../../../models/Reminders/getUtils";
// import { handleReminders } from "../../../models/Reminders/handleReminders";
// import { getPendingTasks } from "../../../models/Reminders/getUtils";
// import { getPendingTasks } from "../../../models/Reminders/getUtils";
// import { handleReminders } from "../../../models/Reminders/handleReminders";
// import { getPendingTasks } from "../../../models/Reminders/getUtils";
// import { handleLevelUpdate } from "./handleLevelUpdate";
// import { seedParentPostId } from "./seedParentPostId";
// import { morningNotification } from "../../../models/Reminders/whatsapp/morning";
// import { FAT_BURNER_GAME } from "../../../constants/challenge";
// import { userTeamReconcile } from "./userTeamSet";
// import { userTeamReconcile } from "./userTeamSet";
// import { userTeamNormalise } from "./userTeamNormalise";
// import { handleWOD } from "./handleWOD";
// import * as admin from "firebase-admin";
// import { notifyAgents_pager } from "../../../models/Reminders/pagerDuty/notifyAgents_pager";
// import { morningNotification } from "../../../models/Reminders/whatsapp/morning";
// import { notifyAgents } from "../../../models/Reminders/emails/notifyAgents";
// import { sendHSM } from "../../../models/Conversations/sendHSM";
// import { whatsappChannelId } from "../messagebird/constants/identifiers";
// import { getCurrentRound } from "../../FirestoreTriggers/onActivityWrite/utils";
// import { getSbEventById } from "../../../models/sbEvent/getUtils";
// import { getEventMetricsForEventObj } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
// import { getDaysElapsed } from "../../../models/Prizes/getStreakPrizeV3";
// import { seedParentPostId } from "./seedParentPostId";
// import { handleEventToTimeFunc } from "./handleEnrolledEventToTimeFunc";
// import { handleWOD } from "./handleWOD";
// import { handleRewardMessage } from "./handleRewardMessage";
// import { handleManualRank } from "./handleManualRank";
// import { getSbEventById } from "../../../models/sbEvent/getUtils";
// import {
//   CHALLENGE_ONE,
//   FAT_BURNER_CHALLENGE,
//   FAT_BURNER_GAME,
//   WFH_CHALLENGE,
// } from "../../../constants/challenge";
// import { getAllCoachRanks } from "../../../models/Activity/getUtils";

// const blockedUsers: string[] = [
//   "+919336013821",
//   "+919172325082",
//   "+919982026669",
//   "+917499621574",
//   "+916287618828",
// ];

const phonesToNotSend = [
  "+16466457744",
  "+14253457339",
  "+919971769969",
  "+917588955924",
  "+919623923248",
  "+919619597909",
  "+918218865504",
  "+919029567339",
  "+918756289317",
  "+919105148944",
  "+919080179382",
  "+919899001562",
  "+917209840024",
  "+919619540809",
  "+919000949510",
  "+9779742479050",
  "+917838289736",
  "+919918302236",
  "+919619679460",
  "+917057454128",
  "+917044302124",
  "+918722055485",
  "+919494828345",
  "+917807447341",
  "+918004881878",
  "+918373917453",
  "+919871199849",
  "+919769908043",
  "+919654326762",
  "+919888949484",
  "+16478626891",
  "+918307614353",
  "+919036468078",
  "+917978984716",
  "+917827860094",
  "+919815135051",
  "+917073464738",
  "+918860840720",
  "+919417742799",
  "+919811101479",
  "+919560458683",
  "+916304213287",
  "+919100018676",
  "+919380390081",
  "+919819434818",
  "+17325994523",
  "+919643633483",
  "+919901887348",
  "+27815079385",
  "+919560900454",
  "+447306408729",
  "+919871659184",
  "+14847259783",
  "+918447517125",
  "+917994390999",
  "+918305414494",
  "+917709022479",
  "+61452627258",
  "+919442160527",
  "+919840324029",
  "+919165604185",
  "+918104128277",
  "+917499835924",
  "+919521126381",
  "+919911109616",
  "+14243919091",
  "+919873752050",
  "+919840810398",
  "+918310790159",
  "+12179043615",
  "+916281261838",
  "+15168358458",
  "+919916343390",
  "+919571362479",
  "+13098636845",
  "+919971121327",
  "+918390626160",
  "+919911052555",
  "+918077362501",
  "+917406045411",
  "+919453226627",
  "+94779730084",
  "+16479852703",
  "+919324106912",
  "+918297245886",
  "+919857549501",
  "+13856302813",
  "+919833244568",
  "+919916556371",
  "+918882783716",
  "+918080284901",
  "+917248858677",
  "+919591760587",
  "+917382010209",
  "+919019235438",
  "+918527612288",
  "+919716410117",
  "+919944905567",
  "+19199862341",
  "+916304793778",
  "+918866373873",
  "+918557900026",
  "+919820772323",
  "+919561134566",
  "+919205335987",
  "+919811028995",
  "+919497592889",
  "+919723175699",
  "+919967664347",
  "+918408881662",
  "+918884603075",
  "+919814253456",
  "+919307367253",
  "+918919780062",
  "+919887265455",
  "+919086033503",
  "+91 99531 19202",
  "+919980981271",
  "+919380187479",
  "+919723178827",
  "+917006323560",
  "+919953119202",
  "+918817498292",
  "+917972020893",
  "+12267889692",
  "+13478615737",
  "+18323311882",
  "+447850301159",
  "+916359891078",
  "+917378010101",
  "+917406400933",
  "+917508926350",
  "+918082799638",
  "+918098887740",
  "+918169720905",
  "+918390713609",
  "+918807823742",
  "+918954836511",
  "+918961171409",
  "+918983655602",
  "+919096443693",
  "+919406680428",
  "+919611893602",
  "+919671836630",
  "+919706764486",
  "+919711173787",
  "+919773096378",
  "+919773724770",
  "+919822002956",
  "+919826322442",
  "+919845360565",
  "+919885691430",
  "+919908515628",
  "+919920608288",
  "+919952654668",
  "+919958711620",
  "+918279560224",
  "+15875767611",
  "+18455324306",
  "+420775047077",
  "+916361125136",
  "+916379565702",
  "+916399849741",
  "+917030901037",
  "+917048206100",
  "+917204873103",
  "+917208617681",
  "+917219848881",
  "+917264019149",
  "+917300575624",
  "+917339616040",
  "+917387483562",
  "+917413042244",
  "+917617047660",
  "+917637806204",
  "+917678639019",
  "+917680883836",
  "+917738244657",
  "+917828393398",
  "+917829970010",
  "+917837810143",
  "+917838567553",
  "+917840999441",
  "+917899552777",
  "+917970104812",
  "+917980463764",
  "+918080848200",
  "+918146444276",
  "+918296966512",
  "+918420648505",
  "+918439792099",
  "+918478049451",
  "+918500391578",
  "+918556989792",
  "+918754531593",
  "+918770298263",
  "+918770395630",
  "+918810417585",
  "+918860486057",
  "+918872597315",
  "+918883582242",
  "+919137612787",
  "+919158883473",
  "+919167420719",
  "+919350002167",
  "+919461860230",
  "+919558160477",
  "+919574242650",
  "+919643122580",
  "+919650586394",
  "+919650814111",
  "+919654638879",
  "+919664552197",
  "+919667446835",
  "+919667879698",
  "+919667985223",
  "+919670133377",
  "+919673272276",
  "+919686869004",
  "+919686937633",
  "+919700678989",
  "+919702358656",
  "+919704067105",
  "+919712975043",
  "+919717930813",
  "+919819462453",
  "+919820268873",
  "+919833787202",
  "+919836712007",
  "+919841970996",
  "+919849554446",
  "+919850947463",
  "+919873666330",
  "+919878136257",
  "+919919996807",
  "+919920656573",
  "+919930951254",
  "+919940952142",
  "+919969178586",
  "+919972861334",
  "+919976185022",
  "+919986123987",
  "+919988627610",
  "+918826945497",
  "+61451917278",
  "+353892577989",
  "+919494954694",
  "+447423337963",
  "+919899115521",
  "+918668392774",
  "+919379473749",
  "+919500062452",
  "+919379473749",
  "+919041385885",
  "+918565064405",
  "+917895214607",
  "+918168102150",
  "+919910267467",
  "+917054393651",
  "+916290000598",
  "+923117816965",
  "+919336013821",
  "+919172325082",
  "+919982026669",
  "+917499621574",
];

// const paidUsers = [
//   "1a2e9F6DM7bDppGoJ5Q6XY0LlGX2",
//   "2k64QxJCHxPR8f9xebpqlY4e3oO2",
//   "GldkBqHs36VGT0XUucTJe96sVC72",
//   "ItPhBSMRWIaFEHoJVQuEEZL5orF2",
//   "Qk6OkiNZshMvhb7iitkGOuHoYSm2",
//   "SzFODr8SEmPki6zuhcC85iysIbE3",
//   "Xv6G57lJQmgBSwtkYSFudHC0Qv73",
//   "eoeuyHOlOfZ5aHYT8vPqBUWZShI3",
//   "gTrbDSEXKuSHjej9MzU6IoHLaYE2",
//   "ggI5I8kP7NMdOd3zy5z21ytmYyo2",
//   "m0HFfG24swVqaj0uInLyLiHxtzw1",
//   "wuCdgTAq5gZjuXCBGNuJ6zn560a2",
//   "1TqXA50mlwM6MqzYKdXMkVBKICZ2",
//   "zLmGgR6W34PX2hhZPugeBzsHCZB2",
//   "shZvOtSO7ueYYLQwX6CRC8KDEYp1",
//   "ZHRBDe7d3lSZSS8nJnGs55aBRiv2",
//   "gnRfP4ZURNc7VIKQsAQbxI5u0sq2",
//   "btmdgdvcA6NmF1a2nkslrHfUpsq2",
//   "QM3LsOiAHsSIbiqrJ0i4gtZt0Gr2",
//   "8UgsaiVO5CPXTiXYG5ik0FpmPVf2",
//   "7eEB9DFkCpUXEiqJyihvGhudie22",
//   "ui3LaPydjOOJ5gyWkm7qj7okpcF2",
//   "QBXcZ1Dnphggpn0VIaj3dNWd8G42",
//   "RtrtPQZX6aNm4OmGAlkBwiLmPtg2",
//   "3oIXsFT2MneNwyFejqZ2erz2wMF2",
//   "wO3zFYNzjxN6gA2uPHfk9xWHcGF3",
//   "bACBF8NSBaQuG6flXcT6n8nWMJH3",
//   "UzO4T3eaxaOWPh3AbJSggeqCUmf1",
//   "yUeuBFtqiAMLC0dWrE8zQjQ72PP2",
//   "kobGVdXHWYaxJhlqlLadeJhseJ52",
//   "oxi6zH5THFhXimAgk9M7ItqZlUH3",
//   "aac0s9otvQXdEkQyi4wzsPtC7a03",
//   "vY9ggl0TEWRp1rA8yrcPFbXogRg1",
//   "OTS2PPTUpab24vxMcxXmhlkzGrm1",
//   "58bBaKa43GZPItmULC7VmHSt5xD3",
//   "a7RupGKmnvNdzlwr7ROiRQfDXfg1",
//   "G8bd3eG9OdRl8nHWY37w2ZoJA292",
//   "9MXWaNmgTPWnRIrLGyWvSxrkrez2",
//   "Aq1JTYWQoRWNAmN4eQ0KE6X9Yvi1",
//   "ye3n2RQRljOUQj7Qjn1ZTNsWGR72",
//   "B0HSAUiMKvTwtO6m4KPYAUurq4p1",
//   "CyOH6dbkOfV3zlzZZp4ck0kXNt72",
//   "ezTadbYAbTgsnsLWK6lIyC8Pq023",
//   "SzFODr8SEmPki6zuhcC85iysIbE3",
//   "BtQlP9TA4iYRCjQJ40z7ZTkDTjA3",
//   "h9LsfR8TGmPsP53V5IrNyd1r6lr1",
//   "hpTZYo7EFJc6m9HR3aqICtvP4XD2",
//   "j39ZVnbzXcQyrE1KGKs8X66jEam2",
//   "1Xgo2Pr8zrOF7y7e565gB4SwQQl1",
// ];
// const uidsForAccess = [
//   "KmQsdJjZqkS1YhxbIDwVlRncera2",
//   "Y6JCFQ91LWRuLXZvme8YRCF2qVx1",
//   "40OqdGRJ0rQdUbSaZDyj9zm36uU2",
//   "d3kzGLcOqXZPoEeTNQt2jz6WM4M2",
//   "96Xj1xjNTLVZy6TQ8Ett48WCXNt2",
//   "XjDOEwqfXkddzJimVmxyg1lEak92",
//   "lHhuSVKMAZbj86xg8m6ubZqKdUj2",
//   "ggI5I8kP7NMdOd3zy5z21ytmYyo2",
//   "tdogs7KRITTbshLWrrkU0xrLLsg2",
//   "Ng3E1hNiBGdlk4vkq6DFDgOcqn43",
//   "zu04HQHCxeY0Sc5GRzesXF1pogt1",
//   "xdTypChEqdfJE04LIj14EV1bdn43",
//   "I5YwhCm0Fhex33ZClgAFMoDU6Ce2",
//   "wD2xsesdSlSMUNDEfD1cP0NOk6G2",
//   "ovIZPoM9GaSudvzfdw7yHwcdXJL2",
//   "blvJ95rzEUSMGoxQ6e4N5BAcCZ43",
//   "V3KTl5M5pbStvHAH194tPLZFaGl2",
//   "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
//   "MXwkSu3uI1SQxlFDG5ymipBp2Ax2",
//   "lOz7qaIMTxQP1PrZDggp9apnz1B2",
//   "XdrshWXNC8a6jSO7vtpGOx8Xhfu1",
//   "NFoIbbtOIVTwdOj8S6FOCx5Wfz92",
//   "4XjyKwIMsScX1gsfalyIF2hfL002",
//   "buTleaOeF5XH4hDs30EIVHDcbFa2",
//   "4ZTQ4XA1JjOGPbCBNPq5qduDwL02",
//   "HYNHKAcwb5TkTA5vavLB9yewJNu1",
//   "kqKoanqUkXe5xo2D8VSC2sIautm2",
//   "hRcjKxojOQZO3zq33RMaaNX7Udg2",
//   "pyk7NR7vWPaI361qFVkr2PAqK102",
//   "l0XDQp5ar8Tj6NNOElOMDuPXFxr1",
//   "BqrxhxvQGuNTQMDUwPuFUCVmzIa2",
//   "i15kG2ghk0fwBlM7KT6mf6SVtms2",
//   "wPKaomDuk4eoKHIIE7ArFPyynhU2",
//   "l4UZDo5r4oMmpXkIa5LgWXNe5R52",
//   "uul5DTTn9zVbLL15KFhQHH3GhH82",
//   "ItUy066Kc4TNLGPNDV71679gxxD2",
//   "0EZq81S1JYfrBKMb0Xo2uzO5vG22",
//   "YkakeAsUxnNBvEKJmhM14OwLrCg2",
//   "UdHZIAYG3ORI9Iug2RzvqXM9Pf63",
//   "WMMmZDKEMNQK2WvHLHRuWNal5Qj2",
//   "h5ZdZhdjeDYiLCDJGT1hB3gCEUI3",
//   "McowYwIrFpfvlulifYFdVvc8oN72",
//   "pAtrHDTayJPDJvnYS1h9V3yRW4y1",
//   "zZxCA4VeB9XiS5VdLR4lpcgOXno2",
// ];

const corsHandler = cors({ origin: true });
export const refreshUserLevelsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // await generatorTrigger();
      // throw new Error("Paused");
      try {
        // await handleSlotReminder(
        //   "5e20db98-660c-4e90-88ea-87c4dfa41ed0",
        //   "88786231-40a8-4e72-a802-3c2da8dde622",
        // );
        // await handleTryAgain(
        //   "lHhuSVKMAZbj86xg8m6ubZqKdUj2",
        //   "8e903d1f-b8f9-43b4-9578-9c8f1f58efa4",
        // );
        // await generateRemindersAndGetRecs("lHhuSVKMAZbj86xg8m6ubZqKdUj2");
        // const urgentReminders = await getTasksByStateAndTime(
        //   Date.now(),
        //   // Date.now() * 2,
        //   "URGENT",
        // );

        // console.log("Now", Date.now());

        // console.log("ur", urgentReminders);

        // const reminders = await getReminderByDateAndUID(
        //   "lHhuSVKMAZbj86xg8m6ubZqKdUj2",
        //   "2023-04-21",
        //   "workout_reminder_notification",
        // );

        // for (const reminder of reminders) {
        //   console.log(
        //     "reminder",
        //     // ie,
        //     reminder.date,
        //     reminder.authorId,
        //     reminder.scheduledAt,
        //     reminder.scheduledAt, // <= Date.now(),
        //     reminder.badgeId,
        //     reminder.badgeDay,
        //     reminder.state,
        //   );
        // }

        // // throw new Error("Hi");

        // let ie: number = 0;
        // const users: { [uid: string]: boolean } = {};
        // for (const reminder of urgentReminders) {
        //   if (reminder.templateId === "workout_reminder_notification") {
        //     console.log(
        //       "reminder",
        //       ie,
        //       reminder.date,
        //       reminder.authorId,
        //       reminder.scheduledAt,
        //       reminder.scheduledAt, // <= Date.now(),
        //       reminder.badgeId,
        //       reminder.badgeDay,
        //       reminder.state,
        //     );
        //     if (reminder.authorId) users[reminder.authorId] = true;

        //     ie++;
        //   }
        // }

        // let n: number = 0;
        // for (const uid of Object.keys(users)) {
        //   n++;
        //   console.log(n, uid);
        //   await generateRemindersAndGetRecs(uid);
        // }

        // throw new Error("Hi");

        // const users = await admin
        //   .firestore()
        //   .collection("users")
        //   .orderBy("lastCronRun", "desc")
        //   .get();
        // for (const userDoc of users.docs) {
        //   const userDocument = userDoc.data() as UserInterface;

        //   console.log(userDocument.name, userDocument.lastCronRun);
        //   await admin
        //     .firestore()
        //     .collection("users")
        //     .doc(userDocument.uid)
        //     .update({ lastCronRun: Date.now() - 30 * 60 * 1000 });
        // }

        // throw new Error("HIII");

        // const lk = await createBranchShortLink(
        //   "WhatsApp",
        //   "workoutFeedback",
        //   "transactionalMessage",
        //   {
        //     navTo: "WorkoutHistoryExpanderScreen",
        //     actId: act.id ? act.id : "",
        //   },
        //   uid,
        // );

        // const pendingTasks = await getAllPendingTasks("URGENT");

        // for (const task of pendingTasks) {
        //   if (!task.scheduledAt) {
        //     console.log("NO SCHEDULE", task.templateId);
        //   } else {
        //     console.log(
        //       "task",
        //       task.templateId,
        //       task.createdOn,
        //       task.scheduledAt ? new Date(task.scheduledAt) : "NO Schedule",
        //     );
        //   }
        //   // await handleRemindersV2([task], "SUCCESS", "FAILED");
        // }

        // throw new Error("hi");

        const paidUsersRemote = await admin
          .firestore()
          .collection("appSubscriptions")
          .doc("0cPvVrnphNJBnvvOM9Zf")
          .collection("userSubs")
          .where("paidPeriodEndsOn", ">=", Date.now())
          .orderBy("paidPeriodEndsOn", "asc")
          .get();

        const paidUsersToUse: UserInterface[] = [];
        const paidUserMap: { [uid: string]: boolean } = {};
        console.log("paidUserMap", paidUserMap);
        console.log("phonesToNotSend", phonesToNotSend);
        for (const paidUser of paidUsersRemote.docs) {
          const paidUserDoc = paidUser.data() as UserAppSubscription;

          const paidUserInt = await getUserById(paidUserDoc.uid);
          if (paidUserInt) {
            paidUsersToUse.push(paidUserInt);
          }

          paidUserMap[paidUserDoc.uid] = true;
        }

        // const motivatedUsers = await admin
        //   .firestore()
        //   .collection("users")
        //   .where("socialBoat", "==", true)
        //   // .where("gender", "==", "female")
        //   // .where("motivatedBy", "==", GREESHA_UID)
        //   .get();

        // for (const userDoc of motivatedUsers.docs) {
        //   userDocsToUse.push(userDoc.data() as UserInterface);

        //   // const appSub = userDoc.data() as UserAppSubscription;
        // const userDocsToUse: UserInterface[] = [];
        //   // const userSubObj = await getUserById(appSub.uid);
        //   // if (userSubObj) {
        //   //   userDocsToUse.push(userSubObj);
        //   // } else {
        //   //   console.log("not present", appSub);
        //   // }
        // }

        const sortedUsers = paidUsersToUse.sort((a, b) => {
          var textA = a.name ? a.name.toUpperCase() : "z";
          var textB = b.name ? b.name.toUpperCase() : "z";

          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });

        // console.log("number of sorted", sortedUsers.length);

        let i: number = 0;
        const sentMap: { [phone: string]: boolean } = {};
        for (const user of sortedUsers) {
          i++;

          if (i > 1)
            if (user.phone && user.name) {
              // if ([""].includes(user.uid)) {
              //   console.log("Skipping from Arr", user.name, i);
              // } else if (phonesToNotSend.includes(user.phone)) {
              //   console.log("Skipping from Blocked", user.name, i);
              // }

              if (blockedUsers.includes(user.phone)) {
                console.log("Skipping from Blocked LIST", user.name, i);
              } else if (user.unsubscribe) {
                console.log("unsubscribed user", user.phone);
              } else if (sentMap[user.phone]) {
                console.log("Skipping Sent User", user.name, i);
              }
              // else if (paidUserMap[user.uid]) {
              //   console.log("Skipping Paid User", user.name, i);
              // }
              else {
                console.log(
                  i,
                  " | ",
                  user.name,
                  " | ",
                  user.gender,
                  " | ",
                  user.uid,
                  " | ",
                  user.phone,
                  " | ",
                  user.fpCredit ? user.fpCredit : 0,
                );

                sentMap[user.phone] = true;

                const isError = await sendHSMV2(
                  user.phone,
                  // "+919538404044",
                  // "+919811800046",
                  "live_webinar_may",
                  [user.name ? user.name : "there"],
                  undefined,
                  [
                    "https://sbusermedia.s3.ap-south-1.amazonaws.com/notifications/Stress+Reduction+(1).png",
                  ],
                );

                // throw new Error("Hi");

                if (isError === "ERROR") {
                  throw new Error("ERROR encountered");
                }
                // console.log("resp", resp);

                await sleep(1000);
                //
              }
            }
        }

        throw new Error("HI");

        // for (const subTask of subTasks.docs) {
        //   const tk = subTask.data() as SubTask;

        //   if (tk.isExercise) {
        //   } else {
        //     // await subTask.ref.update({ fp: 1 });
        //   }
        // }

        // const tasks = await admin
        //   .firestore()
        //   .collection("tasks")
        //   .where("taskType", "==", "nutrition")
        //   .get();
        // for (const remTask of tasks.docs) {
        //   const remTk = remTask.data() as Task;

        //   const subTasks = remTk.subTasks;
        //   let fp: number = 0;

        //   if (subTasks?.length) {
        //     for (const subTask of subTasks) {
        //       fp += 1;
        //       console.log("sub", subTask.subTaskId);
        //     }

        //     console.log(
        //       "remTk",
        //       remTk.name,
        //       remTk.subTasks?.length,
        //       fp,
        //       remTk.fitPoints,
        //     );

        //     // await remTask.ref.update({
        //     //   fitPoints: fp,
        //     // });
        //   }
        // }

        // const paidUsersRemote = await admin
        //   .firestore()
        //   .collection("appSubscriptions")
        //   .doc("0cPvVrnphNJBnvvOM9Zf")
        //   .collection("userSubs")
        //   .where("paidPeriodEndsOn", ">=", Date.now())
        //   .orderBy("paidPeriodEndsOn", "asc")
        //   .get();

        // const uids: string[] = [];
        // for (const doc of paidUsersRemote.docs) {
        //   const uAppSub = doc.data() as UserAppSubscription;
        //   uids.push(uAppSub.uid);
        // }

        // // await getDocs(
        // //   query(
        // //     collection(
        // //       doc(db, "appSubscriptions", "0cPvVrnphNJBnvvOM9Zf"),
        // //       "userSubs",
        // //     ),
        // //     where("paidPeriodEndsOn", ">=", now),
        // //     orderBy("paidPeriodEndsOn", "asc"),
        // //   ),
        // // );

        // // const users: PaidCard[] = [];

        // // throw new Error("Break");
        // for (const uid of [...paidUsers, ...uids]) {
        //   const user = await getUserById(uid);
        //   if (user?.uid && user.nutritionBadgeId) {
        //     if (
        //       !user.nutritionBadgeIdEnrolled ||
        //       !user.recommendationConfig?.nutritionStart
        //     ) {
        //       console.log(
        //         "Not Ready",
        //         user.name,
        //         user.nutritionBadgeIdEnrolled,
        //         user.recommendationConfig?.nutritionStart,
        //       );

        //       // const now = Date.now();

        //       // await admin
        //       //   .firestore()
        //       //   .collection("users")
        //       //   .doc(user.uid)
        //       //   .update({
        //       //     nutritionBadgeId: user.nutritionBadgeId,
        //       //     nutritionBadgeIdEnrolled: user.nutritionBadgeId,
        //       //     [`recommendationConfig.nutritionStart`]: user
        //       //       .recommendationConfig?.nutritionStart
        //       //       ? user.recommendationConfig.nutritionStart
        //       //       : now,
        //       //   });
        //     } else if (
        //       user.nutritionBadgeId &&
        //       user.nutritionBadgeIdEnrolled !== user.nutritionBadgeId
        //     ) {
        //       // await admin.firestore().collection("users").doc(user.uid).update({
        //       //   nutritionBadgeId: user.nutritionBadgeId,
        //       //   nutritionBadgeIdEnrolled: user.nutritionBadgeId,
        //       //   // [`recommendationConfig.nutritionStart`]: user
        //       //   //   .recommendationConfig?.nutritionStart
        //       //   //   ? user.recommendationConfig.nutritionStart
        //       //   //   : now,
        //       // });
        //       console.log(
        //         "Not Ready here",
        //         user.name,
        //         user.nutritionBadgeId,
        //         user.nutritionBadgeIdEnrolled,
        //         user.recommendationConfig?.nutritionStart,
        //       );
        //     } else {
        //       console.log(
        //         "Ready",
        //         user.name,
        //         user.nutritionBadgeId,
        //         user.nutritionBadgeIdEnrolled,
        //         user.recommendationConfig?.nutritionStart,
        //       );
        //     }
        //   }
        // }

        // for (const badgeId of [
        //   // "00c40004-26c0-4bf2-916a-144e25422394",
        //   "47e708aa-5045-473d-9abd-456df478d17a",
        //   // "70ba39ec-e870-4789-9063-47849f5c6fca",
        //   // "85c13380-a744-4d9f-bb66-25ec7bcc9f46",
        //   // "911d0f8a-feea-4e00-9635-55c9bc8a423b",
        //   // "b36f6018-73d0-46b2-b230-29020060ea70",
        //   // "cf7add71-e2cf-4a1d-9378-2ba6c6188799",
        //   "d3b54de8-ac46-431c-b174-ab3351729413",
        // ]) {
        //   const badgeObj = await getBadge(badgeId, TEAM_ALPHABET_GAME);

        //   // console.log("badge", badgeObj?.name);
        //   if (badgeObj?.workoutLevels) {
        //     for (const wkLevel of badgeObj.workoutLevels) {
        //       const keyStr = `${badgeId}_${wkLevel.day}`;

        //       const badgeTasks = await getAllTasksForBadgeDay(
        //         badgeId,
        //         wkLevel.day,
        //       );
        //       const sorted = badgeTasks.sort((a, b) =>
        //         a.badgeDayPriority && b.badgeDayPriority
        //           ? a.badgeDayPriority[keyStr] - b.badgeDayPriority[keyStr]
        //           : 0,
        //       );

        //       for (const task of sorted) {
        //         console.log(task.name, "Day", wkLevel.day, "Tier");

        //         // if (wkLevel.day >= 14 && wkLevel.day < 21) {
        //         // await admin
        //         //   .firestore()
        //         //   .collection("tasks")
        //         //   .doc(task.id)
        //         //   .update({ tier: 0 });
        //         // }
        //       }
        //     }
        //   }

        //   console.log("");
        //   console.log("");
        // }

        // // await paymentWAHandler(
        // //   "8bd6e79a-e456-4bd5-a735-e8cb4ea373b8",
        // //   TEAM_ALPHABET_GAME,
        // //   "lHhuSVKMAZbj86xg8m6ubZqKdUj2",
        // // );

        // // throw new Error("hi");

        // const allTasks = await admin.firestore().collection("tasks").get();
        // for (const tk of allTasks.docs) {
        //   const taskP = tk.data() as Task;

        //   // if task is in a badgeId

        //   if (taskP.badgeId && taskP.programDays) {
        //     const badgeDays: string[] = [];
        //     const badgeDayPriority: { [badgeDay: string]: number } = {};
        //     for (const day of taskP.programDays) {
        //       if (taskP.priorityObj) {
        //         const priority = taskP.priorityObj[day];
        //         if (!priority) {
        //           console.log(priority, taskP.priorityObj, taskP.id, day);
        //         } else {
        //           badgeDayPriority[`${taskP.badgeId}_${day}`] = priority
        //             ? priority
        //             : 0;

        //           badgeDays.push(`${taskP.badgeId}_${day}`);
        //         }
        //       }
        //     }

        //     await admin
        //       .firestore()
        //       .collection("tasks")
        //       .doc(taskP.id)
        //       .update({
        //         badgeDays: badgeDays,
        //         badgeIds: [taskP.badgeId],
        //         badgeDayPriority: badgeDayPriority,
        //       });
        //     console.log(taskP.name, badgeDays, taskP.badgeId, badgeDayPriority);
        //   }
        // }

        // throw new Error("HI ");

        // for (const slotDoc of slotsBooked.docs) {
        //   const slotData = slotDoc.data() as SlotObj;

        //   const bookings = await admin
        //     .firestore()
        //     .collection("slots")
        //     .doc(slotData.id)
        //     .collection("slotBooking")
        //     .get();

        //   if (bookings.docs.length > 0) {
        //     const booking = bookings.docs[0].data() as SlotBooking;

        //     const st = getFormattedDateForUnix(
        //       booking.startUnix,
        //       "hh:mmA ddd MMM DD",
        //     );
        //     const en = getFormattedDateForUnix(
        //       booking.endUnix,
        //       "hh:mmA ddd MMM DD",
        //     );
        //     const lk = `https://socialboat.live/admin/slotIds/${slotData.id}/bookings/${booking.id}`;

        //     await notifyAgent_slotBooking(
        //       booking,
        //       `${st}-${en}`,
        //       "Rahul",
        //       lk,
        //       "+919811800046",
        //     );

        //     console.log("hi");

        //     break;
        //   }

        // for (const bookingDoc of bookings.docs) {
        //   const booking = bookingDoc.data() as SlotBooking;

        //   const userObj = await getUserById(booking.uid);

        //   console.log(
        //     booking.rawString,
        //     " | ",
        //     booking.uid,
        //     " | ",
        //     userObj?.name,
        //     " | ",
        //     userObj?.phone,
        //     " | ",
        //     `https://socialboat.live/admin/slots/${slotData.id}/bookings/${booking.id}`,
        //   );
        // }
        // }

        // throw new Error("HI");

        // const heightUsers = await admin
        //   .firestore()
        //   .collection("users")
        //   .where("height", "==", 130)
        //   .get();

        // const tasks = await getPendingTasks(Date.now(), "URGENT");

        // for (const tk of tasks) {
        //   console.log("tk", tk.id, tk.slotId);
        //   await handleTaskState(tk, false, "SUCCESS", "FAILED");
        //   // await handleSlotReminder(tk.id, tk.slotId);
        // }

        // throw new Error("Hi Errored");
        // const game = await getSbEventById(TEAM_ALPHABET_GAME);

        // const ranks = await getAllUserRanks(TEAM_ALPHABET_GAME);

        // for (const teamRank of ranks) {
        //   if (
        //     teamRank.monthlyRank &&
        //     teamRank.monthlyRank["month-13"] &&
        //     teamRank.monthlyRank["month-13"] <= 40
        //   ) {
        //     const user = await getUserById(teamRank.uid);

        //     if (user && user.phone) {
        //       await sendHSM(user.phone, whatsappChannelId, "finalists_du", []);

        //       console.log(
        //         "rank",
        //         teamRank.authorName,
        //         teamRank.monthlyRank && teamRank.monthlyRank["month-13"],
        //       );
        //     }
        //   }
        // }

        // await mixpanel.track("testEvent", { distinct_id: "testUser" });

        // throw new Error("HIIII");

        // const userRem = await admin
        //   .firestore()
        //   .collection("users")
        //   .where("gender", "==", "female")
        //   // .where("motivatedBy", "==", GREESHA_UID)
        //   .get();

        // let i: number = 0;
        // // const now = Date.now();

        // const usersInt: UserInterface[] = [];
        // for (const item of userRem.docs) {
        //   usersInt.push(item.data() as UserInterface);
        // }

        // const users = usersInt.sort((a, b) => {
        //   var textA = a.name ? a.name.toUpperCase() : "z";
        //   var textB = b.name ? b.name.toUpperCase() : "z";

        //   return textA < textB ? -1 : textA > textB ? 1 : 0;
        // });

        // // console.log("len", users.length);
        // const phonesSentTo: { [phone: string]: boolean } = {};

        // for (const userInList of users) {
        //   i++;
        //   if (i > 1526) {
        //     if (userInList.uid === ARJA_UID) {
        //       console.log(
        //         i,
        //         "skip",
        //         userInList.uid,
        //         userInList.name,
        //         userInList.phone,
        //       );
        //     } else if (paidUsers.includes(userInList.uid)) {
        //       console.log(
        //         i,
        //         "skipping",
        //         userInList.uid,
        //         userInList.name,
        //         userInList.phone,
        //       );
        //     } else if (userInList.phone && phonesSentTo[userInList.phone]) {
        //       console.log(
        //         i,
        //         "skip phn",
        //         userInList.uid,
        //         userInList.name,
        //         userInList.phone,
        //       );
        //     } else if (userInList.phone) {
        //       console.log(
        //         i,
        //         "sending",
        //         userInList.uid,
        //         userInList.name,
        //         userInList.phone,
        //       );
        //       // await sendHSMV2(
        //       //   userInList.phone,
        //       //   "greesha_v4",
        //       //   [userInList.name ? userInList.name : "there"],
        //       //   undefined,
        //       //   [
        //       //     "https://sbvideolibrary.s3.ap-south-1.amazonaws.com/Greesha/Untitled+design+(6).jpg",
        //       //   ],
        //       // );

        //       phonesSentTo[userInList.phone] = true;
        //     }
        //   }
        // }

        // console.log("i", i);

        // throw new Error("HI This is stop");

        // for (const user of users.docs) {
        //   const userObj = user.data() as UserInterface;
        //   if (userObj.onboardingCallStatus) {
        //     continue;
        //   }

        //   if (
        //     userObj.authSignupTime &&
        //     userObj.phone &&
        //     !userObj.phone.includes("+1")
        //   ) {
        //     const delMS = now - userObj.authSignupTime;
        //     const delDays = delMS / (24 * 60 * 60 * 1000);

        //     if (delDays > 3 && delDays < 30) {
        //       if (userObj.fitnessGoal?.length) {
        //         const goal = userObj.fitnessGoal[0];

        //         let goalString: string = "to *Reverse PCOS*";
        //         if (goal !== "pcos_pcod") {
        //           goalString = "to *Get fit*";
        //         }

        //         console.log(
        //           "i",
        //           i,
        //           userObj.name,
        //           goalString,
        //           userObj.phone,
        //           userObj.fpCredit,
        //           delDays,
        //         );

        //         // await sendHSMV2("+919811800046", "consultation_slot_v2", [
        //         //   userObj.name ? userObj.name : "there",
        //         //   goalString,
        //         // ]);

        //         // throw new Error("Hi");

        //         await sendHSMV2(userObj.phone, "consultation_slot", [
        //           userObj.name ? userObj.name : "there",
        //         ]);

        //         i++;
        //       }
        //     }
        //   }

        //   // if (game) {
        //   //   await admin.firestore().collection("users").doc(userObj.uid).update({
        //   //     badgeId: "9ef56ee6-bd64-4242-aeea-457494355e68",
        //   //     dailyFPTarget: 20,
        //   //   });

        //   //   console.log(i);
        // }

        // throw new Error("Hi");

        // if (
        //   game &&
        //   // &&
        //   // userObj.invitedPageId === "AIESEC Delhi University" &&
        //   !userObj.participatingInGameWithTeam
        // ) {
        //   const teamName = userObj.name
        //     ? `${userObj.name.trim()}'s Team`
        //     : userObj.userKey
        //     ? `${userObj.userKey.trim()}'s team`
        //     : `New Team ${Math.round(Math.random() * 100000)}`;

        //   console.log(
        //     i,
        //     " | ",
        //     "No TEAM",
        //     " | ",
        //     userObj.uid,
        //     " | ",
        //     userObj.name,
        //     " | ",
        //     userObj.fpCredit,
        //     // " | ",
        //     // teamName,
        //     " | ",
        //     userObj.invitedPageId,
        //     " | ",
        //     userObj.companyCodes,
        //   );
        //   i++;

        //   await createNewTeam(
        //     game,
        //     userObj,
        //     "",
        //     teamName,
        //     userObj.name,
        //     userObj.profileImage,
        //     userObj.uid,
        //   );
        // }

        // if (userObj.companyCodes && userObj.companyCodes.length) {
        //   i++;

        //   const paymentDoc = await admin
        //     .firestore()
        //     .collection("appSubscriptions")
        //     .doc("0cPvVrnphNJBnvvOM9Zf")
        //     .collection("userSubs")
        //     .doc(userObj.uid)
        //     .get();

        //   if (paymentDoc.data()) {
        //     console.log(
        //       i,
        //       userObj.uid,
        //       userObj.companyCodes,
        //       userObj.invitedPageId,
        //       "PAID",
        //     );
        //   } else {
        //     console.log(
        //       i,
        //       userObj.uid,
        //       userObj.companyCodes,
        //       userObj.invitedPageId,
        //       "NOT PRESENT",
        //     );
        //   }
        // } else {
        //   console.log("HERE", userObj.uid, userObj.name);
        // }
        // }

        // let j: number = 0;
        // for (const user of users.docs) {
        //   const userObj = user.data() as UserInterface;

        //   if (
        //     userObj.invitedPageId === "AIESEC Delhi University" &&
        //     userObj.phone
        //   ) {
        //     await sendHSM(userObj.phone, whatsappChannelId, "last_day_du", []);

        //     console.log(j, userObj.uid, userObj.phone);
        //     j++;
        //   }
        // }

        // throw new Error("Hi I am here");

        // let i: number = 0;
        // for (const user of heightUsers.docs) {
        // const doc = user.data() as UserInterface;

        // let heightNow: number = 0;
        // if (doc?.height > 130) {
        //   heightNow = 130;
        // } else if (doc?.height > 74) {
        //   const heightInInch = doc.height / 2.54;
        //   const heightInInchRound = Math.round(heightInInch);

        //   heightNow = heightInInchRound;
        // } else {

        //   heightNow = doc.height;
        // }

        // console.log(i, doc.name, doc.height);

        // await admin
        //   .firestore()
        //   .collection("users")
        //   .doc(doc.uid)
        //   .update({ height: 65 });

        // i++;
        // }

        // throw new Error("hi");

        // console.log(request.body);

        // const { uid } = request.body as { uid?: string };

        // if (uid) {
        //   await updateUserKPIs(uid);
        // }

        // throw new Error("HI");
        // const badges = await admin
        //   .firestore()
        //   .collection("sbEvents")
        //   .doc(TEAM_ALPHABET_GAME)
        //   .collection("badges")
        //   .get();

        // for (const badgeDoc of badges.docs) {
        //   const badge = badgeDoc.data() as Badge;

        //   const relativeWinners = await admin
        //     .firestore()
        //     .collection("users")
        //     .where("relativeBadgesWon", "array-contains", badge.id)
        //     .get();

        //   const indWinners = await admin
        //     .firestore()
        //     .collection("users")
        //     .where("independentBadgesWon", "array-contains", badge.id)
        //     .get();

        //   if (badge.badgeId !== "relative" && badge.badgeId !== "independent") {
        //     if (relativeWinners.docs.length) {
        //       for (const relativeUser of relativeWinners.docs) {
        //         const rU = relativeUser.data() as UserInterface;

        //         console.log("ru", rU.name);

        //         await admin
        //           .firestore()
        //           .collection("users")
        //           .doc(rU.uid)
        //           .update({
        //             relativeBadgesWon: admin.firestore.FieldValue.arrayRemove(
        //               badge.id,
        //             ),
        //             otherBadgesWon: admin.firestore.FieldValue.arrayUnion(
        //               badge.id,
        //             ),
        //           });
        //       }
        //     }

        //     if (indWinners.docs.length) {
        //       for (const indUser of indWinners.docs) {
        //         const rU = indUser.data() as UserInterface;

        //         console.log(rU.name, "ind");

        //         await admin
        //           .firestore()
        //           .collection("users")
        //           .doc(rU.uid)
        //           .update({
        //             independentBadgesWon: admin.firestore.FieldValue.arrayRemove(
        //               badge.id,
        //             ),
        //             otherBadgesWon: admin.firestore.FieldValue.arrayUnion(
        //               badge.id,
        //             ),
        //           });
        //       }
        //     }
        //   }
        // }

        // const now = Date.now();
        // const extensionDate = now + 5 * 24 * 60 * 60 * 1000;

        // for (const uidForA of uidsForAccess) {
        //   const currentPlan = await admin
        //     .firestore()
        //     .collection("appSubscriptions")
        //     .doc("0cPvVrnphNJBnvvOM9Zf")
        //     .collection("userSubs")
        //     .doc(uidForA)
        //     .get();

        //   if (currentPlan.exists) {
        //     const cPlan = currentPlan.data() as any;

        //     if (cPlan.paidPeriodEndsOn > extensionDate) {
        //       continue;
        //     }
        //   }

        //   await admin
        //     .firestore()
        //     .collection("appSubscriptions")
        //     .doc("0cPvVrnphNJBnvvOM9Zf")
        //     .collection("userSubs")
        //     .doc(uidForA)
        //     .set({
        //       freeTrialEndsOn: extensionDate,
        //       freeTrialStartedOn: Date.now(),
        //       numPayments: 0,
        //       paidPeriodEndsOn: extensionDate,
        //       uid: uidForA,
        //     });

        //   console.log("u", uidForA);
        // }

        // throw new Error("HI");

        // try {
        //   const games = [
        //     TEAM_ALPHABET_GAME,
        //     ALPHABET_GAME,
        //     RUNNER_GAME,
        //     WOMENS_GAME,
        //     CHALLENGE_ONE,
        //     FAT_BURNER_CHALLENGE,
        //     FAT_BURNER_GAME,
        //     STUDENT_OLYMPICS,
        //   ];

        //   const uids: { [uid: string]: UserInterface } = {};
        //   const userList: UserInterface[] = [];
        //   // const teams: { [teamId: string]: sbEventInterface } = {};
        //   // const teamEnrolledIds: { [teamId: string]: string[] } = {};

        //   for (const gameId of games) {
        //     const usersRanks = await getAllUserRanks(gameId);
        //     for (const user of usersRanks) {
        //       if (!uids[user.uid]) {
        //         const userObj = await getUserById(user.uid);
        //         if (userObj) {
        //           uids[userObj?.uid] = userObj;
        //           userList.push(userObj);
        //         }
        //       }

        //       // const teamId = user.coachEventId;
        //       // if (teamEnrolledIds[teamId]) {
        //       //   teamEnrolledIds[teamId].push(user.uid);
        //       // } else {
        //       //   teamEnrolledIds[teamId] = [user.uid];
        //       // }

        //       // if (teamId && !teams[teamId]) {
        //       //   const team = await getSbEventById(teamId);
        //       //   if (team) {
        //       //     teams[teamId] = team;
        //       //   }
        //       // }
        //     }
        //   }

        // for (const teamId of Object.keys(teams)) {
        //   const teamEl = teams[teamId];
        //   const teamEnIds = teamEnrolledIds[teamId];

        //   await admin
        //     .firestore()
        //     .collection("sbEvents")
        //     .doc(teamId)
        //     .update({ enrolledUserUIDs: teamEnIds });
        //   console.log(teamEl.name);
        // }

        // const sorted = userList.sort(function (a, b) {
        //   if (a.uid && b.uid) {
        //     if (a.uid < b.uid) {
        //       return -1;
        //     }
        //     if (a.uid > b.uid) {
        //       return 1;
        //     }
        //   } else if (a.uid) {
        //     return 1;
        //   } else if (b.uid) {
        //     return -1;
        //   }

        //   return 0;
        // });

        // let i_ct: number = 0;
        // for (const userI of sorted) {
        //   if (userI.phone && userI.gender !== "female" && i_ct > 1637) {
        //     await sendHSM(
        //       userI.phone,
        //       whatsappChannelId,
        //       "new_year_resolution",
        //       [],
        //     );
        //   }

        //   console.log(
        //     i_ct,
        //     " | ",
        //     userI.uid,
        //     " | ",
        //     userI.name,
        //     " | ",
        //     userI.phone,
        //     " | ",
        //     userI.email,
        //     " | ",
        //     userI.fpCredit,
        //   );

        //   i_ct++;
        // }

        // throw new Error("HI");

        // const activities = await admin
        //   .firestore()
        //   .collectionGroup("activities")
        //   // .doc(uid)
        //   // .collection("activities")
        //   .where("createdOn", ">=", 1653978010000)
        //   // .where("createdOn", "<=", before)
        //   .get();

        // console.log("act", act);
        // handleTaskSummary();
        // throw new Error();

        // if (act) {
        // for (const act of activities.docs) {
        //   const actTmp = act.data() as Activity;
        //   console.log(actTmp.activityName, actTmp.reviewStatus);

        //   if (actTmp.source !== "terra") {
        //     // console.log("ADD to ALGOLIA");
        //     await handleAlgoliaUpdate({
        //       ...actTmp,
        //       reviewStatus: "PENDING",
        //     });
        //   }
        // }
        // await handleAlgoliaUpdate(act);
        // }

        // const res = await sendHSM(
        //   "+919811800046",
        //   whatsappChannelId,
        //   "reward_winner",
        //   [
        //     { default: "there" },
        //     { default: `game price` },
        //     { default: "formattedTime" },
        //     { default: "formattedTime" },
        //     { default: "formattedTime" },
        //   ],
        // );

        // console.log("res", res);

        // const pendingTasks = await getAllPendingTasks("PENDING_TEST");

        // for (const task of pendingTasks) {
        //   await handleReminders([task], "SUCCESS", "FAILED");
        // }

        // console.log(pendingTasks.length);

        // await handleReminders(pendingTasks, "SUCCESS", "PENDING_TEST");

        // for (const pendingTask of pendingTasks) {
        // console.log("p", pendingTask);

        // await admin
        //   .firestore()
        //   .collection("reminders")
        //   .doc(pendingTask.id)
        //   .update({
        //     state: "FAILED",
        //   });
        // }

        // await notifyAgents_pager(
        //   "lHhuSVKMAZbj86xg8m6ubZqKdUj2",
        //   "dd748d8b-bcab-426f-8997-a4c748eee344",
        //   false,
        // );

        // await getPendingTasks()
        // const reminderDocs = await firestore()
        //   .collection("reminders")
        //   .where("id", "==", "8db3251a-0ffa-4302-8d21-07a6d3bf3eeb")
        //   .get();

        // if (reminderDocs.docs.length) {
        //   const task = reminderDocs.docs[0].data() as Reminder;

        //   if (task.levelTaskObj && task.parentId) {
        //     await handleWODV2(task.levelTaskObj, task.parentId, task.id);
        //   }
        // }

        // throw new Error("HI");

        // console.log("pendingTasks", pendingTasks);

        // for (const reminder of pendingTasks) {
        // console.log(reminder.templateId);
        // if (
        // reminder.templateId === "notify_agent_activity" &&
        // reminder.activityId &&
        // reminder.authorId
        // ) {
        // try {
        //   await notifyAgents_pager(
        //     reminder.authorId,
        //     reminder.activityId,
        //     false,
        //   );
        // } catch (error) {
        //   console.log("error in notify agent");
        // }
        // } else if (
        // reminder.templateId === "morning_workout_reminder" &&
        // reminder.eventId &&
        // reminder.parentId
        // reminder.parentId === "95409168-2476-4e0b-9b1f-ace610753495"
        // ) {
        // const state = await morningNotification(
        //   reminder.eventId,
        //   reminder.parentId,
        //   reminder.templateId,
        // );
        // try {
        //   await notifyAgents_pager(
        //     reminder.authorId,
        //     reminder.activityId,
        //     true,
        //   );
        // } catch (error) {
        //   console.log("error in notify agent");
        // }
        // }
        // }

        // const parentEvent = await getSbEventById(
        //   "637e269f-9fee-4590-8489-23efcb81fb8c",
        // );
        // // const top2 = await getTopNUserRanks(parentId, 2);

        // const { after, rounds, before } =
        //   getEventMetricsForEventObj(parentEvent);

        // if (after && rounds) {
        //   console.log("week", after, before, rounds);
        //   const daysElapsed = getDaysElapsed(after, Date.now());

        //   const week = getCurrentRound(daysElapsed, rounds);

        //   console.log("week", week, daysElapsed);

        //   const userRanks = await admin
        //     .firestore()
        //     .collection("sbEvents")
        //     .doc("eventId")
        //     .collection("userRanks")
        //     .orderBy(`weeklyRank.${week}`, "asc")
        //     .limit(2)
        //     .get();

        //   console.log("userRanks", userRanks);
        // }

        // await sendHSM("+919811800046", whatsappChannelId, "new_post", [
        //   { default: "test" },
        //   { default: "test" },
        //   { default: "test" },
        //   { default: "test" },
        //   { default: "test" },
        //   { default: "test" },
        // ]);
        // const [gm1, gm2, gm3, gm4] = await Promise.all([
        //   getSbEventById(CHALLENGE_ONE),
        //   getSbEventById(WFH_CHALLENGE),
        //   getSbEventById(FAT_BURNER_CHALLENGE),
        //   getSbEventById(FAT_BURNER_GAME),
        // ]);

        // const [coaches1, coaches2, coaches3, coaches4] = await Promise.all([
        //   getAllCoachRanks(CHALLENGE_ONE),
        //   getAllCoachRanks(WFH_CHALLENGE),
        //   getAllCoachRanks(FAT_BURNER_CHALLENGE),
        //   getAllCoachRanks(FAT_BURNER_GAME),
        // ]);

        // await morningNotification(
        //   "49dbe0fb-2ccc-47be-9702-8941b0c47e3f",
        //   FAT_BURNER_GAME,
        //   "morning_workout_reminder",
        // );

        // const coaches: { [uid: string]: boolean } = {};
        // let i: number = 0;
        // for (const coach of [
        //   ...coaches1,
        //   ...coaches2,
        //   ...coaches3,
        //   ...coaches4,
        // ]) {
        //   coaches[coach.uid] = true;
        //   i++;

        //   console.log(`${i} | ${coach.authorName}`);
        // }

        // await

        // console.log("coaches:", Object.keys(coaches).length);
        // await handleLevelUpdate(false);
        // await userTeamReconcile();
        // await userTeamNormalise();
        // await handleWOD();
        // await handleTaskSummary();
        // await refreshActivitiesWithPosts();
        // await seedParentPostId();
        // await handleEventToTimeFunc();
        // await handleManualRank();

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
