import { db } from "@config/firebase";
import { Post } from "@models/Posts/Post";
import { onSnapshot, doc, DocumentReference } from "firebase/firestore";
import { useEffect, useState } from "react";

export const usePostWithStringRef = (ref?: string | DocumentReference) => {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    if (ref) {
      let postRef: DocumentReference;
      if (typeof ref === "string") {
        const refParts = ref.split("/");
        //   console.log("eventRef", refParts);
        const eventRef = doc(db, "sbEvents", refParts[1]);
        postRef = doc(eventRef, "postsV2", refParts[3]);
      } else {
        postRef = ref;
      }

      onSnapshot(postRef, (doc) => {
        const remotePost = doc.data() as Post;
        setPost(remotePost);
      });
    }
  }, [ref]);

  return {
    post,
  };
};
