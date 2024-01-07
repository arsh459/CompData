import { toJaytiPhone, toSauravPhone } from "../../../constants/email/contacts";
import { sendHSMV3 } from "../../../models/Conversations/sendHSMV2";
import { Task } from "../../../models/Task/Task";
import { getUserById } from "../../../models/User/Methods";
import { taskImageMain } from "../../Https/imageAdder/task/main";

export const handleGPTTaskCreation = async (
  task: Task,
  notification: boolean,
) => {
  if (task.gptGeneratedNutrition && !task.thumbnails) {
    // handle image gen
    try {
      await taskImageMain(task.id);
    } catch (error) {
      console.log("UPLOAD FAILED");
    }

    let name: string = "there";
    if (task.gptUID) {
      const user = await getUserById(task.gptUID);
      name = user?.name ? user.name : "there";
    }

    if (notification) {
      const adminLink = `https://www.socialboat.live/admin/tasks/add?id=${task.id}`;

      await sendHSMV3(
        toSauravPhone,
        "new_task_update",
        [name, adminLink],
        undefined,
        [task.name ? task.name : "GPT custom task"],
      );

      await sendHSMV3(
        toJaytiPhone,
        "new_task_update",
        [name, adminLink],
        undefined,
        [task.name ? task.name : "GPT custom task"],
      );
    }
  }
};
