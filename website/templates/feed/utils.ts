import { ParticipatingWithTeamObj } from "@models/User/User";

export const getToPostTeamAndCommunity = (
  gameId?: string,
  participatingWith?: { [gameId: string]: ParticipatingWithTeamObj },
  baseTeamId?: string,
  baseCommunityId?: string
) => {
  if (baseTeamId && baseCommunityId) {
    return {
      teamId: baseTeamId,
      communityId: baseCommunityId,
    };
  }

  if (gameId && participatingWith && participatingWith[gameId]) {
    return {
      teamId: participatingWith[gameId].teamId
        ? participatingWith[gameId].teamId
        : "",
      communityId: participatingWith[gameId].ownerUID
        ? participatingWith[gameId].ownerUID
        : "",
    };
  }

  return {
    teamId: "",
    communityId: "",
  };
};
