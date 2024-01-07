// import { waTemplateNames } from "../../../PubSub/notifications/constants";
import { generateGptImage } from "../../../../utils/imageAdder/tasks/utils";
import {
  fetchSubTask,
  updateSubTask,
} from "../../../../utils/imageAdder/subtasks/utils";
// import { sendHSMV3 } from "../../../../models/Conversations/sendHSMV2";
// import { fetchUser } from "../../../FirestoreTriggers/onGptTaskCreation/utils";

export const subTaskImageMain = async (
  SubtaskId?: string,
): Promise<{
  status: boolean;
  message: string;
}> => {
  if (!SubtaskId) {
    return {
      status: false,
      message: "Provide Correct taskId",
    };
  }
  const subTask = await fetchSubTask(SubtaskId);

  if (!subTask) {
    return {
      status: false,
      message: "Task does not exist",
    };
  }

  console.log("FETCHED SUBTASK", subTask.taskName);

  if (!subTask.taskName) {
    return {
      status: false,
      message:
        "Task does not contain name or description for image creation exist",
    };
  }

  const uploadedData = await generateGptImage(
    subTask.taskName
      ? `Top view of ${subTask.taskName}, home made` // `Create an elegant top view image of dish with the name - ${subTask.taskName}`
      : "",
  );

  if (!uploadedData) {
    return {
      status: false,
      message: "Some Problem in creating the Image",
    };
  }

  let updateInFireStore = await updateSubTask(subTask.id, uploadedData);
  console.log("UPDATED IN DB");

  if (!updateInFireStore) {
    return {
      status: false,
      message: "Some Problem in updating in firebase",
    };
  }

  // for testing notifications please uncomment these
  // if (Subtask.gptInfo) {
  //   const userId = Subtask.gptInfo.creatorId;
  //   if (!userId) {
  //     return {
  //       status: false,
  //       message: "User Id does not exist",
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
  //   const adminLink = `http://localhost:3000/admin/subTasks/add?id=${Subtask.id}`;
  //   await sendHSMV3(
  //     "+919464979070",
  //     templateId,
  //     [user.name ? user.name.trim() : "He/She", adminLink],
  //     undefined,
  //     [Subtask.taskName ? Subtask.taskName.trim() : "Gpt Custom SubTask"],
  //   );
  // }

  return {
    status: true,
    message: uploadedData.url,
  };
};
