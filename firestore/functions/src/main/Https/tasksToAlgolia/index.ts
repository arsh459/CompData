import * as cors from "cors";
import * as functions from "firebase-functions";
import { getTransformedTasks } from "./utils";
import {
  pushDietRecordsToAlgolia,
  pushRecordsToAlgolia,
} from "../../FirestoreTriggers/algolia/sbAlgoliaUtils";
import { getAllTasks } from "../../../models/Task/getUtils";

const corsHandler = cors({ origin: true });

export const tasksToAlgoliaFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const tasks = await getAllTasks();

        const { filteredTasks, dietPlanIndexTasks } = await getTransformedTasks(
          tasks,
        );
        if (filteredTasks) {
          await pushRecordsToAlgolia(filteredTasks);
        }

        if (dietPlanIndexTasks) {
          await pushDietRecordsToAlgolia(dietPlanIndexTasks);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
