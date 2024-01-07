import { UserInterface } from "../../User/User";

export const canMessageGo = (user: UserInterface) => {
  if (user.gifter && !user.participatingInGameWithTeam) {
    return false;
  }

  return true;
};
