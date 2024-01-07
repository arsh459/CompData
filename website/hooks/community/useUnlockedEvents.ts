import { Registration } from "@models/Registrations/Registrations";
import { useEffect, useState } from "react";

export const useUnlockedEvents = (
  registrations: Registration[],
  guestUID?: string
) => {
  // console.log("registrations", registrations);

  const [enrolledEvents, showEnrolledEvents] = useState<{
    [eId: string]: boolean;
  }>({});
  const [enrolledCohorts, showEnrolledCohorts] = useState<{
    [cId: string]: boolean;
  }>({});
  // console.log("enrolledEvents", enrolledEvents);

  useEffect(() => {
    if (guestUID) {
      const selEvents: { [eId: string]: boolean } = {};
      const selEnrolledCohorts: { [cId: string]: boolean } = {};

      showEnrolledEvents(
        registrations.reduce((acc, item) => {
          if (item.userUid === guestUID) {
            acc[item.eventId] = true;
          }

          return acc;
        }, selEvents)
      );

      showEnrolledCohorts(
        registrations.reduce((acc, item) => {
          if (item.userUid === guestUID && item.cohortId) {
            acc[item.cohortId] = true;
          }

          return acc;
        }, selEnrolledCohorts)
      );
    }
  }, [guestUID, registrations]);

  return {
    enrolledEvents,
    enrolledCohorts,
  };
};
