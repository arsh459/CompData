import * as functions from "firebase-functions";
import * as cors from "cors";
import {
  getAllUserRanks,
  //   getUserActivitiesCalories,
} from "../../../models/Activity/getUtils";
// import { updateUserTotalFp } from "../../../models/User/Methods";
import {
  ALPHABET_GAME,
  CHALLENGE_ONE,
  FAT_BURNER_CHALLENGE,
  FAT_BURNER_GAME,
  RUNNER_GAME,
  STUDENT_OLYMPICS,
  TEAM_ALPHABET_GAME,
  WOMENS_GAME,
} from "../../../constants/challenge";
// import { UserInterface } from "../../../models/User/User";
import { fpUpdateHandler } from "./main";
import { UserRank } from "../../../models/Activity/Activity";

// import { getTask } from "../../../models/Task/getUtils";
// import { userBadgeProg } from "../../FirestoreTriggers/onBadgeProgressUpdate/userBadgeProg";
// import { badgeProgressUpdater } from "../../FirestoreTriggers/onBaseTaskWrite/BadgeUpdater";

const corsHandler = cors({ origin: true });
export const allUserFPUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const games = [
          TEAM_ALPHABET_GAME,
          ALPHABET_GAME,
          RUNNER_GAME,
          WOMENS_GAME,
          CHALLENGE_ONE,
          FAT_BURNER_CHALLENGE,
          FAT_BURNER_GAME,
          STUDENT_OLYMPICS,
        ];

        const uids: { [uid: string]: boolean } = {};
        const userList: UserRank[] = [];
        // const teams: { [teamId: string]: sbEventInterface } = {};
        // const teamEnrolledIds: { [teamId: string]: string[] } = {};

        for (const gameId of games) {
          const usersRanks = await getAllUserRanks(gameId);
          for (const user of usersRanks) {
            if (!uids[user.uid]) {
              uids[user.uid] = true;
              userList.push(user);
            }
          }
        }

        const sorted = userList.sort(function (a, b) {
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

        // reconcile pts
        let i: number = 0;
        for (const rank of sorted) {
          if (i > 659) {
            await fpUpdateHandler(rank.uid);
          }

          console.log(i, rank.authorName);

          i++;
        }

        return response.status(200).send({ status: "success" });

        // return response.status(400).send({ error: "failed" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });

/**
 * activities -> credits
 * myPurchases -> spends
 *
 * reconcile once.
 *
 * onActUpdate -> updateCredits, userFP
 * onPurchaseUpdate -> updateSpends, userFP
 *
 * credit = 12 + (-prev + new)
 * debits = 10 + (-prev + new)
 *
 * credits
 * spends
 * userFP
 *
 *
 */
