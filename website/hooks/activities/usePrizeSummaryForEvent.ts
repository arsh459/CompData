import { EventPrizeSummary } from "@models/Prizes/Prize";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot, collection } from "firebase/firestore";

export const usePrizeSummaryForEvent = (eventId?: string) => {
  const [prizes, setPrizeSummary] = useState<EventPrizeSummary>();
  const [prizeStatus, setPrizeStatus] = useState<boolean>(false);
  useEffect(() => {
    if (eventId) {
      //   const ref = doc(db, "prizeSummary", uid);
      const ref = collection(doc(db, "sbEvents", eventId), "prizeSummary");

      const unsubscribe = onSnapshot(ref, (docs) => {
        if (docs.docs.length > 0) {
          const summary = docs.docs[0].data() as EventPrizeSummary;

          setPrizeSummary(summary);
          setPrizeStatus(Object.keys(summary).length > 0);
        }
      });

      return () => {
        if (unsubscribe) {
          setPrizeSummary(undefined);
          unsubscribe();
        }
      };
    }
  }, [eventId]);

  return {
    prizes,
    prizeStatus,
  };
};
