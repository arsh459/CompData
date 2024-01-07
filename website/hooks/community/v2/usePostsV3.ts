import { useEffect, useState } from "react";
// import { db } from "@config/firebase";
import {
  onSnapshot,
  // orderBy,
  // limit,
  // query,
  // collectionGroup,
  getDocs,
  DocumentData,
  // where,
  DocumentReference,
  // startAfter,
} from "firebase/firestore";
import { Post } from "@models/Posts/Post";
import { postTypes } from "@hooks/community/v2/useCommunityParamsV3";
import { getInitialPostQuery } from "./postUtils";
import * as Sentry from "@sentry/browser";

export type postFilters = "all" | "byCoach" | "byMe";

export const usePostsV3 = (eventId?: string, postType?: postTypes) => {
  const [posts, setPosts] = useState<{ post: Post; ref: DocumentReference }[]>(
    []
  );

  // const [top5Ids, setTop5Ids] = useState<{ [postId: string]: boolean }>({});
  // const [nextExists, setNextExists] = useState<boolean>(false);
  const [postFilter, setPostFilter] = useState<postFilters>("all");
  const [lastDoc, setLastDoc] = useState<DocumentData>();
  const [nextExists, setNextExists] = useState<boolean>(true);
  const [fetched, setFetchStatus] = useState<boolean>(false);
  const [fetchingNext, setNextFetching] = useState<boolean>(false);

  // console.log("nextExists", nextExists);

  const onNext = async () => {
    // console.log("heree");
    if (!fetchingNext && nextExists) {
      setNextFetching(true);
      // const postRef = collectionGroup(db, "postsV2");
      const q = getInitialPostQuery(eventId, postType, lastDoc);
      // : undefined;

      // console.log("l", lastDoc);

      if (q) {
        const remotePostDocs = await getDocs(q);

        const remotePosts: { post: Post; ref: DocumentReference }[] = [];
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

    // console.log("here");
    // setNumPosts((prev) => prev + 5);
  };

  // console.log("top", top5Ids);

  useEffect(() => {
    try {
      // if (Object.keys(top5Ids).length) {
      // const postRef = collectionGroup(db, "postsV2");
      const q = getInitialPostQuery(eventId, postType);

      const unsub = onSnapshot(q, (querySnapshot) => {
        // let newPostCount: number = 0;
        const newRtPosts: { post: Post; ref: DocumentReference }[] = [];
        // const newIds: { [id: string]: boolean } = {};
        // let i: number = 0;
        for (const remPostDoc of querySnapshot.docs) {
          // if (remPostDoc.metadata.fromCache) {
          //   continue;
          // }
          const realTimePost = remPostDoc.data() as Post;

          newRtPosts.push({ post: realTimePost, ref: remPostDoc.ref });
        }

        // console.log("newRtPosts", newRtPosts);

        // if (newRtPosts.length) {
        setPosts((prev) => {
          if (prev.length) {
            const tmp = [...newRtPosts, ...prev];

            const idsPresent: { [id: string]: boolean } = {};
            const finalList: { post: Post; ref: DocumentReference }[] = [];
            for (const pInList of tmp) {
              if (idsPresent[pInList.post.id]) {
              } else {
                finalList.push(pInList);
                idsPresent[pInList.post.id] = true;
              }
            }

            // console.log("fin", finalList);

            return finalList;
          }

          return prev;
        });

        // set last doc
        // setLastDoc((prev) =>
        //   !prev ? querySnapshot.docs[querySnapshot.docs.length - 1] : prev
        // );
        setFetchStatus(true);
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
    } catch (error) {
      console.log("error", error);
      Sentry.captureException(error);
    }
  }, [eventId, postType]);

  // console.log("eventId", eventId);

  return {
    posts,
    // newPosts,
    onNext,
    // nextExists: lastDoc ? true : false,
    nextExists: true,
    postFilter,
    setPostFilter,
    fetched,
    setPosts,
    // onLoadFirst,
  };
};
