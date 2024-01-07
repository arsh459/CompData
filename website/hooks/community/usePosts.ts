import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  doc,
  onSnapshot,
  collection,
  orderBy,
  query,
} from "firebase/firestore";
import { Post } from "@models/Posts/Post";

export const usePosts = (eventId: string) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    try {
      if (eventId) {
        const postRef = collection(
          doc(collection(db, "sbEvents"), eventId),
          "posts"
        );
        const q = query(postRef, orderBy("updatedOn", "desc"));
        const unsub = onSnapshot(q, (querySnapshot) => {
          const remPosts: Post[] = [];
          querySnapshot.forEach((doc) => {
            remPosts.push(doc.data() as Post);
          });

          setPosts(remPosts);
        });

        return () => {
          if (unsub) {
            unsub();
          }
        };
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [eventId]);

  return { posts };
};
