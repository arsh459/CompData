import * as functions from "firebase-functions";
import * as cors from "cors";
import { LocationResp } from "./interface";
import { getUserById, saveTrResponse } from "../../../models/User/Methods";
// import { getUserById, updateUserRoom } from "../../../models/User/Methods";
// import { getTask } from "../../../models/Task/getUtils";
// import { userBadgeProg } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";
// import { badgeProgressUpdater } from "../../FirestoreTriggers/onBaseTaskWrite/BadgeUpdater";

const corsHandler = cors({ origin: true });
export const locationFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const resp = request.body as LocationResp;
        // const { uid } = request.params as { uid?: string };

        // console.log("resp", resp);
        // console.log("uid", uid);

        // console.log("req", request.body);
        // console.log("params", request.params);

        if (resp.uid) {
          const user = await getUserById(resp.uid);

          if (user) {
            await saveTrResponse(user.uid, {
              ...resp,
              unix: new Date(resp.location.timestamp).getTime(),
            });
          }
        }

        // console.log("resp", resp);
        //   const status = await removeUserFromTeam(uid, eventId);

        //   if (status === "success")
        return response.status(200).send({ status: "success" });
        // }

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
