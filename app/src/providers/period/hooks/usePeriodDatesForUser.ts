import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useCurrentPeriodStore } from "../periodStore";
import { PeriodDateObj } from "@models/User/User";
import { shallow } from "zustand/shallow";

export const usePeriodDatesForUser = () => {
  const { state } = useAuthContext();

  // const initData = useCurrentPeriodStore((state) => state.initData);
  // const weeks = useCurrentPeriodStore((state) => state.weeks);
  const { st, en } = useCurrentPeriodStore((state) => {
    return { st: state.dataStartUnix, en: state.dataEndUnix };
  }, shallow);

  const onAddPeriodStore = useCurrentPeriodStore(
    (state) => state.onAddPeriodStore
  );

  // const refresh = useCurrentPeriodStore((state) => state.refreshCycles);

  useEffect(() => {
    if (state.uid && st >= 0 && en >= 0) {
      // const endRange =

      const listener = firestore()
        .collection("users")
        .doc(state.uid)
        .collection("periodDates")
        .where("unix", ">=", st)
        .where("unix", "<=", en)
        .orderBy("unix", "asc")
        .onSnapshot((snapshot) => {
          const docChanges = snapshot.docChanges();

          const remoteDocs: { [date: string]: PeriodDateObj } = {};
          // const toRemoveDocs: { [date: string]: PeriodDateObj } = {};
          for (const change of docChanges) {
            if (change.type === "added" || change.type === "modified") {
              const newDoc = change.doc.data() as PeriodDateObj;

              // to add document
              remoteDocs[newDoc.date] = newDoc;
            }

            // if (change.type === "removed") {
            //   const newDoc = change.doc.data() as PeriodDateObj;

            //   // to add document
            //   toRemoveDocs[newDoc.date] = newDoc;
            // }
          }

          // const finalRemove: { [date: string]: PeriodDateObj } = {};
          // for (const dateAdded of Object.keys(toRemoveDocs)) {
          //   if (!remoteDocs[dateAdded]) {
          //     finalRemove[dateAdded] = toRemoveDocs[dateAdded];
          //   }
          // }

          onAddPeriodStore(remoteDocs, {});

          // if (snapshot.docs) {
          //   // add to local state
          //   const remoteDocs: { [date: string]: PeriodDateObj } = {};
          //   for (const doc of snapshot.docs) {
          //     const periodObj = doc.data() as PeriodDateObj;
          //     remoteDocs[periodObj.date] = periodObj;
          //   }

          //   // update data here
          //   // initData(remoteDocs);
          //   onAddPeriodStore(remoteDocs);
          // }
        });

      return () => {
        listener();

        // remove all previous data
        // initData({});
      };
    }
  }, [state.uid, st, en]);
};
