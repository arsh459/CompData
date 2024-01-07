import { Activity, UserRank } from "../../../models/Activity/Activity";
import { getAllUserRanks } from "../../../models/Activity/getUtils";
import {
  flipRankObj,
  getUserRankObj,
  saveRankedUsers,
  updateActivityInRankObj,
} from "../../../models/Activity/createUtils";
import {
  reRankUsers,
  reRankUsers_distance,
  reRankUsers_speed,
  reRankUsers_streak,
  reRankUsers_week,
} from "../../../models/Activity/handleRanking";
import { UserInterface } from "../../../models/User/User";
import { handleCoachRankingUpdate } from "./handleCoachRankingUpdate";
import { getUserById } from "../../../models/User/Methods";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { getEventMetrics } from "./getEventMetrics";
import { handlePrizeSummary } from "./handlePrizeSummary";
import { judgeCriterion } from "../../../models/sbEvent/sbEvent";

export const handleActivityUpdateWrapper = async (
  prev: Activity,
  now: Activity,
  user: UserInterface,
) => {
  if (user.enrolledEvents) {
    const parentEventIdsUpdated: { [parentId: string]: boolean } = {};
    for (const eventId of user.enrolledEvents) {
      // console.log("eventId", eventId);
      const remoteEvent = await getSbEventById(eventId);
      if (
        remoteEvent &&
        remoteEvent.parentId && // event has a parent event
        remoteEvent.eventType === "challenge" &&
        !parentEventIdsUpdated[remoteEvent.parentId] // one update per parent
      ) {
        // console.log("parentId", remoteEvent.parentId); 08030cb5-a972-4084-a0f0-9e686689509f

        const {
          after,
          before,
          calCriterion,
          nbMembers,
          calThForStreak,
          challengeLength,
          streakLengthTh,
          judgeCrit,
          state,
        } = await getEventMetrics(remoteEvent.parentId);

        // console.log("state", state);
        console.log("after", after, "event update");

        if (
          after &&
          state === "active" &&
          before > after &&
          now.createdOn &&
          now.createdOn > after &&
          now.createdOn < before
        ) {
          console.log("after", after, "event update here");
          parentEventIdsUpdated[remoteEvent.parentId] = true;

          const returnObj = await handleActivityUpdate(
            prev,
            now,
            user,
            calCriterion,
            after,
            before,
            calThForStreak,
            challengeLength,
            streakLengthTh,
            remoteEvent.parentId,
            remoteEvent.ownerUID,
            remoteEvent.id, // coachEventId
            judgeCrit,
          );

          if (returnObj?.rankedCoaches && returnObj.reRankedUsers && after) {
            await handlePrizeSummary(
              remoteEvent.parentId,
              returnObj.reRankedUsers,
              returnObj?.rankedCoaches,
              calCriterion,
              after,
              nbMembers,
              true,
              judgeCrit,
              challengeLength,
            );
          }
        }
      }
    }
  }
};

export const handleActivityUpdate = async (
  prev: Activity,
  now: Activity,
  user: UserInterface,
  calCriterion: number,
  after: number,
  before: number,
  th: number,
  challengeLength: number,
  streakLength: number,
  eventId: string,
  communityId: string,
  coachEventId: string,
  judgeCrit: judgeCriterion,
  //   coach: UserInterface,
) => {
  // get all user rankings for event
  const userRanks = await getAllUserRanks(eventId);

  // add activity data
  const userRankObj = getUserRankObj(userRanks, now.authorUID);
  const newUserRankObj_unranked = await updateActivityInRankObj(
    prev,
    now,
    user,
    after,
    before,
    th,
    challengeLength,
    streakLength,
    eventId,
    coachEventId,
    "",
    communityId,
    userRankObj,
  );

  if (newUserRankObj_unranked) {
    const newRankObjs = flipRankObj(userRanks, newUserRankObj_unranked);

    // update rank objs for all user
    const reRankedUsers = reRankUsers(newRankObjs as UserRank[]);
    const reRankedUsersWithStreak = reRankUsers_streak(reRankedUsers);
    const reRankedUsersWithSpeed = reRankUsers_speed(reRankedUsersWithStreak);
    const reRankedUsersWithWeek = reRankUsers_week(
      reRankedUsersWithSpeed,
      after,
      7,
    );
    const reRankedUsersWithDistance = reRankUsers_distance(
      reRankedUsersWithWeek,
    );

    await saveRankedUsers(reRankedUsersWithDistance, eventId);

    const coach = await getUserById(communityId);
    if (coach && userRankObj) {
      const rankedCoaches = await handleCoachRankingUpdate(
        eventId,
        userRankObj,
        newUserRankObj_unranked,
        coach,
        calCriterion,
        judgeCrit,
        after,
        reRankedUsersWithDistance,
      );

      return {
        reRankedUsers,
        rankedCoaches,
      };
    }
  }

  return;
};
