import { Achiever } from "@models/awards/interface";
import { useCallback, useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  collection,
  // orderBy,
  query,
  where,
  // limit,
  onSnapshot,
} from "firebase/firestore";

export const useAchievedAwards = (uid: string, intialNum: number) => {
  const [wonAwardsData, setWonAwardsData] = useState<Achiever[]>([]);
  const [nextExists, setNextMembersExist] = useState<boolean>(false);
  // const [numToFetch, setNumToFetch] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = useCallback(
    (num: number) => {
      try {
        setLoading(true);

        const awardsQuerry = query(
          collection(db, "achievers"),
          where("uid", "==", uid)
          // orderBy("createdOn", "desc"),
          // limit(num)
        );

        const unsubscribe = onSnapshot(awardsQuerry, (awardsData) => {
          const remoteWonAwardsData: Achiever[] = [];

          for (const awardDdoc of awardsData.docs) {
            if (awardDdoc.data()) {
              const localWonAwardData = awardDdoc.data() as Achiever;
              remoteWonAwardsData.push(localWonAwardData);
            }
          }

          // sort here
          const sortedData = remoteWonAwardsData.sort(
            (x, y) => x.createdOn - y.createdOn
          );

          setNextMembersExist(sortedData.length === num);
          setWonAwardsData(sortedData);
          // setNumToFetch(num);
          setLoading(false);
        });

        return () => {
          unsubscribe();
          setWonAwardsData([]);
          // setNumToFetch(0);
        };
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
    [uid]
  );

  useEffect(() => {
    getData(intialNum);
  }, [getData, intialNum]);

  const onNext = async () => {
    // getData(numToFetch + intialNum);
  };

  return { wonAwardsData, onNext, nextExists, loading };
};
