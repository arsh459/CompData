import * as functions from "firebase-functions";
import * as cors from "cors";
import { getQuestionHandler } from "./mainHandler";

const corsHandler = cors({ origin: true });
export const getPeriodQuestionFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        // console.log("request");
        const { uid } = request.body as {
          uid?: string;
        };

        if (uid) {
          const questions = await getQuestionHandler(uid);

          console.log("");
          console.log("");
          console.log(questions);

          return response.status(200).send({ questions });
        }

        return response.status(400).send({ error: "Invalid request" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

/**
 * date
 *
 * periodDates <- UserMarkedDates
 *
 *
 *
 *
 */

/**
 * cycles
 * cycle {
 *
 * }
 *
 * periodDateObj {
 *
 * }
 *
 * if (noCycles){
 * oldCycles = []
 * getNewCycles -> []
 * saveNewCycles
 * }
 *
 * if (oldCyclesExixt){
 *
 * }
 *
 *
 */
