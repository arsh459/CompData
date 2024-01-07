import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@config/firebase";
import { DailyDataObj } from "./interface";
import {
  ProgressCollectionType,
  typePropTypes,
} from "@modules/ProgressModule/interface";

const useLatestProgressByType = (
  type: typePropTypes,
  collectionName: ProgressCollectionType,
  uid?: string
) => {
  const [data, setData] = useState<DailyDataObj>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestCollection = async () => {
      const userCollectionRef = collection(
        db,
        `users/${uid}/${collectionName}`
      );
      const q = query(userCollectionRef, where(type, "!=", 0));

      try {
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs;

        if (docs.length > 0) {
          docs.sort((a, b) => (a.data().unix < b.data().unix ? 1 : -1));
          const latestData = docs
            .find((doc) => doc.data()[type] !== 0)
            ?.data() as DailyDataObj;
          if (latestData) {
            setData(latestData);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (type && collectionName && uid) {
      fetchLatestCollection();
    }
  }, [type, collectionName, uid]);

  return { data, loading };
};

export default useLatestProgressByType;
