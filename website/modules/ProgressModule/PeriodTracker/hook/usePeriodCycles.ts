import { useEffect } from "react";
import { Cycle } from "@models/User/User";
import { db } from "@config/firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useCurrentPeriodStore } from "../store/periodStore";

export const usePeriodCycles = (uid?: string) => {
  const { refresh, onAddCycles } = useCurrentPeriodStore((state) => ({
    refresh: state.refreshCycles,
    onAddCycles: state.onAddCycles,
  }));

  useEffect(() => {
    if (uid) {
      const q = query(
        collection(doc(db, "users", uid), "cycles"),
        orderBy("startUnix", "desc")
      );

      const listener = onSnapshot(q, (snapshot) => {
        if (snapshot && snapshot.docs) {
          // add to local state
          const remoteDocs: { [cycleId: string]: Cycle } = {};
          const cyclesArray: Cycle[] = [];
          for (const doc of snapshot.docs) {
            const cycleObj = doc.data() as Cycle;

            remoteDocs[cycleObj.id] = cycleObj;
            cyclesArray.push(cycleObj);
          }

          // save cycles to store
          onAddCycles(remoteDocs, cyclesArray);
        }
      });

      return () => {
        listener();
      };
    }
  }, [uid, refresh, onAddCycles]);
};
