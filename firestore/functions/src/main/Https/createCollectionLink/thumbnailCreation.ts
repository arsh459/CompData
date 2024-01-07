import { Collection } from "../../../models/Collection/Collection";
import { Trip } from "../../../models/Trip/Trip";
import { updateOne } from "../../../utils/firestore/fetchOne";
import { saveListingThumbnail } from "../addListingThmbnail/fetchRemoteImage";

export const createThumbnailForCollection = async (
  collection: Collection | Trip | undefined,
  baseType: "trip" | "collection"
): Promise<string | undefined> => {
  if (collection?.deeplinkURI) {
    return collection?.deeplinkURI;
  }

  if (collection) {
    const baseURL = getCollectionBaseURL(collection);
    if (baseURL) {
      const thumbnailURL = await saveListingThumbnail(
        baseURL,
        collection.collectionId
      );

      if (baseType === "trip") {
        // update base url
        await updateOne("tripsV2", collection.collectionId, {
          deeplinkURI: thumbnailURL,
        });
      } else {
        // update base url
        await updateOne("collections", collection.collectionId, {
          deeplinkURI: thumbnailURL,
        });
      }

      return thumbnailURL;
    }
  }

  return undefined;
};

export const getCollectionBaseURL = (
  collection: Collection | Trip
): string | undefined => {
  if (collection.collectionMedia) {
    for (const mediaEl of collection.collectionMedia) {
      if (mediaEl.type === "photo" || mediaEl.type === "cloud_photo") {
        return mediaEl.url;
      }
    }
  }

  return undefined;
};
