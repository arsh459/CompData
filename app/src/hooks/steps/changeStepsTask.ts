import { Activity } from "@models/Activity/Activity";
import { Task } from "@models/Tasks/Task";
import firestore from "@react-native-firebase/firestore";
import { createNewActivityForSteps } from "@utils/post/createUtils";

export const startStepsTask = async (
  task: Task,
  gameId: string,
  teamId: string,
  uid: string,
  taskDay: number
) => {
  const newAct = createNewActivityForSteps(uid, task, gameId, teamId, taskDay);
  await firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .doc(newAct.id)
    .set(newAct);
};

export const switchStepsTask = async (
  previousActIds: { [taskId: string]: Activity },
  uid: string,
  task: Task,
  gameId: string,
  teamId: string,
  taskDay: number
) => {
  const batch = firestore().batch();

  for (const activityId of Object.keys(previousActIds)) {
    const act = previousActIds[activityId];

    batch.update(
      firestore()
        .collection("users")
        .doc(uid)
        .collection("activities")
        .doc(act.id ? act.id : act.postId),
      {
        stepsActive: false,
        calories: 0,
      }
    );
  }

  const newAct = createNewActivityForSteps(uid, task, gameId, teamId, taskDay);

  batch.set(
    firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .doc(newAct.id),
    newAct
  );

  await batch.commit();
};
