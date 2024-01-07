import * as functions from "firebase-functions";
import * as cors from "cors";
// import { mainTaskGenerator } from "./main";
import { singleDayGenerator } from "./singleDayGenerator";
// import { sendNotification } from "../../../utils/notifications";
// import { RemoteNotifeeData } from "../../../models/Notifications/interface";
// import { updateNotificationUserDB } from "../../../models/Notifications/updateNotificationUserDB";
// import { parseNotifeeData } from "../../../models/Notifications/createNotification";

const corsHandler = cors({ origin: true });

// export type notificationTypeSB = "text" | "image" | "message";

export const dayTaskGeneratorFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid, date, type, badgeId } = request.body as {
          uid?: string;
          type?: "nutrition" | "workout";
          date?: string;
          badgeId?: string;
        };

        // push notification
        if (uid && date && type) {
          await singleDayGenerator(uid, date, type, badgeId);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
