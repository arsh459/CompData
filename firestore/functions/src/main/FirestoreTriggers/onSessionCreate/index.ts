import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Post } from "../../../models/Post/Post";
import {
  getReminderType,
  handleNewReminder,
} from "../../../models/Reminders/saveReminder/handleNewReminder";
import { getSbEventById } from "../../../models/sbEvent/getUtils";

export const onSessionCreateFunc = functions
  .region("asia-south1")
  .firestore.document("sbEvents/{eventId}/postsV2/{id}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onSessionCreateFunc")) {
        return;
      }

      const eventId: string = context.params.eventId;
      const id: string = context.params.id;

      const postObj = snapshot.data() as Post;

      const eventObj = await getSbEventById(eventId);

      if (eventObj && !postObj.postContent) {
        await handleNewReminder(
          eventObj.ownerUID,
          id,
          eventObj.id,
          postObj.creatorId,
          getReminderType(postObj),
          postObj.cohortId,
          postObj.scheduledOnTime,
        );
      }
    } catch (error) {
      console.error(error);
    }
  });
