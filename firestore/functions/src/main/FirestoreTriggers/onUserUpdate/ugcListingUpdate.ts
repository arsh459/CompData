import { getAllUserDiscoveriesInDB } from "../../../models/UGCListing/Methods";
import { UserInterface } from "../../../models/User/User";
import * as admin from "firebase-admin";

export const updateUGCListingValues = async (userNow: UserInterface) => {
  if (userNow.uid) {
    const updatedUser = await createUpdatedUgcListingValue(userNow);

    if (Object.keys(updatedUser).length > 1) {
      const allListings = await getAllUserDiscoveriesInDB(userNow.uid);
      allListings.map(async (item) => {
        await admin
          .firestore()
          .collection("ugcListings")
          .doc(item.ugcListingId)
          .set(updatedUser, { merge: true });
      });
    }
  }
};

const createUpdatedUgcListingValue = async (userNow: UserInterface) => {
  return {
    uid: userNow.uid,
    ...(userNow.imageURI ? { imageURI: userNow.imageURI } : {}),
    ...(userNow.name ? { name: userNow.name } : {}),
    ...(userNow.tagline ? { tagline: userNow.tagline } : {}),
    ...(typeof userNow.verified === "boolean"
      ? { verified: userNow.verified }
      : {}),
    ...(typeof userNow.allFollowers === "number"
      ? { allFollowers: userNow.allFollowers }
      : {}),
  };
};
