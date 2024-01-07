import { getCurrentMonthForPurchase } from "@hooks/community/challengeWeekUtils/utils";
import { getQueryParamsForJoinBoat } from "@hooks/drawer/utils";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
// import {
// copyChallengeForCreator,
// saveCopiedChallenge,
// } from "@models/Event/challengeInvite";
import { EventInterface } from "@models/Event/Event";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { createNewPost } from "@models/Posts/createUtils";
import { addUserToTeam } from "@models/User/createUtils";
import {
  updateUserBriefFields,
  updateUserTextFields,
} from "@models/User/updateUtils";
import { UserInterface } from "@models/User/User";
import { isProfileComplete } from "@templates/joinBoatTemplate/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { payRequest } from "./payUtils";
import {
  createNewTeam,
  getDefaultSubscriptionId,
  startFreeTrial,
  userHasTeam,
} from "./utils";

export type boatParams =
  | "profileBrief"
  | "teamName"
  | "teamDesc"
  | "userKey"
  | "loading"
  | "subscription"
  | "has_team"
  // | "has_paid"
  | "";

export interface boatParamQuery {
  section?: boatParams;
}

export type boatParamQueryKeys = "section";

export const useJoinBoatParams = (
  game: EventInterface,
  user: UserInterface,
  leaderUID: string,
  eventToJoin: EventInterface,
  subStatus: subscriptionStatus,
  onSuccessSub: () => void,
  coachKey?: string,
  eventKey?: string,
  localUserName?: string,
  localUserKey?: string,
  localUserImg?: CloudinaryMedia | AWSMedia,
  localUserEmail?: string
) => {
  const [sec, setSec] = useState<boatParams>();
  const [teamName, setTeamName] = useState<string>("");
  const [teamDesc, setTeamDesc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMsg, setLoadingMessage] = useState<string>("");
  const [navOutPath, setNavOutPath] = useState<string>("");

  const router = useRouter();
  const q = router.query as boatParamQuery;

  const teamPresent = userHasTeam(
    user.enrolledEvents,
    user.participatingInGameWithTeam,
    game.id
  );

  // console.log("s", subStatus);

  useEffect(() => {
    if (router.isReady && !q.section) {
      // console.log("in effect");
      if (subStatus === "PENDING") {
        return;
      }

      if (
        userHasTeam(
          user.enrolledEvents,
          user.participatingInGameWithTeam,
          game.id
        ) !== "NEEDS_TEAM"
      ) {
        q.section = "has_team";
        router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
        setLoading(false);
      } else if (!user.userKey) {
        q.section = "userKey";
        router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
        setLoading(false);
      } else if (
        !isProfileComplete(
          user.name,
          user.profileImage,
          user.email,
          user.instagramHandle
        )
      ) {
        q.section = "profileBrief";
        router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
        setLoading(false);
      } else if (subStatus === "SUBSCRIBED") {
        q.section = "teamName";
        router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
        setLoading(false);
      } else if (
        !eventToJoin.parentId && // wants to create team
        !user.enrolledEvents?.includes(eventToJoin.id) // user does not have team
      ) {
        q.section = "teamName";
        router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
        setLoading(false);
      } else if (subStatus === "EXPIRED") {
        // subscription has expired
        q.section = "subscription";
        router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
        setLoading(false);
      }
    } else if (router.isReady) {
      setSec(q.section ? q.section : "");
      setLoading(false);
    }
  }, [
    q,
    eventToJoin.parentId,
    router,
    user.name,
    user.enrolledEvents,
    game.id,
    user.participatingInGameWithTeam,
    // leaderUID,
    eventToJoin.id,
    user.userKey,
    // user.uid,
    user.profileImage,
    user.email,
    user.instagramHandle,
    // coachKey,
    // eventKey,
    subStatus,
  ]);

  const onNavOut = async () => {
    console.log("here", navOutPath);
    if (navOutPath) {
      router.push(navOutPath);
    } else if (!navOutPath) {
      const path = await onHandleSubscription();
      if (path) {
        router.push(path);
      }
    } else {
      q.section = "userKey";
      router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
    }
  };

  // console.log(
  //   subStatus,
  //   userHasTeam(user.enrolledEvents, user.participatingInGameWithTeam, game.id),
  //   eventToJoin.parentId
  // );

  const onHandleSubscription = async () => {
    // user already is in a team
    if (
      userHasTeam(
        user.enrolledEvents,
        user.participatingInGameWithTeam,
        game.id
      ) !== "NEEDS_TEAM"
    ) {
      q.section = "has_team";
      router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });

      // router.push("/teams");
    } else if (eventToJoin.parentId) {
      // console.log("joining team");
      // join team
      setLoadingMessage(`Adding you to team`);
      await addUserToTeam(
        user.uid,
        leaderUID,
        eventToJoin.parentId,
        eventToJoin.id
        // eventToJoin.id
      );

      onSuccessSub();
      setNavOutPath(`/${coachKey}/${eventKey}`);
      return `/${coachKey}/${eventKey}`;
    } else {
      // create team
      setLoadingMessage(`Creating your team`);
      const toCopyEvent = await createNewTeam(
        eventToJoin,
        user,
        teamDesc,
        teamName,
        localUserName,
        localUserImg,
        leaderUID
      );

      onSuccessSub();
      setNavOutPath(`/${localUserKey}/${toCopyEvent.eventKey}`);
      return `/${localUserKey}/${toCopyEvent.eventKey}`;
    }
  };

  const onNext = async (
    val?: string,
    val2?: string,
    val3?: string,
    img?: CloudinaryMedia,
    freeTrial?: boolean
  ) => {
    if (sec === "userKey" && val) {
      await updateUserTextFields(user.uid, "userKey", val);
      q.section = "profileBrief";
      router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
    } else if (sec === "profileBrief") {
      await updateUserBriefFields(user.uid, val, val2, val3, img);

      if (!eventToJoin.parentId) {
        q.section = "teamName";
        // console.log("push", q);
        router.push(getQueryParamsForJoinBoat(q), undefined, {
          shallow: true,
        });
      } else {
        q.section = "subscription";
        router.push(getQueryParamsForJoinBoat(q), undefined, {
          shallow: true,
        });
      }
    } else if (sec === "teamName") {
      q.section = "teamDesc";
      setTeamName(val ? val : "");
      router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
    } else if (sec === "teamDesc") {
      setTeamDesc(val ? val : "");

      q.section = "subscription";
      router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
    } else if (sec === "subscription" && subStatus !== "SUBSCRIBED") {
      const gameId = game.id;

      const subId = getDefaultSubscriptionId(game);

      if (subId && !freeTrial) {
        const { id } = getCurrentMonthForPurchase(
          game.configuration?.sprints,
          game.configuration?.starts,
          game.configuration?.challengeLength,
          game.configuration?.activeSprintId
        );

        // console.log("id", id);

        if (id) {
          await payRequest(
            gameId,
            subId,
            id,
            "",
            user.uid,
            localUserEmail ? localUserEmail : "",
            user.phone ? user.phone : "",
            onHandleSubscription
          );
        }
      } else if (subId && freeTrial) {
        await startFreeTrial(gameId, user.uid);
        onHandleSubscription();
      }
    } else if (sec === "subscription" && subStatus === "SUBSCRIBED") {
      await onHandleSubscription();
    }
  };

  const onBack = () => router.back();

  return {
    section: sec,
    onNext,
    onBack,
    loading,
    loadingMsg,
    onNavOut,
    teamPresent,
  };
};

/**
 * auth
 * handle
 * profile
 * subscription -> addToTeam/createTeam -> navigateOut
 *
 * auth
 * alreadySubscribed -> navigateOut
 *
 *
 */
