import * as functions from "firebase-functions";
import * as cors from "cors";
import { removeUserFromTeam } from "./removeUserFromTeam";
import { removeFromTeam } from "./interface";

const corsHandler = cors({ origin: true });
export const removeFromTeamFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { eventId, uid } = request.body as removeFromTeam;
        if (eventId && uid) {
          const status = await removeUserFromTeam(uid, eventId);

          if (status === "success")
            return response.status(200).send({ status: "success" });
        }

        return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
