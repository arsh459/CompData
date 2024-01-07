import {
  getTodaysWorkoutsForAllSeries,
  handlePaidDaily,
} from "../../../main/PubSub/morning/paidWorkout";
import { unpaidWorkoutDaily } from "../../../main/PubSub/morning/unpaidWorkout";
import { UserRank } from "../../Activity/Activity";
import { getRankForUser } from "../../Activity/getUtils";
import { getSbEventById } from "../../sbEvent/getUtils";
import { sbEventInterface } from "../../sbEvent/sbEvent";
import { getUserById, getUsersForEvent } from "../../User/Methods";
import { UserInterface } from "../../User/User";
import { getWorkoutSeriesForEventId } from "../../Workout/getUtils";
import { getSeriesIds, isPaidUserV2 } from "./morningUtils";

export const morningNotificationV2 = async (
  eventId: string,
  parentId: string,
) => {
  const childEvent = await getSbEventById(eventId);
  // console.log("childEvent", childEvent);

  if (childEvent) {
    // console.log("eventId here", childEvent.id);
    await handleMorningNotificationForChildEventV2(
      childEvent,
      // after,
      // before,
      parentId,
      // top2,
      // templateId,
    );
  }

  return true;
};

export const handleMorningNotificationForChildEventV2 = async (
  childEvent: sbEventInterface,
  // after: number,
  // before: number,
  parentId: string,
  // top2: UserRank[],
  // templateId: whatsappTemplates,
) => {
  // loop over all challenges && find members of each
  const allMembers = await getUsersForEvent(childEvent.id);
  // console.log("all", allMembers.length);
  const workoutSeries = await getWorkoutSeriesForEventId(childEvent.id);
  // console.log("workoutSeries", workoutSeries.length);
  const { seriesLives, seriesWorkouts, seriesObj, classesToday } =
    await getTodaysWorkoutsForAllSeries(workoutSeries);

  // console.log("seriesLives", Object.keys(seriesLives));
  // console.log("seriesWorkouts", Object.keys(seriesWorkouts));
  // console.log("seriesObj", Object.keys(seriesObj));

  const courseIds = getSeriesIds(workoutSeries);

  // console.log("courseIds", courseIds);

  const coach = await getUserById(childEvent.ownerUID);

  // console.log("coach", coach?.uid);

  if (coach) {
    for (const member of allMembers) {
      // console.log("member", member.name);
      // if (member.phone === "+919811800046") {
      const userRank = await getRankForUser(parentId, member.uid);
      const paidUser = isPaidUserV2(member, courseIds);

      // const paidUser = false;

      // console.log("paidUser", paidUser);

      if (paidUser && member.phone && coach.userKey && classesToday) {
        await handlePaidDaily(
          member.phone,
          // "+919811800046",
          member.name ? member.name : "",
          childEvent.name,
          coach.userKey,
          seriesLives,
          seriesWorkouts,
          seriesObj,
          coach.name ? coach.name : "coach",
          parentId,
        );

        // break;
      }

      // console.log("member", member.name);
      else if (
        !paidUser &&
        !member.unsubscribe
        // templateId === "morning_workout_reminder"
      ) {
        await handleMorningNotificationForMemberV2(
          member,
          childEvent,
          coach,
          userRank,
        );
      }
      // }
    }
  }
};

const handleMorningNotificationForMemberV2 = async (
  user: UserInterface,
  coachEvent: sbEventInterface,
  coach: UserInterface,
  userRank?: UserRank,
) => {
  await unpaidWorkoutDaily(
    coachEvent,
    user,
    userRank,
    coach.userKey,
    coach.name,
  );
};
