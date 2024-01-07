import { StorePacket } from "./StorePacket";
import { getDetail_brute } from "../ListingDetail/Methods";
import { fetchOne } from "../../utils/firestore/fetchOne";
import * as admin from "firebase-admin";
import { createStoreSnippetFromDetail } from "../StoreSnippet/Methods";
import { UGCListing } from "../UGCListing/UGCListing";

export const addToStorePacket = async (
  uid: string,
  listingId: string,
  circuitId: string,
  disc: UGCListing
) => {
  const newDetail = await getDetail_brute(listingId);
  if (newDetail) {
    await admin
      .firestore()
      .collection("stores")
      .doc(`store-${uid}`)
      .set(
        {
          circuitIds: {
            [circuitId]: true,
          },
          listings: {
            [listingId]: createStoreSnippetFromDetail(newDetail, disc),
          },
          uid: uid,
        },
        { merge: true }
      );
  }
};

export const removeFromStorePacket = async (
  uid: string,
  listingId: string,
  circuitId: string
) => {
  await admin
    .firestore()
    .collection("stores")
    .doc(`store-${uid}`)
    .update({
      [`circuitIds.${circuitId}`]: admin.firestore.FieldValue.delete(),
      [`listings.${listingId}`]: admin.firestore.FieldValue.delete(),
    });
};

export const getStorePacket = async (
  uid: string
): Promise<StorePacket | undefined> => {
  const store = await fetchOne("stores", `store-${uid}`);
  if (store.data()) {
    return store.data() as StorePacket;
  }

  return undefined;
};
