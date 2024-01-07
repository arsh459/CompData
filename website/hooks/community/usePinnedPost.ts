// import { EventInterface } from "@models/Event/Event";
import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  onSnapshot,
  collectionGroup,
  query,
  where,
  DocumentReference,
} from "firebase/firestore";
import { Post } from "@models/Posts/Post";
import * as Sentry from "@sentry/browser";

export type eventVisibility = "community" | "preview" | "unknown";

export const usePinnedPost = (
  // allEvents: EventInterface[],
  // selectedEventId: string,
  postId: string | undefined,
  gameId: string,
  fetch?: boolean
) => {
  // console.log("postId", postId, gameId, fetch);
  const [pinnedPost, setPinnedPost] =
    useState<{ post: Post | undefined; ref: DocumentReference | undefined }>();

  useEffect(() => {
    try {
      if (postId && fetch) {
        const unsub = onSnapshot(
          query(
            collectionGroup(db, "postsV2"),
            // where("gameId", "==", gameId),
            where("id", "==", postId)
          ),
          (docs) => {
            if (docs.docs.length) {
              // console.log("docs", docs.docs.length);
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
    } catch (error) {
      console.log("error", error);
      Sentry.captureException(error);
    }
  }, [postId, fetch]);

  return {
    pinnedPost,
  };
};
