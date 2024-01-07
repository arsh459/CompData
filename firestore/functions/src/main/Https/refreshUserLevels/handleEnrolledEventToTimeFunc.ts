import { format } from "date-fns";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
import { getAllSocialboatUsers } from "../../../models/User/Methods";
import { EnrolledEventWithTime } from "../../../models/User/User";
import { updateOne } from "../../../utils/firestore/fetchOne";

export const handleEventToTimeFunc = async () => {
  //   for (const eventId of [
  //     FAT_BURNER_CHALLENGE,
  //     WFH_CHALLENGE,
  //     CHALLENGE_ONE,
  //     FAT_BURNER_GAME,
  //   ]) {
  //     console.log("eventId", eventId);
  //   }

  const allSBUsers = await getAllSocialboatUsers();

  const remoteEvents: { [eventId: string]: sbEventInterface } = {};

  let i: number = 0;
  for (const sbUser of allSBUsers) {
    const enrolledEventsForUser: EnrolledEventWithTime[] = [];

    if (sbUser.enrolledEvents) {
      for (const enrolledEventId of sbUser.enrolledEvents) {
        if (!remoteEvents[enrolledEventId]) {
          const remoteEvent = await getSbEventById(enrolledEventId);
          if (remoteEvent) {
            remoteEvents[remoteEvent.id] = remoteEvent;
          }
        }

        const enrolledEvent = remoteEvents[enrolledEventId];

        if (enrolledEvent) {
          enrolledEventsForUser.push({
            eventId: enrolledEvent.id,
            enrolledTime: enrolledEvent.createdOn,
          });

          console.log(
            i,
            sbUser.name,
            enrolledEvent?.name,
            // enrolledEvent.createdOn,
            // enrolledEvent.updatedOn,
            format(new Date(enrolledEvent.createdOn), "h:mmaaa d MMM"),
            // format(new Date(enrolledEvent.updatedOn), "h:mmaaa d MMM"),
          );
        }
      }
    }

    console.log(
      "is match",
      enrolledEventsForUser.length === sbUser.enrolledEvents?.length,
    );

    await updateOne("users", sbUser.uid, {
      enrolledEventsWithTime: enrolledEventsForUser,
    });

    i++;
  }
};
