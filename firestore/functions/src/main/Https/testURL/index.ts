import * as functions from "firebase-functions";
import * as cors from "cors";
// import {
//   getChildEvents,
//   getSbEventsInList,
// } from "../../../models/sbEvent/getUtils";
// import { getUserById, getUsersForEvent } from "../../../models/User/Methods";
// import { sendHSM } from "../../../models/Conversations/sendHSM";
// import { whatsappChannelId } from "../messagebird/constants/identifiers";
// import { morningNotificationV2 } from "../../../models/Reminders/whatsapp/morningV2";
// import { newPostReminder_whatsapp } from "../../../models/Reminders/whatsapp/postReminder";
// import { postReplyMessage } from "../../../models/Reminders/whatsapp/postReplyMessage";
// import { eveningNotificationV2 } from "../../../models/Reminders/whatsapp/eveningNotificationV2";
// import { firestore } from "firebase-admin";
// import { handleExpiringConv } from "../../PubSub/messagebird/endOfChat/handleExpiringConversation";
// import { ConversationInterface } from "../../../models/Conversations/Conversation";
// import { getContact } from "../../../models/Conversations/sendUtils";
// import { sendMessageToConversation } from "../../../models/Conversations/sendUtils";
// import {
//   //   toRahulPhone,
//   toSwapnilPhone,
//   //   toRahulPhone,
//   //   toSwapnilPhone,
//   //   toSwapnilPhone,
// } from "../../../constants/email/contacts";
// import { whatsappChannelId } from "../messagebird/constants/identifiers";
// import { handleNewConversation } from "./handleNewConversation";
// import { newConversationMessageBird } from "../interface";
// import * as admin from "firebase-admin";

const corsHandler = cors({ origin: true });
export const testFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // await morningNotificationV2(
        //   "3c6584f7-7235-4f94-9005-ebc9395fef49",
        //   "6896e807-72b5-4351-af39-75059c18c7b3",
        // );

        // await newPostReminder_whatsapp({
        //   authorId: "lHhuSVKMAZbj86xg8m6ubZqKdUj2",
        //   communityId: "EYlRJkX5KpcsPCzdn1WrFJJRLUc2",
        //   createdOn: 1643811033534,
        //   eventId: "3c6584f7-7235-4f94-9005-ebc9395fef49",
        //   id: "26b3fbcc-0939-469b-9ef7-005c986e6750",
        //   postId: "3bb4f87a-8a02-4158-ac45-1526e768674a",
        //   scheduledAt: 1643811153534,
        //   templateId: "new_post_user",
        //   state: "PENDING",
        // });

        // await postReplyMessage(
        //   "3c6584f7-7235-4f94-9005-ebc9395fef49",
        //   "3bb4f87a-8a02-4158-ac45-1526e768674a",
        //   "50338101-7c03-4e64-814e-2b08206d03c5",
        //   undefined,
        // );

        // await eveningNotificationV2(
        //   "3c6584f7-7235-4f94-9005-ebc9395fef49",
        //   "6896e807-72b5-4351-af39-75059c18c7b3",
        // );

        // const currDate = new Date().getTime();
        // const oneDay = currDate - 24 * 60 * 60 * 1000;
        // const oneDay_10Minutes = oneDay + 10 * 60 * 1000;

        // const conversationsToExpire = await firestore()
        //   .collection("conversations")
        //   .where("updatedUnix", ">=", oneDay)
        //   .where("updatedUnix", "<=", oneDay_10Minutes)
        //   .get();

        // console.log("conversationsToExpire", conversationsToExpire.docs.length);

        // for (const conv of conversationsToExpire.docs) {
        //   if (conv.exists) {
        //     // console.log("conv.data()", conv.data());
        //     await handleExpiringConv(conv.data() as ConversationInterface);
        //   }
        // }

        // const sbEvents = await getSbEventsInList([
        //   "00ec36a1-6eac-4924-a0eb-c40bbe7c409b",
        // ]);

        // const membersSent: { [id: string]: boolean } = {};
        // for (const parentEvent of sbEvents) {
        //   const childEvents = await getChildEvents(parentEvent.id);

        //   let i: number = 0;
        //   for (const child of childEvents) {
        //     const coach = await getUserById(child.ownerUID);
        //     const allMembers = await getUsersForEvent(child.id);
        //     // console.log("child", child.name);
        //     for (const member of allMembers) {
        //       if (!membersSent[member.uid]) {
        //         if (member.phone && coach?.name) {
        //           // if (i >= 14) {
        //           // console.log("will push", member.name);
        //           await sendHSM(
        //             member.phone,
        //             whatsappChannelId,
        //             "how_to_post",
        //             [
        //               {
        //                 default: member.name
        //                   ? `${member.name.trim()}`
        //                   : "there",
        //               },
        //               {
        //                 default:
        //                   "https://www.youtube.com/playlist?list=PLFkXhbX4PMHawABRwv-tANaMtZ5O6AI0u",
        //               },
        //               {
        //                 default: coach.name ? `${coach.name.trim()}` : "",
        //               },
        //             ],
        //           );
        //           // } else {
        //           // console.log("ignored", member.name);
        //           // }

        //           // console.log("member.phone", member.name);
        //           membersSent[member.uid] = true;
        //         }
        //       }
        //     }

        //     i += 1;
        //   }
        // }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        functions.logger.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
