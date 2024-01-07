import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../../eventIds/isDuplicateInvocation";
import { CircuitInterface } from "../../../../models/Circuit/Circuit";
import {
  createListingBriefFromCircuit,
  isValidCircuitToBrief,
} from "../../../../models/ListingBrief/Methods";
import {
  addListingToIndex,
  removeListingFromIndex,
  removeListingV2FromIndex,
  addListingToIndexV2,
} from "../algoliaUtils";

export const onCircuitUpdateAlgoliaFunc = functions
  .region("asia-south1")
  .firestore.document("circuits/{circuitId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onCircuitAddAlgolia")) {
        return;
      }

      const circuit = change.after.data() as CircuitInterface;
      // functions.logger.log("circuit", circuit);
      // functions.logger.log(
      //   "isValidCircuitToBrief(circuit)",
      //   isValidCircuitToBrief(circuit),
      // );
      if (isValidCircuitToBrief(circuit)) {
        const listingBrief = createListingBriefFromCircuit(circuit);

        // functions.logger.log("listing", listingBrief);

        // add listingBrief
        await addListingToIndex(listingBrief);
        await addListingToIndexV2(listingBrief);
      } else {
        await removeListingFromIndex(circuit.circuitId);
        await removeListingV2FromIndex(circuit.circuitId);
      }

      return;
    } catch (error) {
      functions.logger.log("error", error);
    }
  });
