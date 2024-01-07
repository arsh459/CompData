import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import { collection, getDocs } from "firebase/firestore";

import { Gift } from "@models/Gift/Gift";

export const useGifts = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);

  // console.log("g", games);
  // console.log("gamesObj", gamesObj);

  useEffect(() => {
    const getGifts = async () => {
      const giftObjs = await getDocs(collection(db, "gifts"));
      const remoteGifts: Gift[] = [];
      for (const gObj of giftObjs.docs) {
        remoteGifts.push(gObj.data() as Gift);
      }

      setGifts(remoteGifts);
    };

    getGifts();
  }, []);

  return {
    gifts,
  };
};
