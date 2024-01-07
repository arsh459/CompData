import * as functions from "firebase-functions";
import * as cors from "cors";
import { addURLBody } from "./interface";
import {
  getAllListings,
  getAllStays,
} from "../../../models/ListingDetail/getAllStays";
import { updateListingKey } from "../../FirestoreTriggers/onListingUpdate/listingKey";
import { getAllCollections } from "../../../models/Collection/Methods/getUtils";
import { updateCollectionKey } from "../../FirestoreTriggers/onTripUpdate/tripKey";
import { getAllTrips } from "../../../models/Trip/Methods/getUtils";

const corsHandler = cors({ origin: true });
export const addURLKeyFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result: addURLBody = request.body;
        let i: number = 0;
        if (result.type === "tripsV2") {
          const allTrips = await getAllTrips();
          for (const trip of allTrips) {
            await updateCollectionKey(trip, trip, "tripsV2", true);
            console.log(`${i + 1}/${allTrips.length}`);
            i += 1;
          }
        } else if (result.type === "collections") {
          const allCollections = await getAllCollections();
          for (const collection of allCollections) {
            await updateCollectionKey(
              collection,
              collection,
              "collections",
              true,
            );
            console.log(`${i + 1}/${allCollections.length}`);
            i += 1;
          }
        } else if (result.type === "allListings") {
          const allListings = await getAllListings();
          for (const listing of allListings) {
            await updateListingKey(listing, listing, "allListings", true);
            console.log(`${i + 1}/${allListings.length}`);
            i += 1;
          }
        } else if (result.type === "stays") {
          const allStays = await getAllStays();
          for (const stay of allStays) {
            await updateListingKey(stay, stay, "stays", true);
            console.log(`${i + 1}/${allStays.length}`);
            i += 1;
          }
        }

        return response.status(200).send({ status: "Success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
