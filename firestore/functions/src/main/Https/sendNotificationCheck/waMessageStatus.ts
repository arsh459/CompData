import * as functions from "firebase-functions";
import * as cors from "cors";
import { interaketResponse } from "./interface";
import { updateSend } from "../mixpanel/getUtils";
import {
  trackMarketingNotificationDelivered,
  trackMarketingNotificationFail,
  trackMarketingNotificationRead,
  trackMarketingNotificationSend,
} from "../../FirestoreTriggers/onUserUpdate/updateFPConv";
import { handleWebhookResponse } from "../../PubSub/notifications/handleUpdateResponse";

// import { sendHSMV2 } from "../../../models/Conversations/sendHSMV2";

const corsHandler = cors({ origin: true });
export const messageStatusFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // console.log("Hi I am here");

        const reqP = request.body as interaketResponse;

        console.log("type", reqP.type);
        console.log("messageId", reqP.data?.message?.id);

        // console.log("callback data", reqP.data?.message?.meta_data);

        const callbackData = handleWebhookResponse(reqP);

        if (reqP.data?.message?.id)
          if (reqP.type === "message_api_sent") {
            await updateSend(reqP.data?.message?.id, "sent");

            if (callbackData) {
              // mixpanel track
              await trackMarketingNotificationSend(
                callbackData.mixpanel_distinct_id,
                callbackData.notificationId,
                callbackData.cohortId,
              );
            }
          } else if (reqP.type === "message_api_delivered") {
            await updateSend(reqP.data?.message?.id, "delivered");

            if (callbackData) {
              // mixpanel track
              await trackMarketingNotificationDelivered(
                callbackData.mixpanel_distinct_id,
                callbackData.notificationId,
                callbackData.cohortId,
              );
            }
          } else if (reqP.type === "message_api_read") {
            await updateSend(reqP.data?.message?.id, "read");

            if (callbackData) {
              // mixpanel track
              await trackMarketingNotificationRead(
                callbackData.mixpanel_distinct_id,
                callbackData.notificationId,
                callbackData.cohortId,
              );
            }
          } else if (reqP.type === "message_api_failed") {
            console.log("FAILED RESPONSE", reqP);

            await updateSend(reqP.data?.message?.id, "failed");

            if (callbackData) {
              // mixpanel track
              await trackMarketingNotificationFail(
                callbackData.mixpanel_distinct_id,
                callbackData.notificationId,
                callbackData.cohortId,
              );
            }
          }

        // await sendHSMV2("+919811800046", "what_is_sb_1", ["Rahul"], undefined, [
        //   "https://sbvideolibrary.s3.ap-south-1.amazonaws.com/Greesha/Day-1/what_is_sb.png",
        // ]);

        // return
        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(500).send({ error: "Invalid request" });
      }
    });
  });
