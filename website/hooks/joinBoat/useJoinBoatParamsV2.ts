// import { getCurrentMonthForPurchase } from "@hooks/community/challengeWeekUtils/utils";
import { getQueryParamsForJoinBoat } from "@hooks/drawer/utils";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
// import { subscriptionStatus } from "@hooks/subscription/useSubscription";
import { EventInterface } from "@models/Event/Event";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { addUserToTeam } from "@models/User/createUtils";
import {
  updateUserBriefFields,
  updateUserListValues,
  updateUserStringValue,
  updateUserTextFields,
} from "@models/User/updateUtils";
import {
  achievementPace,
  fitnessGoalTypes,
  UserInterface,
  workoutLocation,
} from "@models/User/User";
import { isProfileComplete } from "@templates/joinBoatTemplate/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { payRequest } from "./payUtils";
import {
  createNewTeam,
  navBeforeSubscription,
  //   getDefaultSubscriptionId,
  //   startFreeTrial,
  userHasTeam,
} from "./utils";
import { sectionTypes } from "./V5/useSection";

export type boatParamsV2 =
  | "profileBrief"
  | "fitnessGoal"
  | "goalPace"
  | "goalLocation"
  | "teamName"
  | "join"
  | "userKey"
  | "loading"
  | "subscription"
  | "has_team"
  | "";

export interface boatParamQueryV2 {
  section?: boatParamsV2;
}
export interface boatParamQueryV3 {
  section?: sectionTypes;
}

export type boatParamQueryKeys = "section";

export const useJoinBoatParamsV2 = (
  game: EventInterface,
  user: UserInterface,
  leaderUID: string,
  eventToJoin: EventInterface,
  subStatus: subscriptionStatus,
  basePlanStatus: subscriptionStatus,
  //   onSuccessSub: () => void,
  coachKey?: string,
  eventKey?: string,
  localUserName?: string,
  localUserKey?: string,
  localUserImg?: CloudinaryMedia | AWSMedia
  //   localUserEmail?: string
) => {
  /**
   * auth
   * localUser -> values
   * subscriptionStatus
   *
   */

  const [sec, setSec] = useState<boatParamsV2>("loading");
  const [teamName, setTeamName] = useState<string>("");
  //   const [teamDesc, setTeamDesc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  //   const [loadingMsg, setLoadingMessage] = useState<string>("");
  const [navOutPath, setNavOutPath] = useState<string>("");

  const router = useRouter();
  const q = router.query as boatParamQueryV2;

  const teamPresent = userHasTeam(
    user.enrolledEvents,
    user.participatingInGameWithTeam,
    game.id
  );

  // console.log("s", subStatus);

  useEffect(() => {
    if (router.isReady && !q.section) {
      // console.log("in effect");
      if (subStatus === "PENDING" || basePlanStatus === "PENDING") {
        return;
      }

      if (teamPresent !== "NEEDS_TEAM") {
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
      } else if (!user.fitnessGoal) {
        q.section = "fitnessGoal";
        router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
        setLoading(false);
      } else if (!user.paceOfAchievement) {
        q.section = "goalPace";
        router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
        setLoading(false);
      } else if (!user.preferredWorkoutLocation) {
        q.section = "goalLocation";
        router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
        setLoading(false);
      }

      //   user subscribed, no team
      //   else if (subStatus === "SUBSCRIBED") {
      //     q.section = "teamName";
      //     router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
      //     setLoading(false);
      //   }

      // wants to create team
      else if (!eventToJoin.parentId) {
        q.section = "teamName";
        router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
        setLoading(false);
      } else {
        const section = navBeforeSubscription(
          subStatus,
          basePlanStatus,
          game.freeGame
        );
        q.section = section;
        router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
        setLoading(false);
      }

      // if (game.freeGame) {
      //   q.section = "join";
      //   router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
      //   setLoading(false);
      // }
      // else {
      //   q.section = "subscription";
      //   router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
      //   setLoading(false);
      // }

      //   else if (
      //     !eventToJoin.parentId && // wants to create team
      //     !user.enrolledEvents?.includes(eventToJoin.id) // user does not have team
      //   ) {
      //     q.section = "teamName";
      //     router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
      //     setLoading(false);
      //   }

      //   else if (subStatus === "EXPIRED") {
      //     // subscription has expired
      //     q.section = "subscription";
      //     router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
      //     setLoading(false);
      //   }
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
    subStatus,
    basePlanStatus,
    game.id,
    game.freeGame,
    user.participatingInGameWithTeam,
    user.fitnessGoal,
    user.paceOfAchievement,
    user.preferredWorkoutLocation,
    // eventToJoin.id,
    user.userKey,
    // user.uid,
    user.profileImage,
    user.email,
    user.instagramHandle,
    teamPresent,
    // eventKey,
    // subStatus,
  ]);

  const onNavOut = async () => {
    // console.log("here", navOutPath);
    if (navOutPath) {
      router.push(navOutPath);
    } else {
      router.push("/teams");
      // const path = await onHandleSubscription();
      // if (path) {
      //   router.push(path);
      // }
    }

    //   else {
    // q.section = "userKey";
    // router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
    //   }
  };

  // console.log(
  //   subStatus,
  //   userHasTeam(user.enrolledEvents, user.participatingInGameWithTeam, game.id),
  //   eventToJoin.parentId
  // );

  const onSubscribeCallback = async () => {
    if (eventToJoin.parentId) {
      await addUserToTeam(
        user.uid,
        leaderUID,
        eventToJoin.parentId,
        eventToJoin.id
        // eventToJoin.id
      );

      // onSuccessSub();
      setNavOutPath(`/${coachKey}/${eventKey}`);
      //   return `/${coachKey}/${eventKey}`;
    } else {
      // create team
      // setLoadingMessage(`Creating your team`);
      const toCopyEvent = await createNewTeam(
        eventToJoin,
        user,
        "",
        teamName,
        localUserName,
        localUserImg,
        leaderUID
      );

      // onSuccessSub();
      setNavOutPath(`/${localUserKey}/${toCopyEvent.eventKey}`);
      // return `/${localUserKey}/${toCopyEvent.eventKey}`;
    }
  };

  const onJoin = async () => {
    await onSubscribeCallback();
    onNavOut();
  };

  const onUserKeySave = async (val: string) => {
    await updateUserTextFields(user.uid, "userKey", val);
    q.section = "profileBrief";
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  };

  const onProfileUpdate = async (
    name?: string,
    instagramHandle?: string,
    email?: string,
    img?: AWSMedia | CloudinaryMedia,
    bio?: string
  ) => {
    await updateUserBriefFields(
      user.uid,
      name,
      instagramHandle,
      email,
      img,
      bio
    );
    q.section = "fitnessGoal";
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  };

  // goal update
  const onFitnessGoalUpdate = async (goals: fitnessGoalTypes[]) => {
    await updateUserListValues(user.uid, goals, "fitnessGoal");
    q.section = "goalPace";
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  };

  // pace update
  const onFitnessPaceUpdate = async (pace: achievementPace) => {
    await updateUserStringValue(user.uid, pace, "paceOfAchievement");
    q.section = "goalLocation";
    router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  };

  // location update
  const onPreferredLocationUpdate = async (location: workoutLocation[]) => {
    await updateUserListValues(user.uid, location, "preferredWorkoutLocation");
    if (!eventToJoin.parentId) {
      q.section = "teamName";
      // console.log("push", q);
      router.push(getQueryParamsForJoinBoat(q), undefined, {
        shallow: true,
      });
      return;
    }

    const nav = navBeforeSubscription(
      subStatus,
      basePlanStatus,
      game?.freeGame
    );
    q.section = nav;
    router.push(getQueryParamsForJoinBoat(q), undefined, {
      shallow: true,
    });

    // else if (game.freeGame) {
    //   q.section = nav
    //   router.push(getQueryParamsForJoinBoat(q), undefined, {
    //     shallow: true,
    //   });
    // } else {
    //   q.section = "subscription";
    //   router.push(getQueryParamsForJoinBoat(q), undefined, {
    //     shallow: true,
    //   });
    // }
  };

  // team name update
  const onTeamNameUpdate = (name: string) => {
    setTeamName(name);

    const nav = navBeforeSubscription(
      subStatus,
      basePlanStatus,
      game?.freeGame
    );
    q.section = nav;
    router.push(getQueryParamsForJoinBoat(q), undefined, {
      shallow: true,
    });
    // if (game.freeGame || subStatus === "SUBSCRIBED" || basePlanStatus === '') {
    //   q.section = "join";
    //   router.push(getQueryParamsForJoinBoat(q), undefined, {
    //     shallow: true,
    //   });
    // } else {
    //   q.section = "subscription";
    //   router.push(getQueryParamsForJoinBoat(q), undefined, {
    //     shallow: true,
    //   });
    // }
  };

  //   const onNext = async (
  //     val?: string,
  //     val2?: string,
  //     val3?: string,
  //     img?: CloudinaryMedia,
  //     freeTrial?: boolean
  //   ) => {
  //     if (sec === "userKey" && val) {
  //       await updateUserTextFields(user.uid, "userKey", val);
  //       q.section = "profileBrief";
  //       router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  //     } else if (sec === "profileBrief") {
  //       await updateUserBriefFields(user.uid, val, val2, val3, img);

  //       if (!eventToJoin.parentId) {
  //         q.section = "teamName";
  //         // console.log("push", q);
  //         router.push(getQueryParamsForJoinBoat(q), undefined, {
  //           shallow: true,
  //         });
  //       } else {
  //         q.section = "subscription";
  //         router.push(getQueryParamsForJoinBoat(q), undefined, {
  //           shallow: true,
  //         });
  //       }
  //     } else if (sec === "teamName") {
  //       q.section = "teamDesc";
  //       setTeamName(val ? val : "");
  //       router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  //     } else if (sec === "teamDesc") {
  //       setTeamDesc(val ? val : "");

  //       q.section = "subscription";
  //       router.push(getQueryParamsForJoinBoat(q), undefined, { shallow: true });
  //     } else if (sec === "subscription" && subStatus !== "SUBSCRIBED") {
  //       const gameId = game.id;

  //       const subId = getDefaultSubscriptionId(game);

  //       if (subId && !freeTrial) {
  //         const { id } = getCurrentMonthForPurchase(
  //           game.configuration?.sprints,
  //           game.configuration?.starts,
  //           game.configuration?.challengeLength,
  //           game.configuration?.activeSprintId
  //         );

  //         // console.log("id", id);

  //         if (id) {
  //           await payRequest(
  //             gameId,
  //             subId,
  //             id,
  //             "",
  //             user.uid,
  //             localUserEmail ? localUserEmail : "",
  //             user.phone ? user.phone : "",
  //             onHandleSubscription
  //           );
  //         }
  //       } else if (subId && freeTrial) {
  //         await startFreeTrial(gameId, user.uid);
  //         onHandleSubscription();
  //       }
  //     } else if (sec === "subscription" && subStatus === "SUBSCRIBED") {
  //       await onHandleSubscription();
  //     }
  //   };

  const onBack = () => router.back();

  return {
    section: sec,
    // onNext,
    onBack,
    loading,
    // teamName,
    // setTeamName,
    // onNavOut,
    teamPresent,
    onJoin,
    onUserKeySave,
    onProfileUpdate,
    onFitnessGoalUpdate,
    onFitnessPaceUpdate,
    onPreferredLocationUpdate,
    onTeamNameUpdate,
    onSubscribeCallback,
    onNavOut,
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
