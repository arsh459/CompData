import * as functions from "firebase-functions";
import * as cors from "cors";
import { generatorTrigger } from "../../PubSub/recGenerator/main";
// import { mainTaskGenerator } from "./main";
// import { sendNotification } from "../../../utils/notifications";
// import { RemoteNotifeeData } from "../../../models/Notifications/interface";
// import { updateNotificationUserDB } from "../../../models/Notifications/updateNotificationUserDB";
// import { parseNotifeeData } from "../../../models/Notifications/createNotification";

const corsHandler = cors({ origin: true });

// export type notificationTypeSB = "text" | "image" | "message";

export const refreshAllUserRecsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        await generatorTrigger();
        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
