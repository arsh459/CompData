import * as functions from "firebase-functions";
import * as cors from "cors";
import { addCollectionToIndex } from "../../../FirestoreTriggers/algolia/algoliaUtils";
import { getPublicCollections } from "../../../../models/Collection/Methods/getUtils";
import {
  createCollectionSnippet,
  isValidToCollectionSnippet,
} from "../../../../models/Collection/Methods/isValid";

const corsHandler = cors({ origin: true });
export const moveCollectionsToAlgoliaFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // const result: moveCollectionInterface = request.body;

        const collections = await getPublicCollections();

        let i = 0;
        for (const collection of collections) {
          if (collection && isValidToCollectionSnippet(collection)) {
            const collectionSnippet = await createCollectionSnippet(
              collection,
              "collection",
            );

            await addCollectionToIndex(collectionSnippet);
            console.log(
              `${i + 1}/${collections.length}`,
              collection.collectionId,
            );
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
