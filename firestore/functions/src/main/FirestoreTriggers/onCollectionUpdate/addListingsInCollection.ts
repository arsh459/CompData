import {
  Collection,
  ListingCollectionSnippet,
} from "../../../models/Collection/Collection";
import { getDetail_brute } from "../../../models/ListingDetail/Methods";
// import { updateOne } from "../../../utils/firestore/fetchOne";
import * as functions from "firebase-functions";

export const addListingsInCollection = async (collection: Collection) => {
  let regenerate: boolean = false;
  // listingIds present
  if (collection.listingsPresent) {
    for (const listingId of Object.keys(collection.listingsPresent)) {
      if (collection.listingsInCollection) {
        const matchingObjs = collection.listingsInCollection.filter(
          (item) => item.listingId === listingId,
        );
        if (matchingObjs.length === 0) {
          regenerate = true;
          break;
        }
      } else {
        regenerate = true;
        break;
      }
    }

    functions.logger.log("regenerate", regenerate);

    if (regenerate) {
      const listingCollectionSnippets: ListingCollectionSnippet[] = [];
      for (const listingId of Object.keys(collection.listingsPresent)) {
        const snip = await createListingCollectionSnippet(listingId);
        if (snip) {
          listingCollectionSnippets.push(snip);
        }
      }

      functions.logger.log(
        "listingCollectionSnippets",
        listingCollectionSnippets,
      );

      // await updateOne("collections", collection.collectionId, {
      //   listingsInCollection: listingCollectionSnippets,
      // });
    }
  }
};

const createListingCollectionSnippet = async (
  listingId: string,
): Promise<ListingCollectionSnippet | undefined> => {
  const detail = await getDetail_brute(listingId);

  if (detail && detail.listingKey) {
    return {
      listingId: detail.listingId,
      // listingKey: detail.listingKey,
      listingType: detail.listingType,
    };
  }

  return undefined;
};
