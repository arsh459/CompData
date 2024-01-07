import * as functions from "firebase-functions";
import { isDuplicateInvocation } from "../../../eventIds/isDuplicateInvocation";
import { Collection } from "../../../models/Collection/Collection";
import { handleCloudinaryMedia } from "./cloudinary/handleCloudinaryMedia";

export const onMediaProcessCreateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document("collections/{collectionId}")
  .onCreate(async (snapshot, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onMediaProcessCreateFunc")
      ) {
        return;
      }
      // parse booking request
      // const UserObj = await tPromise.decode(User, change.data());
      const collection = snapshot.data() as Collection;

      //
      if (
        collection.processingMedia &&
        collection.processingMedia === "PENDING" &&
        collection.collectionMedia.length > 0
      ) {
        await handleCloudinaryMedia(collection, "collection");
      }
    } catch (error) {
      console.error(error);
    }
  });

export const onMediaProcessUpdateFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .firestore.document("collections/{collectionId}")
  .onUpdate(async (change, context) => {
    try {
      const functionEventId = context.eventId;
      if (
        await isDuplicateInvocation(functionEventId, "onMediaProcessUpdateFunc")
      ) {
        return;
      }
      // parse booking request
      // const UserObj = await tPromise.decode(User, change.data());
      const collection = change.after.data() as Collection;
      const prevCollection = change.before.data() as Collection;

      //
      if (
        collection.processingMedia &&
        collection.processingMedia === "PENDING" &&
        collection.collectionMedia.length > 0
      ) {
        await handleCloudinaryMedia(
          collection,
          "collection",
          prevCollection.mediaAspectRatio
        );
      }
    } catch (error) {
      console.error(error);
    }
  });
