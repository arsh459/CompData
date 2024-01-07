import * as functions from "firebase-functions";
import { getZohoData } from "../../../models/zoho/getUtils";
import { refreshZohoTokenRequest } from "../../../models/zoho/refreshToken";
import { sendHSMV2 } from "../../../models/Conversations/sendHSMV2";
import { toRahulPhone } from "../../../constants/email/contacts";
// import { handleDayNotification } from "../morning/handleMorningNotifications";

export const refreshZohoCronFunc = functions
  .region("asia-south1")
  .pubsub.schedule("*/30 * * * *") // every 30 minutes
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      const zoho = await getZohoData();
      const now = Date.now();

      if (zoho?.expiresAt && zoho.expiresAt < now) {
        await sendHSMV2(toRahulPhone, "new_tech_issue", ["zoho token refresh"]);
      }

      // if token will expire in 30 minutes
      if (zoho?.expiresAt && now + 31 * 60 * 1000 > zoho.expiresAt) {
        await refreshZohoTokenRequest(zoho);
      }
    } catch (error) {
      console.log("zoho cron");
    }
    return null;
  });
