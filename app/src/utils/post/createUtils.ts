import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Dispatch, SetStateAction } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { EventInterface, sessionTypes } from "@models/Event/Event";
import { NutritionFacts, Task } from "@models/Tasks/Task";
import { format } from "date-fns";
import { POST_TASK_ID } from "@constants/gameStats";
import {
  Activity,
  reviewStatus,
  SubTaskScore,
} from "@models/Activity/Activity";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { Clap, ClapperWithoutClaps, Post } from "@models/Post/Post";
import { LocationObjectCoords } from "expo-location";
import crashlytics from "@react-native-firebase/crashlytics";

export const createNewActivityForSteps = (
  uid: string,
  task: Task,
  gameId: string,
  teamId: string,
  taskDay: number
): Activity => {
  const time = Date.now();
  const id = uuidv4();
  return {
    id: id,
    taskId: task.id,
    calories: 0,
    activityName: task.name ? task.name : "",
    date: format(new Date(time), "yyyy-MM-dd"),

    authorUID: uid,
    updatedOn: time,
    createdOn: time,
    stepsActive: true,
    postId: id,
    games: [gameId],
    source: "task",
    reviewStatus: "PENDING",
    taskDay: taskDay,

    teamId: teamId,
  };
};

export const createNewActivityForPost = (
  time: number,
  uid: string,
  teamId: string,
  postId: string,
  postRef: FirebaseFirestoreTypes.DocumentReference
): Activity => {
  return {
    id: uuidv4(),
    taskId: POST_TASK_ID,
    calories: 0,

    activityName: "Post",

    authorUID: uid,

    createdOn: time,
    updatedOn: time,

    date: format(new Date(time), "yyyy-MM-dd"),

    teamId: teamId,
    postId: postId,
    postRef: postRef,

    source: "task",
    reviewStatus: "PENDING",
  };
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

export const createNewPost = (
  communityId: string | undefined,
  eventId: string | undefined,
  creatorId: string,
  view: "public" | "private",
  gameId: string,
  cohortId?: string,
  creatorName?: string,
  creatorImg?: CloudinaryMedia | AWSMedia,
  byAdmin?: boolean,
  score?: number,
  // sessionId?: string,
  sessionName?: string,
  initalSessionType?: sessionTypes,
  taskId?: string,
  streamId?: string,
  streamMedia?: (CloudinaryMedia | AWSMedia)[]
): Post => {
  return {
    id: uuidv4(),
    text: "",
    media: streamMedia ? streamMedia : [],
    updatedOn: Date.now(),

    // communityId,
    // eventId,
    creatorId,
    // gameId,
    ...(communityId ? { communityId: communityId } : {}),
    ...(gameId ? { gameId: gameId } : {}),
    ...(eventId ? { eventId: eventId } : {}),
    ...(cohortId ? { cohortId: cohortId } : {}),
    ...(initalSessionType ? { sessionType: initalSessionType } : {}),
    ...(creatorName ? { creatorName: creatorName } : {}),
    ...(creatorImg ? { creatorImg: creatorImg } : {}),
    ...(score ? { score: score } : { score: 0 }),
    ...(byAdmin ? { byAdmin: byAdmin } : {}),
    // ...(sessionId ? { sessionId: sessionId } : {}),
    ...(sessionName ? { sessionName: sessionName } : {}),
    view,

    ...(taskId ? { taskId: taskId } : {}),
    ...(streamId ? { streamId: streamId } : {}),
  };
};

export const updateCheckin = async (uid: string) => {
  const userRef = firestore().collection("users").doc(uid); // doc(db, "users", uid);
  await userRef.update({ numCheckins: firestore.FieldValue.increment(1) });
};

export const saveNewPostV2 = async (
  ref: FirebaseFirestoreTypes.DocumentReference,
  newPost: Post
) => {
  const toSaveRef = ref.collection("posts").doc(newPost.id); // doc(ref, "posts", newPost.id);
  await Promise.all([
    ref.update({ numCheckins: firestore.FieldValue.increment(1) }),
    toSaveRef.set({ ...newPost, updatedOn: Date.now() }),
    updateCheckin(newPost.creatorId),
  ]);
};

export const updateCurrentPost = async (
  ref: FirebaseFirestoreTypes.DocumentReference,
  newPost: Post
) => {
  await ref.update({ ...newPost });
};

export const saveNewPostInFeed = async (newPost: Post) => {
  try {
    const batch = firestore().batch(); // writeBatch(db);

    const postRef = firestore().collection("postsV2").doc(newPost.id); //  doc(db, "postsV2", newPost.id);
    batch.set(postRef, { ...newPost, updatedOn: Date.now() });

    const userRef = firestore().collection("users").doc(newPost.creatorId); // doc(db, "users", newPost.creatorId);
    batch.update(userRef, { numCheckins: firestore.FieldValue.increment(1) });

    await batch.commit();
  } catch (error: any) {
    console.log("error", error);
    crashlytics().recordError(error);
  }
};

export const getTeam = async (id: string) => {
  const eventRef = firestore().collection("sbEvents").doc(id); // doc(db, "sbEvents", id);

  const team = await eventRef.get(); // getDoc(eventRef);
  if (team.data()) {
    return team.data() as EventInterface;
  }

  return undefined;
};

const createNewActivityForCheckIn = (
  date: string,
  uid: string,
  taskId: string,
  gameId: string,
  createdOn: number,
  eventId: string,
  taskName: string
): Activity => {
  const id = uuidv4();
  return {
    calories: 300,
    fitPoints: 0,

    date: date,
    authorUID: uid,
    createdOn: createdOn,
    updatedOn: createdOn,

    games: [gameId],
    source: "checkin",
    activityName: taskName,
    id: id,
    postId: id,
    taskId: taskId,
    teamId: eventId,
    reviewStatus: "SAVED",
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
  postRef: FirebaseFirestoreTypes.DocumentReference | undefined,
  createdOn: number,
  eventId: string,
  taskDay: number,
  trueUnix: number,
  placeholderImg?: CloudinaryMedia | AWSMedia,
  calories?: number,
  seconds?: number,
  coordsArray?: LocationObjectCoords[],
  distanceInMeter?: number,
  reviewSt?: reviewStatus,
  videoWatchedSeconds?: number,
  subTaskScore?: SubTaskScore,
  subTaskQty?: SubTaskScore,
  macros?: NutritionFacts,
  totalKcalConsumed?: number
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

    ...(subTaskQty ? { subTaskQty: subTaskQty } : {}),
    ...(macros ? { macros: macros } : {}),
    totalKcalConsumed: totalKcalConsumed ? totalKcalConsumed : 0,
  };
};

export const saveCheckinActivity = async (
  eventId: string,
  gameId: string,
  uid: string,
  task: Task
) => {
  const now = Date.now();
  const dt = format(new Date(now), "yyyy-MM-dd");
  const act = createNewActivityForCheckIn(
    dt,
    uid,
    task.id,
    gameId,
    now,
    eventId,
    task.name ? task.name : "task"
  );

  await firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .doc(act.id ? act.id : act.postId)
    .set(
      // doc(doc(db, "users", uid), "activities", act.id ? act.id : act.postId),
      act
    );
};

export const updatePostMedia = async (
  teamId: string,
  postId: string,
  awsMedia: AWSMedia
) => {
  await firestore()
    .collection("sbEvents")
    .doc(teamId)
    .collection("postsV2")
    .doc(postId)
    .update({
      media: firestore.FieldValue.arrayUnion(awsMedia),
    });
};

export const updateMuxStreamId = async (
  eventId: string,
  postId: string,
  id?: string
) => {
  if (id) {
    firestore()
      .collection("sbEvents")
      .doc(eventId)
      .collection("postsV2")
      .doc(postId)
      .update({
        muxStreamIds: firestore.FieldValue.arrayUnion(id),
      });
  }
};

export const updateLiveFlag = async (eventId: string, postId: string) => {
  firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("postsV2")
    .doc(postId)
    .update({
      live: false,
    });
};

export const updateNutritionActivity = async (
  uid: string,
  activityId: string,
  fps: number,
  subTaskScore: SubTaskScore,
  subTaskQty: SubTaskScore,
  macros?: NutritionFacts,
  totalKcalConsumed?: number
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .collection("activities")
    .doc(activityId)
    .update({
      calories: fps * 300,
      subTaskScore,
      subTaskQty,
      macros,
      totalKcalConsumed,
    });
};

export const saveNutritionActivity = async (
  gameId: string,
  uid: string,
  taskId: string,
  taskName: string,
  fps: number,
  subTaskScore: SubTaskScore,
  subTaskQty: SubTaskScore,
  macros?: NutritionFacts,
  totalKcalConsumed?: number,
  taskThumbnail?: CloudinaryMedia | AWSMedia,
  teamId?: string,
  oldTime?: number
) => {
  const unix = Date.now();
  const date = format(oldTime ? oldTime : unix, "yyyy-MM-dd");

  const activity = createNewActivityForTask(
    gameId,
    taskName,
    date,
    uid,
    "nutrition",
    taskId,
    "",
    undefined,
    // unix,
    oldTime ? oldTime : Date.now(),
    teamId ? teamId : "",
    0,
    oldTime ? oldTime : Date.now(),
    taskThumbnail,
    fps * 300,
    undefined,
    undefined,
    undefined,
    "REVIEWED",
    undefined,
    subTaskScore,
    subTaskQty,
    macros,
    totalKcalConsumed
  );

  await firestore()
    .collection("users")
    .doc(activity.authorUID)
    .collection("activities")
    .doc(activity.id)
    .set({ ...activity });
};

export const saveNewPostWithActivityWithTaskParams = async (
  eventId: string,
  newPost: Post,
  gameId: string,
  taskId: string,
  taskDay: number,
  taskName?: string,
  taskThumbnail?: CloudinaryMedia | AWSMedia,
  tryAgain?: boolean,
  newPostRef?: FirebaseFirestoreTypes.DocumentReference,
  source?: "task" | "steps" | "nutrition",
  videoWatchedSeconds?: number
) => {
  try {
    const batch = firestore().batch(); // writeBatch(db);

    if (!tryAgain) {
      const eventRef = firestore().collection("sbEvents").doc(eventId); //doc(db, "sbEvents", eventId);
      const team = await getTeam(eventId);

      const postRef = eventRef.collection("postsV2").doc(newPost.id); // doc(eventRef, "postsV2", newPost.id);
      batch.set(postRef, {
        ...newPost,
        teamName: team?.name ? team.name : "",
      });

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
        undefined,
        videoWatchedSeconds
      );

      if (activity.id) {
        const activityRef = firestore()
          .collection("users")
          .doc(activity.authorUID)
          .collection("activities")
          .doc(activity.id); // doc(userRef, "activities", activity.id);
        batch.set(activityRef, { ...activity });
      }
    } else if (tryAgain && newPostRef) {
      batch.update(newPostRef, {
        ...newPost,
      });
    }

    await batch.commit();
  } catch (error: any) {
    console.log("error", error);
    crashlytics().recordError(error);
    // Sentry.captureException(error);
  }
};

export const saveNewPostWithActivityWithTaskParamsV3 = async (
  eventId: string,
  newPost: Post,
  gameId: string,
  taskId: string,
  taskDay: number,
  taskName?: string,
  taskThumbnail?: CloudinaryMedia | AWSMedia,
  tryAgain?: boolean,
  newPostRef?: FirebaseFirestoreTypes.DocumentReference,
  source?: "task" | "steps" | "nutrition",
  videoWatchedSeconds?: number,
  reviewStatus?: reviewStatus
) => {
  try {
    // const batch = firestore().batch(); // writeBatch(db);

    // console.log("e", eventId);

    // const eventRef = firestore().collection("sbEvents").doc(eventId); //doc(db, "sbEvents", eventId);
    // const team = await getTeam(eventId);

    // const postRef = eventRef.collection("postsV2").doc(newPost.id); // doc(eventRef, "postsV2", newPost.id);
    // batch.set(postRef, {
    // ...newPost,
    // teamName: team?.name ? team.name : "",
    // });

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
      undefined,
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

    // console.log("activity uid", activity.authorUID);
    // console.log("activity id", activity.id);

    if (activity.id) {
      // console.log("saving activity", activity.authorUID, activity.id);
      await firestore()
        .collection("users")
        .doc(activity.authorUID)
        .collection("activities")
        .doc(activity.id)
        .set({ ...activity });
    }

    // await batch.commit();

    return activity;
  } catch (error: any) {
    console.log("error", error);
    crashlytics().recordError(error);
    // Sentry.captureException(error);
  }
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
  newPostRef?: FirebaseFirestoreTypes.DocumentReference,
  source?: "task" | "steps" | "nutrition",
  videoWatchedSeconds?: number,
  reviewStatus?: reviewStatus
) => {
  try {
    const batch = firestore().batch(); // writeBatch(db);

    const eventRef = firestore().collection("sbEvents").doc(eventId); //doc(db, "sbEvents", eventId);
    const team = await getTeam(eventId);

    const postRef = eventRef.collection("postsV2").doc(newPost.id); // doc(eventRef, "postsV2", newPost.id);
    batch.set(postRef, {
      ...newPost,
      teamName: team?.name ? team.name : "",
    });

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

    if (activity.id) {
      const activityRef = firestore()
        .collection("users")
        .doc(activity.authorUID)
        .collection("activities")
        .doc(activity.id); // doc(userRef, "activities", activity.id);
      batch.set(activityRef, { ...activity });
    }

    await batch.commit();

    return activity;
  } catch (error: any) {
    console.log("error", error);
    crashlytics().recordError(error);
    // Sentry.captureException(error);
  }
};

export const saveNewPostWithActivity = async (
  eventId: string,
  newPost: Post,
  task: Task,
  gameId: string,
  taskDay: number,
  tryAgain?: boolean,
  newPostRef?: FirebaseFirestoreTypes.DocumentReference
) => {
  try {
    const batch = firestore().batch(); // writeBatch(db);

    if (!tryAgain) {
      const eventRef = firestore().collection("sbEvents").doc(eventId); //doc(db, "sbEvents", eventId);
      const team = await getTeam(eventId);

      const postRef = eventRef.collection("postsV2").doc(newPost.id); // doc(eventRef, "postsV2", newPost.id);
      batch.set(postRef, {
        ...newPost,
        updatedOn: Date.now(),
        teamName: team?.name ? team.name : "",
      });

      // const userRef = firestore().collection("users").doc(newPost.creatorId); // doc(db, "users", newPost.creatorId);
      // batch.update(userRef, { numCheckins: increment(1) });

      const activity = createNewActivityForTask(
        gameId,
        task.name ? task.name : "Booster Task",
        ``,
        newPost.creatorId,
        "task",
        task.id,
        newPost.id,
        postRef,
        newPost.updatedOn,
        eventId,
        taskDay,
        Date.now(),
        task?.thumbnails
      );

      if (activity.id) {
        const activityRef = firestore()
          .collection("users")
          .doc(activity.authorUID)
          .collection("activities")
          .doc(activity.id); // doc(userRef, "activities", activity.id);
        batch.set(activityRef, { ...activity });
      }
    } else if (tryAgain && newPostRef) {
      batch.update(newPostRef, {
        ...newPost,
      });
    }

    await batch.commit();
  } catch (error: any) {
    console.log("error", error);
    crashlytics().recordError(error);
    // Sentry.captureException(error);
  }
};

export const saveNewPost = async (
  eventId: string,
  newPost: Post,
  taskId?: string,
  streamId?: string,
  editing?: boolean,
  setPosts?: Dispatch<
    SetStateAction<
      { post: Post; ref: FirebaseFirestoreTypes.DocumentReference }[]
    >
  >
  // activityId: string,
  // superParentPostId?: string,
  // parentPostId?: string,
  // currentPostId?: string
) => {
  try {
    const batch = firestore().batch(); // writeBatch(db);

    const eventRef = firestore().collection("sbEvents").doc(eventId); // doc(db, "sbEvents", eventId);
    const postRef = eventRef.collection("postsV2").doc(newPost.id); // doc(eventRef, "postsV2", newPost.id);

    if (editing && setPosts) {
      await postRef.update({ ...newPost }); // updateDoc(postRef, { ...newPost });
      setPosts((prev) => {
        const newPosts: {
          post: Post;
          ref: FirebaseFirestoreTypes.DocumentReference;
        }[] = [];
        for (const postObj of prev) {
          if (postObj.post.id === newPost.id) {
            newPosts.push({ ...postObj, post: newPost });
          } else {
            newPosts.push(postObj);
          }
        }

        return newPosts;
      });
    } else {
      const team = await getTeam(eventId);

      const postTime = Date.now();
      batch.set(postRef, {
        ...newPost,
        updatedOn: postTime,
        teamName: team?.name ? team.name : "",
      });

      const userRef = firestore().collection("users").doc(newPost.creatorId); // doc(db, "users", newPost.creatorId);
      batch.update(userRef, { numCheckins: firestore.FieldValue.increment(1) });

      const act = createNewActivityForPost(
        postTime,
        newPost.creatorId ? newPost.creatorId : "",
        team?.id ? team?.id : "",
        newPost.id,
        postRef
      );
      if (act.id) {
        const actRef = userRef.collection("activities").doc(act.id); // doc(userRef, "activities", act.id);
        batch.set(actRef, act);
      }

      await batch.commit();
    }
  } catch (error: any) {
    console.log("error", error);
    crashlytics().recordError(error);
  }
};

const createNewClapper = (
  clapperId: string,
  isClapperCreator: boolean,
  clapReceiverId: string,
  clapReceiverName?: string,
  clapReceiverImg?: CloudinaryMedia | AWSMedia,
  clapperName?: string,
  clapperImage?: CloudinaryMedia | AWSMedia
): ClapperWithoutClaps => {
  return {
    clapperId,
    isClapperCreator,
    // numClaps,
    clapReceiverId,
    id: `clapper-${clapperId}`,
    ...(clapReceiverName ? { clapReceiverName: clapReceiverName } : {}),
    ...(clapReceiverImg ? { clapReceiverImg: clapReceiverImg } : {}),
    ...(clapperName ? { clapperName: clapperName } : {}),
    ...(clapperImage ? { clapperImage: clapperImage } : {}),
    lastClapped: Date.now(),
  };
};

const createNewClap = (
  uid: string
  // userName?: string,
  // userImg?: CloudinaryMedia
): Clap => {
  return {
    uid,
    // userName,
    // userImg,
    id: uuidv4(),
    createdOn: Date.now(),
  };
};

export const saveNewClap = async (
  postRef: FirebaseFirestoreTypes.DocumentReference,
  // eventId: string,
  uid: string,
  communityId: string | undefined,
  clapReceiverId: string,
  // sessionId?: string,
  userName?: string,
  userImg?: CloudinaryMedia | AWSMedia,
  // superParentPostId?: string,
  // parentPostId?: string,
  // postId?: string,
  clapReceiverName?: string,
  clapReceiverImg?: CloudinaryMedia | AWSMedia
) => {
  const clapper = createNewClapper(
    uid,
    communityId === uid,
    clapReceiverId,
    clapReceiverName,
    clapReceiverImg,
    userName,
    userImg
  );
  const newClap = createNewClap(uid);

  await saveClapV3(postRef, clapper, newClap);
};

const updateClapperToUser = (
  batch: FirebaseFirestoreTypes.WriteBatch,
  clapper: ClapperWithoutClaps,
  clap: Clap
) => {
  const userRef = firestore().collection("users").doc(clapper.clapReceiverId); // doc(db, "users", clapper.clapReceiverId);
  const clapperRef = userRef
    .collection("clappers")
    .doc(`clapper-${clapper.clapperId}`); // doc(userRef, "clappers", `clapper-${clapper.clapperId}`);

  batch.set(
    clapperRef,
    { ...clapper, numClaps: firestore.FieldValue.increment(1) },
    { merge: true }
  );

  const clapRef = clapperRef.collection("claps").doc(clap.id); // doc(collection(clapperRef, "claps"), clap.id);
  batch.set(clapRef, clap);

  return batch;
};

export const saveClapV3 = async (
  ref: FirebaseFirestoreTypes.DocumentReference,
  clapper: ClapperWithoutClaps,
  newClap: Clap
) => {
  const batch = firestore().batch(); // writeBatch(db);

  const clapperRef = ref
    .collection("clappers")
    .doc(`clapper-${clapper.clapperId}`); // doc(ref, "clappers", `clapper-${clapper.clapperId}`);
  batch.set(
    clapperRef,
    { ...clapper, numClaps: firestore.FieldValue.increment(1) },
    { merge: true }
  );

  // clap
  const clapRef = clapperRef.collection("claps").doc(newClap.id); // doc(collection(clapperRef, "claps"), newClap.id);
  batch.set(clapRef, newClap);

  // count inc
  batch.update(ref, { numClaps: firestore.FieldValue.increment(1) });

  // user update
  const batchWithUser = updateClapperToUser(batch, clapper, newClap);

  await batchWithUser.commit();
};

export const saveClapV2 = async (
  clapper: ClapperWithoutClaps,
  clap: Clap,
  eventId: string,
  superParentPostId?: string,
  parentPostId?: string,
  postId?: string
) => {
  const batch = firestore().batch(); // writeBatch(db);

  const eventRef = firestore().collection("sbEvents").doc(eventId); // doc(db, "sbEvents", eventId);

  if (postId && parentPostId && parentPostId === superParentPostId) {
    // clapper
    const postRef = eventRef.collection("postsV2").doc(parentPostId); // doc(eventRef, "postsV2", parentPostId);
    const childPostRef = postRef.collection("posts").doc(postId); //  doc(postRef, "posts", postId);
    const clapperRef = childPostRef
      .collection("clappers")
      .doc(`clapper-${clapper.clapperId}`); // doc(
    // childPostRef,
    // "clappers",
    // `clapper-${clapper.clapperId}`
    // );
    batch.set(
      clapperRef,
      { ...clapper, numClaps: firestore.FieldValue.increment(1) },
      { merge: true }
    );

    // clap
    const clapRef = clapperRef.collection("claps").doc(clap.id); //  doc(collection(clapperRef, "claps"), clap.id);
    batch.set(clapRef, clap);

    // count inc
    batch.update(childPostRef, { numClaps: firestore.FieldValue.increment(1) });
  } else if (superParentPostId && parentPostId && postId) {
    const superRef = eventRef.collection("postsV2").doc(superParentPostId); // doc(eventRef, "postsV2", superParentPostId);
    const postRef = superRef.collection("posts").doc(parentPostId); // doc(superRef, "posts", parentPostId);
    const childPostRef = postRef.collection("posts").doc(postId); // doc(postRef, "posts", postId);
    const clapperRef = childPostRef
      .collection("clappers")
      .doc(`clapper-${clapper.clapperId}`); // doc(
    // childPostRef,
    // "clappers",
    // `clapper-${clapper.clapperId}`
    // );
    batch.set(
      clapperRef,
      { ...clapper, numClaps: firestore.FieldValue.increment(1) },
      { merge: true }
    );

    // clap
    const clapRef = clapperRef.collection("claps").doc(clap.id); // doc(collection(clapperRef, "claps"), clap.id);
    batch.set(clapRef, clap);

    // count inc
    batch.update(childPostRef, { numClaps: firestore.FieldValue.increment(1) });
  } else if (!parentPostId && postId) {
    // clapper
    const postRef = eventRef.collection("postsV2").doc(postId); // doc(eventRef, "postsV2", postId);
    const clapperRef = postRef
      .collection("clappers")
      .doc(`clapper-${clapper.clapperId}`); // doc(postRef, "clappers", `clapper-${clapper.clapperId}`);
    batch.set(
      clapperRef,
      { ...clapper, numClaps: firestore.FieldValue.increment(1) },
      { merge: true }
    );

    // clap
    const clapRef = clapperRef.collection("claps").doc(clap.id); // doc(collection(clapperRef, "claps"), clap.id);
    batch.set(clapRef, clap);

    // count inc
    batch.update(postRef, { numClaps: firestore.FieldValue.increment(1) });
  }

  const batchWithUser = updateClapperToUser(batch, clapper, clap);

  await batchWithUser.commit();
};
