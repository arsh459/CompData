import { useEffect, useState } from "react";
import { CoachRank } from "@models/Activity/Activity";
import firestore from "@react-native-firebase/firestore";

export const useCoachRanksCount = (
  eventId?: string,
  leaderboardWeek?: string,
  leaderboardMonth?: string,
  after?: number,
  myTeamRank?: CoachRank
) => {
  const [numberOfParticipetedTeam, setNumberOfParticipetedTeam] =
    useState<number>(0);

  useEffect(() => {
    const getTeamCount = async () => {
      const coachRanks = await firestore()
        .collection("sbEvents")
        .doc(eventId)
        .collection("coachRanks")
        .get();

      if (coachRanks.docs) {
        setNumberOfParticipetedTeam(coachRanks.docs.length);
      }
    };

    if (eventId) {
      getTeamCount();
    }
  }, [eventId, leaderboardWeek, leaderboardMonth, after, myTeamRank]);

  return { numberOfParticipetedTeam };
};
