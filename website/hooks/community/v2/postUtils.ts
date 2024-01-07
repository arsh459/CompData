import {
  //   onSnapshot,
  orderBy,
  limit,
  query,
  collectionGroup,
  //   DocumentData,
  where,
  DocumentData,
  //   DocumentReference,
  startAfter,
  //   Query,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { postTypes } from "./useCommunityParamsV3";

export const getInitialPostQuery = (
  eventId: string | undefined,
  postType: postTypes | undefined,
  lastDoc?: DocumentData
) => {
  const postRef = collectionGroup(db, "postsV2");

  if (eventId && postType && lastDoc) {
    return query(
      postRef,
      where("gameId", "==", eventId),
      where("postType", "==", postType),
      orderBy("updatedOn", "desc"),
      startAfter(lastDoc),
      limit(5)
    );
  } else if (eventId && postType && !lastDoc) {
    return query(
      postRef,
      where("gameId", "==", eventId),
      where("postType", "==", postType),
      orderBy("updatedOn", "desc"),
      limit(5)
    );
  } else if (eventId && !postType && lastDoc) {
    return query(
      postRef,
      where("gameId", "==", eventId),
      orderBy("updatedOn", "desc"),
      startAfter(lastDoc),
      limit(5)
    );
  } else if (eventId && !postType && !lastDoc) {
    return query(
      postRef,
      where("gameId", "==", eventId),
      orderBy("updatedOn", "desc"),
      limit(5)
    );
  } else {
    return query(postRef, orderBy("updatedOn", "desc"), limit(5));
  }
};
