import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { getPostLevel1 } from "../../../models/Post/getUtils";
import { Post } from "../../../models/Post/Post";
import {
  getReminderType,
  handleNewReminder,
} from "../../../models/Reminders/saveReminder/handleNewReminder";
import { getSbEventById } from "../../../models/sbEvent/getUtils";

export const onReplyDegree2Func = functions
  .region("asia-south1")
  .firestore.document(
    "sbEvents/{eventId}/postsV2/{id}/posts/{postId}/posts/{postId2}",
  )
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onReplyDegree2Func")) {
        return;
      }

      const eventId: string = context.params.eventId;
      const parentPostId: string = context.params.id;
      const postId: string = context.params.postId;
      // const postId2: string = context.params.postId2;

      const postObj2 = snapshot.data() as Post;

      const eventObj = await getSbEventById(eventId);
      //   const parentPostObj = await getParentPost(eventId, parentPostId);
      const postObj = await getPostLevel1(eventId, parentPostId, postId);

      if (eventObj && postObj?.creatorId !== postObj2.creatorId) {
        await handleNewReminder(
          eventObj.ownerUID,
          postObj2.id,
          eventObj.id,
          postObj2.creatorId,
          getReminderType(postObj2, parentPostId, postId),
          postObj2.cohortId,
          postObj2.scheduledOnTime,
          parentPostId,
          postId,
        );
      }
    } catch (error) {
      console.error(error);
    }
  });
