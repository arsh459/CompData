import { MyPurchases } from "@models/MyPurchases/interface";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export const useMyPurchases = (uid?: string, voucherId?: string) => {
  const [myPurchases, setMyPurchases] = useState<MyPurchases>();

  useEffect(() => {
    if (uid && voucherId) {
      const listener = firestore()
        .collection("users")
        .doc(uid)
        .collection("myPurchases")
        .where("voucherId", "==", voucherId)
        .limit(1)
        .onSnapshot((docs) => {
          if (docs.docs.length) {
            setMyPurchases(docs.docs[0].data() as MyPurchases);
          }
        });

      return () => {
        listener();
      };
    }
  }, [uid, voucherId]);

  return {
    myPurchases,
  };
};
