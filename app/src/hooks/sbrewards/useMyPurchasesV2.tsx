import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { MyPurchases } from "@models/MyPurchases/interface";
import crashlytics from "@react-native-firebase/crashlytics";

export const useMyPurchasesV2 = (uid?: string, num?: number) => {
  const [myPurchases, setMyPurchases] = useState<MyPurchases[]>([]);
  const [numToFetch, setToFetch] = useState<number | undefined>(num);
  const [nextExists, setNextMembersExist] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (uid) {
        const q = firestore()
          .collection("users")
          .doc(uid)
          .collection("myPurchases")
          .limit(numToFetch ? numToFetch : 5);

        const unsubscribe = q.onSnapshot((myPurchases) => {
          const remotePurchases: MyPurchases[] = [];
          if (myPurchases?.docs) {
            for (const doc of myPurchases.docs) {
              const purchased = doc.data() as MyPurchases;
              remotePurchases.push(purchased);
            }
            setNextMembersExist(remotePurchases.length === numToFetch);
            setMyPurchases(remotePurchases);
          }
        });

        return () => {
          unsubscribe();
        };
      }
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
    }
  }, [numToFetch, uid]);

  const onNext = () => {
    setToFetch((prev) => (prev ? prev + (numToFetch ? numToFetch : 5) : prev));
  };

  return {
    nextExists,
    myPurchases,
    onNext,
  };
};
