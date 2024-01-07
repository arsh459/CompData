import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
  doc,
  query,
  onSnapshot,
  collection,
  where,
  Query,
} from "firebase/firestore";
import { CoachRank, UserRank } from "@models/Activities/Activity";
import { viewTypes } from "@hooks/community/v2/useCommunityParamsV3";

export const useCompetition = (
  eventId?: string,
  rankForUser?: number | string,
  rankForTeam?: number | string,
  viewType?: viewTypes,
  round?: string,
  sprint?: string,
  period?: string
) => {
  const [competition, setCompetition] = useState<UserRank | CoachRank>();
  const [userType, setUserType] = useState<"teams" | "players" | "none">(
    "none"
  );

  useEffect(() => {
    if (
      eventId &&
      viewType &&
      round &&
      sprint &&
      period &&
      typeof rankForUser === "number" &&
      typeof rankForTeam === "number"
    ) {
      // setLoading(true);
      let q: Query | undefined = undefined;
      if (viewType === "players" && typeof rankForUser === "number") {
        q = query(
          collection(doc(db, "sbEvents", eventId), "userRanks"),
          where(
            period === "week" && round !== "overall"
              ? `weeklyRank.${round}`
              : `monthlyRank.${sprint}`,
            "==",
            rankForUser <= 10 ? 1 : rankForUser < 20 ? 10 : rankForUser - 10
          )
        );
      } else if (viewType === "teams" && typeof rankForTeam === "number") {
        q = query(
          collection(doc(db, "sbEvents", eventId), "coachRanks"),
          where(
            period === "week" && round !== "overall"
              ? `weeklyRank.${round}`
              : `monthlyRank.${sprint}`,
            "==",
            rankForTeam <= 15 ? 1 : rankForTeam < 25 ? 10 : rankForTeam - 10
          )
        );
      }

      if (q) {
        const unsubscribe = onSnapshot(q, (docs) => {
          if (docs.docs.length) {
            const rank = docs.docs[0].data() as UserRank | CoachRank;
            setCompetition(rank);
            setUserType(viewType === "players" ? "players" : "teams");
            // setLoading(false);
          }
        });

        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      }
    }
  }, [eventId, rankForTeam, rankForUser, viewType, round, sprint, period]);

  return {
    competition,
    userType,
  };
};
