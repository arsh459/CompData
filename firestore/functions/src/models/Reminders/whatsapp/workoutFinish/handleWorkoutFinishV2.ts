// import { FIT_POINT_TH } from "../../../../constants/challenge";
// import { sbAppDL } from "../../../../constants/email/contacts";
// import { whatsappChannelId } from "../../../../main/Https/messagebird/constants/identifiers";
// import { handleUserActivityReconcile } from "../../../../main/Https/refreshUserLevels/handleUserLevelReconcile";
// import { getSprintId } from "../../../../main/Https/summariseKPIs/summariseHandler";
// import { getUserActivity } from "../../../../main/PubSub/activityTracker/getUserActivity";
// import { getDayStartIST } from "../../../../main/PubSub/activityTracker/utils";
import {
  getAllActivityById,
  // getUserActivityAfter,
  // getUserRankForUID,
} from "../../../Activity/getUtils";
// import { Param } from "../../../Conversations/sendHSM";
import { sendHSMV2 } from "../../../Conversations/sendHSMV2";
import { getTask } from "../../../Task/getUtils";
// import { getSbEventById } from "../../../sbEvent/getUtils";
import { getUserById } from "../../../User/Methods";
import { createBranchShortLink } from "./createBranchLink";

/**
 *
 * uid, parentId
 * Gets triggered on manual update.
 * Gets triggered on activity finish
 *
 */

export const wkLinkFallback = "https://socialboat.app.link/sbFeedback";

export const handleWorkoutFinishV2 = async (
  // parentId: string,
  uid: string,
  activityId: string,
  // coachId: string,
  // seriesId: string,
  // liveId: string,
  // streamId: string,
  // streamType: "exercises" | "lives",
) => {
  const user = await getUserById(uid);
  // console.log("user", user);
  // const coach = await getUserById(coachId);
  // const myUserRank = await getUserRankForUID(parentId, uid);

  const act = await getAllActivityById(uid, activityId);

  // const now = Date.now();
  // const dStart = getDayStartIST(now);
  // const dEnd = dStart + 24 * 60 * 60 * 1000;

  // console.log("here");

  if (user?.phone && act && act.calories && act.taskId) {
    const totalFPoints = act.calories ? Math.round(act.calories / 300) : 0;

    const task = await getTask(act.taskId);
    // console.log("HERE", dStart, dEnd, myUserRank?.uid);
    // const acts = await getUserActivityAfter(uid, dStart, dEnd);

    // const { totalFPoints } = handleUserActivityReconcile(acts, FIT_POINT_TH);
    // const userLevel = user?.userLevelV2 ? user?.userLevelV2 : 0;
    // const levelLabel =
    //   userLevel <= 1
    //     ? "Begineer"
    //     : userLevel > 1 && userLevel <= 3
    //     ? "Intermediate"
    //     : "Expert";

    // const coachCommunityId = myUserRank?.coachCommunityId;
    // const coachEventId = myUserRank?.coachEventId;

    if (task?.name) {
      // console.log("HERE 2");
      // const coach = await getUserById(coachCommunityId);
      // const coachEvent = await getSbEventById(coachEventId);

      // await sendHSM(
      //   "+919811800046",
      //   whatsappChannelId,
      //   "workout_finish_v2",
      //   createParamsForWorkoutFinishV2(
      //     user?.name,
      //     totalFPoints,
      //     userLevel,
      //     `https://socialboat.live/${encodeURI(
      //       coach?.userKey ? coach?.userKey : "",
      //     )}/${encodeURI(coachEvent?.eventKey ? coachEvent?.eventKey : "")}`,
      //   ),
      // );
      const lk = await createBranchShortLink(
        "WhatsApp",
        "workoutFeedback",
        "transactionalMessage",
        {
          navTo: "WorkoutHistoryExpanderScreen",
          actId: act.id ? act.id : "",
        },
        uid,
      );

      await sendHSMV2(
        user.phone,
        "workout_finish_v2",
        [
          user.name ? `${user.name.trim()}` : "there",
          `${totalFPoints} FP`,
          task.name ? `${task.name.trim()}` : "a task",
        ],
        { "0": [lk ? lk : wkLinkFallback] },
        [`${totalFPoints} FP`],
      );

      // await sendHSM(
      //   user.phone,
      //   whatsappChannelId,
      //   "workout_finish_v2",
      //   createParamsForWorkoutFinishV2(
      //     user?.name,
      //     totalFPoints,
      //     levelLabel,
      //     sbAppDL,
      //     // `https://socialboat.live/${encodeURI(
      //     //   coach?.userKey ? coach?.userKey : "",
      //     // )}/${encodeURI(coachEvent?.eventKey ? coachEvent?.eventKey : "")}`,
      //   ),
      // );

      return true;
    }
  }

  return false;
};

// const createParamsForWorkoutFinishV2 = (
//   userName: string | undefined,
//   fitPoints: number,
//   userLevel: string,
//   link: string,
// ): Param[] => {
//   return [
//     {
//       default: userName ? `${userName.trim()}` : "there",
//     },
//     {
//       default: fitPoints ? `*${Math.round(fitPoints)}pts*` : "0pts",
//     },
//     {
//       default: userLevel,
//     },
//     {
//       default: link ? `${link}` : "https://socialboat.live/teams",
//     },
//   ];
// };
