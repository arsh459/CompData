import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";
// import { db } from "@config/firebase";
// import {
//   onSnapshot,
//   collectionGroup,
//   query,
//   where,
//   DocumentReference,
// } from "firebase/firestore";
import { Post } from "@models/Post/Post";
import { viewLevelsTypes } from "@utils/post/utils";
// import * as Sentry from "@sentry/browser";

export type eventVisibility = "community" | "preview" | "unknown";

export const usePinnedPost = (
  postId?: string,
  viewLevel: viewLevelsTypes = "session"
) => {
  const [pinnedPost, setPinnedPost] = useState<{
    post: Post | undefined;
    ref: FirebaseFirestoreTypes.DocumentReference | undefined;
  }>();

  useEffect(() => {
    try {
      if (postId && viewLevel) {
        const target = viewLevel === "session" ? "postsV2" : "posts";
        const q = firestore().collectionGroup(target).where("id", "==", postId);

        const unsub = q.onSnapshot(
          // query(collectionGroup(db, target), where("id", "==", postId)),
          (docs) => {
            if (docs?.docs.length) {
              setPinnedPost({
                post: docs.docs[0].data() as Post,
                ref: docs.docs[0].ref,
              });
            }
          }
        );

        return () => {
          if (unsub) {
            unsub();
            setPinnedPost({ post: undefined, ref: undefined });
          }
        };
      }
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
      // Sentry.captureException(error);
    }
  }, [postId, viewLevel]);

  return {
    pinnedPost,
  };
};
