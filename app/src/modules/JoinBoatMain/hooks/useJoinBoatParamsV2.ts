// import { getCurrentMonthForPurchase } from "@hooks/community/challengeWeekUtils/utils";
// import { getQueryParamsForJoinBoat } from "@hooks/drawer/utils";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
// import { subscriptionStatus } from "@hooks/subscription/useSubscription";
import { EventInterface } from "@models/Event/Event";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
// import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { addUserToTeam, navBeforeSubscription } from "@models/User/createUtils";
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
import { useNavigation } from "@react-navigation/native";
// import { isProfileComplete } from "@templates/joinBoatTemplate/utils";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createNewTeam, userHasTeam } from "../utils/teamUtils";
import { isProfileComplete } from "./useSection";
// import { payRequest } from "./payUtils";
// import {
//   createNewTeam,
//   navBeforeSubscription,
//   //   getDefaultSubscriptionId,
//   //   startFreeTrial,
//   userHasTeam,
// } from "./utils";

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

// export interface boatParamQueryV2 {
//   section?: boatParamsV2;
// }

export type boatParamQueryKeys = "section";

export const useJoinBoatParamsV2 = (
  game: EventInterface,
  user: UserInterface,
  leaderUID: string,
  eventToJoin: EventInterface,
  subStatus: subscriptionStatus,
  basePlanStatus: subscriptionStatus,
  //   onSuccessSub: () => void,
  //   coachKey?: string,
  //   eventKey?: string,
  localUserName?: string,
  //   localUserKey?: string,
  localUserImg?: CloudinaryMedia | AWSMedia
  //   localUserEmail?: string
) => {
  /**
   * auth
   * localUser -> values
   * subscriptionStatus
   *
   */

  //   const [sec, setSec] = useState<boatParamsV2>("loading");
  const navigation = useNavigation();
  const [teamName, setTeamName] = useState<string>("");
  //   const [teamDesc, setTeamDesc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [section, setSection] = useState<boatParamsV2>("");
  const [navOutPath, setNavOutPath] = useState<{
    teamId: string;
    gameId: string;
  }>({ teamId: "", gameId: "" });

  //   const router = useRouter();
  //   const q = router.query as boatParamQueryV2;

  const teamPresent = userHasTeam(
    user.enrolledEvents,
    user.participatingInGameWithTeam,
    game?.id ? game.id : ""
  );

  useEffect(() => {
    if (!section && game?.id) {
      if (subStatus === "PENDING" || basePlanStatus === "PENDING") {
        return;
      }

      if (teamPresent !== "NEEDS_TEAM") {
        setSection("has_team");

        setLoading(false);
      } else if (!user.userKey) {
        setSection("userKey");

        setLoading(false);
      } else if (
        !isProfileComplete(
          user.name,
          user.profileImage,
          user.email,
          user.instagramHandle
        )
      ) {
        setSection("profileBrief");
        setLoading(false);
      } else if (!user.fitnessGoal) {
        setSection("fitnessGoal");
        setLoading(false);
      } else if (!user.paceOfAchievement) {
        setSection("goalPace");
        setLoading(false);
      } else if (!user.preferredWorkoutLocation) {
        setSection("goalLocation");
        setLoading(false);
      }

      // wants to create team
      else if (!eventToJoin.parentId) {
        setSection("teamName");
        setLoading(false);
      } else {
        const section = navBeforeSubscription(
          subStatus,
          basePlanStatus,
          game.freeGame
        );
        setSection(section);
        setLoading(false);
      }
    }
  }, [
    section,
    eventToJoin.parentId,
    user.name,
    user.enrolledEvents,
    subStatus,
    basePlanStatus,
    game?.id,
    game?.freeGame,
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
    if (navOutPath.teamId && navOutPath.gameId) {
      navigation.navigate("Community");
    } else {
      navigation.navigate("Home");
    }
  };

  const onSubscribeCallback = async () => {
    if (eventToJoin.parentId) {
      await addUserToTeam(
        user.uid,
        leaderUID,
        eventToJoin.parentId,
        eventToJoin.id,
        user,
        eventToJoin
        // eventToJoin.id
      );

      // onSuccessSub();
      setNavOutPath({
        teamId: eventToJoin.id,
        gameId: eventToJoin.parentId,
      });
      //   setNavOutPath(`/${coachKey}/${eventKey}`);
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

      setNavOutPath({
        teamId: toCopyEvent.id,
        gameId: eventToJoin.id,
      });

      // onSuccessSub();

      // return `/${localUserKey}/${toCopyEvent.eventKey}`;
    }
  };

  const onJoin = async () => {
    await onSubscribeCallback();
    onNavOut();
  };

  const onUserKeySave = async (val: string) => {
    await updateUserTextFields(user.uid, "userKey", val);
    setSection("profileBrief");
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
    setSection("fitnessGoal");
  };

  // goal update
  const onFitnessGoalUpdate = async (goals: fitnessGoalTypes[]) => {
    await updateUserListValues(user.uid, goals, "fitnessGoal");
    setSection("goalPace");
  };

  // pace update
  const onFitnessPaceUpdate = async (pace: achievementPace) => {
    await updateUserStringValue(user.uid, pace, "paceOfAchievement");
    setSection("goalLocation");
  };

  // location update
  const onPreferredLocationUpdate = async (location: workoutLocation[]) => {
    await updateUserListValues(user.uid, location, "preferredWorkoutLocation");
    if (!eventToJoin.parentId) {
      setSection("teamName");

      return;
    }

    const nav = navBeforeSubscription(
      subStatus,
      basePlanStatus,
      game?.freeGame
    );
    setSection(nav);

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
    setSection(nav);
  };

  const onBack = () => navigation.goBack();

  return {
    // section: sec,
    section,
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
