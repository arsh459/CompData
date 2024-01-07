import { selectedLob } from "./interface";
import { createDynamicLinkWithParams } from "../../user/addInviteURL";

export const createListingDeepLink = async (
  listingId: string,
  listingType: selectedLob,
  listingName: string,
  listingDescription: string,
  imageURI: string,
  listingKey: string | undefined,
  uid?: string,
  userType?: string,
  variantId?: string,
  qty?: number,
  startDate?: string,
  endDate?: string,
): Promise<string | undefined> => {
  const url = generateListingLink(
    listingId,
    listingType,
    listingKey,
    uid,
    userType,
    variantId,
    qty,
    startDate,
    endDate,
  );
  const response = await createDynamicLinkWithParams(
    url,
    url,
    url,
    listingName,
    listingDescription,
    imageURI,
  );

  if (response.data && response.data.shortLink) {
    return response.data.shortLink;
  }

  return undefined;
};

const generateListingLink = (
  listingId: string,
  listingType: selectedLob,
  listingKey: string | undefined,
  uid?: string,
  userType?: string,
  variantId?: string,
  qty?: number,
  startDate?: string,
  endDate?: string,
) => {
  const inviteURLWithParams = new URL(
    `https://www.holidaying.travel/${
      listingKey
        ? `${
            listingType === "stays"
              ? `stay/${listingKey}/`
              : `listing/${listingKey}/`
          }`
        : ""
    }`,
  );

  inviteURLWithParams.searchParams.append("listingId", listingId);
  inviteURLWithParams.searchParams.append("listingType", listingType);

  if (variantId) {
    inviteURLWithParams.searchParams.append("variantId", variantId);
  }

  if (typeof qty === "number" && qty > 0) {
    inviteURLWithParams.searchParams.append("qty", qty.toString());
  }

  if (startDate) {
    inviteURLWithParams.searchParams.append("startDate", startDate);
  }

  if (endDate && startDate) {
    inviteURLWithParams.searchParams.append("endDate", endDate);
  }

  if (uid && userType === "influencer") {
    inviteURLWithParams.searchParams.append("uid", uid);
    inviteURLWithParams.searchParams.append("influencer", "true");
  }

  return inviteURLWithParams.href;
};
