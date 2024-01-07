import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { WorkoutActivity } from "./WorkoutActivity";
import { db } from "config/firebase";
import { v4 as uuidv4 } from "uuid";
import {
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  deleteField,
  //   onSnapshot,
  //   collection,
  //   query,
  //   limit,
  //   where,
  setDoc,
  updateDoc,
  //   orderBy,
} from "firebase/firestore";

export const createNewStream = (
  uid: string,
  date: string,
  type: "video" | "live" | "task",
  createdOn: number,
  name?: string,
  image?: CloudinaryMedia | AWSMedia,
  state?: "active" | "inactive",
  media?: (CloudinaryMedia | AWSMedia)[]
): WorkoutActivity => {
  return {
    id: uuidv4(),
    uid,
    date,
    createdOn,
    updatedOn: createdOn,
    currentReservoir: 0,
    reservoirSeconds: 0,
    streamLastStarted: createdOn,
    type,
    streamedSeconds: 0,
    state,
    media: media ? media : [],
    authorDetails: {
      name: name ? name : "",
      ...(image ? { image: image } : {}),
    },
  };
};

export const saveTaskStream = async (
  stream: WorkoutActivity,
  taskId: string
) => {
  await setDoc(doc(doc(db, "tasks", taskId), "streams", stream.id), stream);
};

export const resumeTaskStream = async (
  streamId: string,
  taskId: string,
  resumeTime: number
) => {
  await updateDoc(doc(doc(db, "tasks", taskId), "streams", streamId), {
    streamLastStarted: resumeTime,
    state: "active",
  });
};

export const saveNewStream = async (
  seriesId: string,
  videoId: string,
  stream: WorkoutActivity,
  key: "exercises" | "lives"
) => {
  const seriesRef = doc(db, "workouts", seriesId);
  const videoRef = doc(seriesRef, key, videoId);
  const streamRef = doc(videoRef, "streams", stream.id);
  await setDoc(streamRef, stream);
};

export const updateStream = async (
  seriesId: string,
  videoId: string,
  streamId: string,
  seconds: number,
  key: "exercises" | "lives"
) => {
  const seriesRef = doc(db, "workouts", seriesId);
  const videoRef = doc(seriesRef, key, videoId);
  const streamRef = doc(videoRef, "streams", streamId);

  await updateDoc(streamRef, {
    streamedSeconds: increment(seconds),
    updatedOn: Date.now(),
  });
};

export const updateTaskStream = async (
  taskId: string,
  streamId: string,
  seconds: number
) => {
  const seriesRef = doc(db, "tasks", taskId);
  const streamRef = doc(seriesRef, "streams", streamId);

  await updateDoc(streamRef, {
    currentReservoir: seconds, // update current reservoir
    state: "active",
    updatedOn: Date.now(),
  });
};

export const addMediaToStream = async (
  taskId: string,
  streamId: string,
  file: CloudinaryMedia | AWSMedia
  // seconds: number
) => {
  const seriesRef = doc(db, "tasks", taskId);
  const streamRef = doc(seriesRef, "streams", streamId);

  await updateDoc(streamRef, {
    media: arrayUnion(file),
    state: "active",
    updatedOn: Date.now(),
  });
};

export const removeMediaFromStream = async (
  taskId: string,
  streamId: string,
  file: CloudinaryMedia | AWSMedia
) => {
  const seriesRef = doc(db, "tasks", taskId);
  const streamRef = doc(seriesRef, "streams", streamId);

  await updateDoc(streamRef, {
    media: arrayRemove(file),
    state: "active",
    updatedOn: Date.now(),
  });
};

export const voidTask = async (taskId: string, streamId: string) => {
  const seriesRef = doc(db, "tasks", taskId);
  const streamRef = doc(seriesRef, "streams", streamId);

  await updateDoc(streamRef, {
    date: "",
    state: "void",
    updatedOn: Date.now(),
  });
};

export const updateStreamState = async (
  seriesId: string,
  videoId: string,
  streamId: string,
  state: "active" | "inactive",
  key: "exercises" | "lives"
) => {
  const seriesRef = doc(db, "workouts", seriesId);
  const videoRef = doc(seriesRef, key, videoId);
  const streamRef = doc(videoRef, "streams", streamId);

  await updateDoc(streamRef, {
    state: state,
    updatedOn: Date.now(),
    ...(state === "active" ? { streamLastStarted: Date.now() } : {}),
  });
};

export const updateTaskStreamState = async (
  taskId: string,
  streamId: string,
  state: "active" | "inactive",
  currentReservoirNow: number,
  previousReservoirSeconds: number
) => {
  await updateDoc(doc(doc(db, "tasks", taskId), "streams", streamId), {
    state: state,
    updatedOn: Date.now(),
    ...(state === "active"
      ? { streamLastStarted: Date.now() }
      : { streamLastStarted: deleteField() }),
    streamedSeconds: previousReservoirSeconds + currentReservoirNow,
    reservoirSeconds: increment(currentReservoirNow),
    currentReservoir: 0,
  });
};

// start - create stream
// reservoir
// currentReservoir

// update - update with currentStart to now -> currentReservoir
// pause -  increment reservoir with Now - currentStart - currentReservoir, remove currentStart
// resume - set currentStart
