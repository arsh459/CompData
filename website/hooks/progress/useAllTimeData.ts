import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@config/firebase";
import { DailyDataObj } from "./interface";
import {
  ProgressCollectionType,
  typePropTypes,
} from "@modules/ProgressModule/interface";

interface AllData {
  allData: DailyDataObj[];
  maxWeight: number;
}

const useAllTimeData = (
  type: typePropTypes,
  collectionName: ProgressCollectionType,
  uid?: string
) => {
  const [avgData, setAvgData] = useState<AllData>({
    allData: [],
    maxWeight: 0,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      if (uid && type && collectionName) {
        setLoading(true);
        let maxWeight = 0;
        const allData: DailyDataObj[] = [];

        const unsubscribe = onSnapshot(
          query(
            collection(db, `users/${uid}/${collectionName}`),

            orderBy("unix", "asc")
          ),
          (querySnapshot) => {
            if (querySnapshot) {
              querySnapshot.forEach((doc) => {
                const activity = doc.data() as DailyDataObj;

                if (activity.unix) {
                  if (collectionName === "dailyWeight") {
                    maxWeight =
                      activity?.weight && activity.weight > maxWeight
                        ? activity.weight
                        : maxWeight;
                  }
                  allData.push(activity);
                }
              });

              setAvgData({
                allData,
                maxWeight,
              });
            }
            setLoading(false);
            return () => {
              unsubscribe();
            };
          }
        );
      }
    } catch (error: any) {
      console.log("error");
    }
  }, [uid, type, collectionName]);

  return { ...avgData, loading };
};

export default useAllTimeData;
