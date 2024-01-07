import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  doc,
  onSnapshot,
  collection,
  orderBy,
  limit,
  where,
  query,
} from "firebase/firestore";
import { Post } from "@models/Posts/Post";

export type postFilters = "all" | "byCoach" | "byMe";

export const usePostsV2 = (
  eventId?: string,
  communityId?: string,
  viewerUID?: string
) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [numPosts, setNumPosts] = useState<number>(5);
  const [nextExists, setNextExists] = useState<boolean>(false);
  const [postFilter, setPostFilter] = useState<postFilters>("all");

  useEffect(() => {
    try {
      if (eventId && numPosts) {
        const postRef = collection(
          doc(collection(db, "sbEvents"), eventId),
          "postsV2"
        );
        let q = undefined;
        if (postFilter === "all") {
          q = query(postRef, orderBy("updatedOn", "desc"), limit(numPosts));
        } else if (postFilter === "byCoach" && communityId) {
          q = query(
            postRef,
            where("creatorId", "==", communityId),
            orderBy("updatedOn", "desc"),
            limit(numPosts)
          );
        } else if (postFilter === "byMe" && viewerUID) {
          q = query(
            postRef,
            where("creatorId", "==", viewerUID),
            orderBy("updatedOn", "desc"),
            limit(numPosts)
          );
        }

        if (q) {
          const unsub = onSnapshot(q, (querySnapshot) => {
            const remPosts: Post[] = [];
            querySnapshot.forEach((doc) => {
              remPosts.push(doc.data() as Post);
            });

            setNextExists(remPosts.length === numPosts);
            setPosts(remPosts);
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
    }
  }, [eventId, numPosts, postFilter, communityId, viewerUID]);

  const onNext = () => {
    // console.log("here");
    setNumPosts((prev) => prev + 5);
  };

  return {
    posts,
    numPosts,
    onNext,
    nextExists,
    postFilter,
    setPostFilter,
  };
};
