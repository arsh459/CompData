import { Post } from "@models/Posts/Post";
import { onSnapshot, DocumentReference } from "firebase/firestore";
import { useEffect, useState } from "react";

export const usePostWithRef = (ref?: DocumentReference) => {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    if (ref) {
      onSnapshot(ref, (doc) => {
        const remotePost = doc.data() as Post;
        setPost(remotePost);
      });
    }
  }, [ref]);

  return {
    post,
  };
};
