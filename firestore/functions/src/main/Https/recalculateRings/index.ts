import * as functions from "firebase-functions";
import * as cors from "cors";
import { getUserById } from "../../../models/User/Methods";

import { handleRecalculation } from "./handleRecalculation";

const corsHandler = cors({ origin: true });
export const recalculateRingsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid } = request.body as {
          uid?: string;
        };

        if (uid) {
          const user = await getUserById(uid);

          if (user?.uid) {
            await handleRecalculation(uid, "workout", user);
            await handleRecalculation(uid, "nutrition", user);

            return response.status(200).send({});

            // if period dates exist
          }

          // save relevant information in db
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
