import * as functions from "firebase-functions";
import * as cors from "cors";
// import * as admin from "firebase-admin";
import { subTaskDataItem, subTasksToUpdate } from "./constants";

const corsHandler = cors({ origin: true });

export const updateSubtaskFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        for (const subTask of subTasksToUpdate) {
          const obj = subTask as subTaskDataItem;

          if (obj["Serving Type NEW"]) {
            const newServingType = obj["Serving Type NEW"];
            const servingTypeToAdd = newServingType.toLowerCase();
            console.log(
              "obj",
              obj.taskId,
              servingTypeToAdd,
              obj["serving value"],
            );

            // await admin
            //   .firestore()
            //   .collection("subTasks")
            //   .doc(subTask.taskId)
            //   .update({
            //     servingType: servingTypeToAdd,
            //     servingValue: obj["serving value"],
            //   });
          } else {
            // console.log("obj", obj.taskId, "Skipped");
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
