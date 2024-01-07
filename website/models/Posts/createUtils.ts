import { Clap, ClapperWithoutClaps, Post } from "./Post";
import { v4 as uuidv4 } from "uuid";
import * as Sentry from "@sentry/browser";
import { Dispatch, SetStateAction } from "react";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import {
  writeBatch,
  collection,
  doc,
  setDoc,
  getDoc,
  increment,
  WriteBatch,
  updateDoc,
  DocumentReference,
} from "@firebase/firestore";
import { db } from "@config/firebase";
import { EventInterface, sessionTypes } from "@models/Event/Event";
import { Activity } from "@models/Activities/Activity";
import { Task } from "@models/Tasks/Task";
import { format } from "date-fns";
import { POST_TASK_ID } from "@constants/gameStats";
import { SourceType } from "@hooks/activities/useUserPreviousActs";

// import { getActivityForPost } from "@models/Activities/createUtils";
// import { MediaInterface } from "@models/Media/media";

export const createNewActivityForPost = (
  time: number,
  uid: string,
  teamId: string,
  postId: string,
  postRef: DocumentReference
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
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, { numCheckins: increment(1) });
};

export const saveNewPostV2 = async (ref: DocumentReference, newPost: Post) => {
  const toSaveRef = doc(ref, "posts", newPost.id);
  await Promise.all([
    updateDoc(ref, { numCheckins: increment(1) }),
    setDoc(toSaveRef, { ...newPost, updatedOn: Date.now() }),
    updateCheckin(newPost.creatorId),
  ]);
};

export const updateCurrentPost = async (
  ref: DocumentReference,
  newPost: Post
) => {
  // console.log("hereee");
  await updateDoc(ref, { ...newPost });
};

export const saveNewPostInFeed = async (newPost: Post) => {
  try {
    const batch = writeBatch(db);

    const postRef = doc(db, "postsV2", newPost.id);
    batch.set(postRef, { ...newPost, updatedOn: Date.now() });

    const userRef = doc(db, "users", newPost.creatorId);
    batch.update(userRef, { numCheckins: increment(1) });

    await batch.commit();
  } catch (error) {
    console.log("error", error);
  }
};

const getTeam = async (id: string) => {
  const eventRef = doc(db, "sbEvents", id);

  const team = await getDoc(eventRef);
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

const createNewActivityForTask = (
  gameId: string,
  activityName: string,
  date: string,
  uid: string,
  source: "task",
  taskId: string,
  postId: string,
  postRef: DocumentReference,
  createdOn: number,
  eventId: string,
  placeholderImg?: CloudinaryMedia | AWSMedia
): Activity => {
  return {
    calories: 0,
    fitPoints: 0,

    date: date,
    activityName: activityName,
    authorUID: uid,
    ...(placeholderImg ? { placeholderImg: placeholderImg } : {}),

    createdOn: createdOn,
    updatedOn: createdOn,

    games: [gameId],

    source: source,
    id: uuidv4(),
    postId: postId,

    postRef: postRef,
    taskId: taskId,

    teamId: eventId,
    reviewStatus: "PENDING",
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

  await setDoc(
    doc(doc(db, "users", uid), "activities", act.id ? act.id : act.postId),
    act
  );
};

export const saveNewPostWithActivity = async (
  eventId: string,
  newPost: Post,
  task: Task,
  gameId: string,
  tryAgain?: boolean,
  newPostRef?: DocumentReference
) => {
  try {
    const batch = writeBatch(db);

    // console.log("e", eventId);

    if (!tryAgain) {
      const eventRef = doc(db, "sbEvents", eventId);
      const team = await getTeam(eventId);

      console.log("team", team);
      console.log("n", newPost);

      const postRef = doc(eventRef, "postsV2", newPost.id);
      batch.set(postRef, {
        ...newPost,
        updatedOn: Date.now(),
        teamName: team?.name ? team.name : "",
      });

      // console.log("newPost", newPost.creatorId);

      const userRef = doc(db, "users", newPost.creatorId);
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
        task?.thumbnails
      );

      console.log("activity", activity);

      if (activity.id) {
        const activityRef = doc(userRef, "activities", activity.id);
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
    Sentry.captureException(error);
  }
};

export const saveNewPost = async (
  eventId: string,
  newPost: Post,
  taskId?: string,
  streamId?: string,
  editing?: boolean,
  setPosts?: Dispatch<SetStateAction<{ post: Post; ref: DocumentReference }[]>>
  // activityId: string,
  // superParentPostId?: string,
  // parentPostId?: string,
  // currentPostId?: string
) => {
  try {
    // console.log("eventId", eventId);
    // console.log("newPost.id", newPost.id);
    // console.log("newPost.creatorId", newPost.creatorId);
    // console.log("taskId", taskId);
    // console.log("streamId", streamId);

    // console.log("editing", editing);

    const batch = writeBatch(db);

    const eventRef = doc(db, "sbEvents", eventId);
    const postRef = doc(eventRef, "postsV2", newPost.id);

    if (editing && setPosts) {
      // console.log("newPost", newPost, postRef.path);
      await updateDoc(postRef, { ...newPost });
      setPosts((prev) => {
        const newPosts: { post: Post; ref: DocumentReference }[] = [];
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

      const userRef = doc(db, "users", newPost.creatorId);
      batch.update(userRef, { numCheckins: increment(1) });

      const act = createNewActivityForPost(
        postTime,
        newPost.creatorId ? newPost.creatorId : "",
        team?.id ? team?.id : "",
        newPost.id,
        postRef
      );
      if (act.id) {
        const actRef = doc(userRef, "activities", act.id);
        batch.set(actRef, act);
      }

      await batch.commit();
    }
  } catch (error) {
    console.log("error", error);
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

// const updateSessionKPIObj = async (eventId: string, sessionId: string) => {
//   const eventRef = doc(db, "sbEvents", eventId);
//   const postRef = doc(eventRef, "eventKPIs", "eventKPIs");
//   setDoc(
//     postRef,
//     {
//       sessionKPIs: {
//         [`${sessionId}`]: {
//           numClaps: increment(1),
//         },
//       },
//     },
//     { merge: true }
//   );
// };

export const saveNewClap = async (
  postRef: DocumentReference,
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

  // console.log("clapper", clapper, newClap);

  await saveClapV3(postRef, clapper, newClap);

  // await saveClapV2(
  //   clapper,
  //   newClap,
  //   eventId,
  //   superParentPostId,
  //   parentPostId,
  //   postId
  // );
};

const updateClapperToUser = (
  batch: WriteBatch,
  clapper: ClapperWithoutClaps,
  clap: Clap
) => {
  const userRef = doc(db, "users", clapper.clapReceiverId);
  const clapperRef = doc(userRef, "clappers", `clapper-${clapper.clapperId}`);

  batch.set(
    clapperRef,
    { ...clapper, numClaps: increment(1) },
    { merge: true }
  );

  const clapRef = doc(collection(clapperRef, "claps"), clap.id);
  batch.set(clapRef, clap);

  return batch;
};

export const saveClapV3 = async (
  ref: DocumentReference,
  clapper: ClapperWithoutClaps,
  newClap: Clap
) => {
  const batch = writeBatch(db);

  const clapperRef = doc(ref, "clappers", `clapper-${clapper.clapperId}`);
  batch.set(
    clapperRef,
    { ...clapper, numClaps: increment(1) },
    { merge: true }
  );

  // clap
  const clapRef = doc(collection(clapperRef, "claps"), newClap.id);
  batch.set(clapRef, newClap);

  // count inc
  batch.update(ref, { numClaps: increment(1) });

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
  const batch = writeBatch(db);

  const eventRef = doc(db, "sbEvents", eventId);

  if (postId && parentPostId && parentPostId === superParentPostId) {
    // clapper
    const postRef = doc(eventRef, "postsV2", parentPostId);
    const childPostRef = doc(postRef, "posts", postId);
    const clapperRef = doc(
      childPostRef,
      "clappers",
      `clapper-${clapper.clapperId}`
    );
    batch.set(
      clapperRef,
      { ...clapper, numClaps: increment(1) },
      { merge: true }
    );

    // clap
    const clapRef = doc(collection(clapperRef, "claps"), clap.id);
    batch.set(clapRef, clap);

    // count inc
    batch.update(childPostRef, { numClaps: increment(1) });
  } else if (superParentPostId && parentPostId && postId) {
    const superRef = doc(eventRef, "postsV2", superParentPostId);
    const postRef = doc(superRef, "posts", parentPostId);
    const childPostRef = doc(postRef, "posts", postId);
    const clapperRef = doc(
      childPostRef,
      "clappers",
      `clapper-${clapper.clapperId}`
    );
    batch.set(
      clapperRef,
      { ...clapper, numClaps: increment(1) },
      { merge: true }
    );

    // clap
    const clapRef = doc(collection(clapperRef, "claps"), clap.id);
    batch.set(clapRef, clap);

    // count inc
    batch.update(childPostRef, { numClaps: increment(1) });
  } else if (!parentPostId && postId) {
    // clapper
    const postRef = doc(eventRef, "postsV2", postId);
    const clapperRef = doc(postRef, "clappers", `clapper-${clapper.clapperId}`);
    batch.set(
      clapperRef,
      { ...clapper, numClaps: increment(1) },
      { merge: true }
    );

    // clap
    const clapRef = doc(collection(clapperRef, "claps"), clap.id);
    batch.set(clapRef, clap);

    // count inc
    batch.update(postRef, { numClaps: increment(1) });
  }

  // else if (sessionId) {
  //   // clapper
  //   const sessionRef = doc(eventRef, "program", sessionId);
  //   const clapperRef = doc(
  //     sessionRef,
  //     "clappers",
  //     `clapper-${clapper.clapperId}`
  //   );
  //   batch.set(
  //     clapperRef,
  //     { ...clapper, numClaps: increment(1) },
  //     { merge: true }
  //   );

  //   // clap
  //   const clapRef = doc(collection(clapperRef, "claps"), clap.id);
  //   batch.set(clapRef, clap);

  //   // batch.update(sessionRef, { numClaps: increment(1) });

  //   // count inc
  //   const postRef = doc(eventRef, "eventKPIs", "eventKPIs");
  //   batch.set(
  //     postRef,
  //     {
  //       sessionKPIs: {
  //         [`${sessionId}`]: {
  //           numClaps: increment(1),
  //         },
  //       },
  //     },
  //     { merge: true }
  //   );
  // }

  const batchWithUser = updateClapperToUser(batch, clapper, clap);

  await batchWithUser.commit();
};
export const createNewActivityForChallenge = (
  activityName: string,
  uid: string,
  source: SourceType,
  taskId: string,
  postId: string,
  fitpoints: number
): Activity => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd");
  const currentUnix = currentDate.getTime();
  return {
    calories: fitpoints ? fitpoints * 300 : 0,
    fitPoints: fitpoints,

    date: formattedDate,
    activityName: activityName,
    authorUID: uid,

    createdOn: currentUnix,
    updatedOn: currentUnix,

    source: source,
    id: uuidv4(),
    postId: postId,

    taskId: taskId,

    reviewStatus: "PENDING",
  };
};
