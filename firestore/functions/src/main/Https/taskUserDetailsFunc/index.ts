import * as functions from "firebase-functions";
import * as cors from "cors";
import { getUserById } from "../../../models/User/Methods";
import { getFormattedDateForUnix } from "../../PubSub/activityTracker/utils";
import { getAllActivitiesForTask } from "../../../models/Activity/getUtils";
import { UserInterface } from "../../../models/User/User";
import { getGameName } from "./utils";

interface ActivityUserTaskDump {
  uid: string;
  activityId: string;
  phone: string;
  name?: string;
  email: string;

  activityName?: string;
  calories?: number;
  fitPoints?: number;

  source?: string;
  link: string;

  games: string;
  startDate: string;
  startTime: string;
  startUNIX: number;
}

const corsHandler = cors({ origin: true });
export const taskUserDetailsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const { taskId } = request.body as { taskId: string };

        const allActivities = await getAllActivitiesForTask(taskId);

        // let i: number = 0;
        const users: { [uid: string]: UserInterface } = {};
        const returnSummary: ActivityUserTaskDump[] = [];
        for (const act of allActivities) {
          if (!users[act.authorUID]) {
            const user = await getUserById(act.authorUID);
            if (user) {
              users[act.authorUID] = user;
            }
          }

          const sbUser = users[act.authorUID];

          returnSummary.push({
            uid: sbUser?.uid ? sbUser.uid : "no uid",
            name: sbUser?.name ? sbUser.name : "no name",
            phone: sbUser?.phone ? sbUser.phone : "",
            email: sbUser?.email ? sbUser.email : "",
            games: act.games?.length
              ? act.games.map((item) => getGameName(item)).join(", ")
              : "",
            link: act.games?.length
              ? act.games
                  .map(
                    (item) =>
                      `https://socialboat.live/feed/${item}?postId=${act.postId}`,
                  )
                  .join(", ")
              : "",
            activityId: act.id ? act.id : act.postId,
            calories: act.calories ? act.calories : 0,
            fitPoints: act.fitPointsV2 ? act.fitPointsV2 : 0,
            startDate: act.createdOn
              ? getFormattedDateForUnix(act.createdOn)
              : "-",
            startUNIX: act.createdOn ? act.createdOn : 0,
            activityName: act.activityName ? act.activityName : "untitled",
            source: act.source ? act.source : "unknown",
            startTime: act.createdOn
              ? getFormattedDateForUnix(act.createdOn, "hh:mma YYYY-MM-DD")
              : "-",
          });

          //   i++;
        }

        // console.log("returnSummary", returnSummary);

        return response
          .status(200)
          .send({ status: "success", data: returnSummary });
      } catch (error) {
        console.log(error);
        return response
          .status(400)
          .send({ error: "Invalid request", data: [] });
      }
    });
  });
