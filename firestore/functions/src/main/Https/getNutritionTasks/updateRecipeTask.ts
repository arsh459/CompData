import * as functions from "firebase-functions";
import * as cors from "cors";
import * as admin from "firebase-admin";
import { recipeTaskArray } from "./constants";
import { getTask } from "../../../models/Task/getUtils";

const corsHandler = cors({ origin: true });

export const updateRecipeFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        let i: number = 0;
        for (const obj of recipeTaskArray) {
          if (
            obj["TaskId"] &&
            obj["Reel Recipe ID"] &&
            obj["Reel Recipe ID"] !== "NA"
          ) {
            const [tk1, tk2] = await Promise.all([
              getTask(obj["TaskId"]),
              getTask(obj["Reel Recipe ID"]),
            ]);

            if (tk1?.id && tk2?.id) {
              console.log(i);
              i++;
              //   console.log("present", tk1.name, tk2.name);
              await admin
                .firestore()
                .collection("tasks")
                .doc(obj.TaskId)
                .update({
                  recipeTaskId: obj["Reel Recipe ID"],
                });
            } else {
              console.log("not present", tk1?.name, tk2?.name);
            }
          } else {
            console.log("skipped", obj);
          }

          //   await admin
          //     .firestore()
          //     .collection("subTasks")
          //     .doc(subTask.taskId)
          //     .update({});
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
