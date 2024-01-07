import * as functions from "firebase-functions";
// import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { backendRoomMain } from "./main";
import { realtimeDBRoom } from "../../../models/Room/Room";

export const onRoomUpdateFunc = functions
  .region("asia-south1")
  .database.ref(`users/{userId}/rooms/{roomId}`)
  .onWrite(async (change, context) => {
    try {
      //   const functionEventId = context.eventId;
      //   if (await isDuplicateInvocation(functionEventId, "onRoomUpdateFunc")) {
      //     return;
      //   }

      // handle notify user
      const now = change.after.val() as realtimeDBRoom;
      const pre = change.before.val() as realtimeDBRoom | undefined;
      const uid = context.params.userId;

      //   console.log("UID", uid);
      //   console.log("now", now);
      //   console.log("pre", pre);

      //   if (uid === RahulUID) {
      await backendRoomMain(uid, now, pre);
      //   }

      return;
    } catch (error) {
      console.error(error);
    }
  });
