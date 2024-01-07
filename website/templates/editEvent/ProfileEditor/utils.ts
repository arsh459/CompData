import { formLabelValues } from "@components/drawers/constants";

export const isEventEditor = (key: formLabelValues) => {
  if (
    key === "name" ||
    key === "description" ||
    key === "cost" ||
    key === "media" ||
    key === "add-members"
  ) {
    return true;
  }

  return false;
};

export const getNextJoinRoute = (key: formLabelValues) => {
  return key === "profile"
    ? {
        nextRoute: "your-name",
      }
    : key === "your-name"
    ? {
        nextRoute: "your-handle",
      }
    : key === "your-handle"
    ? {
        nextRoute: "profile-img",
      }
    : key === "profile-img"
    ? {
        nextRoute: "social-media-links",
      }
    : key === "social-media-links"
    ? {
        nextRoute: "about-me",
      }
    : key === "about-me"
    ? {
        nextRoute: "cover-video",
      }
    : key === "cover-video"
    ? {
        nextRoute: "name",
      }
    : key === "name"
    ? {
        nextRoute: "description",
      }
    : key === "description"
    ? // ? {
      //     nextRoute: "cost",
      //   }
      // : key === "cost"
      {
        nextRoute: "media",
      }
    : key === "media"
    ? {
        nextRoute: "add-members",
      }
    : { nextRoute: "profile" };
};

export const getNextProfileRoute = (
  key: formLabelValues
): {
  nextRoute: formLabelValues;
  divId?: string;
  previousRoute: formLabelValues;
  prevDevId?: string;
} => {
  return key === "profile"
    ? {
        nextRoute: "your-name",
        previousRoute: "profile",
      }
    : key === "your-name"
    ? {
        nextRoute: "your-handle",

        previousRoute: "profile",
      }
    : key === "your-handle"
    ? {
        nextRoute: "profile-img",
        previousRoute: "cover-video",
      }
    : key === "profile-img"
    ? {
        nextRoute: "social-media-links",
        previousRoute: "your-name",
      }
    : key === "social-media-links"
    ? {
        nextRoute: "about-me",
        previousRoute: "your-handle",
      }
    : key === "about-me"
    ? {
        nextRoute: "cover-video",
        previousRoute: "profile-img",
      }
    : key === "cover-video"
    ? {
        nextRoute: "profile",
        previousRoute: "social-media-links",
      }
    : { nextRoute: "profile", previousRoute: "profile" };
};
