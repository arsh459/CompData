import { UserInterface } from "@models/User/User";

export const getDieticianName = (user?: UserInterface) => {
  if (user?.name?.length) {
    return user.name.split(" ")[0];
  }

  return "";
};
