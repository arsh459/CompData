import { dayRecommendation, dayRecommendationType } from "@models/User/User";
import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore"; //   FirebaseFirestoreTypes,
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
// import { dayMS } from "@providers/period/periodStore";
// import { makeGeneratorCall } from "./generatorCall";

export const useDayRecsBetweenV2 = (
  badgeId?: string,
  type?: dayRecommendationType,
  start?: number,
  end?: number
) => {
  const { uid, addToRecsCache } = useUserStore((state) => {
    return {
      uid: state.user?.uid,
      addToRecsCache: state.addToRecsCache,
    };
  }, shallow);

  useEffect(() => {
    if (badgeId && start && end && uid && type) {
      // const docsToFetch = (end - start) / dayMS + 1;
      // console.log("docsToFetch", docsToFetch);
      const unsub = firestore()
        .collection("users")
        .doc(uid)
        .collection("dayRecommendations")
        .where("badgeId", "==", badgeId)
        .where("unix", ">=", start)
        .where("unix", "<=", end)
        .onSnapshot((docs) => {
          if (docs) {
            // console.log("docs", docs.docs.length);

            // const fetchedDocs = docs.docs.length;

            // make generator call
            // if (fetchedDocs !== docsToFetch) {
            //   makeGeneratorCall(uid, type, false, false, badgeId);
            // }

            const remoteObjs: { [badgeDateKey: string]: dayRecommendation } =
              {};
            for (const doc of docs.docs) {
              const remoteObj = doc.data() as dayRecommendation;

              remoteObjs[`${badgeId}-${remoteObj.date}`] = remoteObj;
            }

            addToRecsCache(remoteObjs);
          }
        });

      return () => {
        unsub();
      };
    }
  }, [badgeId, start, end, uid, type]);
};
