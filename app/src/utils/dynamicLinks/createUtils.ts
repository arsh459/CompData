import { DNLinkParams } from "@models/DynamicLink/interface";
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from "@react-native-firebase/dynamic-links";
const queryString = require("query-string");

export const createDNLink = async (
  descriptionText: string,
  imageUrl: string,
  title: string,
  params: DNLinkParams
) => {
  const encodedParamString = getEncodedParams(params);

  const link = await dynamicLinks().buildShortLink(
    {
      link: `${"https://socialboat.live"}${
        encodedParamString ? `?${encodedParamString}` : ""
      }`,
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: "https://socialboat.page.link",
      // optional setup which updates Firebase analytics campaign
      // "banner". This also needs setting up before hand
      analytics: {
        campaign: "banner",
      },
      android: {
        // fallbackUrl: "https://socialboat.live",
        packageName: "com.socialboat.socialboat",
      },
      ios: {
        appStoreId: "1635586100",
        bundleId: "com.socialboat.socialboat",
        // fallbackUrl: "https://socialboat.live",
      },
      social: {
        descriptionText: descriptionText
          ? descriptionText
          : "Fitness is now fun",
        imageUrl: imageUrl ? imageUrl : "",
        title: title ? title : "SocialBoat",
      },
    },
    "SHORT" as FirebaseDynamicLinksTypes.ShortLinkType.SHORT
  );

  return link;
};

const getEncodedParams = (params: unknown) => {
  const typeCheckParams = params as { [key: string]: string };

  return queryString.stringify(typeCheckParams);
  // return new URLSearchParams(typeCheckParams).toString();
};
