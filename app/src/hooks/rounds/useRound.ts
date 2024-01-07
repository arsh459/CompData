import { useEffect } from "react";

import firestore from "@react-native-firebase/firestore";
import { RoundInterface } from "@models/Rounds/interface";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

export const useRound = (gameId: string, roundId: string) => {
  // const [round, setRound] = useState<RoundInterface>();

  const setCurrentRound = useUserStore(
    (state) => state.setCurrentRound,
    shallow
  );

  useEffect(() => {
    const listener = firestore()
      .collection("sbEvents")
      .doc(gameId)
      .collection("rounds")
      .doc(roundId)
      .onSnapshot((roundDoc) => {
        if (roundDoc.exists) {
          const rd = roundDoc.data() as RoundInterface;
          // setRound(rd);

          setCurrentRound(rd);
        }
      });

    return () => {
      listener();
    };
  }, [gameId, roundId]);

  // return { round };
};
