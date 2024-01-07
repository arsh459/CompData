import { useEffect, useState } from "react";
import { db } from "config/firebase";

import {
  onSnapshot,
  orderBy,
  query,
  doc,
  collection,
  getDoc,
  limit,
  where,
  //   Query,
} from "firebase/firestore";
import { UserRank } from "@models/Activities/Activity";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { useEventCoachesDep } from "./useEventCoachesDep";
import { getRank } from "@templates/community/Program/MemberStrip/utils";
// import { leaderboardKPIs } from "@models/Event/Event";
// import { leaderboardWeekTypes } from "./useCommunityParams";
// import { useCurrentWeek } from "./useCurrentWeek";

export type tabs = "Coaches" | "Players" | "My Team";

export const useEventRanksDep = (
  eventId?: string,
  communityId?: string,
  // selectedLeaderboard?: leaderboardKPIs,
  initNumUsers?: number,
  leaderboardWeek?: string,
  leaderboardMonth?: string,
  after?: number
) => {
  // console.log("eventId", eventId);
  const [rankMembers, setRankMembers] = useState<UserRank[]>([]);
  const [rankObj, setRankObj] = useState<{ [uid: string]: boolean }>({});
  const [fetched, setFetched] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<tabs>("Players");
  const [loading, setLoading] = useState<boolean>(false);
  const [coaches, setCoachObj] = useState<{ [uid: string]: LeaderBoard }>({});

  const [numUsers, setNumUsers] = useState<number>(
    initNumUsers ? initNumUsers : 10
  );
  const [nextExists, setNextExists] = useState<boolean>(false);

  // const { weekString } = useCurrentWeek(after);

  useEffect(() => {
    const fetchCoaches = async () => {
      const tmpCoachObj: { [uid: string]: LeaderBoard } = {};
      for (const member of rankMembers) {
        if (!tmpCoachObj[member.coachCommunityId]) {
          const ref = doc(
            db,
            "leaderBoard",
            `leader-${member.coachCommunityId}`
          );
          const remoteDoc = await getDoc(ref);

          if (remoteDoc) {
            tmpCoachObj[member.coachCommunityId] =
              remoteDoc.data() as LeaderBoard;
          }
        }
      }

      setCoachObj(tmpCoachObj);
    };

    if (fetched) {
      fetchCoaches();
    }
  }, [fetched, rankMembers]);

  // console.log("rank", rankMembers.length);

  useEffect(() => {
    const now = Date.now();

    if (eventId && tabValue !== "Coaches" && numUsers) {
      setLoading(true);
      const rankRef = collection(doc(db, "sbEvents", eventId), "userRanks");

      // console.log("leaderboardMonth", leaderboardMonth);

      const orderConstraint = orderBy(
        leaderboardWeek === "overall"
          ? `monthlyRank.${leaderboardMonth}`
          : `weeklyRank.${leaderboardWeek}`,
        "asc"
      );

      let q = undefined;
      if (after && after > now && tabValue === "Players") {
        q = query(rankRef, orderBy("rank", "asc"), limit(numUsers));
      } else if (tabValue === "Players") {
        q = query(rankRef, orderConstraint, limit(numUsers));

        // console.log("q", q);
      } else if (tabValue === "My Team" && communityId) {
        q = query(
          rankRef,
          where("coachCommunityId", "==", communityId)
          // orderConstraint,
          // limit(numUsers)
        );
      }

      // console.log("q", q);

      if (q) {
        const unsub = onSnapshot(q, (ranks) => {
          const userRankObjs: UserRank[] = [];
          const rankDict: { [uid: string]: boolean } = {};
          // console.log("docs", ranks.docs.length);
          for (const rank of ranks.docs) {
            const rankData = rank.data() as UserRank;

            userRankObjs.push(rankData);
            rankDict[rankData.uid] = true;
          }

          if (tabValue === "My Team") {
            userRankObjs.sort(
              (a, b) =>
                getRank(a, leaderboardWeek, leaderboardMonth) -
                getRank(b, leaderboardWeek, leaderboardMonth)
            );
          }

          // console.log("userRankObjs", userRankObjs, leaderboardMonth);

          setRankObj(rankDict);
          setFetched(true);
          setNextExists(userRankObjs.length === numUsers);
          setRankMembers(userRankObjs);
          setTimeout(() => setLoading(false), 500);
        });

        return () => {
          if (unsub) {
            unsub();
            console.log("unmounting");
            // setLoading(false);
            // setRankObj({});
            // setFetched(true);
            // setRankMembers([]);
          }
        };
      }
    } else if (!eventId) {
      console.log("setting to zero");
      setRankObj({});
      setFetched(true);
      setRankMembers([]);
      setLoading(false);
    }
    // };
    // if (tabValue !== "Coaches") getEventRanks();
  }, [
    eventId,
    tabValue,
    numUsers,
    communityId,
    after,
    leaderboardWeek,
    leaderboardMonth,
    // weekString,
  ]);

  // console.log("rankMembers", rankMembers);

  const onNext = () => {
    // console.log("here");
    setNumUsers((prev) => prev + 50);
  };

  const { rankCoaches, loadingCoaches } = useEventCoachesDep(
    eventId,
    tabValue === "Coaches",
    leaderboardWeek,
    leaderboardMonth,
    after
  );

  return {
    rankMembers,
    rankCoaches,
    rankObj,
    coaches,
    tabValue,
    setTabValue,
    onNext,
    nextExists,
    loading,
    loadingCoaches,
  };
};
