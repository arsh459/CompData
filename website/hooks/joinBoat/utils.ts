import {
  copyChallengeForCreator,
  saveCopiedChallenge,
} from "@models/Event/challengeInvite";
import { EventInterface, PricingPlan } from "@models/Event/Event";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { createNewPost } from "@models/Posts/createUtils";
import { ParticipatingWithTeamObj, UserInterface } from "@models/User/User";
import { db } from "@config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
import { boatParamsV2 } from "./useJoinBoatParamsV2";

export const navBeforeSubscription = (
  subscriptionStatus: subscriptionStatus,
  basePlanStatus: subscriptionStatus,
  freeGame?: boolean
): boatParamsV2 => {
  if (
    freeGame ||
    subscriptionStatus === "SUBSCRIBED" ||
    basePlanStatus === "SUBSCRIBED" ||
    basePlanStatus === "PAID_ONE"
  ) {
    return "join";
  }

  return "subscription";
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
  await setDoc(
    doc(doc(db, "users", uid), "subscriptions", gameId),
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

  await saveCopiedChallenge(communityId, toCopyEvent, {
    ...newPost,
    text: teamDesc ? teamDesc : "",
  });

  return toCopyEvent;
};
