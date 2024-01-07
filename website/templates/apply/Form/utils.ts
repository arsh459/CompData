import { UserInterface } from "@models/User/User";

export const dashVisible = (user: UserInterface | undefined) => {
  if (user && user.name && user.email && user.instagramHandle) {
    return true;
  }

  return false;
};
