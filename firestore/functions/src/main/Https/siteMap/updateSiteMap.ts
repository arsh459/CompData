import * as functions from "firebase-functions";
import * as cors from "cors";
import { getAllCollections } from "../../../models/Collection/Methods/getUtils";
import { SiteMap } from "../../../models/ListingSiteMap/ListingSiteMap";
import { getAllTrips } from "../../../models/Trip/Methods/getUtils";
import {
  getAllListings,
  getAllStays,
} from "../../../models/ListingDetail/getAllStays";
import { setOne } from "../../../utils/firestore/fetchOne";

const corsHandler = cors({ origin: true });
export const recreateSiteMap = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const newSiteMap: SiteMap = {
          collections: [],
          experiences: [],
          stays: [],
          trips: [],
        };

        const collections = await getAllCollections();
        let i = 0;
        for (const collection of collections) {
          if (
            collection &&
            collection.collectionKey &&
            collection.collectionName
          ) {
            newSiteMap.collections.push({
              name: collection.collectionName,
              key: collection.collectionKey,
            });

            console.log(
              `col: ${i + 1}/${collections.length}`,
              collection.collectionId,
            );
          }

          i += 1;
        }

        const trips = await getAllTrips();
        let t = 0;
        for (const trip of trips) {
          if (trip && trip.collectionKey && trip.collectionName) {
            newSiteMap.trips.push({
              name: trip.collectionName,
              key: trip.collectionKey,
            });

            console.log(`trp: ${t + 1}/${trips.length}`, trip.collectionId);
          }

          t += 1;
        }

        const stays = await getAllStays();
        let s = 0;
        for (const stay of stays) {
          if (stay && stay.listingName && stay.listingKey) {
            newSiteMap.stays.push({
              name: stay.listingName,
              key: stay.listingKey,
            });

            console.log(`sty: ${s + 1}/${stays.length}`, stay.listingId);
          }

          s += 1;
        }

        const listings = await getAllListings();
        let l = 0;
        for (const listing of listings) {
          if (listing && listing.listingName && listing.listingKey) {
            newSiteMap.experiences.push({
              name: listing.listingName,
              key: listing.listingKey,
            });

            console.log(`lst: ${l + 1}/${listings.length}`, listing.listingId);
          }

          l += 1;
        }

        await setOne("siteMap", "map-1", newSiteMap, false);

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
