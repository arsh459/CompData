import * as functions from "firebase-functions";
import * as cors from "cors";
import { getChildEvents } from "../../../models/sbEvent/getUtils";
import { getFormattedDateForUnix } from "../../PubSub/activityTracker/utils";
import { getAllUserRanksForCoach } from "../../../models/Activity/getUtils";
import { getUserById } from "../../../models/User/Methods";

export interface TeamDump {
  memberUID: string;
  teamName: string;
  userPhone: string;
  userEmail: string;
  userName: string;
  // email: string;
  teamId: string;
  teamCoach: string;

  fetchedOnDate: string;
  fetchedOnTime: string;
}

const corsHandler = cors({ origin: true });
export const getAllTeamDumpFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const body = request.body as userLeaderQuery;

        const now = new Date().getTime();

        const returnSummary: TeamDump[] = [];
        if (body.eventId) {
          const childEvents = await getChildEvents(body.eventId);
          for (const childEvent of childEvents) {
            if (childEvent.enrolledUserUIDs) {
              for (const enrolledUID of childEvent.enrolledUserUIDs) {
                const user = await getUserById(enrolledUID);

                returnSummary.push({
                  memberUID: enrolledUID,
                  teamName: childEvent.name,
                  teamId: childEvent.id,
                  teamCoach: childEvent.ownerUID,

                  userName: user?.name ? user.name : "",
                  userPhone: user?.phone ? user.phone : "",
                  userEmail: user?.email ? user.email : "",

                  fetchedOnDate: getFormattedDateForUnix(now),
                  fetchedOnTime: getFormattedDateForUnix(
                    now,
                    "hh:mma YYYY-MM-DD",
                  ),
                });
              }
            } else {
              const allUsers = await getAllUserRanksForCoach(
                body.eventId,
                childEvent.id,
              );

              for (const user of allUsers) {
                const userFetch = await getUserById(user.uid);

                returnSummary.push({
                  memberUID: user.uid,
                  teamName: childEvent.name,
                  teamId: childEvent.id,
                  teamCoach: childEvent.ownerUID,

                  userName: userFetch?.name ? userFetch.name : "",
                  userPhone: userFetch?.phone ? userFetch.phone : "",
                  userEmail: userFetch?.email ? userFetch.email : "",

                  fetchedOnDate: getFormattedDateForUnix(now),
                  fetchedOnTime: getFormattedDateForUnix(
                    now,
                    "hh:mma YYYY-MM-DD",
                  ),
                });
              }
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
