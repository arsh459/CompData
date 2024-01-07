import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { mixpanel } from "../../../mixpanel/mixpanel";
import { UserAppSubscription } from "../../../models/AppSubscription/Subscription";
// import { getTask } from "../../../models/Task/getUtils";
// import { sumariseHandler } from "../../Https/summariseKPIs/summariseHandler";

export const onAccessUpdateFunc = functions
  .region("asia-south1")
  .firestore.document("appSubscriptions/{subId}/userSubs/{uid}")
  .onWrite(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onAccessUpdateFunc")) {
        return;
      }

      // const gameId: string = context.params.gameId;
      const uid: string = context.params.uid;
      const data = snapshot.after.data() as UserAppSubscription;

      if (data.paidPeriodEndsOn) {
        await mixpanel.people.set(
          uid,
          {
            paidPeriodEndsOn: new Date(data.paidPeriodEndsOn),
            ...(data.lastPaidUnix
              ? { lastPaidUnix: new Date(data.lastPaidUnix) }
              : {}),
          },
          { $ignore_time: true },
        );
      }

      return;

      // console.log("collectionId", collectionId);
      // console.log("viewId", viewId);
    } catch (error) {
      console.error(error);
    }
  });
