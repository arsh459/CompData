import { useEffect, useState } from "react";
import { EventInterface } from "@models/Event/Event";
import { UserInterface } from "@models/User/User";
import { authStates } from "@providers/auth/interface";

export const useJoinStatus = (
  selectedEvent?: EventInterface,
  signedInUser?: UserInterface,
  authStatus?: authStates
) => {
  const [isMember, setIsMember] = useState<boolean>(false);
  const [memberStatus, setIsChecked] = useState<
    "PENDING" | "SUCCESS" | "FAILED"
  >("PENDING");

  useEffect(() => {
    if (authStatus === "FAILED") {
      setIsChecked("FAILED");
      setIsMember(false);
    } else if (signedInUser?.uid && !signedInUser.enrolledEvents) {
      setIsChecked("FAILED");
      setIsMember(false);
    } else if (signedInUser?.uid && signedInUser.role === "admin") {
      setIsMember(true);
      setIsChecked("SUCCESS");
    } else if (
      selectedEvent?.ownerUID &&
      signedInUser?.uid &&
      selectedEvent.ownerUID === signedInUser.uid
    ) {
      setIsMember(true);
      setIsChecked("SUCCESS");
    } else if (
      selectedEvent?.id &&
      (signedInUser?.enrolledEvents || signedInUser?.enrolledCohorts)
    ) {
      if (
        selectedEvent?.id &&
        signedInUser?.enrolledEvents &&
        signedInUser.enrolledEvents.includes(selectedEvent.id)
      ) {
        setIsMember(true);
        setIsChecked("SUCCESS");
      } else if (
        selectedEvent?.id &&
        signedInUser?.enrolledEvents &&
        !signedInUser.enrolledEvents.includes(selectedEvent.id)
      ) {
        setIsMember(false);
        setIsChecked("FAILED");
      } else {
        setIsMember(false);
      }
    } else {
      setIsMember(false);
      // setIsChecked("FAILED");
    }
  }, [
    selectedEvent?.id,
    selectedEvent?.ownerUID,
    signedInUser?.uid,
    signedInUser?.enrolledCohorts,
    signedInUser?.enrolledEvents,
    signedInUser?.role,
    authStatus,
  ]);

  return {
    isMember,
    memberStatus,
  };
};
