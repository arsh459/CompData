import * as functions from "firebase-functions";
import * as cors from "cors";
import { getActivityById } from "../../../../models/Activity/getUtils";
import { getUserById } from "../../../../models/User/Methods";
import {
  getDateBucket,
  getTimezone,
} from "../../onActivityUpdateV2/dateBucket";
import { handleUserRecommendationProgress } from "../../onBadgeProgressUpdate/userRecProgressV2";

const corsHandler = cors({ origin: true });

export const onActivityTestFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid, activityId } = request.body as {
          uid?: string;
          activityId?: string;
        };

        if (uid && activityId) {
          const now = await getActivityById(uid, activityId);
          const user = await getUserById(uid);
          if (user && now?.createdOn) {
            const tzStr = getTimezone(user);
            console.log("timezone", user.uid, tzStr);

            const dateBucket = getDateBucket(tzStr, now.createdOn);
            console.log("date", user.uid, dateBucket);

            const nowFP = Math.round((now?.calories ? now.calories : 0) / 300);

            await handleUserRecommendationProgress(
              user,
              nowFP,
              0,
              now,
              dateBucket,
            );
          }
        }

        response.status(200).send({ status: "success" });

        return;
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ status: "failed", reason: "Invalid request" });
      }
    });
  });
