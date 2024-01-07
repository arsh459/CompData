import * as functions from "firebase-functions";
import * as cors from "cors";
import { triggerUpdates } from "../../PubSub/activityTracker/triggerUpdates";
import { getUserById } from "../../../models/User/Methods";
import {
  get1159Adder,
  getDayStartIST,
} from "../../PubSub/activityTracker/utils";

const corsHandler = cors({ origin: true });
export const reconcileTerraDayUserFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 360 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const result: { uid: string; day: string } = request.body;

        // console.log("here", result);

        if (result.uid && result.day) {
          const user = await getUserById(result.uid);

          const now = new Date(result.day);
          console.log("now", now);

          const dayStartUnix = getDayStartIST(now.getTime());
          console.log("dayStartUnix", dayStartUnix);

          if (user) {
            const userStatus = await triggerUpdates(
              [user],
              dayStartUnix,
              dayStartUnix + get1159Adder(),
              false,
            );

            console.log("userStatus", userStatus);

            return response
              .status(200)
              .send({ status: "success", details: userStatus });
          }
        }

        // console.log("result", result.type, result?.data?.length);

        return response.status(400).send({ status: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ status: "failed" });
      }
    });
  });
