import * as functions from "firebase-functions";
import * as cors from "cors";
import { getBriefsFromCircuitList } from "../../../../models/ListingBrief/Methods";
import {
  addListingsToIndex,
  addListingsToIndexV2,
} from "../../../FirestoreTriggers/algolia/algoliaUtils";
import { getAllCircuits } from "../../../../models/Circuit/getAllCircuits";

const corsHandler = cors({ origin: true });
export const moveCircuitsToAlgoliaFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 300, memory: "1GB" })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // const result: moveListingInterface = request.body;
        const allCircuits = await getAllCircuits();
        const allBriefs = getBriefsFromCircuitList(allCircuits);

        // add all stays
        await addListingsToIndex(allBriefs);
        await addListingsToIndexV2(allBriefs);

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
