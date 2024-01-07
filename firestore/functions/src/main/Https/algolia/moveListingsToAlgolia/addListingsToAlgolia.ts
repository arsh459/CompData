import * as functions from "firebase-functions";
import * as cors from "cors";
import { getAllListings } from "../../../../models/ListingDetail/getAllStays";
import { getBriefsFromDetailList } from "../../../../models/ListingBrief/Methods";
import {
  addListingsToIndex,
  addListingsToIndexV2,
} from "../../../FirestoreTriggers/algolia/algoliaUtils";

const corsHandler = cors({ origin: true });
export const moveListingsToAlgoliaFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 300, memory: "1GB" })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // const result: moveListingInterface = request.body;
        const allListings = await getAllListings();
        const { briefList, briefV2List } = await getBriefsFromDetailList(
          allListings,
        );

        // add all stays
        await addListingsToIndex(briefList);
        await addListingsToIndexV2(briefV2List);

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
