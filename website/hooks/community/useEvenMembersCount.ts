import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { getDoc, doc } from "firebase/firestore";
import { EventInterface } from "@models/Event/Event";

export const useEvenMembersCount = (eventId?: string) => {
  const [membersCount, setMembersCount] = useState<number>();

  useEffect(() => {
    try {
      if (eventId) {
        const eventRef = doc(db, "sbEvents", eventId);

        getDoc(eventRef).then((doc) => {
          const event = doc.data() as EventInterface;

          if (event && event.enrolledUserUIDs) {
            setMembersCount(event.enrolledUserUIDs.length);
          }
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [eventId]);

  return {
    membersCount,
  };
};
