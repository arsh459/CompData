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

export const useLatestPost = (gameId?: string) => {
  const [post, setPost] = useState<Post | undefined>();
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
          limit(1)
        );

        if (q) {
          const unsub = onSnapshot(q, (querySnapshot) => {
            // const remPosts: Post[] = [];
            if (querySnapshot.docs.length) {
              setPost(querySnapshot.docs[0].data() as Post);
            }

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
  }, [gameId]);

  return {
    post,
  };
};
