import { GooglePlaceDetail } from "../GooglePlaceDetail";
import * as admin from "firebase-admin";
import axios from "axios";

export const getCollectionPlacesMap = async (
  collectionId: string,
  baseType: "collection" | "trip"
): Promise<{ [listingId: string]: GooglePlaceDetail }> => {
  const collectionListings = await admin
    .firestore()
    .collection(baseType === "trip" ? "tripsV2" : "collections")
    .doc(collectionId)
    .collection("googlePlaces")
    .get();

  const remotePlaces: { [listingId: string]: GooglePlaceDetail } = {};
  return collectionListings.docs.reduce((acc, item) => {
    if (item.exists) {
      const listing = item.data() as GooglePlaceDetail;
      acc[listing.place_id] = listing;
    }

    return acc;
  }, remotePlaces);
};

export const getSavedPlaceDetail = async (
  collectionId: string,
  placeId: string
): Promise<GooglePlaceDetail | undefined> => {
  const place = await admin
    .firestore()
    .collection("collections")
    .doc(collectionId)
    .collection("googlePlaces")
    .doc(placeId)
    .get();

  if (place.exists) {
    return place.data() as GooglePlaceDetail;
  }

  return undefined;
};

const baseURL = "https://maps.googleapis.com/maps/api/place/details/json?";
const placesKey = "AIzaSyBT3NrV45nl77I0SGgbPMtNUhqxHDqwr7s";

export const getGooglePlaceDetail = async (
  place_id: string
): Promise<GooglePlaceDetail | undefined> => {
  try {
    const response = await axios({
      url: `${baseURL}place_id=${place_id}&fields=${getFields()}&key=${placesKey}`,
      method: "GET",
    });

    if (response.data && response.data.result) {
      return response.data.result;
    }

    return undefined;
  } catch (error) {
    console.log("error", error);
    return undefined;
  }
};

const getFields = () =>
  "place_id,rating,review,user_ratings_total,photo,type,vicinity,formatted_address,geometry,name,business_status";

export const getGooglePlaceDetailsForList = async (
  placeIds: string[]
): Promise<GooglePlaceDetail[]> => {
  const places = await Promise.all(
    placeIds.map((place_id) => getGooglePlaceDetail(place_id))
  );

  return places.filter(notEmpty);
};

function notEmpty<TValue>(
  value: GooglePlaceDetail | null | undefined
): value is GooglePlaceDetail {
  return value !== null && value !== undefined;
}
