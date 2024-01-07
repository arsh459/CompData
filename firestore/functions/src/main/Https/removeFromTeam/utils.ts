import { UserInterface } from "../../../models/User/User";

export const getOldTeamId = (user?: UserInterface, gameId?: string) => {
  if (
    user?.participatingInGameWithTeam &&
    gameId &&
    user.participatingInGameWithTeam[gameId]
  ) {
    return user.participatingInGameWithTeam[gameId].teamId;
  }
  return "";
};
