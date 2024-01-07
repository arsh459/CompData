import { Collection } from "../../../models/Collection/Collection";
import * as admin from "firebase-admin";
import { Trip } from "../../../models/Trip/Trip";

export const deleteNestedCollection = async (
  collection: Collection | Trip,
  baseType: "collection" | "trip"
) => {
  const batch = admin.firestore().batch();

  const allListingRefs = await admin
    .firestore()
    .collection(baseType === "trip" ? "tripsV2" : "collections")
    .doc(collection.collectionId)
    .collection("listings")
    .listDocuments();

  allListingRefs.map((listingRef) => {
    batch.delete(listingRef);
  });

  const blogRefs = await admin
    .firestore()
    .collection(baseType === "trip" ? "tripsV2" : "collections")
    .doc(collection.collectionId)
    .collection("blogs")
    .listDocuments();

  blogRefs.map((blogRef) => {
    batch.delete(blogRef);
  });

  const placeRefs = await admin
    .firestore()
    .collection(baseType === "trip" ? "tripsV2" : "collections")
    .doc(collection.collectionId)
    .collection("googlePlaces")
    .listDocuments();

  placeRefs.map((placeRef) => {
    batch.delete(placeRef);
  });

  const viewRefs = await admin
    .firestore()
    .collection(baseType === "trip" ? "tripsV2" : "collections")
    .doc(collection.collectionId)
    .collection("views")
    .listDocuments();

  viewRefs.map((viewRef) => {
    batch.delete(viewRef);
  });

  const likeRefs = await admin
    .firestore()
    .collection(baseType === "trip" ? "tripsV2" : "collections")
    .doc(collection.collectionId)
    .collection("likes")
    .listDocuments();

  likeRefs.map((likeRef) => {
    batch.delete(likeRef);
  });

  await batch.commit();
};
