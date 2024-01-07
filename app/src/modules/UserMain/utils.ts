import { Post } from "@models/Post/Post";
import { UserInterface } from "@models/User/User";

export const getAspriant = (lvl: Number) => {
  switch (lvl) {
    case 1:
      return {
        aspirant: "Enthusiast",
        colorPrimary: "#61C5D9",
        colorSecondary: "#ADF1FF",
        colorAdditional: "#88DCEC",
      };
    case 2:
      return {
        aspirant: "Aspirant",
        colorPrimary: "#C1CF29",
        colorSecondary: "#F3E23F",
        colorAdditional: "#D8D833",
      };
    case 3:
      return {
        aspirant: "Local Athlete",
        colorPrimary: "#F19B38",
        colorSecondary: "#EDF138",
        colorAdditional: "#EFC138",
      };
    case 4:
      return {
        aspirant: "Athlete",
        colorPrimary: "#D74559",
        colorSecondary: "#F18638",
        colorAdditional: "#E46449",
      };
    case 5:
      return {
        aspirant: "Olympian",
        colorPrimary: "#600FF5",
        colorSecondary: "#C138FD",
        colorAdditional: "#801CF8",
      };
    default:
      return {
        aspirant: "Beginner",
        colorPrimary: "#66D9B3",
        colorSecondary: "#A5EFF6",
        colorAdditional: "#7FE2CD",
      };
  }
};

export const isBlocked = (blockedUIDs?: string[], profileUid?: string) => {
  if (blockedUIDs && profileUid && blockedUIDs.includes(profileUid)) {
    return true;
  }

  return false;
};

export const isBlockedPost = (user?: UserInterface, post?: Post) => {
  if (
    user?.blockedPostIds &&
    post?.id &&
    user.blockedPostIds.includes(post.id)
  ) {
    return true;
  }

  if (
    user?.blockedUIDs &&
    post?.creatorId &&
    user.blockedUIDs.includes(post.creatorId)
  ) {
    return true;
  }

  return false;
};
