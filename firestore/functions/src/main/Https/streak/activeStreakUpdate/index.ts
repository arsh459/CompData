import * as functions from "firebase-functions";
import * as cors from "cors";
import { activeStreakMain } from "./main";

const corsHandler = cors({ origin: true });

export const activeStreakFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid } = request.body as {
          uid?: string;
          streakId?: string;
        };
        if (uid ) {
          const status = await activeStreakMain(uid);

          if (status) {
            response.status(200).send({ status: "success" });
          } else {
            response.status(500).send({
              status: "failed",
              reason: "Unhandled Server condition",
            });
          }
        } else {
          response.status(500).send({
            status: "failed",
            reason: "No UID present",
          });
        }

        // console.log("request");

        return;
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ status: "failed", reason: "Invalid request" });
      }
    });
  });



// to update only active streaks on their last date for given uid

/**
 * input - uid
 *
 * output - for that uid, gets active streak and updates last date to figure out streak status
 *
 *
 */
