import { useEffect, useState } from "react";
import { DailyDataObj } from "./useAvgDataV2";
import firestore from "@react-native-firebase/firestore";
import {
  ProgressCollectionType,
  typePropTypes,
} from "@modules/JourneyLogHome/utils";
import { dailyWeightObj } from "@models/User/User";

export const getLatestCollectionByType = async (
  type: typePropTypes,
  collectionName: ProgressCollectionType,
  uid: string
) => {
  const querySnapshot = await firestore()
    .collection("users")
    .doc(uid)
    .collection(collectionName)
    .orderBy("unix", "desc")
    .limit(1)
    // .where(type, "!=", 0)
    .get();

  const docs = querySnapshot.docs;
  if (docs.length > 0) {
    return docs[0].data() as DailyDataObj;

    // docs.sort((a, b) => (a.data().unix < b.data().unix ? 1 : -1));

    // const data = docs
    //   .find((doc) => doc.data()[type] !== 0)
    //   ?.data() as DailyDataObj;
    // if (data) {
    //   return data;
    // }
  }
};

export const useEarliestWeight = (uid?: string) => {
  const [weightData, setWeightData] = useState<dailyWeightObj>();
  useEffect(() => {
    if (uid) {
      const listener = firestore()
        .collection("users")
        .doc(uid)
        .collection("dailyWeight")
        .orderBy("unix", "asc")
        .limit(1)
        .onSnapshot((docs) => {
          if (docs.docs.length > 0) {
            const obj = docs.docs[0].data() as DailyDataObj;
            setWeightData(obj as dailyWeightObj);
          }
        });

      // const fetchLatestData = async () => {
      //   const latestWeight = await getLatestCollectionByType(
      //     "weight",
      //     "dailyWeight",
      //     uid
      //   );

      //   if (latestWeight) {
      //     setWeightData(latestWeight as dailyWeightObj);
      //   }
      // };

      return () => {
        listener();
      };
      // fetchLatestData();
    }
  }, [uid]);

  return {
    weight: weightData,
  };
};
