// import { Activity } from "@models/Activities/Activity";
import { Activity } from "@models/Activities/Activity";
import { sessionTypes } from "@models/Event/Event";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import {
  //Clap, //ClapperWithoutClaps,
  Post,
} from "@models/Posts/Post";
import { writeBatch } from "firebase/firestore";
import { db } from "config/firebase";
import * as Sentry from "@sentry/browser";
// import { writeBatch } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const createNewPostv2 = (
  eventId: string,
  creatorId: string,
  view: "public" | "private",
  createdOn: number,
  communityId?: string,
  cohortId?: string,
  creatorName?: string,
  creatorImg?: CloudinaryMedia,
  byAdmin?: boolean,
  score?: number,
  // sessionId?: string,
  sessionName?: string,
  initalSessionType?: sessionTypes,
  taskId?: string,
  streamId?: string,
  streamMedia?: CloudinaryMedia[]
): Post => {
  return {
    id: uuidv4(),
    text: "",
    media: streamMedia ? streamMedia : [],
    createdOn,
    updatedOn: Date.now(),

    eventId,
    creatorId,
    ...(communityId ? { communityId: communityId } : {}),
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

// const createNewClapperV2 = (
//   clapperId: string,
//   isClapperCreator: boolean,
//   clapReceiverId: string,
//   clapReceiverName?: string,
//   clapReceiverImg?: CloudinaryMedia,
//   clapperName?: string,
//   clapperImage?: CloudinaryMedia
// ): ClapperWithoutClaps => {
//   return {
//     clapperId,
//     isClapperCreator,
//     // numClaps,
//     clapReceiverId,
//     id: `clapper-${clapperId}`,
//     ...(clapReceiverName ? { clapReceiverName: clapReceiverName } : {}),
//     ...(clapReceiverImg ? { clapReceiverImg: clapReceiverImg } : {}),
//     ...(clapperName ? { clapperName: clapperName } : {}),
//     ...(clapperImage ? { clapperImage: clapperImage } : {}),
//     lastClapped: Date.now(),
//   };
// };

// const createNewClapV2 = (
//   uid: string
//   // userName?: string,
//   // userImg?: CloudinaryMedia
// ): Clap => {
//   return {
//     uid,
//     // userName,
//     // userImg,
//     id: uuidv4(),
//     createdOn: Date.now(),
//   };
// };

export const saveNewPostV2 = async (
  newPost: Post,
  avtivity: Activity,
  uid: string,
  clapperId: string,
  isClapperCreator: boolean
) => {
  //   const clapReceiverId = uid;
  try {
    const batch = writeBatch(db);

    // const postRef = doc(db, "postsV2", newPost.id);
    // batch.set(postRef, newPost);

    // const activityRef = doc(
    //     doc(db, "users", uid),
    //     "activities",
    //     avtivity.postId
    // );
    // batch.update(activityRef, { ...avtivity, postRef });

    // const clapper = createNewClapperV2(
    //     clapperId,
    //     isClapperCreator,
    //     clapReceiverId
    // );
    // const newClap = createNewClapV2(uid);
    // const clapperRef = doc(
    //     postRef,
    //     "clappers",
    //     `clapper-${clapper.clapperId}`
    // );
    // batch.set(
    //     clapperRef,
    //     { ...clapper, numClaps: increment(1) },
    //     { merge: true }
    // );

    // const clapRef = doc(collection(clapperRef, "claps"), newClap.id);
    // batch.set(clapRef, newClap);

    // batch.update(postRef, { numClaps: increment(1) });

    // const userRef = doc(db, "users", clapper.clapReceiverId);
    // const userClapperRef = doc(
    //     userRef,
    //     "clappers",
    //     `clapper-${clapper.clapperId}`
    // );
    // batch.set(
    //     userClapperRef,
    //     { ...clapper, numClaps: increment(1) },
    //     { merge: true }
    // );
    // batch.set(userClapperRef, newClap);

    await batch.commit();
  } catch (error) {
    Sentry.captureException(error);
    console.log("error", error);
  }
};
