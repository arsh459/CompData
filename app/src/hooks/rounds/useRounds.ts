import { useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";
import { RoundInterface } from "@models/Rounds/interface";

// gives latest started round
export const useRounds = (gameId?: string) => {
  const [rounds, setRounds] = useState<RoundInterface[]>([]);

  useEffect(() => {
    if (gameId) {
      const listener = firestore()
        .collection("sbEvents")
        .doc(gameId)
        .collection("rounds")
        // .where("start", "<=", Date.now()) // already started
        .where("end", ">=", Date.now())
        .orderBy("end", "desc")
        .limit(1)
        .onSnapshot((roundDoc) => {
          if (roundDoc?.docs) {
            const roundsD: RoundInterface[] = [];
            for (const round of roundDoc.docs) {
              const rdata = round.data() as RoundInterface;

              // if (rdata.end >= Date.now()) {
              roundsD.push(rdata);
              // }
            }

            setRounds(roundsD);
          }
        });

      return () => {
        listener();
      };
    }
  }, [gameId]);

  return { rounds };
};
