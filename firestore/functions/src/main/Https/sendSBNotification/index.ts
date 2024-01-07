import * as functions from "firebase-functions";
import * as cors from "cors";
import { sendNotification } from "../../../utils/notifications";
import { RemoteNotifeeData } from "../../../models/Notifications/interface";
import { updateNotificationUserDB } from "../../../models/Notifications/updateNotificationUserDB";
import { parseNotifeeData } from "../../../models/Notifications/createNotification";

const corsHandler = cors({ origin: true });

// export type notificationTypeSB = "text" | "image" | "message";

export const sendSBNotificationFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid, notifeeData } = request.body as {
          uid?: string;
          // notifType?: notificationTypeSB;
          notifeeData?: RemoteNotifeeData;
        };

        // console.log("uid", uid);

        // push notification
        if (uid && notifeeData) {
          const parsedNotData = parseNotifeeData(notifeeData);
          // console.log("parsedNot", parsedNotData);
          await sendNotification(uid, parsedNotData);

          // create notification obj /users/uid/notifee/notifeeID
          await updateNotificationUserDB(uid, parsedNotData);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
