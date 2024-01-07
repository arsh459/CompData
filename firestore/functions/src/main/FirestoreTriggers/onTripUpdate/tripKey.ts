import { firestore } from "firebase-admin";
import { Collection } from "../../../models/Collection/Collection";
import { addToSiteMap } from "../../../models/ListingSiteMap/Methods";
import { Trip } from "../../../models/Trip/Trip";

export const updateCollectionKey = async (
  prev: Collection | Trip,
  now: Collection | Trip,
  baseType: "tripsV2" | "collections",
  forceUpdate?: boolean,
) => {
  if (
    prev.collectionName !== now.collectionName ||
    !now.collectionKey ||
    forceUpdate
  ) {
    const newKey = await generateCollectionKey(
      now.collectionName,
      baseType,
      now.collectionKey,
    );

    if (newKey !== now.collectionKey) {
      await firestore().collection(baseType).doc(now.collectionId).update({
        collectionKey: newKey,
      });
      // add to sitemap
      await addToSiteMap(
        baseType === "tripsV2" ? "trips" : "collections",
        now.collectionName,
        newKey,
      );
    }
  }

  return;
};

const generateCollectionKey = async (
  collectionName: string,
  baseType: "tripsV2" | "collections",
  previousKey: string | undefined,
) => {
  const withoutHyphen = collectionName.trim().replace(/-/, " ");
  const listingNameUniformSpaces = withoutHyphen.replace(/\s\s+/g, " ");
  const finalKey = listingNameUniformSpaces.replace(/\s+/g, "-").toLowerCase();

  // console.log("previous", previousKey);
  // console.log("finalKey", finalKey);

  // in non cosmetic changes
  if (previousKey === finalKey) {
    return finalKey;
  }

  const keyExists = await checkIfCollectionKeyExists(finalKey, baseType);
  // console.log("keyExists", keyExists);
  if (keyExists) {
    return `${finalKey}-${Math.floor(Math.random() * 90000) + 10000}`;
  }

  return finalKey;
};

const checkIfCollectionKeyExists = async (
  collectionKey: string,
  baseType: "tripsV2" | "collections",
) => {
  const collections = await firestore()
    .collection(baseType)
    .where("collectionKey", "==", collectionKey)
    .get();

  if (collections.docs && collections.docs.length > 0) {
    return true;
  }

  return false;
};
