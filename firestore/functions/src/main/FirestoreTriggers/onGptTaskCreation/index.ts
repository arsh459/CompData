import * as functions from "firebase-functions";
import { Task } from "../../../models/Task/Task";
import { handleGPTTaskCreation } from "./main";

export const onGptTaskCreationFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 120 })
  .firestore.document("tasks/{taskId}")
  .onCreate(async (snap, context) => {
    try {
      const task = snap.data() as Task;

      // checker
      await handleGPTTaskCreation(task, true);
      return;
    } catch (error) {
      console.error(error);
    }
  });
