import * as functions from "firebase-functions";
import { updateStudentsInEvent } from "../../../models/sbEvent/getUtils";
import { getAllSocialboatUsers } from "../../../models/User/Methods";

export const reconcileEventsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .pubsub.schedule("0 * * * *")
  .onRun(async () => {
    try {
      const allSocialBoatUsers = await getAllSocialboatUsers();

      // update enrolled cohorts, events && communities
      const eventStudents: { [eventId: string]: number } = {};
      for (const user of allSocialBoatUsers) {
        if (user.enrolledEvents) {
          for (const userEvent of user.enrolledEvents) {
            if (eventStudents[userEvent]) {
              eventStudents[userEvent] += 1;
            } else {
              eventStudents[userEvent] = 1;
            }
          }
        }
      }

      for (const eventId of Object.keys(eventStudents)) {
        functions.logger.log(`eventId:${eventId} - ${eventStudents[eventId]}`);
        try {
          await updateStudentsInEvent(eventStudents[eventId], eventId);
        } catch (error) {
          functions.logger.log(`eventId:${eventId}`, error);
        }
      }

      return;
    } catch (error) {
      console.log("Not updating events", error);
    }
    return null;
  });
