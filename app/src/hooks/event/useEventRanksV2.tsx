import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { UserRank } from "@models/Activity/Activity";

export type tabs = "Coaches" | "Players" | "My Team";

export const useEventRanksV2 = (
  eventId?: string,
  communityId?: string,
  initNumUsers?: number,
  leaderboardWeek?: string,
  leaderboardMonth?: string,
  myUserRank?: UserRank
) => {
  const [rankMembers, setRankMembers] = useState<UserRank[]>([]);
  const [nextExists, setNextExists] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [numUsers, setNumUsers] = useState<number>(
    initNumUsers ? initNumUsers : 10
  );

  useEffect(() => {
    setLoading(true);

    if (eventId) {
      const rankRef = firestore()
        .collection("sbEvents")
        .doc(eventId)
        .collection("userRanks");

      const orderRankRef = rankRef.orderBy(
        leaderboardWeek === "overall"
          ? `monthlyRank.${leaderboardMonth}`
          : `weeklyRank.${leaderboardWeek}`,
        "asc"
      );

      const q = orderRankRef.limit(numUsers);

      if (q) {
        const unsub = q.onSnapshot((ranks) => {
          const userRankObjs: UserRank[] = [];

          for (const rank of ranks.docs) {
            const rankData = rank.data() as UserRank;

            userRankObjs.push(rankData);
          }

          setFetching(false);
          setRankMembers(userRankObjs);
          setNextExists(userRankObjs.length === numUsers);
          setTimeout(() => setLoading(false), 500);
        });

        return () => {
          if (unsub) {
            unsub();
          }
        };
      }
    } else if (!eventId) {
      setRankMembers([]);
      setLoading(false);
    }
  }, [
    eventId,
    communityId,
    leaderboardWeek,
    leaderboardMonth,
    myUserRank,
    numUsers,
  ]);

  const onNext = () => {
    if (nextExists && !fetching) {
      setFetching(true);
      setNumUsers((prev) => prev + (initNumUsers ? initNumUsers : 10));
    }
  };

  return {
    rankMembers,
    onNext,
    nextExists,
    loading,
  };
};
