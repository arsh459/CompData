import * as functions from "firebase-functions";
import * as cors from "cors";
// import { getDaysElapsed } from "../../../models/Prizes/getStreakPrizeV2";
// import { getUserById } from "../../../models/User/Methods";
import {
  // ALPHABET_GAME,
  // RUNNER_GAME,
  WOMENS_GAME,
  // FAT_BURNER_GAME,
  // RUNNER_GAME,
  // WOMENS_GAME,
} from "../../../constants/challenge";
import {
  getChildEvents,
  //   getSbEventById,
} from "../../../models/sbEvent/getUtils";
import { getAllUserRanksForCoach } from "../../../models/Activity/getUtils";
import { updateUserSubscription } from "../../../models/User/Methods";
import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
// import { getCurrentSprint } from "../../FirestoreTriggers/onActivityWrite/utils";
// import { triggerPastUpdates } from "../../PubSub/activityTracker/triggerUpdates";
// import { handleNewUserRank } from "../../FirestoreTriggers/onUserUpdate/handleNewUserRank";

const corsHandler = cors({ origin: true });
export const alotSubscriptionFunc = functions
  .region("asia-south1")
  //   .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // const result: { uid: string } = request.body;

        const games = [WOMENS_GAME];
        const sprintId = "month-1";
        const sprintToCheckPoints = "month-0";

        for (const gameId of games) {
          const { after, sprints } = await getEventMetrics(gameId);

          console.log("after", after, sprints);

          if (after && sprints) {
            // const now = Date.now();

            // const days = getDaysElapsed(after, now);
            // const sprintId = getCurrentSprint(days, sprints);

            // console.log("days", days, sprintId);
            if (sprintId) {
              const teams = await getChildEvents(gameId);
              for (const team of teams) {
                const userRanksForCoach = await getAllUserRanksForCoach(
                  gameId,
                  team.ownerUID,
                );

                for (const userRank of userRanksForCoach) {
                  const prevSprintPts = userRank.monthPointObj
                    ? userRank.monthPointObj[sprintToCheckPoints]
                    : 0;

                  if (prevSprintPts) {
                    console.log(userRank.uid);
                    await updateUserSubscription(
                      userRank.uid,
                      gameId,
                      sprintId,
                    );
                  }

                  // if (userRank.uid === "lHhuSVKMAZbj86xg8m6ubZqKdUj2") {
                  // await updateUserSubscription(userRank.uid, gameId, sprintId);
                  // const chars = userRank.monthPointObj
                  //   ? Object.values(userRank.monthPointObj)
                  //   : [];
                  // console.log("u", Object.values(userRank.monthPointObj));
                  // console.log("user", chars, userRank.authorName);
                  // }
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
