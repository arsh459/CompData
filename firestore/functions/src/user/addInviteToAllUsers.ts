import { getAllUsers, getUserById } from "../models/User/Methods";
import { addInviteURL } from "./addInviteURL";

export const addInviteToAllUsers = async () => {
  const allUsers = await getAllUsers();

  allUsers.users.map(async (user) => {
    // get user obj
    const userObj = await getUserById(user.uid);
    if (userObj) {
      await addInviteURL(
        userObj.uid,
        userObj.userType ? userObj.userType : "",
        userObj.instagramHandle,
      );
    }
    return "";
  });
};
