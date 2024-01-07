import { db } from "@config/firebase";
import { RoundInterface } from "@models/Event/Round";

import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useRoundDetails = (gameId?: string) => {
  const [roundDetails, setRoundDetails] = useState<RoundInterface[]>([]);
  useEffect(() => {
    const getSpDetails = async () => {
      if (gameId) {
        const docs = await getDocs(
          collection(doc(db, "sbEvents", gameId), "rounds")
        );

        const remoteSprints: RoundInterface[] = [];
        for (const doc of docs.docs) {
          remoteSprints.push(doc.data() as RoundInterface);
        }

        setRoundDetails(remoteSprints);
      }
    };

    getSpDetails();
  }, [gameId]);

  return {
    roundDetails,
  };
};
