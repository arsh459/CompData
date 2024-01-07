import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import { doc, getDoc } from "firebase/firestore";

import { Gift } from "@models/Gift/Gift";
import { useRouter } from "next/router";

export const useGift = () => {
  const [gift, setGift] = useState<Gift>();

  // console.log("g", games);
  const router = useRouter();
  const q = router.query as { giftId?: string | string[] };

  useEffect(() => {
    const getGifts = async (id: string) => {
      const giftObj = await getDoc(doc(db, "gifts", id));
      if (giftObj.data()) {
        setGift(giftObj.data() as Gift);
      }
    };

    q.giftId && typeof q.giftId === "string" && getGifts(q.giftId);
  }, [q.giftId]);

  return {
    gift,
  };
};
