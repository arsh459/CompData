import * as functions from "firebase-functions";
import * as cors from "cors";
// import { addToGCPQueue } from "../../FirestoreTriggers/onActivityQueueEnter/handleTaskQueue";
// import { FAT_BURNER_GAME } from "../../../constants/challenge";
// import { ActivityQueueItem } from "../../../models/ActivityQueue/ActivityQueue";
import { handleActivityQueue } from "./refreshUserLeaderboardV2Inc";
// import { getPendingTasks } from "../../../models/Reminders/getUtils";
// import { handleReminders } from "../../../models/Reminders/handleReminders";
// import { sendHSM } from "../../../models/Conversations/sendHSM";
// import { whatsappChannelId } from "../messagebird/constants/identifiers";

const corsHandler = cors({ origin: true });
export const activityQueueRequestFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // const project: string = JSON.parse(
        //   process.env.FIREBASE_CONFIG!,
        // ).projectId;

        // const queueItem = request.body as ActivityQueueItem;
        // functions.logger.log("request", Object.keys(queueItem));
        // console.log("request", body);
        // const body = request.body as userLeaderQuery;

        // await addToGCPQueue([
        //   {
        //     id: "test",
        //     state: "PENDING",
        //     createdOn: Date.now(),
        //     previousCalories: 0,
        //     nowCalories: 300,
        //     gameId: FAT_BURNER_GAME,
        //     effectiveUnix: Date.now(),
        //     action: "RECONCILE_USER",
        //     activityId: "",
        //     uid: "",
        //   },
        // ]);

        //   functions.logger.log("remindersToSend", remindersToSend.length);

        await handleActivityQueue();

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
