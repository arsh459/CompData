// import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
// import { ConversationInterface } from "../../../../models/Conversations/Conversation";
// import { handleExpiringConv } from "./handleExpiringConversation";
// import {getUserLeads} from '../../../models/Lead/Methods/getUtils';
// import {getAllNotificationsForUser} from '../../../models/Notifications/Methods';
// import {getUserTrips} from '../../../models/Trip/Methods/getUtils';
// import { UserInterface } from "../../../models/User/User";

export const cronExpiryMessageFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .pubsub.schedule("*/10 * * * *")
  .onRun(async () => {
    try {
      // const currDate = new Date().getTime();
      // const oneDay = currDate - 24 * 60 * 60 * 1000;
      // const oneDay_10Minutes = oneDay + 10 * 60 * 1000;
      // const conversationsToExpire = await firestore()
      //   .collection("conversations")
      //   .where("updatedUnix", ">=", oneDay)
      //   .where("updatedUnix", "<=", oneDay_10Minutes)
      //   .get();
      // for (const conv of conversationsToExpire.docs) {
      //   if (conv.exists) {
      //     await handleExpiringConv(conv.data() as ConversationInterface);
      //   }
      // }
    } catch (error) {
      console.log("Not updating Views");
    }
    return null;
  });
