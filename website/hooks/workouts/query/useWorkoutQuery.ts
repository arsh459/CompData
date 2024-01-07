import { useCommunityEvent } from "@hooks/community/useCommunityEvent";
import { leaderboardWeekTypes } from "@hooks/community/useCommunityParams";
import { getQueryParamsForWorkoutPage } from "@hooks/drawer/utils";
import { leaderboardKPIs } from "@models/Event/Event";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface workoutQuery {
  parentId?: string;
  leaderboardWeek?: "overall" | "current";
  leaderboard?: leaderboardKPIs;
}

export type workoutQueryKeys = "parentId" | "leaderboard" | "leaderboardWeek";

export const useWorkoutQuery = (challengeId: string) => {
  const [parentId, setParentId] = useState<string>(challengeId);
  // const [communityId, setCommunityId] = useState<string>();
  const [selectedLeaderboard, setSelectedKPI] =
    useState<leaderboardKPIs>("calories");
  const [leaderboardWeek, updateLeaderboardWeek] =
    useState<leaderboardWeekTypes>("overall");

  const router = useRouter();
  const q = router.query as workoutQuery;

  const childEvent = useCommunityEvent(challengeId);
  const remParentId = childEvent.selectedEvent?.parentId;

  useEffect(() => {
    if (router.isReady && (!q.leaderboard || !q.parentId)) {
      q.leaderboard = "calories";
      q.parentId = remParentId ? remParentId : q.parentId ? q.parentId : "";
      router.push(getQueryParamsForWorkoutPage(q), undefined, {
        shallow: true,
      });
    } else if (router.isReady) {
      setParentId(q.parentId ? q.parentId : "");
      setSelectedKPI(q.leaderboard ? q.leaderboard : "calories");
      updateLeaderboardWeek(q.leaderboardWeek ? q.leaderboardWeek : "overall");
    }
  }, [router, q, remParentId]);

  // useEffect(() => {
  //   if (router.isReady) {
  //     setParentId(challengeId ? challengeId : q.parentId ? q.parentId : "");
  //     // setCommunityId(q.communityId ? q.communityId : "");
  //     setSelectedKPI(q.leaderboard ? q.leaderboard : "calories");
  //   } else if (
  //     router.isReady &&
  //     // q.parentId &&
  //     // q.communityId &&
  //     !q.leaderboard
  //   ) {
  //     q.leaderboard = "calories";
  //     router.push(getQueryParamsForWorkoutPage(q), undefined, {
  //       shallow: true,
  //     });
  //   }
  // }, [router, q, challengeId]);

  const onLeaderboardChange = (newLeaderboard: leaderboardKPIs) => {
    q.leaderboard = newLeaderboard ? newLeaderboard : "calories";
    router.push(getQueryParamsForWorkoutPage(q), undefined, { shallow: true });
  };

  const onLeaderboardWeekChange = (newWeek: leaderboardWeekTypes) => {
    q.leaderboardWeek = newWeek;
    router.push(getQueryParamsForWorkoutPage(q), undefined, { shallow: true });
  };

  return {
    parentId,
    eventKey: childEvent.selectedEvent?.eventKey,
    onLeaderboardChange,
    selectedLeaderboard,
    onLeaderboardWeekChange,
    leaderboardWeek,
  };
};
