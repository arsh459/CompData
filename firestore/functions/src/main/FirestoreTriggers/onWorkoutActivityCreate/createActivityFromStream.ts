import { Activity } from "../../../models/Activity/Activity";
import { LiveClass, Workout } from "../../../models/Workout/Workout";
import { WorkoutActivity } from "../../../models/WorkoutActivity/WorkoutActivity";
import { v4 as uuidv4 } from "uuid";
import {
  saveStreamActivity,
  saveTaskStreamActivity,
} from "../../../models/Activity/getUtils";
import { Task } from "../../../models/Task/Task";
import {
  AWSMedia,
  CloudinaryMedia,
} from "../../../models/sbEvent/CloudinaryMedia";

export const handleNewTaskStream = async (
  task: Task,
  stream: WorkoutActivity,
) => {
  const newActivity = createNewActivityForTask(
    stream,
    task.name ? task.name : "task",
    "task",
    task.id,
    task.avatar,
  );

  await saveTaskStreamActivity(stream.uid, newActivity, task.id, stream.id);
};

export const handleNewWorkoutStream = async (
  workout: Workout | LiveClass,
  stream: WorkoutActivity,
  seriesId: string,
  videoId: string,
  streamId: string,
  activityName: "video" | "live",
  source: "ondemandVideo" | "live",
  key: "exercises" | "lives",
) => {
  const newActivity = createNewActivityForStream(
    workout,
    stream,
    activityName,
    source,
  );

  await saveStreamActivity(
    stream.uid,
    newActivity,
    seriesId,
    videoId,
    streamId,
    key,
  );
};

export const createNewActivityForStream = (
  workout: Workout | LiveClass,
  wStream: WorkoutActivity,
  activityName: "video" | "live",
  source: "ondemandVideo" | "live",
): Activity => {
  return {
    calories:
      source === "ondemandVideo"
        ? getStreamedCalories(workout, wStream.streamedSeconds)
        : 0,
    fitPoints: 0,

    date: wStream.date,
    activityName: activityName,
    authorUID: wStream.uid,

    createdOn: wStream.createdOn,
    updatedOn: wStream.updatedOn,

    source: source,
    postId: uuidv4(),
  };
};

export const createNewActivityForTask = (
  wStream: WorkoutActivity,
  activityName: string,
  source: "ondemandVideo" | "live" | "task",
  taskId: string,
  placeholderImg?: CloudinaryMedia | AWSMedia,
): Activity => {
  return {
    calories: 0,
    fitPoints: 0,

    date: wStream.date,
    activityName: activityName,
    authorUID: wStream.uid,
    ...(placeholderImg ? { placeholderImg: placeholderImg } : {}),

    createdOn: wStream.createdOn,
    updatedOn: wStream.updatedOn,

    source: source,
    postId: uuidv4(),

    ...(wStream.postRef ? { postRef: wStream.postRef } : {}),
    streamId: wStream.id,
    taskId: taskId,
  };
};

export const createNewActivityForSteps = (
  uid: string,
  taskId: string,
  taskName: string,
  gameId: string,
  teamId: string,
  taskDay: number,
  date: string,
  time: number,
): Activity => {
  // const time = Date.now();
  const id = uuidv4();
  return {
    id: id,
    taskId: taskId,
    calories: 0,
    activityName: taskName,
    date: date,

    authorUID: uid,
    updatedOn: time,
    createdOn: time,
    stepsActive: true,
    postId: id,
    games: [gameId],
    source: "task",
    reviewStatus: "REVIEWED",
    taskDay: taskDay,

    teamId: teamId,
  };
};

export const getStreamedCalories = (
  work: Workout | LiveClass,
  streamed: number,
) => {
  if (work.calories && streamed && work?.media?.duration) {
    return (work.calories * streamed) / work.media.duration;
  }

  return 0;
};
