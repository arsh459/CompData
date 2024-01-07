import { profileDrawer } from "@components/drawers/constants";
import { DrawerElement } from "@components/drawers/Drawer";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export const getUpdatedProfileDrawerElement = (
  profileElement: DrawerElement,
  name: string | undefined,
  bio: string | undefined,
  profileImage: CloudinaryMedia | AWSMedia | undefined,
  coverCloudinary: (CloudinaryMedia | AWSMedia)[] | undefined,
  facebookProfile: string | undefined,
  youtubeLink: string | undefined,
  externalLink: string | undefined,
  instagramLink: string | undefined,
  linkedInLink: string | undefined,
  userKey: string | undefined
) => {
  // console.log(bio.trim() ? "bio" : "");

  if (
    name &&
    // bio &&
    // bio.trim() &&
    profileImage &&
    coverCloudinary &&
    coverCloudinary.length > 0 &&
    userKey &&
    (facebookProfile ||
      youtubeLink ||
      externalLink ||
      instagramLink ||
      linkedInLink)
  ) {
    // console.log("heree");
    return {
      ...profileElement,
      elementLabel: "live",
    };
  }

  return { ...profileElement, elementLabel: "todo" };
};

export const getNewDrawerForProfile = (
  name: string | undefined,
  bio: string | undefined,
  profileImage: CloudinaryMedia | AWSMedia | undefined,
  coverCloudinary: (CloudinaryMedia | AWSMedia)[] | undefined,
  facebookProfile: string | undefined,
  youtubeLink: string | undefined,
  externalLink: string | undefined,
  instagramLink: string | undefined,
  linkedInLink: string | undefined,
  userKey: string | undefined
) => {
  const newDrawer: DrawerElement[] = [];
  return profileDrawer.reduce((acc, item) => {
    if (item.value === "about-me" && bio && bio.trim()) {
      // console.log("bio", bio);
      newDrawer.push({ ...item, elementLabel: "live" });
    } else if (item.value === "your-name" && name) {
      newDrawer.push({ ...item, elementLabel: "live" });
    } else if (
      item.value === "social-media-links" &&
      (facebookProfile ||
        instagramLink ||
        youtubeLink ||
        externalLink ||
        linkedInLink)
    ) {
      newDrawer.push({ ...item, elementLabel: "live" });
    } else if (
      item.value === "cover-video" &&
      coverCloudinary &&
      coverCloudinary.length > 0
    ) {
      newDrawer.push({ ...item, elementLabel: "live" });
    } else if (item.value === "your-handle" && userKey) {
      newDrawer.push({ ...item, elementLabel: "live" });
    } else if (item.value === "profile-img" && profileImage) {
      newDrawer.push({ ...item, elementLabel: "live" });
    } else {
      newDrawer.push({ ...item, elementLabel: "todo" });
    }

    return acc;
  }, newDrawer);
};
