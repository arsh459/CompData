import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
// import { db } from "@config/firebase";
// import {
//   onSnapshot,
//   orderBy,
//   query,
//   doc,
//   collection,
//   limit,
// } from "firebase/firestore";
import { CoachRank } from "@models/Activity/Activity";
import { handleRankPagination } from "@utils/ranking/utils";

export type leaderboardActions = string | "i";
export type tabs = "Coaches" | "Overall" | "Community";

export const useEventCoaches = (
  eventId?: string,
  getCoaches?: boolean,
  leaderboardWeek?: string,
  leaderboardMonth?: string,
  after?: number,
  initNumUsers?: number,
  myTeamRank?: CoachRank,
  lpg?: string,
  ls?: leaderboardActions,
  setLpg?: (val: string) => void,
  setLs?: (val: leaderboardActions) => void
  // queryChange?: (
  //   querry: communityQueryV3,
  //   replace?: true,
  //   merge?: boolean
  // ) => void
) => {
  const [rankCoaches, setRankCoaches] = useState<CoachRank[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [numUsers, setNumUsers] = useState<number>(
  //   initNumUsers ? initNumUsers : 5
  // );
  const [nextExists, setNextExists] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    const now = Date.now();
    if (getCoaches && eventId) {
      // setLoading(true);

      const rankRef = firestore()
        .collection("sbEvents")
        .doc(eventId)
        .collection("coachRanks");
      // const rankRef = collection(doc(db, "sbEvents", eventId), "coachRanks");

      const num = lpg ? parseInt(lpg) * 25 : 10;
      const action = ls && ls === "i" ? "next_page" : "refresh";

      let q: FirebaseFirestoreTypes.Query | undefined = undefined;
      if (after && after > now) {
        q = rankRef.orderBy("rank", "asc").limit(num);
        // q = query(rankRef, orderBy("rank", "asc"), limit(num));
      } else {
        q = rankRef
          .orderBy(
            leaderboardWeek === "overall"
              ? `monthlyRank.${leaderboardMonth}`
              : `weeklyRank.${leaderboardWeek}`,
            "asc"
          )
          .limit(num);
        // q = query(
        //   rankRef,
        //   orderBy(
        //     // leaderboardWeek === "current" ? "currentWeekRank" : "rank",
        //     leaderboardWeek === "overall"
        //       ? `monthlyRank.${leaderboardMonth}`
        //       : `weeklyRank.${leaderboardWeek}`,
        //     "asc"
        //   ),
        //   limit(num)
        // orderBy("totalCalories", "desc")
        // );
      }

      const unsub = q.onSnapshot((ranks) => {
        const userRankObjs: CoachRank[] = [];
        const rankDict: { [uid: string]: boolean } = {};
        for (const rank of ranks.docs) {
          const rankData = rank.data() as CoachRank;

          // if (!rank.metadata.fromCache) {
          userRankObjs.push(rankData);
          rankDict[rankData.uid] = true;
          // }
        }

        setFetching(false);
        setNextExists(userRankObjs.length === num);
        setRankCoaches((prev) => {
          return handleRankPagination(
            prev,
            myTeamRank,
            rankDict,
            userRankObjs,
            action
          ) as CoachRank[];
        });
        setTimeout(() => setLoading(false), 500);
      });

      return () => {
        if (unsub) {
          unsub();
          setLoading(false);
        }
      };
    } else if (!eventId) {
      setRankCoaches([]);
      setLoading(false);
    }
    // };

    // if (getCoaches) getEventCoaches();
  }, [
    eventId,
    getCoaches,
    leaderboardWeek,
    // numUsers,
    leaderboardMonth,
    after,
    myTeamRank,
    lpg,
    ls,
  ]);

  const onNext = () => {
    if (setLpg && setLs && !fetching) {
      setFetching(true);
      setLpg(lpg ? `${parseInt(lpg) + 1}` : "2");
      setLs("i");
    }
  };

  return {
    rankCoaches,
    loadingCoaches: loading,
    onNext,
    nextExists,
  };
};
