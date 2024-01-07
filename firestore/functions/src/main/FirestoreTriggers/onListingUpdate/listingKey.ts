import { firestore } from "firebase-admin";
import { ListingDetailInterface } from "../../../models/ListingDetail/interface";

export const updateListingKey = async (
  prev: ListingDetailInterface,
  now: ListingDetailInterface,
  collectionId: string,
  updateKey?: boolean,
) => {
  if (prev.listingName !== now.listingName || !now.listingKey || updateKey) {
    const newKey = await generateListingKey(
      now.listingName,
      collectionId,
      now.listingKey,
    );

    // change key
    if (newKey !== now.listingKey) {
      await firestore().collection(collectionId).doc(now.listingId).update({
        listingKey: newKey,
      });
    }
  }

  return;
};

const generateListingKey = async (
  listingName: string,
  collectionId: string,
  previousKey: string | undefined,
) => {
  const withoutHyphen = listingName.trim().replace(/-/, " ");
  const listingNameUniformSpaces = withoutHyphen.replace(/\s\s+/g, " ");
  const finalKey = listingNameUniformSpaces.replace(/\s+/g, "-").toLowerCase();

  // in non cosmetic changes
  if (previousKey === finalKey) {
    return finalKey;
  }

  const keyExists = await checkIfListingKeyExists(finalKey, collectionId);
  if (keyExists) {
    return `${finalKey}-${Math.floor(Math.random() * 90000) + 10000}`;
  }

  return finalKey;
};

const checkIfListingKeyExists = async (
  listingKey: string,
  collectionId: string,
) => {
  const listings = await firestore()
    .collection(collectionId)
    .where("listingKey", "==", listingKey)
    .get();

  if (listings.docs && listings.docs.length > 0) {
    return true;
  }

  return false;
};
