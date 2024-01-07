import * as functions from "firebase-functions";
import * as cors from "cors";
import { createManagementTokenFunc } from "./createManagementToken";
import { createRoom, getPreviousRoom } from "./createRoom";
import { createAppToken } from "./createAppToken";
import { getUserById, updateUserRoom } from "../../../models/User/Methods";
// import { getTask } from "../../../models/Task/getUtils";
// import { userBadgeProg } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";
// import { badgeProgressUpdater } from "../../FirestoreTriggers/onBaseTaskWrite/BadgeUpdater";

const corsHandler = cors({ origin: true });
export const hundredMSInitFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const { uid, description } = request.body as {
          uid?: string;
          description?: string;
        };

        if (uid && description) {
          const token = await createManagementTokenFunc();

          const prevUser = await getUserById(uid);

          // console.log("token", token, uid, description);
          let previousRoomId: string | null = null;
          if (prevUser?.hmsRoomId) {
            const previousRoomResp = await getPreviousRoom(
              prevUser.hmsRoomId,
              token,
            );
            if (previousRoomResp?.id) {
              previousRoomId = previousRoomResp?.id;
            }
          }

          // console.log("pre", previousRoom);

          // throw new Error("hi");

          if (!previousRoomId) {
            const resp = await createRoom(
              token,
              uid,
              description,
              "6336cb80233d8ee3fc150624",
            );

            previousRoomId = resp.id;
          }

          if (previousRoomId) {
            // update room ID
            await updateUserRoom(uid, previousRoomId);

            const appToken = createAppToken(uid, previousRoomId);

            return response
              .status(200)
              .send({ status: "success", roomId: previousRoomId, appToken });
          }
        }

        // console.log("resp", resp);
        //   const status = await removeUserFromTeam(uid, eventId);

        //   if (status === "success")
        return response.status(400).send({ error: "Invalid request" });
        // }

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
