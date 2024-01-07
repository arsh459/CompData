import * as admin from "firebase-admin";
import { ListingDetailInterface } from "./interface";

export const getAllStays = async () => {
  const allStays = await admin.firestore().collection("stays").get();

  const stays: ListingDetailInterface[] = [];
  allStays.docs.forEach((doc) => {
    if (doc.exists) {
      stays.push(doc.data() as ListingDetailInterface);
    }
  });

  return stays.sort(function (a, b) {
    if (a.listingName < b.listingName) {
      return -1;
    }
    if (a.listingName > b.listingName) {
      return 1;
    }
    return 0;
  });
};

export const getAllListings = async () => {
  const allStays = await admin.firestore().collection("allListings").get();

  const stays: ListingDetailInterface[] = [];
  allStays.docs.forEach((doc) => {
    if (doc.exists) {
      stays.push(doc.data() as ListingDetailInterface);
    }
  });

  return stays.sort(function (a, b) {
    if (a.listingName < b.listingName) {
      return -1;
    }
    if (a.listingName > b.listingName) {
      return 1;
    }
    return 0;
  });
};
