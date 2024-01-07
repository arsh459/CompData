import * as functions from "firebase-functions";
import * as cors from "cors";
// import { removeUserFromTeam } from "./removeUserFromTeam";
import { moveUserToNewTeam } from "./interface";
import { addUserToTeam } from "./addUserToTeam";

const corsHandler = cors({ origin: true });
export const moveUserToOtherTeamFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { newTeamId, uid, gameId } = request.body as moveUserToNewTeam;
        console.log("r", request.body, request.params);
        if (uid && newTeamId && gameId) {
          console.log("here", uid, newTeamId, gameId);
          const status = await addUserToTeam(gameId, uid, newTeamId);

          console.log("status", status);

          if (status === "success") {
            return response.status(200).send({ status: "success" });
          }
        }

        return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
