import { useEffect, useState } from "react";
import { db } from "config/firebase";

import {
  onSnapshot,
  //   orderBy,
  //   query,
  doc,
  collection,
  // getDoc,
  //   limit,
  // where,
  //   Query,
} from "firebase/firestore";
import { UserRank } from "@models/Activities/Activity";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import { useEventCoaches } from "./useEventCoaches";

// import { useRouter } from "next/router";
// import { leaderboardKPIs } from "@models/Event/Event";
// import { leaderboardWeekTypes } from "./useCommunityParams";
// import { useCurrentWeek } from "./useCurrentWeek";

export type tabs = "Coaches" | "Players" | "My Team";

export const usePlayers = (eventId: string) => {
  // console.log("eventId", eventId);
  const [rankMembers, setRankMembers] = useState<UserRank[]>([]);
  // const [action, setAction] = useState<"REFRESH" | "NEXT_PAGE">("REFRESH");
  //   const [rankObj, setRankObj] = useState<{ [uid: string]: boolean }>({});
  //   // const [refresh, setRefresh] = useState<number>(0);
  //   // const [fetched, setFetched] = useState<boolean>(false);
  //   // const [tabValue, setTabValue] = useState<tabs>("Players");
  //   const [loading, setLoading] = useState<boolean>(false);
  //   const [fetching, setFetching] = useState<boolean>(false);
  //   // const [coaches, setCoachObj] = useState<{ [uid: string]: LeaderBoard }>({});

  //   // const [numUsers, setNumUsers] = useState<number>(
  //   //   initNumUsers ? initNumUsers : 10
  //   // );
  //   const [nextExists, setNextExists] = useState<boolean>(false);

  // const { weekString } = useCurrentWeek(after);

  useEffect(() => {
    // const now = Date.now();

    if (eventId) {
      const rankRef = collection(doc(db, "sbEvents", eventId), "userRanks");

      if (rankRef) {
        const unsub = onSnapshot(rankRef, (ranks) => {
          // let fromCache: boolean = false;
          const rankObjs: UserRank[] = [];
          for (const rank of ranks.docs) {
            const rankData = rank.data() as UserRank;
            rankObjs.push(rankData);
          }

          setRankMembers(rankObjs);
        });

        return () => {
          if (unsub) {
            unsub();
          }
        };
      }
    }
  }, [eventId]);

  return {
    rankMembers,
  };
};
