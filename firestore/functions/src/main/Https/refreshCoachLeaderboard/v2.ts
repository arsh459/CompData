import * as functions from "firebase-functions";
import * as cors from "cors";
import { refreshCoachesHandlerV2 } from "./refreshCoachesHandlerV2";

// import { UserInterface } from "../../../../models/User/User";

const corsHandler = cors({ origin: true });
export const refreshCoachLeaderboardV2Func = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const body = request.body as challengeLeaderQuery;

        // const newRanks: CoachRank[] = [];
        if (body.eventId) {
          await refreshCoachesHandlerV2(body.eventId);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        functions.logger.error(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
