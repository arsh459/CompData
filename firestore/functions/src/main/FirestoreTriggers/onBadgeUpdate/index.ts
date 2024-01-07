import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { badgeUpdateMainFunc } from "./main";

export const onBadgeUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document("sbEvents/{gameId}/badges/{badgeId}")
  .onWrite(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onBadgeUpdateFunc")) {
        return;
      }

      // const activityId: string = context.params.activityId;
      const badgeId: string = context.params.badgeId;

      if (badgeId) {
        await badgeUpdateMainFunc(badgeId, false);
      }

      return;

      // console.log("collectionId", collectionId);
      // console.log("viewId", viewId);
    } catch (error) {
      console.error(error);
    }
  });
