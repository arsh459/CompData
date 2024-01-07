// import { UserInterface } from "../models/User/User";
import axios from "axios";
import { updateOne } from "../utils/firestore/fetchOne";
import { createStoreSocialMediaParams } from "./dynamicLinkUtils";

const domainUriPrefix = "https://holidaying.page.link";
const api_key = "AIzaSyBUJ0LhsUowv5XQMCy3UGtXSJoLDJfvW24";
const firebaseLink = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${api_key}`;
const androidPackageName = "com.holidaying.holidaying";
const iosBundleId = "com.holidaying.Holidaying-ios";
const iosAppStoreId = "1497348229";
export const socialTitle = "Holidaying";
export const socialDescription = "Book trips with influencers";
export const socialImageLink =
  "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2FCanva%20-%20Man%20in%20Red%20Jacket%20Standing%20Outside%20of%20Cave.jpg?alt=media&token=3f0f5161-3b29-4181-b886-e889ce7e15a4";

export const addInviteURL = async (
  uid: string,
  userType: string,
  instagramHandle: string | undefined,
) => {
  // if access code is present
  if (uid) {
    try {
      const url = generateInviteURL(uid, userType, instagramHandle);
      // console.log('url');
      const response = await addDynamicLink(
        url,
        instagramHandle ? url : undefined,
        instagramHandle ? url : undefined,
      );
      // console.log('response', response.data);

      if (response.data && response.data.shortLink) {
        // console.log('{inviteURL: response.data.shortLink}', {inviteURL: response.data.shortLink});
        await updateOne("users", uid, {
          inviteURL: response.data.shortLink,
        });
        return "success";
      }
    } catch (error) {
      console.log("error", error);
      return "fail";
    }
  }
  return "fail";
};

export const createUserStoreLink = async (
  uid: string,
  userType: string,
  userName?: string,
  userBio?: string,
  userImageURI?: string,
  instagramHandle?: string | undefined,
): Promise<string | undefined> => {
  if (uid) {
    try {
      const url = generateInviteURL(uid, userType, instagramHandle);
      const { name, bio, imageURI } = createStoreSocialMediaParams(
        userName,
        userBio,
        userImageURI,
      );
      const response = await createDynamicLinkWithParams(
        url,
        undefined,
        undefined,
        name,
        bio,
        imageURI,
      );

      if (response.data && response.data.shortLink) {
        return response.data.shortLink;
      }
      return undefined;
    } catch (error) {
      console.log("error", error);
      return undefined;
    }
  }
  return undefined;
};

const generateInviteURL = (
  uid: string,
  userType: string,
  instagramHandle?: string,
) => {
  const inviteURLWithParams = new URL(
    `https://www.holidaying.travel/${
      instagramHandle ? `${instagramHandle}/` : ""
    }`,
  );

  // add invite code
  inviteURLWithParams.searchParams.append("uid", uid);

  if (userType === "influencer") {
    inviteURLWithParams.searchParams.append("influencer", "true");
  }

  return inviteURLWithParams.href;
};

export const addDynamicLink = (
  link: string,
  afl: string | undefined,
  ifl: string | undefined,
) => {
  return axios({
    url: firebaseLink,
    method: "POST",
    data: {
      dynamicLinkInfo: {
        domainUriPrefix: domainUriPrefix,
        link: link,
        androidInfo: {
          androidPackageName: androidPackageName,
          ...(afl ? { androidFallbackLink: afl } : {}),
        },
        iosInfo: {
          iosBundleId: iosBundleId,
          iosAppStoreId: iosAppStoreId,
          ...(ifl ? { iosFallbackLink: ifl } : {}),
        },
        socialMetaTagInfo: {
          socialTitle: socialTitle,
          socialDescription: socialDescription,
          socialImageLink: socialImageLink,
        },
      },
    },
  });
};

export const createDynamicLinkWithParams = (
  link: string,
  afl: string | undefined,
  ifl: string | undefined,
  socialTitleParam: string,
  socialDescriptionParam: string,
  socialImageLinkParam: string,
) => {
  return axios({
    url: firebaseLink,
    method: "POST",
    data: {
      dynamicLinkInfo: {
        domainUriPrefix: domainUriPrefix,
        link: link,
        androidInfo: {
          androidPackageName: androidPackageName,
          ...(afl ? { androidFallbackLink: afl } : {}),
        },
        iosInfo: {
          iosBundleId: iosBundleId,
          iosAppStoreId: iosAppStoreId,
          ...(ifl ? { iosFallbackLink: ifl } : {}),
        },
        socialMetaTagInfo: {
          socialTitle: socialTitleParam ? socialTitleParam : socialTitle,
          socialDescription: socialDescriptionParam
            ? socialDescriptionParam
            : socialDescription,
          socialImageLink: socialImageLinkParam
            ? socialImageLinkParam
            : socialImageLink,
        },
      },
    },
  });
};
