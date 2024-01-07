import { generatedTask } from "@providers/AddNewItem/useAddNewItem";
import firestore from "@react-native-firebase/firestore";
import * as Sentry from "@sentry/react-native";

export async function storeInFireStoreDatabase(generatedTask: generatedTask) {
  try {
    const batch = firestore().batch();
    generatedTask.subTaskArray.forEach((doc) => {
      // console.log("doc", doc);
      const docRef = firestore().collection("subTasks").doc(doc.id);
      batch.set(docRef, doc);
    });
    const taskRef = firestore()
      .collection("tasks")
      .doc(generatedTask.taskObj.id);

    // console.log("generatedTask.taskObj", generatedTask.taskObj);

    batch.set(taskRef, generatedTask.taskObj);

    await batch.commit();

    console.log("Batch write success");
    Sentry.addBreadcrumb({
      category: "gpt",
      level: "info",
      message: "BATCH WRITE SUCCESSFUL",
    });
  } catch (error) {
    console.log(error);
    console.log("Batch write error");
    Sentry.captureException(error);
    return "Error in firebase Storage";
  }
}
