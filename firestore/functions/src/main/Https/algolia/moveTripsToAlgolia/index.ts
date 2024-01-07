import * as functions from "firebase-functions";
import * as cors from "cors";
import { addCollectionToIndex } from "../../../FirestoreTriggers/algolia/algoliaUtils";
import { getPublicTrips } from "../../../../models/Collection/Methods/getUtils";
import {
  createCollectionSnippet,
  isValidToCollectionSnippet,
} from "../../../../models/Collection/Methods/isValid";
// import { getAllTrips } from "../../../../models/Trip/Methods/getUtils";

const corsHandler = cors({ origin: true });
export const moveTripsToAlgoliaFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // const result: moveCollectionInterface = request.body;

        const trips = await getPublicTrips();
        // console.log("trips", trips);

        let i = 0;
        for (const trip of trips) {
          if (trip && isValidToCollectionSnippet(trip)) {
            const tripSnippet = await createCollectionSnippet(trip, "trip");

            await addCollectionToIndex(tripSnippet);
            console.log(`${i + 1}/${trips.length}`, trip.collectionId);
          }

          i += 1;
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
