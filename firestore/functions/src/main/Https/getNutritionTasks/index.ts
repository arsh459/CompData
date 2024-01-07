import * as functions from "firebase-functions";
import * as cors from "cors";
import * as admin from "firebase-admin";
import { SubTask, Task } from "../../../models/Task/Task";

const corsHandler = cors({ origin: true });

export const getNutritionTasksFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const subTasks = await admin.firestore().collection("subTasks").get();
        const allSubTasks: SubTask[] = [];
        const servingTypes: { [id: string]: number } = {};
        let i: number = 0;
        for (const subTaskDoc of subTasks.docs) {
          const subTask = subTaskDoc.data() as SubTask;

          if (!subTask.isExercise) {
            allSubTasks.push(subTask);

            if (subTask.servingType && servingTypes[subTask.servingType]) {
              servingTypes[subTask.servingType]++;
            } else if (subTask.servingType) {
              servingTypes[subTask.servingType] = 1;
            }

            console.log(
              `${i} | ${subTask.taskName} | ${subTask.fp} | ${subTask.id} | ${
                subTask.servingType
              } | ${subTask.servingValue} | ${subTask.kcal} | ${
                subTask.taskMedia ? "TRUE" : "FALSE"
              }`,
            );

            i++;
          }
        }

        console.log();
        console.log(servingTypes);

        console.log();
        console.log();

        let j: number = 0;
        const allTasks = await admin
          .firestore()
          .collection("tasks")
          .where("taskType", "==", "nutrition")
          .get();

        for (const taskDoc of allTasks.docs) {
          const task = taskDoc.data() as Task;

          console.log(
            `${j} | ${task.name} | ${task.mealTypes} | ${
              task.nutritionFacts?.carbs
            } | ${task.nutritionFacts?.fats} | ${
              task.nutritionFacts?.fibre
            } | ${task.nutritionFacts?.protein} | ${
              task.videoThumbnail || task.thumbnails ? "TRUE" : "FALSE"
            } | ${task.fitPoints} | ${
              task.subTasks?.length ? "PRESENT" : "ABSENT"
            } | ${task.cookingInstruction?.length} | ${
              task.ingredients?.length
            } | ${task.specialityText} | ${
              task.specialityIcon ? "ICON PRESENT" : "ICON ABSENT"
            } | ${task.id}`,
          );

          j++;
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
