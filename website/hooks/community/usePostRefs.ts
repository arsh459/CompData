import { doc, DocumentReference } from "@firebase/firestore";
import { db } from "@config/firebase";
import { useEffect, useState } from "react";

export const usePostRefs = (
  eventId: string,
  postId?: string,
  parentPostId?: string,
  superParentPostId?: string
) => {
  const [currentPostRef, setCurrentPostRef] = useState<DocumentReference>();

  // console.log("event", eventId, postId, parentPostId, superParentPostId);

  useEffect(() => {
    const eventRef = doc(db, "sbEvents", eventId);
    if (
      superParentPostId &&
      parentPostId &&
      postId &&
      superParentPostId !== parentPostId
    ) {
      const superParentRef = doc(eventRef, "postsV2", superParentPostId);
      const parentRef = doc(superParentRef, "posts", parentPostId);
      const currentRef = doc(parentRef, "posts", postId);
      setCurrentPostRef(currentRef);
    } else if (!superParentPostId && parentPostId && postId) {
      const parentRef = doc(eventRef, "postsV2", parentPostId);
      const currentRef = doc(parentRef, "posts", postId);
      setCurrentPostRef(currentRef);
    } else if (!superParentPostId && !parentPostId && postId) {
      const currentRef = doc(eventRef, "postsV2", postId);
      setCurrentPostRef(currentRef);
    }
  }, [eventId, postId, parentPostId, superParentPostId]);

  return {
    currentPostRef,
  };
};
