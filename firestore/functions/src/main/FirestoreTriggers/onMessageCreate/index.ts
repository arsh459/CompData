import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { message } from "../../../models/Messages/Message";
import { handleMessage } from "../../../models/Messages/Methods/newMessage";

export const onMessageCreateFunc = functions
  .region("asia-south1")
  .firestore.document("groups/{groupId}/messages/{messageId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onMessageCreateFunc")) {
        return;
      }

      const groupId: string = context.params.groupId;
      const messageId: string = context.params.messageId;

      // console.log("collectionId", collectionId);
      // console.log("viewId", viewId);

      const newMessage = snapshot.data() as message;
      if (newMessage.uid && groupId && messageId) {
        await handleMessage(groupId, newMessage);
      }
    } catch (error) {
      console.error(error);
    }
  });
