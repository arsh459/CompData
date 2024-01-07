import { useAuthContext } from "@providers/auth/AuthProvider";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore"; // FirebaseFirestoreTypes,
import { StepsDoc } from "@models/User/StepsDoc";
// import { format } from "date-fns";
import { useStepsPermissionContext } from "@providers/steps/StepsPermissionProvider";
import { format } from "date-fns";
// import { uuidv4 } from "react-native-compressor";

export const useUserSteps = (today?: string, unix?: number) => {
  const { state } = useAuthContext();
  const [daySteps, setDayDoc] = useState<StepsDoc>();

  // const [refresh, setRefresh] = useState<number>(0);
  const { permission } = useStepsPermissionContext();

  // useEffect(() => {
  //   const getTodaysSteps = async () => {
  //     if (state.uid && today) {
  //       const todaysGoalObj = await firestore()
  //         .collection("users")
  //         .doc(state.uid)
  //         .collection("steps")
  //         .where("date", "==", today)
  //         .get();

  //       if (todaysGoalObj.docs.length === 0) {
  //         const now = new Date();
  //         const nowStartDate = new Date(
  //           now.getFullYear(),
  //           now.getMonth(),
  //           now.getDate(),
  //           0,
  //           0,
  //           0,
  //           0
  //         );

  //         const newStepDoc: StepsDoc = {
  //           id: uuidv4(),
  //           uid: state.uid,
  //           date: today,
  //           steps: 0,
  //           updatedOn: now.getTime(),
  //           unix: nowStartDate.getTime(),
  //         };

  //         await firestore()
  //           .collection("users")
  //           .doc(state.uid)
  //           .collection("steps")
  //           .doc(newStepDoc.id)
  //           .set(newStepDoc);

  //         setRefresh((p) => p + 1);
  //       }
  //     }
  //   };

  //   getTodaysSteps();
  // }, [today, state.uid]);

  useEffect(() => {
    if (today || unix) {
      let dt = today;
      if (!dt && unix) {
        dt = format(new Date(unix), "yyyy-MM-dd");
      }

      if (dt) {
        const listener = firestore()
          .collection("users")
          .doc(state.uid)
          .collection("steps")
          .where("date", "==", dt)
          .onSnapshot((doc) => {
            if (doc?.docs && doc.docs.length) {
              const remoteDoc = doc.docs[0].data() as StepsDoc | null;

              if (remoteDoc) {
                setDayDoc(remoteDoc);
              }
            } else {
              setDayDoc(undefined);
            }
          });

        return () => {
          listener();
        };
      }
    }
  }, [state.uid, today, unix, permission]);

  return {
    daySteps,
  };
};
