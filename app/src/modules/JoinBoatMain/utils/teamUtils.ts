import { EventInterface, PricingPlan } from "@models/Event/Event";
import { ParticipatingWithTeamObj, UserInterface } from "@models/User/User";
import firestore from "@react-native-firebase/firestore";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { createNewPost } from "@utils/post/createUtils";
import {
  copyChallengeForCreator,
  saveCopiedChallenge,
} from "@models/Event/challengeInvite";
import { sectionTypes } from "../hooks/useSection";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
import {
  createBaseCoachRank,
  createBaseUserRank,
} from "@models/Activity/createUtils";

export const sectionBeforeSubscription = (
  subscriptionStatus: subscriptionStatus,
  // basePlanStatus: subscriptionStatus,
  freeGame?: boolean
): sectionTypes => {
  if (
    freeGame ||
    subscriptionStatus === "SUBSCRIBED"
    //  ||
    // basePlanStatus === "SUBSCRIBED" ||
    // basePlanStatus === "PAID_ONE"
  ) {
    return "join";
  }

  return "";
};

export const getDefaultSubscriptionId = (game: EventInterface) => {
  if (game.pricing && game.pricing.length) {
    return game.pricing[0].id;
  }

  return undefined;
};

export const getDefaultSubscriptionPlan = (gamePricing?: PricingPlan[]) => {
  if (gamePricing && gamePricing.length) {
    return gamePricing[0];
  }

  return undefined;
};

export const userHasTeam = (
  enrolledEvents: string[] | undefined,
  participatingWith: { [gameId: string]: ParticipatingWithTeamObj } | undefined,
  // teamId: string,
  gameId: string
) => {
  if (enrolledEvents?.includes(gameId)) {
    return "TEAM_OWNER";
  } else if (participatingWith && participatingWith[gameId]) {
    return "TEAM_MEMBER";
  }

  return "NEEDS_TEAM";
};

export const startFreeTrial = async (gameId: string, uid: string) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .collection("subscriptions")
    .doc(gameId)
    .set(
      // doc(doc(db, "users", uid), "subscriptions", gameId),
      { gameId, startFreeTrial: Date.now() },
      { merge: true }
    );
};

export const createNewTeam = async (
  eventToJoin: EventInterface,
  user: UserInterface,
  teamDesc: string,
  teamName: string,
  localUserName: string | undefined,
  localUserImg: CloudinaryMedia | AWSMedia | undefined,
  communityId: string
) => {
  const toCopyEvent = copyChallengeForCreator(
    eventToJoin,
    user.uid,
    [],
    teamDesc,
    teamName
  );

  const newPost = createNewPost(
    user.uid,
    toCopyEvent.id,
    user.uid,
    "public",
    eventToJoin.id, // gameId
    undefined,
    localUserName,
    localUserImg,
    true,
    undefined,
    undefined,
    "post"
  );

  const userRank = createBaseUserRank(
    user.uid,
    user.progressV2 ? user.progressV2 : 0,
    toCopyEvent.name,
    toCopyEvent.eventKey ? toCopyEvent.eventKey : "",
    toCopyEvent.id,
    user.userLevelV2 ? user.userLevelV2 : 0,
    toCopyEvent.ownerUID,
    user.name,
    user.profileImage
  );

  const coachRank = createBaseCoachRank(
    user.uid,
    toCopyEvent.name,
    toCopyEvent.eventKey ? toCopyEvent.eventKey : "",
    toCopyEvent.id,
    user.name,
    user.profileImage
  );

  await saveCopiedChallenge(
    communityId,
    toCopyEvent,
    {
      ...newPost,
      text: teamDesc ? teamDesc : "",
    },
    userRank,
    coachRank
  );

  return toCopyEvent;
};
