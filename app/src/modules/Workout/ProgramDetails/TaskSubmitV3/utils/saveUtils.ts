import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { Task } from "@models/Tasks/Task";
import { getActivityForTask } from "@providers/task/hooks/useTaskStream";
import {
  createNewActivityForTask,
  createVideoPost,
} from "@utils/post/createUtils";
import firestore from "@react-native-firebase/firestore";

export const saveTaskActivity = async (
  newTask: Task,
  uid: string,
  attemptedDate: string
) => {
  let selectedAct = await getActivityForTask(uid, newTask.id, attemptedDate);
  if (!selectedAct) {
    const post = createVideoPost(
      [],
      uid,
      TEAM_ALPHABET_GAME,
      "",
      "",
      newTask.id,
      attemptedDate
    );

    const tkFP = newTask.fitPoints ? newTask.fitPoints : 0;

    const activity = createNewActivityForTask(
      TEAM_ALPHABET_GAME,
      newTask.name ? newTask.name : "Booster Task",
      attemptedDate,
      uid,
      "task",
      newTask.id,
      post.id,
      undefined,
      post.updatedOn,
      TEAM_ALPHABET_GAME,
      0,
      Date.now(),
      newTask?.thumbnails,
      tkFP * 300,
      undefined,
      undefined,
      undefined,
      "REVIEWED",
      0,
      undefined
    );

    if (activity.id) {
      // console.log("saving activity", activity.authorUID, activity.id);
      await firestore()
        .collection("users")
        .doc(activity.authorUID)
        .collection("activities")
        .doc(activity.id)
        .set({ ...activity });
    }
  } else {
  }
};
