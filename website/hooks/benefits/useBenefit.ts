import { useEffect, useState } from "react";

import { db } from "config/firebase";
import {
  doc,
  getDoc,
  //   collection,

  //   orderBy,
  //   query,
} from "firebase/firestore";
import { SBPrizeV2 } from "@models/Prizes/Prize";
import { v4 as uuidv4 } from "uuid";

// import { db } from "@config/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { createNewBadge } from "@models/Prizes/createUtils";

export const useBenefit = (gameId: string, id: string) => {
  const [benefit, setBenefit] = useState<SBPrizeV2>();

  useEffect(() => {
    const getBenefit = async () => {
      console.log("h", gameId, id);
      if (gameId && id) {
        const document = await getDoc(
          doc(doc(db, "sbEvents", gameId), "benefits", id)
        );

        const data = document.data();

        if (data) {
          const ben = data as SBPrizeV2;
          setBenefit(ben);
        } else {
          setBenefit({
            id: uuidv4(),
            name: "",
            minNumBadges: 0,
            badgeIds: [],
            strategy: "anyBadge",
            description: "",
            priority: 0,
            media: undefined,
            brand: "",
          });
        }
      }
    };

    getBenefit();
  }, [gameId, id]);

  return {
    benefit,
    setBenefit,
  };
};
