// import { fetchUser } from "../../../FirestoreTriggers/onGptTaskCreation/utils";
// import { waTemplateNames } from "../../../PubSub/notifications/constants";
import { getTask } from "../../../../models/Task/getUtils";
import {
  generateGptImage,
  updateTaskThumbnail,
} from "../../../../utils/imageAdder/tasks/utils";
// import { sendHSMV3 } from "../../../../models/Conversations/sendHSMV2";

export const taskImageMain = async (
  taskId?: string,
): Promise<{
  status: boolean;
  message: string;
}> => {
  if (!taskId) {
    return {
      status: false,
      message: "Provide Correct taskId",
    };
  }

  const task = await getTask(taskId);
  console.log("FETCHED TASK", task?.name);

  if (!task) {
    return {
      status: false,
      message: "Task does not exist",
    };
  }

  if (!task.name && !task.description) {
    return {
      status: false,
      message:
        "Task does not contain name or description for image creation exist",
    };
  }

  const uploadedData = await generateGptImage(
    task.name
      ? `Top view of ${task.name}, home made`
      : // ? `Create an elegant top view image of dish based on name - ${task.name}`
      task.description
      ? `Create an elegant top view image of dish based on description - ${task.description}`
      : "",
  );

  if (!uploadedData) {
    return {
      status: false,
      message: "Some Problem in creating the Image",
    };
  }

  let updateInFireStore = await updateTaskThumbnail(task.id, uploadedData);

  if (!updateInFireStore) {
    return {
      status: false,
      message: "Some Problem in updating in firebase",
    };
  }

  // for testing notifications please uncomment these
  // if (task.gptGeneratedNutrition) {
  //   const userId = task.userId;
  //   if (!userId) {
  //     return {
  //       status: false,
  //       message: "User id does not exist",
  //     };
  //   }

  //   const user = await fetchUser(userId);

  //   if (!user) {
  //     return {
  //       status: false,
  //       message: "Some Problem in fetching the user",
  //     };
  //   }
  //   const templateId: waTemplateNames = "new_task_update";
  //   const adminLink = `http://localhost:3000/admin/tasks/add?id=${task.id}`;
  //   await sendHSMV3(
  //     "+919464979070",
  //     templateId,
  //     [user.name ? user.name.trim() : "He/She", adminLink],
  //     undefined,
  //     [task.name ? task.name.trim() : "Gpt Custom Task"],
  //   );
  // }

  return {
    status: true,
    message: uploadedData.url,
  };
};
