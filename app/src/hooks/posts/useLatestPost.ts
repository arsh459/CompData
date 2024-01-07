import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
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
import crashlytics from "@react-native-firebase/crashlytics";

export type postFilters = "all" | "byCoach" | "byMe";

export const useLatestPost = (gameId?: string) => {
  const [post, setPost] = useState<Post | undefined>();

  useEffect(() => {
    try {
      if (gameId) {
        const q = firestore()
          .collectionGroup("postsV2")
          .where("gameId", "==", gameId)
          .orderBy("updatedOn", "desc")
          .limit(1);

        // const postRef = collectionGroup(db, "postsV2");
        // const q = query(
        //   postRef,
        //   where("gameId", "==", gameId),
        //   orderBy("updatedOn", "desc"),
        //   limit(1)
        // );

        if (q) {
          const unsub = q.onSnapshot((querySnapshot) => {
            if (querySnapshot.docs.length) {
              setPost(querySnapshot.docs[0].data() as Post);
            }
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
    }
  }, [gameId]);

  return {
    post,
  };
};
