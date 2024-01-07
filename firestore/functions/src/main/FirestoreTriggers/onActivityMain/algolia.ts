import { Activity } from "../../../models/Activity/Activity";
import { handleAlgoliaUpdate } from "../onActivityQueueEnter/handleAlgoliaUpdate";

export const handleAlgoliaActivity = async (now: Activity, pre?: Activity) => {
  const flag = shouldUpdate(now, pre);
  if (flag) {
    try {
      await handleAlgoliaUpdate(now);
    } catch (error) {
      console.log("error");
    }
  }
};

const shouldUpdate = (now: Activity, pre?: Activity) => {
  if (!pre) {
    return true;
  }

  if (pre.calories !== now.calories) {
    return true;
  }

  if (pre.createdOn !== now.createdOn) {
    return true;
  }

  if (pre.date !== now.date) {
    return true;
  }

  if (pre.taskId !== now.taskId) {
    return true;
  }

  return false;
};
