// import { getUserEventRegistrations } from "@models/Event/getUtils";
import { UserInterface } from "@models/User/User";
import { useEffect, useState } from "react";

export const useUnlockedEvent = (
  signedInUser?: UserInterface,
  eventId?: string,
  communityId?: string,
  cohortId?: string,
  eventCost?: number,
  needsRegistration?: boolean
) => {
  // console.log("registrations", registrations);

  const [enrolled, setEnrolled] = useState<boolean>(false);
  // console.log("enrolled", eventCost);

  useEffect(() => {
    if (signedInUser?.uid === communityId) {
      setEnrolled(true);
    } else if (
      signedInUser &&
      eventId &&
      cohortId &&
      signedInUser.enrolledCohorts &&
      signedInUser.enrolledCohorts.includes(cohortId)
    ) {
      setEnrolled(true);
    } else if (
      signedInUser &&
      eventId &&
      signedInUser.enrolledEvents &&
      signedInUser.enrolledEvents.includes(eventId)
    ) {
      setEnrolled(true);
    }

    // else if (!eventCost && !needsRegistration) {
    //   setEnrolled(true);
    // }
    else {
      setEnrolled(false);
    }
  }, [
    communityId,
    eventId,
    signedInUser,
    cohortId,
    eventCost,
    needsRegistration,
  ]);

  return {
    enrolled,
  };
};
