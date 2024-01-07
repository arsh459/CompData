// import { onTopNavClick } from "@analytics/click/wrappers";
// import { SPRINT_LENGTH } from "@constants/gameStats";
import { getQueryParamsForCommunityV2 } from "@hooks/drawer/utils";
import { leaderboardKPIs, SprintObject } from "@models/Event/Event";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCurrentMonth } from "../challengeWeekUtils/utils";
import { profileSubNav } from "../useCommunityParams";

export type navLevelsV2 =
  | "program"
  | "rules"
  | "none"
  | "profile"
  | "compose"
  | "leaderboard";

export interface communityQueryV2 {
  eventId?: string;
  leaderboard?: leaderboardKPIs;
  leaderboardWeek?: string;
  leaderboardMonth?: string;
  nav?: navLevelsV2;
  profileSubNav?: profileSubNav;
  parentPostId?: string;
  pId?: string;
  postEventId?: string;
}

export type communityQueryKeysV2 =
  | "eventId"
  | "leaderboard"
  | "leaderboardWeek"
  | "leaderboardMonth"
  | "nav"
  | "profileSubNav"
  | "pId"
  | "postEventId"
  | "parentPostId";

export const useCommunityParamsV2 = (
  eventStarts?: number,
  challengeLength?: number,
  sprints?: SprintObject[]
) => {
  const router = useRouter();
  const q = router.query as communityQueryV2;

  // const [selectedLeaderboard, setSelectedKPI] =
  //   useState<leaderboardKPIs>("calories");
  const [nav, setNav] = useState<navLevelsV2>("none");
  const [leaderboardWeek, updateLeaderboardWeek] = useState<string>("");
  const [leaderboardMonth, updateLeaderboardMonth] = useState<string>("");
  const [parentPostId, setParentPostId] = useState<string>("");
  const [postEventId, setPostEventId] = useState<string>("");

  // console.log("q", q);

  useEffect(() => {
    if (router.isReady && !q.nav) {
      q.nav = "program";
      router.push(getQueryParamsForCommunityV2(q), undefined, {
        shallow: true,
      });
      // community
    } else if (router.isReady) {
      updateLeaderboardWeek(q.leaderboardWeek ? q.leaderboardWeek : "overall");
      // console.log("sprintLength", sprintLength);
      // console.log("eventStarts", eventStarts);
      // console.log("challengeLength", challengeLength);
      updateLeaderboardMonth(
        // "month-0"
        q.leaderboardMonth
          ? q.leaderboardMonth
          : getCurrentMonth(sprints, eventStarts, challengeLength)
      );
      // setSelectedKPI(q.leaderboard ? q.leaderboard : "calories");
      setNav(q.nav ? q.nav : "program");
      setParentPostId(q.parentPostId ? q.parentPostId : "");
      setPostEventId(q.postEventId ? q.postEventId : "");
    }
  }, [router, q, eventStarts, challengeLength, sprints]);

  // console.log("leaderboardWeek", leaderboardWeek);
  // console.log("leaderboardMonth", leaderboardMonth);

  const onNavChange = (newNav: navLevelsV2) => {
    q.nav = newNav;
    q.pId = "";
    q.parentPostId = "";
    q.postEventId = "";

    router.push(getQueryParamsForCommunityV2(q), undefined, {
      shallow: true,
    });
  };

  const onNavChangeWithScroll = (newNav: navLevelsV2) => {
    q.nav = newNav;
    q.pId = "";
    q.parentPostId = "";

    router.push(getQueryParamsForCommunityV2(q), undefined, {
      shallow: true,
    });

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);

    // onTopNavClick(
    //   nav === "program"
    //     ? "community"
    //     : nav === "leaderboard"
    //     ? "leaderboard"
    //     : nav === "rules"
    //     ? "rules"
    //     : ""
    // );
  };

  // const onLeaderboardChange = (newLeaderboard: leaderboardKPIs) => {
  //   q.leaderboard = newLeaderboard ? newLeaderboard : "calories";
  //   router.push(getQueryParamsForCommunityV2(q), undefined, {
  //     shallow: true,
  //   });
  // };

  const onLeaderboardMonthChange = (newMonth: string) => {
    q.leaderboardMonth = newMonth;
    router.push(getQueryParamsForCommunityV2(q), undefined, {
      shallow: true,
    });
  };

  // const onProfileNameClick = (uid: string) => {
  //   q.profileSubNav = "activities";
  //   q.pId = uid;

  //   router.push(getQueryParamsForCommunityV2(q), undefined, {
  //     shallow: true,
  //   });

  //   setTimeout(() => {
  //     window.scrollTo(0, 0);
  //   }, 200);
  // };

  const onParentPostChange = (parentPostId: string) => {
    q.parentPostId = parentPostId;
    // q.pId = "";
    // q.postEventId = postEventId;
    router.push(getQueryParamsForCommunityV2(q), undefined, {
      shallow: true,
    });

    // setTimeout(() => {
    //   window.scrollTo(0, 0);
    // }, 200);
  };

  const onLeaderboardWeekChange = (newWeek: string) => {
    q.leaderboardWeek = newWeek;
    router.push(getQueryParamsForCommunityV2(q), undefined, {
      shallow: true,
    });
  };

  const onGoBack = () => {
    if (!q.parentPostId) {
      router.replace(`/teams`);
    } else if (q.parentPostId) {
      q.parentPostId = "";
      router.push(getQueryParamsForCommunityV2(q), undefined, {
        shallow: true,
      });
    } else {
      router.back();
    }
  };

  return {
    nav,
    postEventId,
    onNavChange,
    parentPostId,
    onParentPostChange,
    onNavChangeWithScroll,
    onGoBack,
    // eventStarts,
    // selectedLeaderboard,
    // onProfileNameClick,
    leaderboardWeek,
    // onLeaderboardChange,
    onLeaderboardWeekChange,
    leaderboardMonth,
    onLeaderboardMonthChange,
  };
};
