import * as functions from "firebase-functions";
import * as cors from "cors";
import { mainAddAchieversToUser } from "./main";

const corsHandler = cors({ origin: true });
export const addAchieversToUserFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid } = request.body as {
          uid?: string;
        };

        if (uid) {
          const { status, reason } = await mainAddAchieversToUser(uid);

          if (status) {
            return response.status(200).send({ status: "success" });
          } else {
            return response.status(500).send({
              error: "Internal Server Error",
              reason: reason ? reason : "failed in main function",
            });
          }
        }

        return response
          .status(400)
          .send({ error: "failed", reason: "incorrect uid or type" });
      } catch (error) {
        console.log(error);
        return response.status(500).send({
          error: "Internal Server Error",
          reason: "failed in main function",
        });
      }
    });
  });

/**
 * createAchiever if not active
 *
 *
 */
