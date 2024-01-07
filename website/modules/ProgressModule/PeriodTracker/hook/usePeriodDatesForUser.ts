import { useEffect } from "react";
import { PeriodDateObj } from "@models/User/User";
import { useCurrentPeriodStore } from "../store/periodStore";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@config/firebase";

export const usePeriodDatesForUser = (uid?: string) => {
  const { st, en } = useCurrentPeriodStore((state) => {
    return { st: state.dataStartUnix, en: state.dataEndUnix };
  });

  const onAddPeriodStore = useCurrentPeriodStore(
    (state) => state.onAddPeriodStore
  );

  useEffect(() => {
    if (uid && st >= 0 && en >= 0) {
      const q = query(
        collection(doc(db, "users", uid), "periodDates"),
        where("unix", ">=", st),
        where("unix", "<=", en),
        orderBy("unix", "asc")
      );

      const listener = onSnapshot(q, (snapshot) => {
        const docChanges = snapshot.docChanges();

        const remoteDocs: { [date: string]: PeriodDateObj } = {};
        for (const change of docChanges) {
          if (change.type === "added" || change.type === "modified") {
            const newDoc = change.doc.data() as PeriodDateObj;

            // to add document
            remoteDocs[newDoc.date] = newDoc;
          }
        }

        onAddPeriodStore(remoteDocs, {});
      });

      return () => {
        listener();
      };
    }
  }, [uid, st, en, onAddPeriodStore]);
};
