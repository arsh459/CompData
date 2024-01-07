import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Award } from "@models/awards/interface";

export const useAwards = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [fetched, setFetching] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "awards"), (snapshot) => {
      const remoteAwards: Award[] = [];
      for (const doc of snapshot.docs) {
        if (doc.data()) {
          remoteAwards.push(doc.data() as Award);
        }
      }

      setAwards(remoteAwards);
      setTimeout(() => setFetching(true), 200);
    });

    return () => {
      if (unsub) {
        setFetching(false);
        unsub();
      }
    };
  }, []);

  return {
    awards,
    fetched,
  };
};
