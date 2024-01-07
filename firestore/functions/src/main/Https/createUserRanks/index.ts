import * as functions from "firebase-functions";
import * as cors from "cors";
import {
  getChildEvents,
  getSbEventById,
} from "../../../models/sbEvent/getUtils";
import { getUsersForEvent } from "../../../models/User/Methods";
import { getUserRankForUID } from "../../../models/Activity/getUtils";
import { handleNewUserRank } from "../../FirestoreTriggers/onUserUpdate/handleNewUserRank";

const corsHandler = cors({ origin: true });
export const createUserRanksFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      const parentId = "00ec36a1-6eac-4924-a0eb-c40bbe7c409b";

      const parentEvent = await getSbEventById(parentId);

      if (parentEvent) {
        const childEvents = await getChildEvents(parentEvent.id);
        for (const childEvent of childEvents) {
          const users = await getUsersForEvent(childEvent.id);

          for (const user of users) {
            const userRank = await getUserRankForUID(parentEvent.id, user.uid);

            // console.log("userRank", userRank);
            if (!userRank) {
              //   console.log("here");
              await handleNewUserRank(childEvent.id, user);
            }

            console.log("user", user.name, user.phone);
          }
        }
      }
      try {
        return response.status(200).send({ status: "success" });
      } catch (error) {
        functions.logger.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
