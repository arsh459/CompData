import * as functions from "firebase-functions";
import * as cors from "cors";
import { getAllStays } from "../../../../models/ListingDetail/getAllStays";
import { getBriefsFromDetailList } from "../../../../models/ListingBrief/Methods";
import {
  addListingsToIndex,
  addListingsToIndexV2,
} from "../../../FirestoreTriggers/algolia/algoliaUtils";

const corsHandler = cors({ origin: true });
export const moveStaysToAlgoliaFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // const result: moveListingInterface = request.body;
        const allStays = await getAllStays();
        const { briefV2List, briefList } = await getBriefsFromDetailList(
          allStays,
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
