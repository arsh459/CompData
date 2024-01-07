import {
  Collection,
  CollectionListingISO,
  MediaInterface,
} from "../../../models/Collection/Collection";
import { createTemplate } from "../../../models/Collection/Methods/createNew";
import { getListingSnippetFromDetail } from "../../../models/ListingDetail/convertUtils";
import { flagObj } from "../../../models/ListingDetail/interface";
import {
  findCheapestVariant,
  getDetail_brute,
} from "../../../models/ListingDetail/Methods";
import { getUGCListingById } from "../../../models/UGCListing/Methods";
import { UserInterface } from "../../../models/User/User";
import { addCollectionToRemote } from "../duplicateCollection/duplicateUtils";

export const createUGCToCollection = async (
  ugcListingIds: string[],
  user: UserInterface,
  collectionName: string,
  collectionTagline: string,
  collectionDescription: string
): Promise<string> => {
  const collectionListings: CollectionListingISO[] = [];
  let maxPrice = 0;
  let minPrice = Number.POSITIVE_INFINITY;
  const themeTags: flagObj = {};
  const groupSizeTags: flagObj = {};
  const amenitiesTags: flagObj = {};
  const regionTags: flagObj = {};
  const listingTypes: { [listingType: string]: boolean } = {};
  const listingsPresent: { [listingType: string]: boolean } = {};
  const ugcImages: MediaInterface[] = [];

  // console.log('ugcListingIds', ugcListingIds);

  await Promise.all(
    ugcListingIds.map(async (item, index) => {
      const remoteUGC = await getUGCListingById(item);
      if (remoteUGC) {
        // if a listingId is associated with it
        if (remoteUGC.listingId) {
          const detail = await getDetail_brute(remoteUGC.listingId);
          // console.log('detail', detail);

          // if detail is present
          if (detail) {
            const listingSnippet = getListingSnippetFromDetail(detail);
            collectionListings.push({
              ...listingSnippet,
              listingHeading: "",
              listingTagline: "",
              listingDescription: "",
              index: index,
              uid: user.uid,
            });

            const cheapestVariant = findCheapestVariant(detail.variants);
            if (cheapestVariant) {
              if (cheapestVariant.price < minPrice) {
                minPrice = cheapestVariant.price;
              }

              if (cheapestVariant.price > maxPrice) {
                maxPrice = cheapestVariant.price;
              }

              if (listingSnippet.themeTags) {
                Object.keys(listingSnippet.themeTags).map((tag) => {
                  themeTags[tag] = true;
                });
              }

              if (listingSnippet.groupSizeTags) {
                Object.keys(listingSnippet.groupSizeTags).map((tag) => {
                  groupSizeTags[tag] = true;
                });
              }

              if (listingSnippet.amenitiesTags) {
                Object.keys(listingSnippet.amenitiesTags).map((tag) => {
                  amenitiesTags[tag] = true;
                });
              }

              if (listingSnippet.regionTags) {
                Object.keys(listingSnippet.regionTags).map((tag) => {
                  regionTags[tag] = true;
                });
              }

              listingTypes[listingSnippet.listingType] = true;
              listingsPresent[listingSnippet.listingId] = true;

              if (remoteUGC.images) {
                remoteUGC.images.map((remoteImg) => {
                  ugcImages.push({
                    url: remoteImg,
                    type: "photo",
                  });
                });
              }
            }
          }
        }
      }
    })
  );

  const finalCollection: Collection = {
    ...createTemplate(
      user,
      collectionName,
      collectionTagline,
      collectionDescription
    ),
    themeTags: themeTags,
    regionTags: regionTags,
    amenitiesTags: amenitiesTags,
    groupSizeTags: groupSizeTags,
    listingTypes: listingTypes,
    listingsPresent: listingsPresent,
    minPrice: minPrice,
    maxPrice: maxPrice,
    collectionMedia: ugcImages,
  };

  // console.log('finalCollection', finalCollection);
  // console.log('collectionListings', collectionListings);

  await addCollectionToRemote(
    finalCollection,
    collectionListings,
    "collection"
  );

  return finalCollection.collectionId;
};
