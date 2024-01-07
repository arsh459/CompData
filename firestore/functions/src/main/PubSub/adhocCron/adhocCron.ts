import * as functions from "firebase-functions";
// import { getSbEventById } from "../../../models/sbEvent/getUtils";
// import { getUserById, getUsersForEvent } from "../../../models/User/Methods";
// import { getWorkoutSeriesForEventId } from "../../../models/Workout/getUtils";
// import { getFormattedDateForUnix } from "../activityTracker/utils";
// import {
//   getTodaysWorkoutsForAllSeries,
//   sendPaidMessage,
// } from "../morning/paidWorkout";
// import {
//   createReminder,
//   saveReminderInDB,
// } from "../../../models/Reminders/createUtils";
// import { handleDayNotification } from "./handleMorningNotifications";

export const morningCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .pubsub.schedule("0 7 * * *")
  // .pubsub.schedule("*/2 * * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      //   const reminder = createReminder(
      //     false,
      //     "morning_workout_reminder",
      //     undefined,
      //     undefined,
      //     "7e5313b8-187e-471e-a723-14e0f261b40c",
      //     undefined,
      //     undefined,
      //     undefined,
      //     undefined,
      //     undefined,
      //     undefined,
      //     undefined,
      //     Date.now() - 8 * 60 * 60 * 1000,
      //     "00ec36a1-6eac-4924-a0eb-c40bbe7c409b",
      //   );
      //   await saveReminderInDB(reminder);
      // const ajuEvent = await getSbEventById(
      //   "7e5313b8-187e-471e-a723-14e0f261b40c",
      // );
      // if (ajuEvent) {
      //   const aju = await getUserById(ajuEvent?.ownerUID);
      //   const allMembers = await getUsersForEvent(ajuEvent.id);
      //   const workoutSeries = await getWorkoutSeriesForEventId(ajuEvent.id);
      //   const { seriesLives } = await getTodaysWorkoutsForAllSeries(
      //     workoutSeries,
      //   );
      //   for (const member of allMembers) {
      //     for (const seriesId of Object.keys(seriesLives)) {
      //       const todaysLives = seriesLives[seriesId];
      //       for (const live of todaysLives) {
      //         if (
      //           live.slots &&
      //           member.phone &&
      //           member.name &&
      //           aju?.userKey &&
      //           aju.name &&
      //           workoutSeries.length > 0
      //         ) {
      //           for (const slot of live.slots) {
      //             const time = new Date(slot).getTime();
      //             const dtString = getFormattedDateForUnix(time, "h:mmA");
      //             await sendPaidMessage(
      //               member.phone,
      //               member.name,
      //               dtString,
      //               aju?.userKey,
      //               aju?.name,
      //               workoutSeries[0],
      //               live,
      //             );
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
    } catch (error) {
      console.log("morning notification failed");
    }
    return null;
  });
