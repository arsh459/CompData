import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  onSnapshot,
  collection,
  query,
  limit,
  //   where,
  orderBy,
} from "firebase/firestore";
import { Voucher } from "@models/Voucher/interface";

export const useVouchers = (num: number) => {
  const [vouchers, setVouchers] = useState<Voucher[]>();
  const [numToFetch, setToFetch] = useState<number | undefined>(num);
  const [nextExists, setNextMembersExist] = useState<boolean>(false);

  useEffect(() => {
    try {
      const q = query(
        collection(db, "sbRewards"),
        orderBy("updatedOn", "asc"),
        limit(numToFetch ? numToFetch : 100)
      );

      const unsubscribe = onSnapshot(q, (vouchers) => {
        const remoteActivities: Voucher[] = [];

        for (const doc of vouchers.docs) {
          const activity = doc.data() as Voucher;
          remoteActivities.push(activity);
        }

        setNextMembersExist(remoteActivities.length === numToFetch);

        setVouchers(remoteActivities);
      });

      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.log("error", error);
    }
  }, [numToFetch]);

  const onNext = () => {
    setToFetch((prev) => (prev ? prev + 10 : prev));
  };

  return {
    onNext,
    nextExists,
    vouchers,
  };
};
