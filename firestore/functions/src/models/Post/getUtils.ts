import * as admin from "firebase-admin";
import { Post } from "./Post";

export const getParentPost = async (eventId: string, postId: string) => {
  const postObj = await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("postsV2")
    .doc(postId)
    .get();

  if (postObj.exists) {
    return postObj.data() as Post;
  }

  return undefined;
};

export const getAllPosts = async (after?: number) => {
  let postObjs = undefined;
  if (after) {
    postObjs = await admin
      .firestore()
      .collectionGroup("postsV2")
      .where("updatedOn", ">=", after)
      .orderBy("updatedOn", "desc")
      .get();
  } else {
    postObjs = await admin
      .firestore()
      .collectionGroup("postsV2")
      .orderBy("updatedOn", "desc")
      // .limit(5)
      .get();
  }

  const remObjects: { post: Post; ref: admin.firestore.DocumentReference }[] =
    [];
  for (const post of postObjs.docs) {
    remObjects.push({ post: post.data() as Post, ref: post.ref });
  }

  return remObjects;
};

export const getPostLevel1 = async (
  eventId: string,
  parentPostId: string,
  postId: string,
) => {
  const postObj = await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("postsV2")
    .doc(parentPostId)
    .collection("posts")
    .doc(postId)
    .get();

  if (postObj.exists) {
    return postObj.data() as Post;
  }

  return undefined;
};

export const getPostLevel2 = async (
  eventId: string,
  parentPostId: string,
  postId: string,
  childPostId: string,
) => {
  console.log("path", eventId, parentPostId, childPostId, postId);
  const postObj = await admin
    .firestore()
    .collection("sbEvents")
    .doc(eventId)
    .collection("postsV2")
    .doc(parentPostId)
    .collection("posts")
    .doc(childPostId)
    .collection("posts")
    .doc(postId)
    .get();

  if (postObj.exists) {
    return postObj.data() as Post;
  }

  return undefined;
};
