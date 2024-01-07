import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Post } from "@models/Posts/Post";
import { ParticipatingWithTeamObj } from "@models/User/User";
import { v4 as uuidv4 } from "uuid";
import {
  writeBatch,
  collection,
  doc,
  DocumentReference,
  getDoc,
} from "firebase/firestore";
import { db } from "config/firebase";
import {
  Activity,
  reviewStatus,
  SubTaskScore,
} from "@models/Activities/Activity";
import { EventInterface } from "@models/Event/Event";
import { format } from "date-fns";

export const getTeamCaptainIdFromParticipating = (
  participatingWithObj?: { [gameId: string]: ParticipatingWithTeamObj },
  selectedGameId?: string
) => {
  if (
    participatingWithObj &&
    selectedGameId &&
    participatingWithObj[selectedGameId]
  ) {
    return participatingWithObj[selectedGameId].ownerUID;
  }
  return "";
};

export const getTeamIdFromParticipating = (
  participatingWithObj?: { [gameId: string]: ParticipatingWithTeamObj },
  selectedGameId?: string
) => {
  if (
    participatingWithObj &&
    selectedGameId &&
    participatingWithObj[selectedGameId]
  ) {
    return participatingWithObj[selectedGameId].teamId;
  }
  return "";
};

export const saveNewPostWithActivityWithTaskParamsV2 = async (
  eventId: string,
  newPost: Post,
  gameId: string,
  taskId: string,
  taskDay: number,
  taskName?: string,
  taskThumbnail?: CloudinaryMedia | AWSMedia,
  tryAgain?: boolean,
  newPostRef?: DocumentReference,
  source?: "task" | "steps" | "nutrition",
  videoWatchedSeconds?: number,
  reviewStatus?: reviewStatus
) => {
  try {
    const batch = writeBatch(db);

    // console.log("e", eventId);

    const eventRef = doc(db, "sbEvents", eventId);
    const team = await getTeam(eventId);

    const postRef = doc(eventRef, "postsV2", newPost.id);
    batch.set(postRef, {
      ...newPost,
      teamName: team?.name ? team.name : "",
    });

    // console.log("newPost", newPost.creatorId);

    // const userRef = firestore().collection("users").doc(newPost.creatorId); // doc(db, "users", newPost.creatorId);
    // batch.update(userRef, { numCheckins: increment(1) });

    const activity = createNewActivityForTask(
      gameId,
      taskName ? taskName : "Booster Task",
      ``,
      newPost.creatorId,
      source ? source : "task",
      taskId,
      newPost.id,
      postRef,
      newPost.updatedOn,
      eventId,
      taskDay,
      Date.now(),
      taskThumbnail,
      undefined,
      undefined,
      undefined,
      undefined,
      reviewStatus,
      videoWatchedSeconds,
      undefined
    );

    // console.log("activity", activity);
    // console.log("newPost", newPost.id);

    if (activity.id) {
      const userRef = doc(db, "users", activity.authorUID);
      const activityRef = doc(userRef, "activities", activity.id);
      batch.set(activityRef, { ...activity });
    }

    await batch.commit();

    return activity;
  } catch (error) {
    console.log("error", error);
    // Sentry.captureException(error);
  }
};

export const createVideoPost = (
  streamMedia: AWSMedia[],
  creatorId: string,
  gameId: string,
  leaderId: string,
  teamId: string,
  taskId: string,
  attemptedDate: string,
  creatorName?: string,
  creatorImg?: CloudinaryMedia | AWSMedia,
  antStreamId?: string
  // live?: boolean
): Post => {
  let postCreationTime = Date.now();
  if (attemptedDate) {
    const now = postCreationTime;
    const formatted = format(now, "yyyy-MM-dd");
    if (formatted !== attemptedDate) {
      postCreationTime = new Date(attemptedDate).getTime();
    }
  }

  return {
    id: uuidv4(),
    text: "",
    media: streamMedia ? streamMedia : [],
    updatedOn: postCreationTime,
    trueUnix: Date.now(),
    creatorId,
    view: "private",
    gameId,
    communityId: leaderId,
    eventId: teamId,
    ...(creatorName ? { creatorName: creatorName } : {}),
    ...(creatorImg ? { creatorImg: creatorImg } : {}),
    taskId,
    antStreamId: antStreamId ? antStreamId : "",
    // live: live ? live : false,
  };
};

export const createNewActivityForTask = (
  gameId: string,
  activityName: string,
  date: string,
  uid: string,
  source: "task" | "steps" | "nutrition",
  taskId: string,
  postId: string,
  postRef: DocumentReference | undefined,
  createdOn: number,
  eventId: string,
  taskDay: number,
  trueUnix: number,
  placeholderImg?: CloudinaryMedia | AWSMedia,
  calories?: number,
  seconds?: number,
  coordsArray?: any[],
  distanceInMeter?: number,
  reviewSt?: reviewStatus,
  videoWatchedSeconds?: number,
  subTaskScore?: SubTaskScore
): Activity => {
  return {
    calories: calories ? calories : 0,
    fitPoints: 0,
    taskDay,
    date: date,
    activityName: activityName,
    authorUID: uid,
    ...(placeholderImg ? { placeholderImg: placeholderImg } : {}),

    createdOn: createdOn,
    updatedOn: createdOn,
    trueUnix,

    games: [gameId],

    ...(distanceInMeter ? { distanceInMeters: distanceInMeter } : {}),
    ...(seconds ? { timeInSeconds: seconds } : {}),
    ...(coordsArray ? { coords: coordsArray } : {}),

    ...(videoWatchedSeconds ? { videoWatchedSeconds } : {}),
    ...(subTaskScore ? { subTaskScore: subTaskScore } : {}),

    source: source,
    id: uuidv4(),
    postId: postId,

    ...(postRef ? { postRef } : {}),
    taskId: taskId,

    teamId: eventId,
    reviewStatus: reviewSt ? reviewSt : "PENDING",
  };
};

export const getTeam = async (id: string) => {
  const eventRef = doc(db, "sbEvents", id);

  const team = await getDoc(eventRef);
  if (team.data()) {
    return team.data() as EventInterface;
  }

  return undefined;
};

export const saveNewPostWithActivityWithTaskParams = async (
  eventId: string,
  newPost: Post,
  gameId: string,
  taskId: string,
  taskDay: number,
  fp: number,
  taskName?: string,
  taskThumbnail?: CloudinaryMedia | AWSMedia,
  tryAgain?: boolean,
  newPostRef?: DocumentReference
) => {
  try {
    const batch = writeBatch(db);

    // console.log("e", eventId);

    if (!tryAgain) {
      const eventRef = doc(collection(db, "sbEvents"), eventId); // firestore().collection("sbEvents").doc(eventId); //doc(db, "sbEvents", eventId);
      const team = await getTeam(eventId);

      // console.log("t", team);

      const postRef = doc(eventRef, "postsV2", newPost.id); // eventRef.collection("postsV2").doc(newPost.id); // doc(eventRef, "postsV2", newPost.id);
      batch.set(postRef, {
        ...newPost,
        updatedOn: Date.now(),
        teamName: team?.name ? team.name : "",
      });

      // console.log("newPost", newPost.creatorId);

      // const userRef = firestore().collection("users").doc(newPost.creatorId); // doc(db, "users", newPost.creatorId);
      // batch.update(userRef, { numCheckins: increment(1) });

      const activity = createNewActivityForTask(
        gameId,
        taskName ? taskName : "Booster Task",
        ``,
        newPost.creatorId,
        "task",
        taskId,
        newPost.id,
        postRef,
        newPost.updatedOn,
        eventId,
        taskDay,
        fp * 300,
        taskThumbnail
      );

      // console.log("activity", activity);
      // console.log("newPost", newPost.id);

      if (activity.id) {
        const activityRef = doc(
          doc(db, "users", activity.authorUID),
          "activities",
          activity.id
        ); //   firestore()
        //   .collection("users")
        //   .doc(activity.authorUID)
        //   .collection("activities")
        //   .doc(activity.id); // doc(userRef, "activities", activity.id);
        batch.set(activityRef, { ...activity });
      }
    } else if (tryAgain && newPostRef) {
      batch.update(newPostRef, {
        ...newPost,
      });
    }

    await batch.commit();
  } catch (error) {
    console.log("error", error);
    // Sentry.captureException(error);
  }
};
