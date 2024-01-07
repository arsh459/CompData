import { createDynamicLinkWithParams } from "../../../user/addInviteURL";

export const createCollectionDynamicLink = async (
  collectionId: string,
  collectionKey: string | undefined,
  collectionName: string,
  collectionDescription: string,
  imageURI: string,
  uid?: string,
  userType?: string,
  isTrip?: boolean,
): Promise<string | undefined> => {
  const url = isTrip
    ? generateTripLink(collectionId, collectionKey, uid, userType)
    : generateCollectionLink(collectionId, collectionKey, uid, userType);

  const response = await createDynamicLinkWithParams(
    url,
    url,
    url,
    collectionName,
    collectionDescription,
    imageURI,
  );

  if (response.data && response.data.shortLink) {
    return response.data.shortLink;
  }

  return undefined;
};

const generateCollectionLink = (
  collectionId: string,
  collectionKey?: string | undefined,
  uid?: string,
  userType?: string,
) => {
  const inviteURLWithParams = new URL(
    `https://www.holidaying.travel/${
      collectionKey ? `collection/${collectionKey}/` : ""
    }`,
  );

  inviteURLWithParams.searchParams.append("collectionId", collectionId);

  if (uid && userType === "influencer") {
    inviteURLWithParams.searchParams.append("uid", uid);
    inviteURLWithParams.searchParams.append("influencer", "true");
  }

  return inviteURLWithParams.href;
};

const generateTripLink = (
  collectionId: string,
  collectionKey: string | undefined,
  uid?: string,
  userType?: string,
) => {
  const inviteURLWithParams = new URL(
    `https://www.holidaying.travel/${
      collectionKey ? `trip/${collectionKey}/` : ""
    }`,
  );

  inviteURLWithParams.searchParams.append("tripId", collectionId);

  if (uid && userType === "influencer") {
    inviteURLWithParams.searchParams.append("uid", uid);
    inviteURLWithParams.searchParams.append("influencer", "true");
  }

  return inviteURLWithParams.href;
};
