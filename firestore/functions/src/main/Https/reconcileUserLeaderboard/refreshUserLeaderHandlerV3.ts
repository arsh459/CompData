import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
import { CoachRank, UserRank } from "../../../models/Activity/Activity";
import {
  rankCoachesPoints,
  reRankUsers_FitPoints,
} from "../../../models/Activity/handleRanking";
import { saveRankedUsers } from "../../../models/Activity/createUtils";
import {
  reRankUsers_month_FitPointsV2,
  reRankUsers_week_FitPointsV2,
} from "../../../models/Activity/handleRankingV2";
import { createRankTaskList } from "./rankTaskList";
import { reconcileUserTask } from "./reconcileUserTask";
import { updateUserTask } from "./updateUserTask";
import * as functions from "firebase-functions";
// import { summariseKPIHandler } from "../summariseKPIs/summariseHandler";
import { getChildEvents } from "../../../models/sbEvent/getUtils";
import { getUserById } from "../../../models/User/Methods";
import {
  // reconcileCoachV2,
  reconcileCoachV3,
  saveRankedCoaches,
} from "../../../models/Activity/coachCreateUtils";
import { mapRanksToTeam, reconcileCoachAndUser } from "./reconcileCoachAndUser";
import {
  reRankCoaches_month_FitPointsV2,
  reRankCoaches_week_FitPointsV2,
} from "../../../models/Activity/handleCoachRankingV2";

// 601 + 20000
export const refreshUserLeaderHandlerV3 = async (
  eventId: string,
  roundId?: string,
  sprintId?: string,
  // refresh: "LAST_ROUND_ONLY" | "ALL",
) => {
  const newRanks: UserRank[] = [];
  const nowTime = Date.now();
  const { challengeLength, after, before, sprints, rounds, nbWorkoutsToCount } =
    // o(1) 1
    await getEventMetrics(eventId);

  const tasks = await createRankTaskList(eventId);
  // const tasks = tasksI.filter(
  // (i) => i.uid === "wuGFclCATefa70eJyGpeRktuKOw1",
  // ||
  // i.uid === "QWUQA0H1cwdSG8H8oxdYPDbViiI2" ||
  // i.uid === "SxE6kmsHtXPOmZPdmG18avRwNNH2" ||
  // i.uid === "Nx7E4TVY7GdFxJDTPPa8y5oYTQF2",
  // );
  // throw new Error("HI");

  functions.logger.info(
    "USER READ:",
    tasks.length,
    // sprints,
    // rounds,
    after,
    before,
  );

  let actReadsTotal: number = 0;
  if (sprints && rounds && after) {
    // loop if basic things are available
    for (const task of tasks) {
      functions.logger.info(
        "TASK:",
        task.action,
        " | ",
        task.rank?.authorName,
        " | ",
        task.uid,
        " | ",
        task.team?.name,
        " | ",
        task.rank?.gender,
      );
      // user has left
      if (task.action === "NO_CHANGE" && task.rank) {
        newRanks.push(task.rank);
      } else if (task.action === "RECONCILE" && task.team) {
        // functions.logger.warn("RECONCILING USER:", task.uid, task.team?.name);
        const recRank = await reconcileUserTask(
          task.rank,
          task.uid,
          task.team,
          sprints,
          rounds,
          after,
          nowTime,
          before,
          challengeLength,
          eventId,
          task.coach,
        );

        if (recRank) newRanks.push(recRank);
      } else if (task.action === "UPDATE" && task.team && task.rank) {
        const recRank = await updateUserTask(
          task.rank,
          task.team,
          sprints,
          rounds,
          after,
          nowTime,
          before,
          challengeLength,
          eventId,
          task.coach,
          roundId,
        );

        // if (task.uid === "Ng3E1hNiBGdlk4vkq6DFDgOcqn43") {
        // console.log(
        //   "recRank",
        //   recRank?.userRank.authorName,
        //   recRank?.userRank.monthActPts,
        // );
        // console.log(
        //   "recRank2",
        //   recRank?.userRank.authorName,
        //   recRank?.userRank.monthPointObj,
        // );
        // throw new Error("BREAK");
        // }

        if (recRank) {
          newRanks.push(recRank.userRank);
          actReadsTotal += recRank.actReads;
        }
      } else {
        functions.logger.warn(
          "UNHANDLED CONDITION:",
          task.action,
          task.uid,
          task.team?.name,
          task.rank?.authorName,
        );
      }
    }

    functions.logger.info("ACTIVITY UPDATE READS", actReadsTotal);

    // const newRanksG = newRanks.filter((item) => item.gender === "female");
    // console.log("newRanks", newRanks.length);

    const mappedUserRanks = mapRanksToTeam(newRanks);
    // console.log("mappedUserRanks", Object.keys(mappedUserRanks).length);

    ////
    //// COACH RECONCILE ///
    ////
    const newCoachRanks: CoachRank[] = [];
    const childEvents = await getChildEvents(eventId);
    for (const childEvent of childEvents) {
      const owner = childEvent.ownerUID;

      const coachTeamMembers = mappedUserRanks[owner];

      const coach = await getUserById(owner);
      if (coach && after && sprints && rounds && coachTeamMembers) {
        const newCoachRank = reconcileCoachV3(
          eventId,
          owner,
          coach,
          after,
          childEvent.id,
          childEvent.name,
          childEvent.eventKey ? childEvent.eventKey : "",
          coachTeamMembers,
          nbWorkoutsToCount,
        );

        // console.log("newCoachRank", newCoachRank.monthPointObj);
        // console.log("newCoachRank2", newCoachRank.monthActPts);

        newCoachRanks.push(newCoachRank);
      }
    }
    ///////
    ///////
    ///////

    // console.log(
    //   "newCoachRanks",
    //   newCoachRanks[0].monthActPts["month-6"].length,
    // );
    //////
    ////// fix trusted values
    // console.log("newCoachRanks", newCoachRanks.length);
    const fixedRanks = reconcileCoachAndUser(newCoachRanks, newRanks);
    // console.log("fixedRanks", fixedRanks.length);

    // throw new Error("Break");
    // for (const ind of fixedRanks) {
    // console.log("pts", ind.authorName);
    // console.log(ind.monthPointObj);

    // console.log("act", ind.authorName);
    // console.log(ind.monthActPts);
    // }
    // console.log("f", fixedRanks[0].monthActPts["month-6"].length);
    // console.log("f", fixedRanks[1].monthActPts["month-6"].length);
    //////
    //////

    ////
    //// RANKING ///
    ////
    const reRanked = reRankUsers_FitPoints(fixedRanks);
    // console.log("reRanked", reRanked.length);

    const reRankedWeek = reRankUsers_week_FitPointsV2(reRanked, rounds);
    // console.log("reRankedWeek", reRankedWeek.length);

    const monthlyRanked = reRankUsers_month_FitPointsV2(
      reRankedWeek,
      after,
      sprints,
    );
    // console.log("monthlyRanked", monthlyRanked.length);

    ////// COACHES
    const reRankedCoaches_interim = rankCoachesPoints(newCoachRanks);

    const reRankedCoaches_current = reRankCoaches_week_FitPointsV2(
      reRankedCoaches_interim,
      // after,
      rounds,
      // COACH_WEEKLY_PRIZES,
    );

    const reRankedFinalCoaches = reRankCoaches_month_FitPointsV2(
      reRankedCoaches_current,
      // after,
      sprints,
    );

    // if (task.uid === "Ng3E1hNiBGdlk4vkq6DFDgOcqn43") {
    //   // console.log("recRank", recRank);
    // throw new Error("BREAK");
    // }

    // kpi update
    // if (sprintId) {
    // for (const userRank of monthlyRanked) {
    //   console.log(
    //     userRank.uid,
    //     " | ",
    //     userRank.authorName,
    //     " | ",
    //     userRank.gender,
    //     " | ",
    //     userRank.teamName,
    //   );
    // }

    // const shreya = monthlyRanked.filter(
    //   (item) => item.uid === "blvJ95rzEUSMGoxQ6e4N5BAcCZ43",
    // );

    // console.log("shreya", shreya);

    // throw new Error("HI");

    // for (const rank of monthlyRanked) {
    //   for (const sprint of sprints) {
    //     const selRanks: UserRank[] = [];

    // if (rank && rank.monthlyRank && rank.monthlyRank[sprint.id] <= 10) {
    //   if (sprint.id === "month-16") selRanks.push(rank);
    // }

    // const selRanksS = selRanks.sort(
    //   (a, b) => a.monthlyRank[sprint.id] - b.monthlyRank[sprint.id],
    // );

    //     for (const rank of selRanksS) {
    //       console.log(
    //         rank.uid,
    //         "|",
    //         sprint.id,
    //         "|",
    //         rank.authorName,
    //         "|",
    //         rank.gender,
    //         "|",
    //         rank.monthlyRank[sprint.id],
    //         "|",
    //         rank.monthPointObj ? rank.monthPointObj[sprint.id] : "-",
    //       );
    //     }
    //   }
    // }

    // console.log("BREAK");
    // console.log("BREAK");

    // for (const rank of reRankedFinalCoaches) {
    //   for (const sprint of sprints) {
    //     const selRanks: (UserRank | CoachRank)[] = [];

    //     if (rank && rank.monthlyRank && rank.monthlyRank[sprint.id] <= 10) {
    //       if (sprint.id === "month-6") {
    //         selRanks.push(rank);
    //       }
    //     }

    //     const selRanksS = selRanks.sort(
    //       (a, b) => a.monthlyRank[sprint.id] - b.monthlyRank[sprint.id],
    //     );

    //     for (const rank of selRanksS) {
    //       console.log(
    //         sprint.id,
    //         "|",
    //         rank.teamName,
    //         "|",
    //         rank.monthlyRank[sprint.id],
    //         "|",
    //         rank.monthPointObj ? rank.monthPointObj[sprint.id] : "-",
    //       );
    //     }
    //   }
    // }

    //   for (const round of rounds) {
    //     if (rank && rank.weeklyRank && rank.weeklyRank[round.id] <= 10) {
    //       console.log(
    //         round.id,
    //         "|",
    //         rank.authorName,
    //         "|",
    //         rank.weeklyRank[round.id],
    //         "|",
    //         rank.weekPointObj ? rank.weekPointObj[round.id] : "-",
    //       );
    //     }
    //   }
    // }

    // throw new Error("PAUSED");

    await saveRankedUsers(monthlyRanked, eventId);
    await saveRankedCoaches(reRankedFinalCoaches, eventId);
  }
};
