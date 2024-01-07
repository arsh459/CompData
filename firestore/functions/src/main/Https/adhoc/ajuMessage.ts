import * as functions from "firebase-functions";
import * as cors from "cors";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { getUserById, getUsersForEvent } from "../../../models/User/Methods";
import { getWorkoutSeriesForEventId } from "../../../models/Workout/getUtils";
import {
  getTodaysWorkoutsForAllSeries,
  sendPaidMessage,
} from "../../PubSub/morning/paidWorkout";
import { getFormattedDateForUnix } from "../../PubSub/activityTracker/utils";

// import { handleNewUserRank } from "../../FirestoreTriggers/onUserUpdate/handleNewUserRank";

const corsHandler = cors({ origin: true });
export const ajuMessageFunc = functions
  .region("asia-south1")
  //   .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const ajuEvent = await getSbEventById(
          // "7e5313b8-187e-471e-a723-14e0f261b40c",
          "1e672724-e2e6-4ee8-89c8-459d155d603e",
        );

        const parentId = "00ec36a1-6eac-4924-a0eb-c40bbe7c409b";

        if (ajuEvent) {
          const aju = await getUserById(ajuEvent?.ownerUID);
          const allMembers = await getUsersForEvent(ajuEvent.id);

          const workoutSeries = await getWorkoutSeriesForEventId(ajuEvent.id);

          const { seriesLives } = await getTodaysWorkoutsForAllSeries(
            workoutSeries,
          );

          for (const member of allMembers) {
            for (const seriesId of Object.keys(seriesLives)) {
              const todaysLives = seriesLives[seriesId];
              for (const live of todaysLives) {
                if (
                  // member.phone === "+919811800046" &&
                  // live.name.includes("Demo") &&
                  live.slots &&
                  member.phone &&
                  member.name &&
                  aju?.userKey &&
                  aju.name &&
                  workoutSeries.length > 0
                ) {
                  for (const slot of live.slots) {
                    const time = new Date(slot).getTime();
                    const dtString = getFormattedDateForUnix(time, "h:mmA");

                    console.log(
                      "member",
                      member.name,
                      dtString,
                      live.name,
                      live.liveKey,
                    );

                    await sendPaidMessage(
                      member.phone,

                      member.name,
                      dtString,
                      aju?.userKey,
                      aju?.name,
                      workoutSeries[0],
                      parentId,
                      live,
                    );

                    // break;
                  }
                }
              }
            }
          }
        }

        return response.status(200).send({ status: "Success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
