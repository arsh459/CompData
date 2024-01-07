import { Activity, reviewStatus } from "../../../models/Activity/Activity";
import { handleNotifyUser } from "../onActivityWrite/handleNotify";

export const handleNotifyUserTicket = async (now: Activity) => {
  if (
    now.notifyUser === "PENDING" &&
    now.games?.length &&
    now.id &&
    now.reviewStatus &&
    now.taskId
  ) {
    const templateId = getTemplateId(now.reviewStatus);

    if (templateId)
      await handleNotifyUser(
        now.games[0],
        now.authorUID,
        now.id,
        now.postId,
        now.taskId,
        templateId,
      );
  }
};

export const getTemplateId = (reviewStatusLocal: reviewStatus) => {
  if (reviewStatusLocal === "REVIEWED") {
    return "post_workout_finish";
  } else if (reviewStatusLocal === "TRY_AGAIN") {
    return "try_again";
  } else if (reviewStatusLocal === "DISCARDED") {
    return "workout_rejected";
  } else if (reviewStatusLocal === "NEED_MORE_DATA") {
    return "need_info";
  }

  return;
};
