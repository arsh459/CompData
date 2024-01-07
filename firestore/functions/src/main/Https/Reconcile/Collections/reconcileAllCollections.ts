import * as functions from "firebase-functions";
import * as cors from "cors";
import {
  getAllCollections,
  //   getCollectionListings,
} from "../../../../models/Collection/Methods/getUtils";
// import { updateOne } from "../../../../utils/firestore/fetchOne";
import { addListingsInCollection } from "../../../FirestoreTriggers/onCollectionUpdate/addListingsInCollection";

const corsHandler = cors({ origin: true });
export const reconcileAllCollectionsFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // all collections
        let i: number = 0;
        const collections = await getAllCollections();
        for (const collection of collections) {
          //   const allListings = await getCollectionListings(
          //     collection.collectionId,
          //     "collection",
          //   );

          //   if (allListings) {
          //     const listingIdMap: { [id: string]: boolean } = {};
          //     for (const listing of allListings) {
          //       listingIdMap[listing.listingId] = true;
          //     }

          //     await updateOne("collections", collection.collectionId, {
          //       listingsPresent: listingIdMap,
          //     });
          //   }

          await addListingsInCollection(collection);

          i += 1;
          console.log(`${i}/${collections.length}: ${collection.collectionId}`);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
