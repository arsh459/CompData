import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from "@providers/auth/AuthProvider";

import { Cycle } from "@models/User/User";
import { useCurrentPeriodStore } from "../periodStore";
import { shallow } from "zustand/shallow";

export const usePeriodCycles = () => {
  const { state } = useAuthContext();

  const [refresh, onAddCycles] = useCurrentPeriodStore(
    (state) => [state.refreshCycles, state.onAddCycles],
    shallow
  );

  useEffect(() => {
    if (state.uid) {
      // const endRange =

      const listener = firestore()
        .collection("users")
        .doc(state.uid)
        .collection("cycles")
        .orderBy("startUnix", "desc")
        .onSnapshot((snapshot) => {
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

            // update data here
            // initData(remoteDocs);
          }
        });

      return () => {
        listener();

        // remove all previous data
        // initData({});
      };
    }
  }, [state.uid, refresh]);
};
