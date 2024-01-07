import {
  copyChallengeForCreator,
  saveCopiedChallengeV2,
} from "@models/Event/challengeInvite";
import { EventInterface } from "@models/Event/Event";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { createNewPost } from "@models/Posts/createUtils";
import {
  createBaseCoachRank,
  createBaseUserRank,
} from "@models/User/createUtils";
import { ParticipatingWithTeamObj, UserInterface } from "@models/User/User";

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

export const userHasTeamV2 = (
  participatingWith: { [gameId: string]: ParticipatingWithTeamObj } | undefined,
  // teamId: string,
  gameId: string
) => {
  if (participatingWith && participatingWith[gameId]) {
    return participatingWith[gameId].teamId;
  }

  return undefined;
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

  await saveCopiedChallengeV2(
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
