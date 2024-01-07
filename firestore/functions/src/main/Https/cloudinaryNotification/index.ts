import * as functions from "firebase-functions";
import * as cors from "cors";
import { EagerNotificationResponse } from "./interface";
import { getCollectionByPublicId } from "../../../models/Collection/Methods/getUtils";
import { updateOne } from "../../../utils/firestore/fetchOne";
import { getLastItem } from "./getLastPath";

const corsHandler = cors({ origin: true });
export const cloudinaryNotificationFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const result: EagerNotificationResponse = request.body;
        // console.log('public_id', result.public_id);
        // console.log('state', result.state);
        // console.log('batch_id', result.batch_id);
        // console.log('notification_type', result.notification_type);

        if (result.state && result.state === "failed") {
          //   console.log('result', result);
          response.status(200).end();
        }

        if (result.public_id) {
          const parsedId = getLastItem(result.public_id);
          //   console.log('parsedId', parsedId);

          const collectionsToUpdate = await getCollectionByPublicId(
            parsedId,
            "collection"
          );
          //   console.log('collections retrived', collectionsToUpdate.length);

          for (const collection of collectionsToUpdate) {
            // console.log('updating', collection.collectionId);
            if (collection.processingPublicIds) {
              const remainingPublicIds = collection.processingPublicIds.filter(
                (id) => id !== parsedId
              );

              if (remainingPublicIds.length > 0) {
                await updateOne("collections", collection.collectionId, {
                  processingPublicIds: remainingPublicIds,
                });
              } else {
                await updateOne("collections", collection.collectionId, {
                  processingPublicIds: remainingPublicIds,
                  processingMedia: "DONE",
                });
              }
            }
          }
        }

        response.status(200).end();
      } catch (error) {
        console.log(error);
        response.status(400).end();
      }
    });
  });
