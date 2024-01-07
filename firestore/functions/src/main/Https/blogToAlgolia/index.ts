import * as functions from "firebase-functions";
import * as cors from "cors";
import { getGhostBlogs, transformBlogsToRecords } from "./utils";
import { pushRecordsToAlgolia } from "../../FirestoreTriggers/algolia/sbAlgoliaUtils";

const corsHandler = cors({ origin: true });

export const blogToAlgoliaFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const ghostBlogs = await getGhostBlogs();

        const records = transformBlogsToRecords(ghostBlogs);

        await pushRecordsToAlgolia(records);

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
