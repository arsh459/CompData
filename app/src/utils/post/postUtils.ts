// import {
//   //   onSnapshot,
//   orderBy,
//   limit,
//   query,
//   collectionGroup,
//   //   DocumentData,
//   where,
//   DocumentData,
//   //   DocumentReference,
//   startAfter,
//   //   Query,
// } from "firebase/firestore";
// import { db } from "@config/firebase";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { postTypes } from "@models/Post/Post";

export const getInitialPostQuery = (
  eventId: string | undefined,
  postType: postTypes | undefined,
  lastDoc?: FirebaseFirestoreTypes.DocumentData
) => {
  const postRef = firestore().collectionGroup("postsV2");
  //  collectionGroup(db, "postsV2");

  if (eventId && postType && lastDoc) {
    return postRef
      .where("gameId", "==", eventId)
      .where("postType", "==", postType)
      .orderBy("updatedOn", "desc")
      .startAfter(lastDoc)
      .limit(5);
    // return query(
    //   postRef,
    //   where("gameId", "==", eventId),
    //   where("postType", "==", postType),
    //   orderBy("updatedOn", "desc"),
    //   startAfter(lastDoc),
    //   limit(5)
    // );
  } else if (eventId && postType && !lastDoc) {
    return postRef
      .where("gameId", "==", eventId)
      .where("postType", "==", postType)
      .orderBy("updatedOn", "desc")
      .limit(5);
    // return query(
    //   postRef,
    //   where("gameId", "==", eventId),
    //   where("postType", "==", postType),
    //   orderBy("updatedOn", "desc"),
    //   limit(5)
    // );
  } else if (eventId && !postType && lastDoc) {
    return postRef
      .where("gameId", "==", eventId)
      .orderBy("updatedOn", "desc")
      .startAfter(lastDoc)
      .limit(5);

    // return query(
    //   postRef,
    //   where("gameId", "==", eventId),
    //   orderBy("updatedOn", "desc"),
    //   startAfter(lastDoc),
    //   limit(5)
    // );
  } else if (eventId && !postType && !lastDoc) {
    return postRef
      .where("gameId", "==", eventId)
      .orderBy("updatedOn", "desc")
      .limit(5);
    // return query(
    //   postRef,
    //   where("gameId", "==", eventId),
    //   orderBy("updatedOn", "desc"),
    //   limit(5)
    // );
  } else {
    return postRef.orderBy("updatedOn", "desc").limit(5);
    // return query(postRef, orderBy("updatedOn", "desc"), limit(5));
  }
};
