import * as functions from "firebase-functions";
import * as cors from "cors";
import { StepsResponse } from "./interface";
import { addStepActivities, updateSessionSteps } from "./addStepActivities";
// import { getUserById, updateUserRoom } from "../../../models/User/Methods";
// import { getTask } from "../../../models/Task/getUtils";
// import { userBadgeProg } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";
// import { badgeProgressUpdater } from "../../FirestoreTriggers/onBaseTaskWrite/BadgeUpdater";

const corsHandler = cors({ origin: true });
export const addStepsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const resp = request.body as StepsResponse;
        // const { uid } = request.params as { uid?: string };

        // console.log("resp", resp);
        // console.log("uid", uid);

        // console.log("req", request.body);
        // console.log("params", request.params);

        if (resp.uid && resp.steps && !resp.sessionId) {
          await addStepActivities(resp.uid, resp.steps);
        } else if (resp.uid && resp.steps && resp.sessionId) {
          for (const day of Object.keys(resp.steps)) {
            await updateSessionSteps(
              resp.uid,
              resp.steps[day],
              day,
              resp.sessionId,
            );
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
