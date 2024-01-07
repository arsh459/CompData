import * as admin from "firebase-admin";
import { SubTask } from "../../../models/Task/Task";
import { AWSMedia } from "../../../models/sbEvent/CloudinaryMedia";

export const fetchSubTask = async (SubtaskId: string) => {
  try {
    const SubtaskDoc = await admin
      .firestore()
      .collection("subTasks")
      .doc(SubtaskId)
      .get();

    if (SubtaskDoc) {
      const subTask = SubtaskDoc.data() as SubTask;
      return subTask;
    }

    return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const updateSubTask = async (id: string, taskMedia: AWSMedia) => {
  try {
    const SubtaskDoc = await admin
      .firestore()
      .collection("subTasks")
      .doc(id)
      .update({ taskMedia: taskMedia });

    if (!SubtaskDoc) {
      return undefined;
    }

    return true;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
