import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  //   doc,
  onSnapshot,
  //   collection,
  where,
  orderBy,
  limit,
  //   where,
  query,
  collectionGroup,
} from "firebase/firestore";
import { Post } from "@models/Posts/Post";
import * as Sentry from "@sentry/browser";

export type postFilters = "all" | "byCoach" | "byMe";

export const useLatestPosts = (gameId?: string, num?: number) => {
  const [posts, setPosts] = useState<Post[]>([]);
  //   const [numPosts, setNumPosts] = useState<number>(5);
  //   const [nextExists, setNextExists] = useState<boolean>(false);
  //   const [postFilter, setPostFilter] = useState<postFilters>("all");
  //   console.log("event", gameId);

  useEffect(() => {
    try {
      if (gameId) {
        const postRef = collectionGroup(db, "postsV2");
        //   doc(collection(db, "sbEvents"), eventId),
        //   "postsV2"
        // );
        const q = query(
          postRef,
          where("gameId", "==", gameId),
          orderBy("updatedOn", "desc"),
          limit(num ? num : 5)
        );

        if (q) {
          const unsub = onSnapshot(q, (querySnapshot) => {
            const remPosts: Post[] = [];
            for (const doc of querySnapshot.docs) {
              remPosts.push(doc.data() as Post);
            }
            setPosts(remPosts);

            // setNextExists(remPosts.length === numPosts);
            // setPosts(remPosts);
          });

          return () => {
            if (unsub) {
              unsub();
            }
          };
        }
      }
    } catch (error) {
      console.log("error", error);
      Sentry.captureException(error);
    }
  }, [gameId, num]);

  return {
    posts,
  };
};
