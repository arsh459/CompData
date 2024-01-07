import { saveRankedCoaches } from "../../../models/Activity/coachCreateUtils";
import {
  rankCoachesWrapper,
  refreshCoachHandlerV3,
} from "../../../models/Activity/coachCreateUtilsV3";
import { saveRankedUsers } from "../../../models/Activity/createUtils";
import { getAllUserRanks } from "../../../models/Activity/getUtils";

import {
  getQueueTaskObjects,
  updateQueueTaskObjects,
} from "../../../models/ActivityQueue/createUtils";
import { aggregateQueueTasks } from "../../../models/ActivityQueue/handleQueue";
import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
import { handlePrizeSummaryV2 } from "../../FirestoreTriggers/onActivityWrite/handlePrizeSummaryV2";
import { incrementForGames } from "./incrementForGame";
import {
  getAllCoachUsers,
  handleUserRankingWrapper,
  replaceDuplicateRanks,
} from "./utils";
import * as functions from "firebase-functions";

/**
 * TaskQueue
 * uid: NetChange
 * get week, month, day to change
 * execute change
 */

// 601 + 20000
export const handleActivityQueue = async () => {
  // get taskQueue
  const pendingTasks = await getQueueTaskObjects();

  const gameDeltas = aggregateQueueTasks(pendingTasks);
  // console.log("gameDeltas", gameDeltas);

  // console.log("pendingTasks", pendingTasks);

  if (pendingTasks.length) {
    // loop over active games
    for (const game of Object.keys(gameDeltas)) {
      const userDeltas = gameDeltas[game];
      // console.log("userDeltas", userDeltas);

      const { after, nbMembers, sprints, rounds, nbWorkoutsToCount } =
        await getEventMetrics(game);

      if (after && sprints && rounds) {
        // updated ranks for game
        const updatedRanks = await incrementForGames(
          game,
          userDeltas,
          sprints,
          rounds,
          after,
        );

        // throw new Error("ERROR");

        // if ranks are there to update
        if (updatedRanks.length) {
          const allRanks = await getAllUserRanks(game);
          functions.logger.log("remote count:", allRanks.length);
          const replacedRanks = replaceDuplicateRanks(allRanks, updatedRanks);
          functions.logger.log("post replacement count:", replacedRanks.length);

          const allUsersRanked = handleUserRankingWrapper(
            replacedRanks,
            after,
            rounds,
            sprints,
          );
          functions.logger.log("post ranking count:", allUsersRanked.length);

          ///// COACHES //////
          const { coachTeamRanks, coachUsers } =
            getAllCoachUsers(allUsersRanked);

          functions.logger.log("coaches from func:", coachUsers.length);
          for (const coachUID of Object.keys(coachTeamRanks)) {
            functions.logger.log(
              "coaches members",
              coachUID,
              coachTeamRanks[coachUID].length,
            );
          }

          const refreshedCoaches = await refreshCoachHandlerV3(
            game,
            coachUsers,
            coachTeamRanks,
            nbWorkoutsToCount,
            // after,
            // sprintLength,
            // roundLength,
          );
          functions.logger.log(
            "COACHES after refresh",
            refreshedCoaches.length,
          );
          const reRankedCoaches = rankCoachesWrapper(
            refreshedCoaches,
            rounds,
            sprints,
          );
          functions.logger.log("COACHES after ranking", reRankedCoaches.length);
          ///// COACHES //////

          //// SAVE USERS COACHES ////
          await saveRankedUsers(allUsersRanked, game);
          await saveRankedCoaches(reRankedCoaches, game);
          //// SAVE USERS COACHES ////

          ///// PRIZES /////
          await handlePrizeSummaryV2(
            game,
            allUsersRanked,
            reRankedCoaches,
            nbMembers,
            true,
            // sprints,
            // rounds,
          );
          ///// PRIZES /////
        }
      }
    }

    //// TASK STATE ////
    await updateQueueTaskObjects(pendingTasks, "SUCCESS");
    //// TASK STATE ////
  }
};
