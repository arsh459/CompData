import { ListingDetailInterface } from "../../../models/ListingDetail/interface";
import { updateOne } from "../../../utils/firestore/fetchOne";
import { getBaseImageURL, saveListingThumbnail } from "./fetchRemoteImage";

export const createThumbURLForDetail = async (
  listingDetail: ListingDetailInterface | undefined
): Promise<string | undefined> => {
  if (listingDetail?.deeplinkURI) {
    return listingDetail?.deeplinkURI;
  }

  if (listingDetail) {
    const baseURL = getBaseImageURL(listingDetail);
    if (baseURL) {
      const thumbnailURL = await saveListingThumbnail(
        baseURL,
        listingDetail.listingId
      );

      // update base url
      await updateOne(
        listingDetail.listingType === "stays" ? "stays" : "allListings",
        listingDetail.listingId,
        { deeplinkURI: thumbnailURL }
      );

      return thumbnailURL;
    }
  }

  return undefined;
};
