import { PrizeSummary } from "@models/Prizes/Prize";
import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const usePrizeSummary = (uid?: string) => {
  const [prizes, setPrizeSummary] = useState<PrizeSummary>();
  const [prizeStatus, setPrizeStatus] = useState<boolean>(false);
  useEffect(() => {
    if (uid) {
      const ref = doc(db, "prizeSummary", uid);

      const unsubscribe = onSnapshot(ref, (doc) => {
        const ps = doc.data() as PrizeSummary;
        if (ps) {
          setPrizeSummary(ps);
          setPrizeStatus(Object.keys(ps).length > 1);
        }
      });

      return () => {
        if (unsubscribe) {
          setPrizeSummary(undefined);
          unsubscribe();
        }
      };
    }
  }, [uid]);

  return {
    prizes,
    prizeStatus,
  };
};
