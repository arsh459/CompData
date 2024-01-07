import { Achiever, Award } from "@models/awards/interface";
import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  collection,
  // orderBy,
  query,
  where,
  // limit,
  onSnapshot,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";

export const useAchievers = (uid?: string) => {
  const [achievers, setAchievers] = useState<Achiever[]>([]);
  const [awards, setAwards] = useState<{ [id: string]: Award }>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const awardsQuerry = query(
      collection(db, "achievers"),
      where("uid", "==", uid),
      orderBy("createdOn", "asc")
    );

    const listener = onSnapshot(awardsQuerry, async (docs) => {
      const remoteWonAwardsData: Achiever[] = [];

      const awardIdsToFetch: { [id: string]: boolean } = {};
      const awardIdMap: { [id: string]: Award } = {};
      for (const awardDdoc of docs.docs) {
        if (awardDdoc.data()) {
          const localWonAwardData = awardDdoc.data() as Achiever;
          remoteWonAwardsData.push(localWonAwardData);
          awardIdsToFetch[localWonAwardData.awardId] = true;
        }
      }
      setAchievers(remoteWonAwardsData);

      for (const id of Object.keys(awardIdsToFetch)) {
        const awardObj = await getDoc(doc(db, "awards", id));
        const obj = awardObj.data() as Award | undefined;
        if (obj) {
          awardIdMap[obj.id] = obj;
        }
      }
      setAwards(awardIdMap);
    });

    return () => listener();
  }, [uid]);

  return { achievers, loading, awards };
};
