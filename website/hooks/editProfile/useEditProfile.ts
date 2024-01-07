import { useEffect, useState } from "react";
import { UserInterface } from "@models/User/User";
import { DrawerElement } from "@components/drawers/Drawer";
import {
  getNewDrawerForProfile,
  getUpdatedProfileDrawerElement,
} from "./utils";

export const useEditProfile = (
  user: UserInterface,
  setDrawerElements?: any
) => {
  const [localUser, setLocalUser] = useState<UserInterface>(() => user);

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  useEffect(() => {
    if (setDrawerElements) {
      // console.log("here", user.name);
      setDrawerElements((prev: DrawerElement[]) => {
        // console.log("user", user);
        return [
          prev[0],
          {
            ...getUpdatedProfileDrawerElement(
              prev[1],
              user.name,
              user.bio,
              user.profileImage,
              user.coverCloudinary,
              user.facebookProfile,
              user.youtubeLink,
              user.externalLink,
              user.instagramLink,
              user.linkedInLink,
              user.userKey
            ),
            subElements: getNewDrawerForProfile(
              user.name,
              user.bio,
              user.profileImage,
              user.coverCloudinary,
              user.facebookProfile,
              user.youtubeLink,
              user.externalLink,
              user.instagramLink,
              user.linkedInLink,
              user.userKey
            ),
          },
          prev[2],
        ];
      });
    }
  }, [
    setDrawerElements,
    user.name,
    user.bio,
    user.profileImage,
    user.coverCloudinary,

    // socialmedia
    user.facebookProfile,
    user.youtubeLink,
    user.externalLink,
    user.instagramLink,
    user.linkedInLink,
    user.userKey,
  ]);

  return {
    localUser,
    setLocalUser,
  };
};
