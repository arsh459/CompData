// import * as functions from "firebase-functions";
// import * as cors from "cors";
import {
  getAllUserRanks,
  getUserActivityAfter,
} from "../../../models/Activity/getUtils";
// import { FAT_BURNER_GAME, RUNNER_GAME } from "../../../constants/challenge";
import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
import {
  // getChallengeEndTime,
  // getCurrentSprint,
  getSprintTimeForId,
} from "../../FirestoreTriggers/onActivityWrite/utils";
// import { getDaysElapsed } from "../../../models/Prizes/getStreakPrizeV2";
import { filterActivities } from "../../../models/Prizes/getStreakPrizeV3";
// import { ActivityKPIScore } from "../../../models/Activity/Activity";
import { kpiRankUpdate } from "../../../models/Activity/kpiRankUpdate";
import { KPIValue } from "../../../models/Task/Task";

export const seedDataFunc = async (eventId: string, sprintId: string) => {
  //   const eventId = RUNNER_GAME;

  const now = Date.now();

  const { sprints, after } = await getEventMetrics(eventId);

  if (after && sprints) {
    // const daysElapsed = getDaysElapsed(
    //   after,
    //   getChallengeEndTime(now, before, challengeLength),
    // );

    // const sprintId = getCurrentSprint(daysElapsed, sprints);

    const time = getSprintTimeForId(after, sprints, sprintId);

    // console.log("sprintId", sprintId, new Date(time));
    // throw new Error("HI");

    if (time !== -1) {
      // get all
      const allRanks = await getAllUserRanks(eventId);
      for (const rank of allRanks) {
        // get fps
        const fps = rank.monthPointObj ? rank.monthPointObj[sprintId] : 0;

        // console.log("time", time);

        // get workouts
        const pastActs = await getUserActivityAfter(rank.uid, time, now);

        const actsAllowed = await filterActivities(pastActs, eventId, rank.uid);

        const positiveFpActs = actsAllowed.filter(
          (item) => item.calories && item.calories >= 300,
        );

        // get level
        const lvl = rank.userLevelV2;

        const kpi: KPIValue = {};
        kpi.user_level = lvl ? lvl : 0;
        kpi.fit_points = fps ? fps : 0;
        kpi.nb_workouts = positiveFpActs.length;

        console.log("kpi", kpi);

        await kpiRankUpdate(eventId, rank.uid, kpi, sprintId);
      }
    }
  }
};
