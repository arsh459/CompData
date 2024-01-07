import { getQueryParamsForCommunity } from "@hooks/drawer/utils";
import { Cohort, EventInterface, leaderboardKPIs } from "@models/Event/Event";
// import { communitySubNav } from "@templates/community/Program/TopNav/TopNav";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { eventVisibility } from "./useCommunityEvent";

export type navLevels =
  | "program"
  // | "me"
  | "creator"
  | "discover"
  | "none"
  | "edit-profile"
  | "edit-events"
  | "profile"
  | "compose"
  | "leaderboard"
  // | "workouts"
  // | "rewards"
  | "members";

export type leaderboardWeekTypes = "overall" | "current";

export type profileSubNav = "trophies" | "activities" | "goals";

export interface communityQuery {
  eventId?: string;
  cohortId?: string;
  leaderboard?: leaderboardKPIs;
  leaderboardWeek?: "overall" | "current";
  nav?: navLevels;
  profileSubNav?: profileSubNav;
  calendarMonth?: string;
  // subNav?: communitySubNav;
  parentPostId?: string;
  pId?: string;
}

export type communityQueryKeys =
  | "eventId"
  | "cohortId"
  | "leaderboard"
  | "leaderboardWeek"
  | "nav"
  | "profileSubNav"
  | "pId"
  | "calendarMonth"
  // | "subNav"
  | "parentPostId";

export const useCommunityParams = (
  allEvents: EventInterface[],
  allEventCohorts: {
    [eId: string]: { [cohortId: string]: Cohort };
  },
  leaderKey?: string
) => {
  const router = useRouter();
  const q = router.query as communityQuery;

  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [profileNav, setProfileSubNav] = useState<profileSubNav>("activities");
  const [profileId, setProfileId] = useState<string>("");
  const [cohortId, setCohortId] = useState<string>("");
  const [selectedLeaderboard, setSelectedKPI] =
    useState<leaderboardKPIs>("calories");
  const [nav, setNav] = useState<navLevels>("none");
  const [leaderboardWeek, updateLeaderboardWeek] =
    useState<leaderboardWeekTypes>("overall");
  const [parentPostId, setParentPostId] = useState<string>("");
  const [eventViewState, setEventViewState] =
    useState<eventVisibility>("unknown");
  // const [commSubNav, setComSubNav] = useState<communitySubNav>('leaderboard');

  useEffect(() => {
    if (router.isReady && !q.eventId && !q.nav) {
      const orderedEvents = allEvents.filter(
        (event) => typeof event.orderNumber === "number"
      );
      if (orderedEvents.length > 0) {
        q.eventId = orderedEvents[0].id;
        const cohortObj = allEventCohorts[orderedEvents[0].id];

        if (cohortObj && Object.keys(cohortObj).length > 0) {
          q.cohortId = Object.keys(cohortObj)[0];
        }

        q.nav = "program";
        router.push(getQueryParamsForCommunity(q), undefined, {
          shallow: true,
        });

        return;
      }

      const freeEvents = allEvents.filter((event) => !event.cost);
      if (freeEvents.length > 0) {
        q.eventId = freeEvents[0].id;
        const cohortObj = allEventCohorts[freeEvents[0].id];

        if (cohortObj && Object.keys(cohortObj).length > 0) {
          q.cohortId = Object.keys(cohortObj)[0];
        }

        q.nav = "program";
        router.push(getQueryParamsForCommunity(q), undefined, {
          shallow: true,
        });
        setEventViewState("community");
      } else if (allEvents.length > 0) {
        q.eventId = allEvents[0].id;
        const cohortObj = allEventCohorts[allEvents[0].id];

        if (cohortObj && Object.keys(cohortObj).length > 0) {
          q.cohortId = Object.keys(cohortObj)[0];
        }

        q.nav = "program";
        router.push(getQueryParamsForCommunity(q), undefined, {
          shallow: true,
        });
        setEventViewState("preview");
      } else {
        q.nav = "program";
        router.push(getQueryParamsForCommunity(q), undefined, {
          shallow: true,
        });
      }
    } else if (router.isReady) {
      setSelectedEventId(q.eventId ? q.eventId : "");
      updateLeaderboardWeek(q.leaderboardWeek ? q.leaderboardWeek : "overall");
      setCohortId(q.cohortId ? q.cohortId : "");
      setSelectedKPI(q.leaderboard ? q.leaderboard : "calories");
      setNav(q.nav ? q.nav : "program");
      setProfileSubNav(q.profileSubNav ? q.profileSubNav : "activities");
      setProfileId(q.pId ? q.pId : "");
      setParentPostId(q.parentPostId ? q.parentPostId : "");
      // setComSubNav(q)
    }
  }, [router, q, allEvents, allEventCohorts]);

  // useEffect(() => {
  //   if (!uid && router.isReady) {
  //     console.log("here");
  //     q.nav = "program";
  //     q.pId = "";
  //     router.push(getQueryParamsForCommunity(q), undefined, {
  //       shallow: true,
  //     });
  //   }
  // }, [uid, router, q]);

  const onEventChange = (newId: string, cohortId: string) => {
    q.eventId = newId;
    q.cohortId = cohortId ? cohortId : "";
    // q.sessionId = "";
    // q.postId = "";
    router.push(getQueryParamsForCommunity(q), undefined, { shallow: true });
  };

  const onNavChange = (nav: navLevels) => {
    q.nav = nav;
    q.pId = "";
    q.parentPostId = "";
    router.push(getQueryParamsForCommunity(q), undefined, { shallow: true });
  };

  const onNavChangeWithScroll = (nav: navLevels) => {
    q.nav = nav;
    q.pId = "";
    q.parentPostId = "";
    router.push(getQueryParamsForCommunity(q), undefined, { shallow: true });

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
  };

  const onLeaderboardChange = (newLeaderboard: leaderboardKPIs) => {
    q.leaderboard = newLeaderboard ? newLeaderboard : "calories";
    router.push(getQueryParamsForCommunity(q), undefined, { shallow: true });
  };

  const onProfilePress = (pId: string, profileNav: profileSubNav) => {
    q.nav = "profile";
    q.pId = pId;
    q.profileSubNav = profileNav;
    // console.log("IN PROFILE");
    router.push(getQueryParamsForCommunity(q), undefined, { shallow: true });
  };

  const onProfileSubNav = (profileNav: profileSubNav) => {
    q.nav = "profile";
    q.profileSubNav = profileNav;
    router.push(getQueryParamsForCommunity(q), undefined, { shallow: true });
  };

  const onProfileNameClick = (uid: string) => {
    q.profileSubNav = "activities";
    q.pId = uid;
    router.push(getQueryParamsForCommunity(q), undefined, { shallow: true });

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
  };

  // const onSessionChange = (newId: string) => {
  //   // q.sessionId = newId;
  //   // q.postId = "";
  //   router.push(getQueryParamsForCommunity(q), undefined, { shallow: true });
  // };

  // const onPostChange = (postId: string) => {
  //   q.postId = postId;
  //   router.push(getQueryParamsForCommunity(q), undefined, { shallow: true });
  // };

  const onParentPostChange = (parentPostId: string) => {
    q.parentPostId = parentPostId;
    q.pId = "";
    router.push(getQueryParamsForCommunity(q), undefined, { shallow: true });

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
  };

  const onLeaderboardWeekChange = (newWeek: leaderboardWeekTypes) => {
    q.leaderboardWeek = newWeek;
    router.push(getQueryParamsForCommunity(q), undefined, { shallow: true });
  };

  const onGoBack = () => {
    if (!q.eventId && leaderKey) {
      router.replace(`/${leaderKey}`, undefined, { shallow: true });

      setTimeout(() => router.back(), 1000);
    } else {
      router.back();
    }
  };

  return {
    selectedEventId: selectedEventId,
    selectedCohortId: cohortId,
    // sessionId: sessionId,
    parentPostId,
    onParentPostChange,
    onEventChange,
    onNavChange,
    onProfilePress,
    profileId,
    profileNav,
    onProfileSubNav,
    leaderboardWeek,
    onLeaderboardWeekChange,
    onNavChangeWithScroll,
    nav: nav,
    // postId: postId,
    onLeaderboardChange,
    selectedLeaderboard,
    eventViewState,
    setEventViewState,
    onGoBack,
    onProfileNameClick,
  };
};
