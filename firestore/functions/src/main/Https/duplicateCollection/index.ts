import * as functions from "firebase-functions";
import * as cors from "cors";
import { duplicateCollectionRequest } from "./interface";
import { getCollectionByCollectionId } from "../../../models/Collection/Methods/getUtils";
import { getUserById } from "../../../models/User/Methods";
import { duplicateCollectionSet } from "./duplicateUtils";
import { getTripBytripId } from "../../../models/Trip/Methods/getUtils";

const corsHandler = cors({ origin: true });
export const duplicateCollectionFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result: duplicateCollectionRequest = request.body;

        const collectionToDuplicate =
          result.baseType === "collection"
            ? await getCollectionByCollectionId(result.collectionIdToDuplicate)
            : await getTripBytripId(result.collectionIdToDuplicate);

        if (collectionToDuplicate) {
          const user = await getUserById(result.targetInfluencerId);
          if (user) {
            const newCollectionId = await duplicateCollectionSet(
              collectionToDuplicate,
              user,
              result.baseType
            );

            return response
              .status(200)
              .send({ status: "success", newCollectionId: newCollectionId });
          }
        }

        return response.status(200).send({ status: "Invalid request" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
