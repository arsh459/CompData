import * as functions from "firebase-functions";
import * as cors from "cors";
import { FAT_BURNER_GAME } from "../../../constants/challenge";
import { seedDataFunc } from "./seedDataFunc";

const corsHandler = cors({ origin: true });
export const seedUserDataFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const eventId = FAT_BURNER_GAME;
        const sprintId = "month-3";

        await seedDataFunc(eventId, sprintId);

        return response.status(200).send({ status: "success" });
      } catch (error) {
        functions.logger.error(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
