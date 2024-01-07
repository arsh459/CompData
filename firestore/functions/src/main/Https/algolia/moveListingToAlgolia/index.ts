import * as functions from "firebase-functions";
import * as cors from "cors";
import { moveListingInterface } from "./interface";
import { getDetail_brute } from "../../../../models/ListingDetail/Methods";
import { handleListingCreateSeed } from "../../../FirestoreTriggers/algolia/onListingCreate/handleCreateSeed";

const corsHandler = cors({ origin: true });
export const moveListingToAlgoliaFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result: moveListingInterface = request.body;
        if (result.listingId) {
          const detail = await getDetail_brute(result.listingId);

          // listingDetail
          if (detail) {
            await handleListingCreateSeed(detail);
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
