import * as functions from "firebase-functions";
import * as cors from "cors";
// import { getUserById } from "../../../models/User/Methods";
// import { triggerPastUpdates } from "../../PubSub/activityTracker/triggerUpdates";
// import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { getAllUserRanks } from "../../../models/Activity/getUtils";
import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
// import { getStreakPrize } from "../../../models/Prizes/getStreakPrize";
import {
  reconcileUser_activities,
  saveRankedUsers,
} from "../../../models/Activity/createUtils";
import { getUserById } from "../../../models/User/Methods";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { UserRank } from "../../../models/Activity/Activity";
import {
  reRankUsers,
  reRankUsers_streak,
} from "../../../models/Activity/handleRanking";
// import { handleNewUserRank } from "../../FirestoreTriggers/onUserUpdate/handleNewUserRank";

const corsHandler = cors({ origin: true });
export const reconcileLeaderboardFunc = functions
  .region("asia-south1")
  //   .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      const parentId = "c0897a45-bf7f-4a93-99df-ae3dd612924d";

      const {
        after,
        before,
        // calCriterion,
        // nbMembers,
        calThForStreak,
        challengeLength,
        streakLengthTh,
        // judgeCrit,
        state,
      } = await getEventMetrics(parentId);

      const parentEvent = await getSbEventById(parentId);

      if (state === "active" && after && parentEvent) {
        const userRanks = await getAllUserRanks(parentId);

        const updatedUserRanks: UserRank[] = [];
        for (const userRank of userRanks) {
          const user = await getUserById(userRank.uid);

          if (user) {
            // const remoteEvent = await getSbEventById(userRank.coachEventId);

            const rec = await reconcileUser_activities(
              parentId,
              user,
              calThForStreak,
              challengeLength,
              streakLengthTh,
              after,
              before,
              userRank.coachCommunityId,
              userRank.coachEventId,
              "",
            );

            if (rec) {
              updatedUserRanks.push(rec);

              console.log("rec", rec?.authorName, rec?.totalCalories);
              console.log("dayObj", rec?.dayCalObj);
              console.log("");
              console.log("");
              //   console.log("rec", rec);
            }
          }

          //   console.log("userRank", numStreaks, userRank.authorName);
          //   console.log("remoteActivitiesObj", remoteActivitiesObj);
        }

        // console.log("userRanks", userRanks);

        const reRanked = reRankUsers(updatedUserRanks);
        const reRankedFinal = reRankUsers_streak(reRanked);

        await saveRankedUsers(reRankedFinal, parentEvent.id);

        // console.log("reRanked", reRanked);
      }

      try {
        return response.status(200).send({ status: "Success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
