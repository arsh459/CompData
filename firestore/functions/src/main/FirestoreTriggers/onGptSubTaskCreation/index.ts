import * as functions from "firebase-functions";
import { SubTask } from "../../../models/Task/Task";
import { handleGPTSubTaskCreation } from "./main";

export const onGptSubTaskCreationFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .firestore.document("subTasks/{subTaskId}")
  .onCreate(async (snap, context) => {
    try {
      const subTask = snap.data() as SubTask;

      await handleGPTSubTaskCreation(subTask, false);

      return;
    } catch (error) {
      console.error(error);
    }
  });
