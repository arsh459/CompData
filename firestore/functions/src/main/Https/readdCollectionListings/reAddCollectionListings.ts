import * as functions from "firebase-functions";
import * as cors from "cors";
import { updateListingsInCollection } from "../../FirestoreTriggers/onListingUpdate/updateCollectionListings";
import { getAllListings } from "../../../models/ListingDetail/getAllStays";

const corsHandler = cors({ origin: true });
export const reAddCollectionListingsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const allStays = await getAllListings();

        let i: number = 0;
        for (const stay of allStays) {
          await updateListingsInCollection(stay);
          // }
          i += 1;
          console.log(`${i}/${allStays.length}: ${stay.listingId}`);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
