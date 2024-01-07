import { getUserById } from "../../../models/User/Methods";
import { getEventMetrics } from "../../FirestoreTriggers/onActivityUpdate/getEventMetrics";
import { UserRank } from "../../../models/Activity/Activity";
import { reRankUsers_FitPoints } from "../../../models/Activity/handleRanking";
import { saveRankedUsers } from "../../../models/Activity/createUtils";
import { updateActivityInRankObjV2 } from "../../../models/Activity/createUtilsV2";
import { FIT_POINT_TH } from "../../../constants/challenge";
import { getChildEvents } from "../../../models/sbEvent/getUtils";
import {
  reRankUsers_month_FitPointsV2,
  reRankUsers_week_FitPointsV2,
} from "../../../models/Activity/handleRankingV2";
import {
  getChallengeEndTime,
  getEndActivityRange,
  getEventJoinTeam,
} from "../../FirestoreTriggers/onActivityWrite/utils";
import { getDaysElapsed } from "../../../models/Prizes/getStreakPrizeV2";

// 601 + 20000
export const refreshUserLeaderHandlerV2 = async (
  eventId: string,
  // refresh: "LAST_ROUND_ONLY" | "ALL",
) => {
  const newRanks: UserRank[] = [];
  const nowTime = Date.now();
  const {
    challengeLength,
    after,
    before,
    // sprintLength,
    // roundLength,
    sprints,
    rounds,
  } =
    // o(1) 1
    await getEventMetrics(eventId);

  // o(nTeams) 100
  const childEvents = await getChildEvents(eventId);

  const reconciledIDs: { [uid: string]: boolean } = {};
  for (const childEvent of childEvents) {
    // O(coach) 100
    const coach = await getUserById(childEvent.ownerUID);
    if (childEvent.enrolledUserUIDs)
      for (const id of childEvent.enrolledUserUIDs) {
        // o(member) 400
        const user = await getUserById(id);

        if (user && !reconciledIDs[user.uid] && after && sprints && rounds) {
          const eventJoinTime = getEventJoinTeam(user, id, after);

          const daysElapsed = getDaysElapsed(
            after,
            getChallengeEndTime(nowTime, before, challengeLength),
          );

          // console.log(
          //   "days",
          //   daysElapsed,
          //   eventJoinTime,
          //   "challengeLength",
          //   challengeLength,
          //   after,
          //   "sprintLength",
          //   sprintLength,
          //   "roundLength",
          //   roundLength,
          // );

          // throw new Error("HI");

          // console.log("rounds", rounds);
          // console.log("sprints", sprints);
          const newRank = await updateActivityInRankObjV2(
            user,
            after,
            daysElapsed,
            eventId,
            childEvent.id,
            childEvent.ownerUID,
            FIT_POINT_TH,
            childEvent.name
              ? childEvent.name
              : coach
              ? `${coach.name}'s team`
              : "Unnamed team",
            childEvent.eventKey ? childEvent.eventKey : "",
            eventJoinTime,
            getEndActivityRange(nowTime, before, challengeLength),
            sprints,
            rounds,
            // refresh,
          );

          // console.log("newRank", newRank);

          if (newRank) {
            newRanks.push(newRank);

            // if (newRank.uid === "EAey9AA6D1f9jP67hdAp1XDKsEz1") {
            //   console.log(newRank);
            //   throw new Error("HI");
            // }

            if (childEvent.id === "0cd2a340-5c6d-4d87-9c62-20f31257dc6f") {
              console.log("newRank", newRank.authorName);
              console.log("newRank", newRank.weekPointObj);
              console.log("newRank", newRank.dayPointObj);
              console.log("");
            }

            // console.log(
            //   // "New User:",
            //   user.name,
            //   newRank.teamName,
            //   newRank?.fitPointsV2,
            //   newRank.userLevelV2,
            //   // newRank.dayPointObj,
            //   newRank.weekPointObj,
            //   newRank.monthPointObj,
            // );
          }

          reconciledIDs[user?.uid] = true;
        }
      }

    if (childEvent.id === "0cd2a340-5c6d-4d87-9c62-20f31257dc6f") {
      throw new Error("PAUSED");
    }
  }

  // throw new Error("PAUSED");

  // console.log("after", after);
  // console.log("before", before);

  // const userRanks = await getAllUserRanks(eventId);
  // console.log("userRanks", userRanks.length);

  // for (const userRank of userRanks) {
  //   const user = await getUserById(userRank.uid);

  //   if (user && after) {
  //     const newRank = await updateActivityInRankObjV2(
  //       user,
  //       after,
  //       before,
  //       challengeLength,
  //       eventId,
  //       userRank.coachEventId,
  //       userRank.coachCommunityId,
  //       FIT_POINT_TH,
  //     );

  //     if (newRank) {
  //       newRanks.push(newRank);

  //     }
  //   }
  // }

  if (after && rounds && sprints) {
    // for (const newRank of newRanks) {
    //   console.log(newRank);
    // }

    const reRanked = reRankUsers_FitPoints(newRanks);

    console.log("reRanked");
    const reRankedWeek = reRankUsers_week_FitPointsV2(
      reRanked,
      // after,
      rounds,
      // USER_WEEKLY_PRIZES,
    );

    console.log("reRankedWeek");

    const monthlyRanked = reRankUsers_month_FitPointsV2(
      reRankedWeek,
      after,
      sprints,
    );

    console.log("monthlyRanked");

    // for (const newRank of reRankedWeek) {
    // console.log(newRank);
    // }

    // throw new Error("hi");

    // save(users)
    await saveRankedUsers(monthlyRanked, eventId);
  }
};
