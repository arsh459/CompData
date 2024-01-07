import { Post } from "../../Post/Post";
import { whatsappTemplates } from "../Reminder";
import { saveLiveSessionReminder } from "./liveSessionReminder";
import { savePostReminder } from "./postReminder";

export const getReminderType = (
  post: Post,
  parentPostId?: string,
  childPostId?: string,
): whatsappTemplates => {
  if (parentPostId && childPostId) {
    return "post_reply_2";
  } else if (parentPostId) {
    return "post_reply";
  } else if (
    post.sessionType === "post" &&
    post.creatorId === post.communityId
  ) {
    return "new_post";
  } else if (
    post.sessionType === "post" &&
    post.creatorId !== post.communityId
  ) {
    return "new_post_user";
  } else if (post.sessionType === "live") {
    return "live_session";
  } else {
    return "new_post";
  }
};

export const handleNewReminder = async (
  communityId: string,
  postId: string,
  eventId: string,
  authorId: string,
  templateType: whatsappTemplates,
  cohortId?: string,
  scheduledOnTime?: number,
  parentPostId?: string,
  childPostId?: string,
) => {
  if (
    templateType === "new_post" ||
    templateType === "new_post_user" ||
    templateType === "post_reply" ||
    templateType === "post_reply_2"
  ) {
    await savePostReminder(
      communityId,
      postId,
      eventId,
      templateType,
      cohortId,
      authorId,
      parentPostId,
      childPostId,
    );
  } else if (templateType === "live_session" && scheduledOnTime) {
    await saveLiveSessionReminder(
      communityId,
      postId,
      scheduledOnTime,
      eventId,
      cohortId,
      authorId,
    );
  }
};
