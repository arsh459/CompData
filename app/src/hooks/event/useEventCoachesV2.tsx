import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { CoachRank } from "@models/Activity/Activity";

export type tabs = "Coaches" | "Overall" | "Community";

export const useEventCoachesV2 = (
  eventId?: string,
  getCoaches?: boolean,
  leaderboardWeek?: string,
  leaderboardMonth?: string,
  after?: number,
  initNumCoaches?: number,
  myTeamRank?: CoachRank
) => {
  const [rankCoaches, setRankCoaches] = useState<CoachRank[]>([]);
  const [nextExists, setNextExists] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [numCoaches, setNumCoaches] = useState<number>(
    initNumCoaches ? initNumCoaches : 10
  );

  useEffect(() => {
    setLoading(true);
    const now = Date.now();

    if (getCoaches && eventId) {
      const rankRef = firestore()
        .collection("sbEvents")
        .doc(eventId)
        .collection("coachRanks");

      let q: FirebaseFirestoreTypes.Query | undefined = undefined;
      if (after && after > now) {
        q = rankRef.orderBy("rank", "asc").limit(numCoaches);
      } else {
        q = rankRef
          .orderBy(
            leaderboardWeek === "overall"
              ? `monthlyRank.${leaderboardMonth}`
              : `weeklyRank.${leaderboardWeek}`,
            "asc"
          )
          .limit(numCoaches);
      }

      const unsub = q.onSnapshot((ranks) => {
        const coachRankObjs: CoachRank[] = [];

        for (const rank of ranks.docs) {
          const rankData = rank.data() as CoachRank;

          coachRankObjs.push(rankData);
        }

        setFetching(false);
        setRankCoaches(coachRankObjs);
        setNextExists(coachRankObjs.length === numCoaches);
        setTimeout(() => setLoading(false), 500);
      });

      return () => {
        if (unsub) {
          unsub();
        }
      };
    } else if (!eventId) {
      setRankCoaches([]);
      setLoading(false);
    }
  }, [
    eventId,
    getCoaches,
    leaderboardWeek,
    leaderboardMonth,
    after,
    myTeamRank,
    numCoaches,
  ]);

  const onNext = () => {
    if (nextExists && !fetching) {
      setFetching(true);
      setNumCoaches((prev) => prev + (initNumCoaches ? initNumCoaches : 10));
    }
  };

  return {
    rankCoaches,
    onNext,
    nextExists,
    loading,
  };
};
