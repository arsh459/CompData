import { useEffect, useState } from "react";
import { db } from "config/firebase";

import {
  onSnapshot,
  orderBy,
  query,
  doc,
  collection,
  limit,
  //   Query,
} from "firebase/firestore";
import { CoachRank } from "@models/Activities/Activity";
import { handleRankPagination } from "./ranking/utils";
import {
  communityQueryV3,
  leaderboardActions,
} from "./v2/useCommunityParamsV3";
// import { leaderboardWeekTypes } from "./useCommunityParams";

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
  queryChange?: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void
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
      const rankRef = collection(doc(db, "sbEvents", eventId), "coachRanks");

      const num = lpg ? parseInt(lpg) * 25 : 10;
      const action = ls && ls === "i" ? "next_page" : "refresh";

      let q = undefined;
      if (after && after > now) {
        q = query(rankRef, orderBy("rank", "asc"), limit(num));
      } else {
        q = query(
          rankRef,
          orderBy(
            // leaderboardWeek === "current" ? "currentWeekRank" : "rank",
            leaderboardWeek === "overall"
              ? `monthlyRank.${leaderboardMonth}`
              : `weeklyRank.${leaderboardWeek}`,
            "asc"
          ),
          limit(num)
          // orderBy("totalCalories", "desc")
        );
      }

      // console.log(
      //   "num",
      //   num,
      //   action,
      //   eventId,
      //   leaderboardMonth,
      //   leaderboardWeek
      // );

      const unsub = onSnapshot(q, (ranks) => {
        const userRankObjs: CoachRank[] = [];
        const rankDict: { [uid: string]: boolean } = {};
        for (const rank of ranks.docs) {
          const rankData = rank.data() as CoachRank;

          if (!rank.metadata.fromCache) {
            userRankObjs.push(rankData);
            rankDict[rankData.uid] = true;
          }
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
    if (queryChange && !fetching) {
      setFetching(true);
      queryChange(
        {
          lpg: lpg ? `${parseInt(lpg) + 1}` : "2",
          lS: "i",
        },
        undefined,
        true
      );
    }
    // console.log("here");
    // setNumUsers((prev) => prev + 5);
  };

  // console.log("rankCoaches", rankCoaches);

  return {
    rankCoaches,
    loadingCoaches: loading,
    onNext,
    nextExists,
  };
};
