import * as functions from "firebase-functions";
import * as cors from "cors";
import { moveCollectionInterface } from "./interface";
import { addCollectionToIndex } from "../../../FirestoreTriggers/algolia/algoliaUtils";
import { getCollectionByCollectionId } from "../../../../models/Collection/Methods/getUtils";
import {
  createCollectionSnippet,
  isValidToCollectionSnippet,
} from "../../../../models/Collection/Methods/isValid";

const corsHandler = cors({ origin: true });
export const moveCollectionToAlgoliaFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result: moveCollectionInterface = request.body;
        if (result.collectionId) {
          const collection = await getCollectionByCollectionId(
            result.collectionId
          );

          // listingDetail
          if (collection && isValidToCollectionSnippet(collection)) {
            const collectionSnippet = await createCollectionSnippet(
              collection,
              "collection"
            );

            await addCollectionToIndex(collectionSnippet);
          }

          return response.status(200).send({ status: "success" });
        }

        return response.status(200).send({ status: "Failed creation" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
