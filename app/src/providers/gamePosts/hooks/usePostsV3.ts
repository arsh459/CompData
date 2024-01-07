import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
// import {
//   onSnapshot,
//   getDocs,
//   DocumentData,
//   DocumentReference,
// } from "firebase/firestore";

import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Post, postTypes } from "@models/Post/Post";
import { getInitialPostQuery } from "@utils/post/postUtils";
// import * as Sentry from "@sentry/browser";

export type postFilters = "all" | "byCoach" | "byMe";

export const usePostsV3 = (eventId?: string, postType?: postTypes) => {
  const [posts, setPosts] = useState<
    { post: Post; ref: FirebaseFirestoreTypes.DocumentReference }[]
  >([]);

  const [postFilter, setPostFilter] = useState<postFilters>("all");
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();
  const [nextExists, setNextExists] = useState<boolean>(true);
  const [fetched, setFetchStatus] = useState<boolean>(false);
  const [fetchingNext, setNextFetching] = useState<boolean>(false);

  const onNext = async () => {
    if (!fetchingNext && nextExists) {
      setNextFetching(true);
      const q = getInitialPostQuery(eventId, postType, lastDoc);

      if (q) {
        const remotePostDocs = await q.get();

        const remotePosts: {
          post: Post;
          ref: FirebaseFirestoreTypes.DocumentReference;
        }[] = [];
        for (const remotePost of remotePostDocs.docs) {
          remotePosts.push({
            post: remotePost.data() as Post,
            ref: remotePost.ref,
          });
        }

        const lastVisible = remotePostDocs.docs[remotePostDocs.docs.length - 1];

        setLastDoc(lastVisible);
        if (remotePostDocs.docs.length === 5) {
          setNextExists(true);
        } else {
          setNextExists(false);
        }

        setPosts((prev) => [...prev, ...remotePosts]);
        setNextFetching(false);
      }
    }
  };

  useEffect(() => {
    const getInitialDocs = async () => {
      const q = getInitialPostQuery(eventId, postType, undefined);
      if (q) {
        const remotePostDocs = await q.get();
        const remotePosts: {
          post: Post;
          ref: FirebaseFirestoreTypes.DocumentReference;
        }[] = [];
        for (const remotePost of remotePostDocs.docs) {
          const rPost = remotePost.data() as Post;
          remotePosts.push({
            post: rPost,
            ref: remotePost.ref,
          });
        }

        const lastVisible = remotePostDocs.docs[remotePostDocs.docs.length - 1];

        setLastDoc(lastVisible);
        if (remotePostDocs.docs.length === 5) {
          setNextExists(true);
        } else {
          setNextExists(false);
        }
        // setPosts(remotePosts);
        setPosts((prev) => [...prev, ...remotePosts]);
      }
    };

    getInitialDocs();
  }, [eventId, postType]);

  useEffect(() => {
    try {
      const q = getInitialPostQuery(eventId, postType);

      const unsub = q.onSnapshot((querySnapshot) => {
        const newRtPosts: {
          post: Post;
          ref: FirebaseFirestoreTypes.DocumentReference;
        }[] = [];
        for (const remPostDoc of querySnapshot.docs) {
          const realTimePost = remPostDoc.data() as Post;

          newRtPosts.push({ post: realTimePost, ref: remPostDoc.ref });
        }

        setPosts((prev) => {
          if (prev.length) {
            const tmp = [...newRtPosts, ...prev];

            const idsPresent: { [id: string]: boolean } = {};
            const finalList: {
              post: Post;
              ref: FirebaseFirestoreTypes.DocumentReference;
            }[] = [];
            for (const pInList of tmp) {
              if (idsPresent[pInList.post.id]) {
              } else {
                finalList.push(pInList);
                idsPresent[pInList.post.id] = true;
              }
            }

            return finalList;
          }

          return prev;
        });

        // set last doc
        // setLastDoc((prev) =>
        //   !prev ? querySnapshot.docs[querySnapshot.docs.length - 1] : prev
        // );
        setTimeout(() => setFetchStatus(true), 500);
      });

      return () => {
        if (unsub) {
          setPosts([]);
          setFetchStatus(false);
          setNextExists(true);
          setLastDoc(undefined);
          unsub();
        }
      };
      // }
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("error", error);
      // Sentry.captureException(error);
    }
  }, [eventId, postType]);

  return {
    posts,
    onNext,
    nextExists: true,
    postFilter,
    setPostFilter,
    fetched,
  };
};
