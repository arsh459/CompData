import { firestore } from "firebase-admin";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";

export const updateEventKey = async (
  prev: sbEventInterface,
  now: sbEventInterface,
  collectionId: string,
) => {
  if (prev.name !== now.name || !now.eventKey) {
    const newKey = await generateEventKey(now.name, collectionId, now.eventKey);

    // change key
    if (newKey !== now.eventKey) {
      await firestore().collection(collectionId).doc(now.id).update({
        eventKey: newKey,
      });
    }
  }

  return;
};

const generateEventKey = async (
  newName: string,
  collectionId: string,
  previousKey: string | undefined,
) => {
  const withoutHyphen = newName.trim().replace(/-/, " ");
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
  eventKey: string,
  collectionId: string,
) => {
  const events = await firestore()
    .collection(collectionId)
    .where("eventKey", "==", eventKey)
    .get();

  if (events.docs && events.docs.length > 0) {
    return true;
  }

  return false;
};
