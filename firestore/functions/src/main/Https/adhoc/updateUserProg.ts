import * as functions from "firebase-functions";
import * as cors from "cors";
import { TEAM_ALPHABET_GAME } from "../../../constants/challenge";
import { getAllUserRanks } from "../../../models/Activity/getUtils";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { getEventMetricsForEventObj } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
// import { updateUserProgressForBadge } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";

// import { handleNewUserRank } from "../../FirestoreTriggers/onUserUpdate/handleNewUserRank";

const corsHandler = cors({ origin: true });
export const updateUserProgFunc = functions
  .region("asia-south1")
  //   .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      const gameId = TEAM_ALPHABET_GAME;

      const userList = await getAllUserRanks(gameId);
      const game = await getSbEventById(gameId);
      const { after, sprints } = getEventMetricsForEventObj(game);

      const userRanks = userList.sort(function (a, b) {
        if (a.authorName && b.authorName) {
          if (a.authorName < b.authorName) {
            return -1;
          }
          if (a.authorName > b.authorName) {
            return 1;
          }
        } else if (a.authorName) {
          return 1;
        } else if (b.authorName) {
          return -1;
        }

        return 0;
      });

      const badges: string[] = [
        "47e708aa-5045-473d-9abd-456df478d17a",
        "85c13380-a744-4d9f-bb66-25ec7bcc9f46",
        "911d0f8a-feea-4e00-9635-55c9bc8a423b",
        "cf7add71-e2cf-4a1d-9378-2ba6c6188799",
      ];

      let i: number = 0;
      for (const userRank of userRanks) {
        const dayPts = userRank.dayPointObj;
        if (dayPts && sprints && after) {
          //   console.log("game start", new Date(after));
          for (const badgeId of badges) {
            // await updateUserProgressForBadge(userRank.uid, badgeId, [
            //   TEAM_ALPHABET_GAME,
            // ]);

            i++;
            console.log(i, userRank.authorName, badgeId);
          }
        }
      }

      return response.status(200).send({ status: "Success" });
    });
  });
