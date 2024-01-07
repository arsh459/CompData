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
  //   orderBy,
  where,
} from "firebase/firestore";

export const useActivityTicket = (
  uid: string,
  ticketOwnerUID: string,
  activityId?: string
) => {
  const [activityTicket, setActivityTicket] = useState<ActivityTicket>();
  useEffect(() => {
    if (activityId) {
      const ref = collection(
        doc(doc(db, "users", uid), "activities", activityId),
        "tickets"
      );
      const q = query(
        ref,
        where("createdBy", "==", ticketOwnerUID),
        where("isActive", "==", true)
      );
      const unsubscribe = onSnapshot(q, (docs) => {
        // const remoteActivitiesObj: { [day: string]: Activity } = {};

        if (docs.docs.length) {
          setActivityTicket(docs.docs[0].data() as ActivityTicket);
        }

        // console.log("remoteActivitiesObj", remoteActivitiesObj);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [uid, ticketOwnerUID, activityId]);

  return {
    activityTicket,
  };
};
