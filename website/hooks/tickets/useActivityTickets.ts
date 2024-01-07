import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { ActivityTicket } from "@models/Activities/Activity";
import {
  // doc,
  onSnapshot,
  // collection,
  query,
  //   limit,
  doc,
  collection,
  //   where,
  orderBy,
  //   where,
} from "firebase/firestore";

export const useActivityTickets = (
  uid: string,
  //   ticketOwnerUID: string,
  activityId?: string
) => {
  const [activityTicketArr, setActivityTickets] = useState<ActivityTicket[]>(
    []
  );
  useEffect(() => {
    if (activityId) {
      const ref = collection(
        doc(doc(db, "users", uid), "activities", activityId),
        "tickets"
      );
      const q = query(
        ref,
        orderBy("createdOn", "desc")
        // where("createdBy", "==", ticketOwnerUID),
        // where("isActive", "==", true)
      );
      const unsubscribe = onSnapshot(q, (docs) => {
        const activityTickets: ActivityTicket[] = [];

        for (const ticket of docs.docs) {
          activityTickets.push(ticket.data() as ActivityTicket);
        }

        setActivityTickets(activityTickets);

        // console.log("remoteActivitiesObj", remoteActivitiesObj);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [uid, activityId]);

  return {
    activityTicketArr,
  };
};
