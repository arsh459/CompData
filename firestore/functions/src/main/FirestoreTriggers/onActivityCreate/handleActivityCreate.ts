import { Activity } from "../../../models/Activity/Activity";
import { getAllUserRanks } from "../../../models/Activity/getUtils";
import {
  getUserRankObj,
  saveRankedUsers,
} from "../../../models/Activity/createUtils";
import { UserInterface } from "../../../models/User/User";
import { handleCoachRanking } from "./handleCoachRanking";
import { getUserById } from "../../../models/User/Methods";
import { handleEngineChoice } from "./engines/main";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { getEventMetrics } from "../onActivityUpdate/getEventMetrics";
import { handlePrizeSummary } from "../onActivityUpdate/handlePrizeSummary";
import { judgeCriterion } from "../../../models/sbEvent/sbEvent";

export const handleNewActivityWrapper = async (
  activity: Activity,
  author: UserInterface,
) => {
  console.log("activity create", author.name, activity.calories);
  if (author.enrolledEvents) {
    console.log("author.enrolledEvents", author.enrolledEvents);
    const parentEventIdsUpdated: { [parentId: string]: boolean } = {};
    for (const eventId of author.enrolledEvents) {
      const remoteEvent = await getSbEventById(eventId);

      if (
        remoteEvent &&
        remoteEvent.parentId &&
        remoteEvent.eventType === "challenge" &&
        !parentEventIdsUpdated[remoteEvent.parentId] // one update per parent
      ) {
        const {
          after,
          before,
          state,
          calCriterion,
          nbMembers,
          challengeLength,
          calThForStreak,
          judgeCrit,
          streakLengthTh,
        } = await getEventMetrics(remoteEvent.parentId);

        console.log(
          `event:${remoteEvent.id}`,
          after,
          state,
          before,
          activity.createdOn,
        );

        if (
          after &&
          state === "active" &&
          before > after &&
          activity.createdOn &&
          activity.createdOn > after &&
          activity.createdOn < before
        ) {
          console.log(`event:${remoteEvent.id}`, "in if");
          parentEventIdsUpdated[remoteEvent.parentId] = true;
          const newRankObj = await handleNewActivity(
            activity,
            author,
            calCriterion,
            remoteEvent.parentId,
            remoteEvent.ownerUID,
            remoteEvent.id,
            after,
            before,
            calThForStreak,
            challengeLength,
            streakLengthTh,
            judgeCrit,
          );

          if (newRankObj?.rankedCoaches && newRankObj.reRankedUsers && after) {
            await handlePrizeSummary(
              remoteEvent.parentId,
              newRankObj.reRankedUsers,
              newRankObj.rankedCoaches,
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

export const handleNewActivity = async (
  activity: Activity,
  author: UserInterface,
  calCriterion: number,
  eventId: string,
  communityId: string,
  coachEventId: string,
  after: number,
  before: number,
  th: number,
  challengeLength: number,
  streakLength: number,
  judgeCrit: judgeCriterion,
) => {
  // get all user rankings for event
  const userRanks = await getAllUserRanks(eventId);
  console.log(`event:${eventId}`, "userRanks", userRanks.length);

  // add activity data
  const userRankObj = getUserRankObj(userRanks, activity.authorUID);

  console.log(
    `event:${eventId}`,
    "userRankObj",
    userRankObj?.totalCalories,
    userRankObj?.rank,
  );

  /////////// - Engine - ///////////
  const { reRankedUsers, newUserRankObj_unranked } = await handleEngineChoice(
    activity,
    author,
    userRankObj,
    userRanks,
    // engine,
    after,
    before,
    th,
    challengeLength,
    streakLength,
    eventId,
    coachEventId,
    communityId,
    "",
  );

  console.log(
    `event:${eventId}`,
    "newUserRankObj_unranked",
    newUserRankObj_unranked?.rank,
    newUserRankObj_unranked?.totalCalories,
  );
  /////////// - Engine - ///////////

  if (reRankedUsers && newUserRankObj_unranked) {
    await saveRankedUsers(reRankedUsers, eventId);

    console.log(`event:${eventId}`, "saved");

    const coach = await getUserById(communityId);

    console.log(`event:${eventId}`, "coach", coach?.uid);
    if (coach) {
      const rankedCoaches = await handleCoachRanking(
        eventId,
        activity,
        newUserRankObj_unranked,
        coach,
        calCriterion,
        judgeCrit,
        after,
        reRankedUsers,
        userRankObj,
      );

      console.log(`event:${eventId}`, "rankedCoaches", rankedCoaches?.length);

      return {
        rankedCoaches,
        reRankedUsers,
      };
    }
  }

  return;
};
