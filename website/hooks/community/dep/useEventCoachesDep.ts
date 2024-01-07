import { useEffect, useState } from "react";
import { db } from "config/firebase";

import {
  onSnapshot,
  orderBy,
  query,
  doc,
  collection,
  //   Query,
} from "firebase/firestore";
import { CoachRank } from "@models/Activities/Activity";
// import { leaderboardWeekTypes } from "./useCommunityParams";

export type tabs = "Coaches" | "Overall" | "Community";

export const useEventCoachesDep = (
  eventId?: string,
  getCoaches?: boolean,
  leaderboardWeek?: string,
  leaderboardMonth?: string,
  after?: number
) => {
  const [rankCoaches, setRankCoaches] = useState<CoachRank[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const now = Date.now();
    if (getCoaches && eventId) {
      setLoading(true);
      const rankRef = collection(doc(db, "sbEvents", eventId), "coachRanks");

      let q = undefined;
      if (after && after > now) {
        q = query(rankRef, orderBy("rank", "asc"));
      } else {
        q = query(
          rankRef,
          orderBy(
            // leaderboardWeek === "current" ? "currentWeekRank" : "rank",
            leaderboardWeek === "overall"
              ? `monthlyRank.${leaderboardMonth}`
              : `weeklyRank.${leaderboardWeek}`,
            "asc"
          )
          // orderBy("totalCalories", "desc")
        );
      }

      const unsub = onSnapshot(q, (ranks) => {
        const userRankObjs: CoachRank[] = [];
        for (const rank of ranks.docs) {
          const rankData = rank.data() as CoachRank;

          userRankObjs.push(rankData);
        }

        setRankCoaches(userRankObjs);
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
  }, [eventId, getCoaches, leaderboardWeek, leaderboardMonth, after]);

  return {
    rankCoaches,
    loadingCoaches: loading,
  };
};
