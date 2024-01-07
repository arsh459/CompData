import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
// import { db } from "@config/firebase";
// import {
//   doc,
//   query,
//   onSnapshot,
//   collection,
//   where,
//   Query,
// } from "firebase/firestore";
import { CoachRank, UserRank } from "@models/Activity/Activity";

export const useExactCoachRank = (
  gameId?: string,
  rankForTeam?: number | string,
  sprint?: string
) => {
  const [competition, setCompetition] = useState<UserRank | CoachRank>();

  useEffect(() => {
    if (gameId && rankForTeam && sprint) {
      const q = firestore()
        .collection("sbEvents")
        .doc(gameId)
        .collection("coachRanks")
        .where(`monthlyRank.${sprint}`, "==", rankForTeam);

      const unsubscribe = q.onSnapshot((docs) => {
        if (docs.docs?.length) {
          const rank = docs.docs[0].data() as UserRank | CoachRank;
          setCompetition(rank);
        }
      });

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    } else {
      setCompetition(undefined);
    }
  }, [gameId, rankForTeam, sprint]);

  //   useEffect(() => {

  //     if (
  //       gameId &&
  //       rankForTeam &&
  //       sprint
  //     ) {

  //   const  q = firestore()
  //       .collection("sbEvents")
  //       .doc(gameId)
  //       .collection("coachRanks")
  //       .where(
  //        `monthlyRank.${sprint}`,
  //         "==",
  //         rankForTeam
  //       );

  //         return () => {
  //           if (unsubscribe) {
  //             unsubscribe();
  //           }
  //         };

  //       }
  //   }, [gameId, rankForTeam, ]);

  return {
    competition,
  };
};
