import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../../eventIds/isDuplicateInvocation";
import {
  isValidToBrief,
  // updateListingBriefFromDetail,
} from "../../../../models/ListingBrief/Methods";
import { ListingDetailInterface } from "../../../../models/ListingDetail/interface";
import {
  addToSiteMap,
  removeFromSiteMap,
} from "../../../../models/ListingSiteMap/Methods";
import { removeListingFromIndex } from "../algoliaUtils";
import { handleListingCreateSeed } from "../onListingCreate/handleCreateSeed";
import { removeListingFromAlgoliaV2 } from "./removeListing";

export const onListingUpdateAlgoliaFunc = functions
  .region("asia-south1")
  .firestore.document("allListings/{listingId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onListingAddAlgolia")) {
        return;
      }

      const listingNow = change.after.data() as ListingDetailInterface;
      const listingPrev = change.before.data() as ListingDetailInterface;
      if (isValidToBrief(listingNow)) {
        // const listingBriefSnippet = await updateListingBriefFromDetail(
        // listingNow,
        // "allListings",
        // );

        // add listingBrief
        // await updateListingIoIndex(listingBriefSnippet, true);
        const seeded = await handleListingCreateSeed(listingNow);
        if (
          seeded &&
          listingNow.listingKey &&
          listingNow.listingName &&
          (listingNow.listingKey !== listingPrev.listingKey ||
            listingNow.listingName !== listingPrev.listingName)
        ) {
          await addToSiteMap(
            "experiences",
            listingNow.listingName,
            listingNow.listingKey,
          );
        }
      } else {
        await removeListingFromIndex(listingNow.listingId);
        await removeListingFromAlgoliaV2("allListings", listingNow.listingId);

        if (listingNow.listingKey && listingNow.listingName) {
          await removeFromSiteMap(
            "experiences",
            listingNow.listingName,
            listingNow.listingKey,
          );
        }
      }

      return;
    } catch (error) {
      console.log("error", error);
    }
  });

export const onStayUpdateAlgoliaFunc = functions
  .region("asia-south1")
  .firestore.document("stays/{listingId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (await isDuplicateInvocation(functionEventId, "onStayAddAlgolia")) {
        return;
      }

      const listingNow = change.after.data() as ListingDetailInterface;
      const listingPrev = change.before.data() as ListingDetailInterface;
      if (isValidToBrief(listingNow)) {
        // const listingBriefSnippet = await updateListingBriefFromDetail(
        // listingNow,
        // "stays",
        // );

        // add listingBrief
        // await updateListingIoIndex(listingBriefSnippet, true);
        const seeded = await handleListingCreateSeed(listingNow);
        if (
          seeded &&
          listingNow.listingKey &&
          listingNow.listingName &&
          (listingNow.listingKey !== listingPrev.listingKey ||
            listingNow.listingName !== listingPrev.listingName)
        ) {
          await addToSiteMap(
            "stays",
            listingNow.listingName,
            listingNow.listingKey,
          );
        }
      } else {
        await removeListingFromIndex(listingNow.listingId);
        await removeListingFromAlgoliaV2("stays", listingNow.listingId);

        if (listingNow.listingKey && listingNow.listingName) {
          await removeFromSiteMap(
            "stays",
            listingNow.listingName,
            listingNow.listingKey,
          );
        }
      }

      return;
    } catch (error) {
      console.log("error", error);
    }
  });
