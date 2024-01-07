import { toJaytiPhone, toSauravPhone } from "../../../constants/email/contacts";
import { sendHSMV3 } from "../../../models/Conversations/sendHSMV2";
import { SubTask } from "../../../models/Task/Task";
import { getUserById } from "../../../models/User/Methods";
import { subTaskImageMain } from "../../Https/imageAdder/subtask/main";

export const handleGPTSubTaskCreation = async (
  subTask: SubTask,
  notification: boolean,
) => {
  if (subTask.gptGeneratedNutrition && !subTask.taskMedia) {
    // handle image gen
    try {
      await subTaskImageMain(subTask.id);
    } catch (e) {
      console.log("IMAGE UPLOAD FAILED");
    }

    if (notification) {
      let name: string = "there";
      if (subTask.gptInfo?.creatorId) {
        const user = await getUserById(subTask.gptInfo?.creatorId);
        name = user?.name ? user.name : "there";
      }

      const adminLink = `https://www.socialboat.live/admin/subTasks/add?id=${subTask.id}`;

      await sendHSMV3(
        toSauravPhone,
        "new_task_update",
        [name, adminLink],
        undefined,
        [subTask.taskName ? subTask.taskName : "GPT custom sub task"],
      );

      await sendHSMV3(
        toJaytiPhone,
        "new_task_update",
        [name, adminLink],
        undefined,
        [subTask.taskName ? subTask.taskName : "GPT custom sub task"],
      );
    }
  }
};
