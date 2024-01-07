import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../../eventIds/isDuplicateInvocation";
import { CircuitInterface } from "../../../../models/Circuit/Circuit";
import {
  createListingBriefFromCircuit,
  isValidCircuitToBrief,
} from "../../../../models/ListingBrief/Methods";
import { addListingToIndex, addListingToIndexV2 } from "../algoliaUtils";

export const onCircuitAddAlgoliaFunc = functions
  .region("asia-south1")
  .firestore.document("circuits/{circuitId}")
  .onCreate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onCircuitAddAlgolia")) {
        return;
      }

      const circuit = change.data() as CircuitInterface;
      if (isValidCircuitToBrief(circuit)) {
        const listingBrief = createListingBriefFromCircuit(circuit);

        // add listingBrief
        await addListingToIndex(listingBrief);
        await addListingToIndexV2(listingBrief);
      }

      return;
    } catch (error) {
      console.log("error", error);
    }
  });
