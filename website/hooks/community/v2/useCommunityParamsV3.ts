import { getQueryParamsForCommunityV3 } from "@hooks/drawer/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCurrentMonth } from "../challengeWeekUtils/utils";
import { gameTypes, RoundObject, SprintObject } from "@models/Event/Event";
import { frequencyTypes } from "@models/Prizes/PrizeV2";

export type navLevelsV3 = "program" | "prizes" | "none" | "leaderboard";

export type postTypes = "announcement" | "spotlight";
// export type modalTypes = "comment" | "postDet" | "share";

export type viewTypes = "players" | "teams";

export type period = "week" | "month";
export type leaderboardActions = string | "i";

// export type prizesForTypes = "daily" | "weekly" | "monthly";

export interface communityQueryV3 {
  nav?: navLevelsV3;
  post?: postTypes;
  postId?: string;
  period?: period;
  view?: viewTypes;
  leaderboardWeek?: string;
  leaderboardMonth?: string;
  lpg?: string;
  lS?: leaderboardActions;
  teamSelect?: string;
  // mpost?: "true" | "false";
  // modal?: modalTypes;
  prizesFor?: frequencyTypes;
}

export type communityQueryKeysV3 =
  | "nav"
  | "post"
  | "postId"
  | "period"
  | "view"
  | "leaderboardWeek"
  | "lpg"
  // | "modal"
  | "leaderboardMonth"
  | "prizesFor";

export const useCommunityParamsV3 = (
  eventStarts?: number,
  challengeLength?: number,
  sprints?: SprintObject[],
  rounds?: RoundObject[],
  gameType?: gameTypes
) => {
  const router = useRouter();
  const q = router.query as communityQueryV3;
  const [urlState, setURLState] = useState<communityQueryV3>(q);

  useEffect(() => {
    // console.log("here in router effect");
    if (router.isReady && (!q.nav || !q.leaderboardMonth)) {
      q.nav = q.nav ? q.nav : "program";
      q.leaderboardMonth = getCurrentMonth(
        sprints,
        eventStarts,
        challengeLength
      );
      q.leaderboardWeek = q.leaderboardWeek ? q.leaderboardWeek : "overall";
      router.push(getQueryParamsForCommunityV3(q), undefined, {
        shallow: true,
      });
    } else if (router.isReady) {
      setURLState(q);
    }
  }, [router, q, sprints, rounds, challengeLength, eventStarts]);

  const leaderboardInitialParams = (query: communityQueryV3) => {
    query.view = gameType === "team" ? "teams" : "players";
    query.leaderboardWeek = "overall";
    query.period = "week";
    query.leaderboardMonth = getCurrentMonth(
      sprints,
      eventStarts,
      challengeLength
    );
  };

  const onQueryChange = (
    query: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => {
    if (merge) {
      router.push(getQueryParamsForCommunityV3({ ...q, ...query }), undefined, {
        shallow: true,
      });

      return;
    }

    let isNavChange = q.nav !== query.nav;

    query.nav ? (q.nav = query.nav) : delete q.nav;
    query.post ? (q.post = query.post) : delete q.post;
    query.postId ? (q.postId = query.postId) : delete q.postId;
    query.view ? (q.view = query.view) : delete q.view;
    query.leaderboardWeek
      ? (q.leaderboardWeek = query.leaderboardWeek)
      : delete q.leaderboardWeek;
    query.leaderboardMonth
      ? (q.leaderboardMonth = query.leaderboardMonth)
      : q.leaderboardMonth;
    query.period ? (q.period = query.period) : q.period;
    query.lpg ? (q.lpg = query.lpg) : delete q.lpg;
    query.lS ? (q.lS = query.lS) : delete q.lS;
    query.prizesFor ? (q.prizesFor = query.prizesFor) : delete q.prizesFor;

    if (replace) {
      router.replace(getQueryParamsForCommunityV3(q), undefined, {
        shallow: true,
      });
    } else {
      router.push(getQueryParamsForCommunityV3(q), undefined, {
        shallow: true,
      });
    }

    if (isNavChange) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 200);
    }
  };

  const onGoBack = () => {
    // console.log("ss", q.teamSelect);
    if (q.teamSelect) {
      delete q.teamSelect;
      router.push(getQueryParamsForCommunityV3(q), undefined, {
        shallow: true,
      });
    } else if (q.nav === "program" && q.postId) {
      delete q.postId;
      router.push(getQueryParamsForCommunityV3(q), undefined, {
        shallow: true,
      });
    } else if (!q.postId && !q.post) {
      // console.log("j");
      router.replace(`/teams`);
    } else {
      // console.log("back");
      router.back();
    }
  };

  const onGoToTeams = () => router.push(`/teams`);

  return {
    urlState,
    leaderboardInitialParams,
    onQueryChange,
    onGoBack,
    onGoToTeams,
  };
};
