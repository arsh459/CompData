import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  // doc,
  onSnapshot,
  // collection,
  query,
  // collection,
  // doc,
  collectionGroup,
  // getDocs,
} from "firebase/firestore";
import { MyPurchase } from "@models/MyPurchases";

export const useMyPurchases = () => {
  const [purchasedVoucher, setPurchasedVoucher] = useState<MyPurchase[]>([]);
  useEffect(() => {
    //   const ref = collectionGroup(db, "myPurchases");

    // const q = query(collection(doc(db, "users", uid), "myPurchases"));
    const q = query(collectionGroup(db, "myPurchases"));

    // getDocs(q)
    //   .then((r) => console.log("r", r))
    //   .catch((e) => console.log(e));

    const unsubscribe = onSnapshot(q, (docs) => {
      const remotePurchases: MyPurchase[] = [];
      if (!docs.empty) {
        for (const doc of docs.docs) {
          const purchase = doc.data() as MyPurchase;
          remotePurchases.push(purchase);
        }
      }
      setPurchasedVoucher(remotePurchases);
    });
    return () => {
      unsubscribe();
      setPurchasedVoucher([]);
    };
  }, []);

  return {
    purchasedVoucher,
  };
};
