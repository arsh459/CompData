import { Task } from "@models/Tasks/Task";
import { UserInterface } from "@models/User/User";
import {
  createNewActivityForTask,
  createVideoPost,
  getTeam,
} from "@utils/post/createUtils";
import {
  getTeamCaptainIdFromParticipating,
  getTeamIdFromParticipating,
} from "@utils/utills";
import firestore from "@react-native-firebase/firestore";
import { LocationObjectCoords } from "expo-location";

export const getReturnValues = (countDown: number) => {
  const minutes = Math.floor(countDown / 60);
  const seconds = countDown % 60;

  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};

export const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const calculateFP = (
  taskDistance?: number,
  coveredDistance?: number,
  taskFp?: number
) => {
  if (taskDistance && coveredDistance && taskFp) {
    const percComp = coveredDistance / taskDistance;
    if (percComp > 1) {
      return taskFp;
    }

    return Math.floor(taskFp * percComp);
  }

  return 0;
};

export const submitResult = async (
  task: Task,
  user: UserInterface,
  gameId: string,
  selectedDay: number,
  attemptedDate: string,
  calories: number,
  seconds: number,
  coordsArray: LocationObjectCoords[],
  distanceInMeter: number
) => {
  const leaderId = getTeamCaptainIdFromParticipating(
    user.participatingInGameWithTeam,
    gameId
  );

  const teamId = getTeamIdFromParticipating(
    user?.participatingInGameWithTeam,
    gameId
  );

  const post = createVideoPost(
    [],
    user.uid,
    gameId,
    leaderId,
    teamId,
    task.id,
    attemptedDate,

    user?.name,
    user?.profileImage
  );

  const batch = firestore().batch();
  const eventRef = firestore().collection("sbEvents").doc(teamId);
  const team = await getTeam(teamId);

  const postRef = eventRef.collection("postsV2").doc(post.id);
  batch.set(postRef, {
    ...post,
    teamName: team?.name ? team.name : "",
  });

  const activity = createNewActivityForTask(
    gameId,
    task.name ? task.name : "Running task",
    "",
    user.uid,
    "task",
    task.id,
    post.id,
    postRef,
    post.updatedOn,
    teamId,
    selectedDay,
    Date.now(),
    task.avatar ? task.avatar : task.thumbnails,
    calories,
    seconds,
    coordsArray,
    distanceInMeter,
    "REVIEWED"
  );

  if (activity.id) {
    const activityRef = firestore()
      .collection("users")
      .doc(user.uid)
      .collection("activities")
      .doc(activity.id);

    batch.set(activityRef, { ...activity });
  }

  await batch.commit();
};
