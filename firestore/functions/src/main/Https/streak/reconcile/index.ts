import * as functions from "firebase-functions";
import * as cors from "cors";
// import { reconcileMain } from "./main";

const corsHandler = cors({ origin: true });

export const reconcileStreakFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid, streakId } = request.body as {
          uid?: string;
          streakId?: string;
        };

        console.log("uid", uid, streakId);

        response.status(200).send({ status: "success" });
        return;

        // if (uid) {
        //   const status = await reconcileMain(uid, streakId);

        //   if (status) {
        //     response.status(200).send({ status: "success" });
        //   } else {
        //     response.status(500).send({
        //       status: "failed",
        //       reason: "Unhandled Server condition",
        //     });
        //   }
        // } else {
        //   response.status(500).send({
        //     status: "failed",
        //     reason: "No UID or streakId present",
        //   });
        // }

        // console.log("request");

        // return;
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ status: "failed", reason: "Invalid request" });
      }
    });
  });
