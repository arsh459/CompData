import { getAllUserDiscoveriesInDB } from "./Methods";
import * as admin from "firebase-admin";

export const updateUGCProfileValues = async (
  uid: string,
  key: string,
  value: number | string | boolean
) => {
  const allListings = await getAllUserDiscoveriesInDB(uid);
  const updatePromises = allListings.map((item) => {
    return admin
      .firestore()
      .collection("ugcListings")
      .doc(item.ugcListingId)
      .set(
        {
          [key]: value,
        },
        { merge: true }
      );
  });

  await Promise.all(updatePromises);
};
