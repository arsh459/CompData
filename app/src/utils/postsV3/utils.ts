import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { Clap, ClapperWithoutClaps, Post } from "@models/Post/Post";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { createNewClap, createNewClapper } from "./createUtills";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";

export const onGetPost = async (postId: string, gameId?: string) => {
  const post = await firestore()
    .collection("sbEvents")
    .doc(gameId || TEAM_ALPHABET_GAME)
    .collection("postsV3")
    .doc(postId)
    .get();

  if (post.data()) {
    return post.data() as Post;
  }
  return undefined;
};

export const onSavePost = async (post: Post, gameId?: string) => {
  try {
    await firestore()
      .collection("sbEvents")
      .doc(gameId || TEAM_ALPHABET_GAME)
      .collection("postsV3")
      .doc(post.id)
      .set(post, { merge: true });
  } catch (error) {
    console.log("error in post save", error);
  }
};

export const onDeletePost = async (postId: string, gameId?: string) => {
  try {
    await firestore()
      .collection("sbEvents")
      .doc(gameId || TEAM_ALPHABET_GAME)
      .collection("postsV3")
      .doc(postId)
      .delete();
  } catch (error) {
    console.log("error in post delete", error);
  }
};

export const onPinPost = async (
  postId: string,
  val: boolean,
  gameId?: string
) => {
  try {
    await firestore()
      .collection("sbEvents")
      .doc(gameId || TEAM_ALPHABET_GAME)
      .collection("postsV3")
      .doc(postId)
      .update({ pinned: val });
  } catch (error) {
    console.log("error in update pinned", error);
  }
};

export const savePostReply = async (
  ref: FirebaseFirestoreTypes.DocumentReference,
  newPost: Post
) => {
  const batch = firestore().batch();

  const toSaveRef = ref.collection("posts").doc(newPost.id);
  const userRef = firestore().collection("users").doc(newPost.creatorId);

  batch.update(userRef, { numCheckins: firestore.FieldValue.increment(1) });

  batch.update(ref, { numCheckins: firestore.FieldValue.increment(1) });
  batch.set(toSaveRef, { ...newPost, updatedOn: Date.now() }, { merge: true });
  await batch.commit();
};

export const removeClapper = async (
  ref: FirebaseFirestoreTypes.DocumentReference,
  clapperId: string
) => {
  const batch = firestore().batch();
  // console.log("clapperId", clapperId, ref.path);
  batch.update(ref.collection("clappers").doc(`clapper-${clapperId}`), {
    numClaps: 0,
    lastClapped: firestore.FieldValue.delete(),
  });

  batch.update(ref, { numClaps: firestore.FieldValue.increment(-1) });
  await batch.commit();
};

export const saveClap = async (
  ref: FirebaseFirestoreTypes.DocumentReference,
  clapper: ClapperWithoutClaps,
  newClap: Clap
) => {
  const batch = firestore().batch();

  const clapperRef = ref
    .collection("clappers")
    .doc(`clapper-${clapper.clapperId}`);

  batch.set(
    clapperRef,
    { ...clapper, numClaps: firestore.FieldValue.increment(1) },
    { merge: true }
  );

  // const clapRef = clapperRef.collection("claps").doc(newClap.id);
  // batch.set(clapRef, newClap);

  batch.update(ref, { numClaps: firestore.FieldValue.increment(1) });

  await batch.commit();
};

export const saveNewClap = async (
  postRef: FirebaseFirestoreTypes.DocumentReference,
  clapperId: string,
  clapReceiverId: string,
  clapperName?: string,
  clapperImage?: CloudinaryMedia | AWSMedia,
  clapReceiverName?: string,
  clapReceiverImg?: CloudinaryMedia | AWSMedia
) => {
  const clapper = createNewClapper(
    clapperId,
    clapReceiverId,
    clapperName,
    clapperImage,
    clapReceiverName,
    clapReceiverImg
  );
  const newClap = createNewClap(clapperId);
  // console.log("newClap", newClap);

  await saveClap(postRef, clapper, newClap);
};
