import { UserInterface } from "../../../models/User/User";

export const escapeInvocation = (
  userNow: UserInterface,
  userPrev: UserInterface
) => {
  const remainingNow = stripInviteURl(userNow);
  const remainingPrev = stripInviteURl(userPrev);

  if (JSON.stringify(remainingNow) === JSON.stringify(remainingPrev)) {
    return true;
  }

  return false;
};

const stripInviteURl = (userGiven: UserInterface) => {
  const { inviteURL, ...restUser } = userGiven;
  return restUser;
};
