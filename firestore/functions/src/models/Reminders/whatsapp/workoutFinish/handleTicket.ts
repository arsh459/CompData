// import { FIT_POINT_TH } from "../../../../constants/challenge";
import { sbAppDL } from "../../../../constants/email/contacts";
import { whatsappChannelId } from "../../../../main/Https/messagebird/constants/identifiers";
// import { handleUserActivityReconcile } from "../../../../main/Https/refreshUserLevels/handleUserLevelReconcile";
// import { getDayStartIST } from "../../../../main/PubSub/activityTracker/utils";
import { getActivityById, getUserRankForUID } from "../../../Activity/getUtils";
import { Param, sendHSM } from "../../../Conversations/sendHSM";
import { sendHSMV2 } from "../../../Conversations/sendHSMV2";
// import { getSbEventById } from "../../../sbEvent/getUtils";
import { getTask } from "../../../Task/getUtils";
import { getUserById } from "../../../User/Methods";
import { createBranchShortLink } from "./createBranchLink";
import { wkLinkFallback } from "./handleWorkoutFinishV2";

/**
 *
 * uid, parentId
 * Gets triggered on manual update.
 * Gets triggered on activity finish
 *
 */

export const handleTryAgain = async (uid: string, activityId: string) => {
  const user = await getUserById(uid);
  const activity = await getActivityById(uid, activityId);
  if (activity?.taskId) {
    const task = await getTask(activity.taskId);
    if (task && user?.phone) {
      const lk = await createBranchShortLink(
        "WhatsApp",
        "tryAgainMessage",
        "transactionalMessage",
        {
          navTo: "WorkoutHistoryExpanderScreen",
          actId: activity.id ? activity.id : "",
        },
      );

      await sendHSMV2(
        user.phone,
        "try_again",
        [
          user.name ? `${user.name.trim()}` : "there",
          task?.name ? `${task.name}` : "Workout",
        ],
        { "0": [lk ? lk : wkLinkFallback] },
      );

      return true;
    }
  }

  return false;
};

export const handleTicket = async (
  parentId: string,
  uid: string,
  taskId: string,
  postId: string,
  templateId:
    | "try_again"
    | "need_info"
    | "workout_rejected"
    | "ticket_resolved",
  // coachId: string,
  // seriesId: string,
  // liveId: string,
  // streamId: string,
  // streamType: "exercises" | "lives",
) => {
  const user = await getUserById(uid);
  const task = await getTask(taskId);
  // const coach = await getUserById(coachId);
  const myUserRank = await getUserRankForUID(parentId, uid);

  if (user?.phone) {
    const coachCommunityId = myUserRank?.coachCommunityId;
    const coachEventId = myUserRank?.coachEventId;

    if (coachCommunityId && coachEventId) {
      // const coach = await getUserById(coachCommunityId);
      // const coachEvent = await getSbEventById(coachEventId);

      // const link = `https://socialboat.live/${encodeURI(
      //   coach?.userKey ? coach?.userKey : "",
      // )}/${encodeURI(
      //   coachEvent?.eventKey ? coachEvent?.eventKey : "",
      // )}?postId=${postId}`;

      const link = sbAppDL;

      await sendHSM(
        user.phone,
        whatsappChannelId,
        templateId,
        templateId === "ticket_resolved"
          ? createParamsForReviewTicket(
              user?.name,
              task?.name ? task.name : "task",
              link,
            )
          : createParamsForTicket(
              user?.name,
              task?.name ? task.name : "task",
              link,
            ),
      );

      return true;
    }
  }

  return false;
};

const createParamsForTicket = (
  userName: string | undefined,
  taskName: string | undefined,
  link: string,
): Param[] => {
  return [
    {
      default: userName ? `${userName.trim()}` : "there",
    },
    {
      default: taskName ? `${taskName.trim()}` : "Task",
    },
    {
      default: link ? `${link}` : "https://socialboat.live/teams",
    },
    {
      default: "SocialBoat",
    },
  ];
};

const createParamsForReviewTicket = (
  userName: string | undefined,
  taskName: string | undefined,
  link: string,
): Param[] => {
  return [
    {
      default: userName ? `${userName.trim()}` : "there",
    },
    {
      default: taskName ? `${taskName.trim()}` : "Task",
    },
    {
      default: link ? `${link}` : "https://socialboat.live/teams",
    },
  ];
};
