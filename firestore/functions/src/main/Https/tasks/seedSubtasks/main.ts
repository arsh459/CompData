import { servingType, servingTypes } from "../../../../models/Task/Task";
import { getSubtaskById } from "../../../../models/Task/getUtils";
import { seedSubtaskInterface } from "./interface";
import * as admin from "firebase-admin";

export const mainSeedSubtask = async (subTasks: seedSubtaskInterface[]) => {
  let i: number = 0;

  let newBatch = admin.firestore().batch();

  for (const subTask of subTasks) {
    console.log(
      `${i} | ${subTask.id} | ${subTask.taskName} | ${subTask.kcal} | ${subTask.protein} | ${subTask.carbs} | ${subTask.fats} | ${subTask.fiber} | ${subTask.serving_weight} | ${subTask.serving_unit}`,
    );

    // update all subtasks

    let servingTypeVal: servingType;
    // if (subTask.serving_unit === "large bowl") {
    //   servingTypeVal = "large-bowl";
    // } else

    if (subTask.serving_unit === "small bowl") {
      servingTypeVal = "small-bowl";
    } else if (servingTypes.includes(subTask.serving_unit as servingType)) {
      servingTypeVal = subTask.serving_unit as servingType;
    } else {
      console.log(subTask);
      throw new Error("SERVING TYPE INCOMPATIBLE");
    }

    newBatch.update(admin.firestore().collection("subTasks").doc(subTask.id), {
      kcal: subTask.kcal,
      [`nutrientValues.protein`]: subTask.protein,
      [`nutrientValues.carbs`]: subTask.carbs,
      [`nutrientValues.fibre`]: subTask.fiber,
      [`nutrientValues.fats`]: subTask.fats,
      gramEquivalent: subTask.serving_weight, // gram
      servingType: servingTypeVal,
    });

    const sTask = await getSubtaskById(subTask.id);
    if (!sTask) {
      console.log(subTask);
      throw new Error("SUBTASK NOT PRESENT");
    }

    // console.log("type k", typeof subTask.kcal);
    // console.log("type p", typeof subTask.carbs);
    // console.log("type f", typeof subTask.fats);
    // console.log("type fib", typeof subTask.fiber);

    if (i > 398) {
      await newBatch.commit();

      // create a new batch
      newBatch = admin.firestore().batch();
      i = 0;
    }

    i++;
  }

  await newBatch.commit();
};
