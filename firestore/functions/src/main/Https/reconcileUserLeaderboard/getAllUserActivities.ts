import * as functions from "firebase-functions";
import * as cors from "cors";
import {
  getUserActivities,
  getUserActivityAfter,
} from "../../../models/Activity/getUtils";
import { getUserById } from "../../../models/User/Methods";
import { Activity } from "../../../models/Activity/Activity";

export interface UserActivity extends Activity {
  uid: string;
  name: string;
  email: string;
  phone: string;

  link: string;
}

const corsHandler = cors({ origin: true });
export const getAllUserActivitiesFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const { uid, limit, unix } = request.body as userActivityQuery;

        const returnSummary: UserActivity[] = [];
        if (uid && limit) {
          const user = await getUserById(uid);
          if (user) {
            let activities: Activity[] = [];
            if (unix) {
              activities = await getUserActivityAfter(
                uid,
                unix,
                unix + 24 * 60 * 60 * 1000,
              );
            } else {
              activities = await getUserActivities(uid, limit);
            }

            for (const act of activities) {
              returnSummary.push({
                ...act,
                uid: user?.uid,
                name: user.name ? user.name : "",
                phone: user.phone ? user.phone : "",
                email: user.email ? user.email : "",
                link: act.games?.length
                  ? act.games
                      .map(
                        (item) =>
                          `https://socialboat.live/feed/${item}?postId=${act.postId}`,
                      )
                      .join(", ")
                  : "",
              });
            }
          }
        }

        return response
          .status(200)
          .send({ status: "success", data: returnSummary });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
