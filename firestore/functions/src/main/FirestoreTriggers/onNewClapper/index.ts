import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
// import { message } from "../../../models/Messages/Message";
// import { handleMessage } from "../../../models/Messages/Methods/newMessage";
import { Clapper } from "../../../models/Post/Post";
import { incrementUserClaps } from "./incrementUserClap";

export const onNewClapperFunc = functions
  .region("asia-south1")
  .firestore.document("users/{userId}/clappers/{clapperId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onNewClapperFunc")) {
        return;
      }

      const clapperBefore = change.after.data() as Clapper;
      const clapperNow = change.before.data() as Clapper;
      const userId: string = context.params.userId;

      if (clapperNow.numClaps !== clapperBefore.numClaps) {
        await incrementUserClaps(userId);
      }

      return;
    } catch (error) {
      console.error(error);
    }
  });
