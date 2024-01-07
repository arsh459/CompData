import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { MyPurchases } from "@models/MyPurchases/interface";
import { format } from "date-fns";
import crashlytics from "@react-native-firebase/crashlytics";

export const useMyPurchasesSections = (uid?: string, num?: number) => {
  const [myPurchases, setMyPurchases] = useState<MyPurchases[]>([]);
  const [numToFetch, setToFetch] = useState<number | undefined>(num);
  const [nextExists, setNextMembersExist] = useState<boolean>(false);
  const sections: { title: string; data: MyPurchases[] }[] = [];
  const [init, setInit] = useState<boolean>(false);

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
    setTimeout(() => {
      setInit(true);
    }, 500);
  }, [numToFetch, uid]);

  const onNext = () => {
    setToFetch((prev) => (prev ? prev + (numToFetch ? numToFetch : 5) : prev));
  };
  for (const myPurchase of myPurchases || []) {
    const sectionTitle = format(
      new Date(myPurchase.purchasedOn),
      "do MMMM yyyy"
    );

    let section = sections.find((s) => s.title === sectionTitle);

    if (!section) {
      section = { title: sectionTitle, data: [] };
      sections.push(section);
    }

    section.data.push(myPurchase);
  }
  return {
    nextExists,
    sections,
    onNext,
    init,
  };
};
