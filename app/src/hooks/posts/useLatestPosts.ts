import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";
// import { db } from "@config/firebase";
// import {
//   onSnapshot,
//   where,
//   orderBy,
//   limit,
//   query,
//   collectionGroup,
// } from "firebase/firestore";
import { Post } from "@models/Post/Post";
// import * as Sentry from "@sentry/browser";

export type postFilters = "all" | "byCoach" | "byMe";

export const useLatestPosts = (gameId?: string, num?: number) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    try {
      if (gameId) {
        const q = firestore()
          .collectionGroup("postsV2")
          .where("gameId", "==", gameId)
          .orderBy("updatedOn", "desc")
          .limit(num ? num : 5);

        // const postRef = collectionGroup(db, "postsV2");
        // const q = query(
        //   postRef,
        //   where("gameId", "==", gameId),
        //   orderBy("updatedOn", "desc"),
        //   limit(num ? num : 5)
        // );

        if (q) {
          const unsub = q.onSnapshot((querySnapshot) => {
            const remPosts: Post[] = [];
            for (const doc of querySnapshot.docs) {
              if (doc) {
                remPosts.push(doc.data() as Post);
              }
            }
            setPosts(remPosts);
          });

          return () => {
            if (unsub) {
              unsub();
            }
          };
        }
      }
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
      // Sentry.captureException(error);
    }
  }, [gameId, num]);

  return {
    posts,
  };
};
