import { getEventMetricsForEventObj } from "../../../main/FirestoreTriggers/onActivityUpdate/getEventMetrics";
import {
  // getCurrentRound,
  getCurrentSprint,
} from "../../../main/FirestoreTriggers/onActivityWrite/utils";
import {
  // sendMissingYouNotification,
  sendWorkoutCreateNotification,
  // sendWorkoutUpdateNotification,
} from "../../../main/PubSub/morning/workoutUpdate";
import { UserRank } from "../../Activity/Activity";
import {
  // filterActivitiesForEvent,
  getRankForUser,
  getTopNUserRanksInMonth,
  // getTopNUserRanksInWeek,
  // getUserActivityAfter,
} from "../../Activity/getUtils";
import { getDaysElapsed } from "../../Prizes/getStreakPrizeV2";
import { getSbEventById } from "../../sbEvent/getUtils";
import {
  RoundObject,
  sbEventInterface,
  SprintObject,
} from "../../sbEvent/sbEvent";
import { getUserById, getUsersForEvent } from "../../User/Methods";
import { UserInterface } from "../../User/User";
import { getProgressForTask, updateUIDForReminder } from "../getUtils";
import { ReminderProgress, whatsappTemplates } from "../Reminder";

export const morningNotification = async (
  id: string,
  eventId: string,
  // after: number,
  // before: number,
  parentId: string,
  templateId: whatsappTemplates,
) => {
  const uidsDone = await getProgressForTask(id);

  const childEvent = await getSbEventById(eventId);
  const parentEvent = await getSbEventById(parentId);
  // const top2 = await getTopNUserRanks(parentId, 2);

  const { after, rounds, sprints, before } =
    getEventMetricsForEventObj(parentEvent);
  // console.log(
  //   "eventId here",
  //   childEvent?.id,
  //   parentEvent?.eventStarts,
  //   parentEvent?.sprintLength,
  //   parentEvent?.roundLength,
  // );

  if (
    childEvent &&
    after &&
    rounds &&
    sprints &&
    parentEvent?.name
    // parentEvent?.configuration?.starts &&
    // parentEvent.configuration?.rounds
    // parentEvent?.roundLength
  ) {
    // console.log("eventId here", childEvent.id);
    await handleMorningNotificationForChildEvent(
      childEvent,
      after,
      before,
      rounds,
      sprints,
      // parentEvent.roundLength,
      parentEvent.name,
      // after,
      // before,
      parentId,
      // top2,
      templateId,
      uidsDone,
      id,
    );
  }

  return true;
};

export const handleMorningNotificationForChildEvent = async (
  childEvent: sbEventInterface,
  gameStarts: number,
  gameEnds: number,
  rounds: RoundObject[],
  sprints: SprintObject[],
  parentEventName: string,
  parentId: string,
  // top2: UserRank[],
  templateId: whatsappTemplates,
  uidsDone: ReminderProgress,
  reminderId: string,
) => {
  // loop over all challenges && find members of each
  const allMembers = await getUsersForEvent(childEvent.id);
  const coach = await getUserById(childEvent.ownerUID);

  const now = Date.now();
  const daysElapsed = getDaysElapsed(gameStarts, now);
  const sprint = getCurrentSprint(daysElapsed, sprints);

  if (sprint) {
    const top2 = await getTopNUserRanksInMonth(parentId, 2, sprint);

    // console.log("week", week);
    // throw new Error("HI");

    if (coach && sprint) {
      for (const member of allMembers) {
        const userRank = await getRankForUser(parentId, member.uid);

        // console.log("member", member.name);
        if (
          !member.unsubscribe &&
          templateId === "morning_workout_reminder" &&
          !uidsDone[member.uid]
        ) {
          await handleMorningNotificationForMember(
            member,
            parentEventName,
            // parentId,
            // after,
            // before,
            childEvent,
            coach,
            top2,
            sprint,
            userRank,
          );

          await updateUIDForReminder(reminderId, member.uid);
        } else if (
          !member.unsubscribe &&
          templateId === "evening_workout_reminder" &&
          !uidsDone[member.uid]
        ) {
          // await handleEveningNotificationForMember(
          //   member,
          //   // parentId,
          //   after,
          //   before,
          //   childEvent,
          //   coach,
          //   top2,
          //   userRank,
          // );

          await updateUIDForReminder(reminderId, member.uid);
        }
      }
    }
  }
};

const handleMorningNotificationForMember = async (
  user: UserInterface,
  parentEventName: string,
  // after: number,
  // before: number,
  coachEvent: sbEventInterface,
  coach: UserInterface,
  top2: UserRank[],
  week: string,
  userRank?: UserRank,
) => {
  // for each member check if activity submitted today
  // const activities = await getUserActivityAfter(user.uid, after, before);

  // if (activities.length > 0 && top2.length >= 2) {
  //   await sendWorkoutUpdateNotification(
  //     coachEvent,
  //     user,
  //     top2[0],
  //     top2[1],
  //     userRank,
  //     coach.userKey,
  //     coach.name,
  //   );
  // } else

  if (top2.length >= 2) {
    await sendWorkoutCreateNotification(
      coachEvent,
      parentEventName,
      user,
      top2[0],
      top2[1],
      userRank,
      week,
      coach.userKey,
      coach.name,
    );
  }
};

// const handleEveningNotificationForMember = async (
//   user: UserInterface,
//   after: number,
//   before: number,
//   coachEvent: sbEventInterface,
//   coach: UserInterface,
//   top2: UserRank[],
//   userRank?: UserRank,
// ) => {
//   const activities = await getUserActivityAfter(user.uid, after, before);

//   if (activities.length > 0 && top2.length >= 2) {
//   } else if (top2.length >= 2) {
//     await sendMissingYouNotification(
//       coachEvent,
//       user,
//       top2[0],
//       top2[1],
//       userRank,
//       coach.userKey,
//       coach.name,
//     );
//   }
// };

// const getNumberOfRoundsInSprint = (
//   roundLength: number,
//   sprintLength: number,
// ) => {
//   return Math.floor(sprintLength / roundLength);
// };

// const getCurrentWeek = (
//   after: number,
//   sprintLength: number,
//   roundLength: number,
// ) => {
//   const now = Date.now();
//   const daysElapsed = getDaysElapsed(after, now);

//   const currentSprint = Math.floor(daysElapsed / sprintLength);
//   const roundsInSprint = getNumberOfRoundsInSprint(roundLength, sprintLength);

//   const daysInSprint = daysElapsed - currentSprint * sprintLength;

//   // console.log("daysElapsed", daysElapsed, daysInSprint);

//   // 4
//   const currentRoundInSprint = Math.floor(daysInSprint / roundLength);

//   // no full week present
//   // if (roundWhole * roundLength + roundLength > sprintLength) {
//   //   return "week";
//   // }

//   return `week-${currentRoundInSprint + roundsInSprint * currentSprint}`;
// };
