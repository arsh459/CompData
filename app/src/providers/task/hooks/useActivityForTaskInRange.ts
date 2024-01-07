import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useUserStore } from "@providers/user/store/useUserStore";
import { Activity } from "@models/Activity/Activity";
import { shallow } from "zustand/shallow";
import { format } from "date-fns";

export const useActivityForTaskInRange = (
  start: number,
  end: number,
  taskId: string,
  targetFP: number
) => {
  const { uid, addChallengeDayProgress } = useUserStore(
    (state) => ({
      uid: state.user?.uid,
      addChallengeDayProgress: state.addChallengeDayProgress,
    }),
    shallow
  );
  const [selectedFP, setSelectedFP] = useState<number>(0);

  useEffect(() => {
    const listener = firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .where("taskId", "==", taskId)
      .where("createdOn", ">=", start)
      .where("createdOn", "<=", end)
      .onSnapshot((docs) => {
        let fp: number = 0;
        for (const doc of docs.docs) {
          const act = doc.data() as Activity;
          const actFP = (act.calories ? act.calories : 0) / 300;

          if (actFP > fp) {
            fp = actFP;
          }
        }

        setSelectedFP(fp);
        addChallengeDayProgress(
          format(new Date(start), "yyyy-MM-dd"),
          taskId,
          fp,
          targetFP
        );
      });

    return () => {
      listener();
    };
  }, [start, end, taskId, uid, targetFP]);

  return {
    selectedFP,
  };
};
