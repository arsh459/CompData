import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { getParentPost } from "../../../models/Post/getUtils";
import { Post } from "../../../models/Post/Post";
import {
  getReminderType,
  handleNewReminder,
} from "../../../models/Reminders/saveReminder/handleNewReminder";
import { getSbEventById } from "../../../models/sbEvent/getUtils";

export const onPostReplyFunc = functions
  .region("asia-south1")
  .firestore.document("sbEvents/{eventId}/postsV2/{id}/posts/{postId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onPostReplyFunc")) {
        return;
      }

      const eventId: string = context.params.eventId;
      const parentPostId: string = context.params.id;
      const postId: string = context.params.postId;

      const postObj = snapshot.data() as Post;

      const eventObj = await getSbEventById(eventId);
      const parentPostObj = await getParentPost(eventId, parentPostId);

      if (eventObj && parentPostObj?.creatorId !== postObj.creatorId) {
        await handleNewReminder(
          eventObj.ownerUID,
          postId,
          eventObj.id,
          postObj.creatorId,
          getReminderType(postObj, parentPostId),
          postObj.cohortId,
          postObj.scheduledOnTime,
          parentPostId,
        );
      }
    } catch (error) {
      console.error(error);
    }
  });
