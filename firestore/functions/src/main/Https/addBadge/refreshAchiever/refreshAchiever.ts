import * as functions from "firebase-functions";
import * as cors from "cors";
import { getUserById } from "../../../../models/User/Methods";

export type achievementPace =
  | "1_month"
  | "2_months"
  | "3_months"
  | "4_months"
  | "6_months"
  | "just_for_fun";

export type difficulty = "Easy" | "Medium" | "Not Easy" | "Hard";

const corsHandler = cors({ origin: true });
export const refreshAchieverForUserFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid, achieverId } = request.body as {
          uid?: string;
          achieverId?: string;
          // pace?: difficulty;
          // endpoint?: "v2";
        };

        // if (uid && pace) {
        //   const user = await getUserById(uid);

        //   if (user) {
        //     await badgeAdderFunc(user, uid, pace);
        //   }
        // } else

        if (uid) {
          const user = await getUserById(uid);

          if (user) {
            console.log("achieverId", achieverId);
          }
        }

        return response.status(200).send({ status: "success" });

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

/**
 * createAchiever if not active
 *
 *
 */
