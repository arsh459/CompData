import * as functions from "firebase-functions";
import * as cors from "cors";
import { handleWorkoutEventInterface } from "./interface";
import { handleWorkoutFinish } from "../../../models/Reminders/whatsapp/handleWorkoutFinish";

const corsHandler = cors({ origin: true });
export const handleEventEndFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const result: handleWorkoutEventInterface = request.body;

        if (
          result.liveId &&
          result.seriesId &&
          result.streamId &&
          result.workoutType &&
          result.parentId &&
          result.communityId &&
          result.authorId
        ) {
          await handleWorkoutFinish(
            result.parentId,
            result.authorId,
            result.communityId,
            result.seriesId,
            result.liveId,
            result.streamId,
            result.workoutType,
          );

          return response.status(200).send({ status: "Success" });
        }

        return response.status(400).send({ status: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ status: "failed" });
      }
    });
  });
