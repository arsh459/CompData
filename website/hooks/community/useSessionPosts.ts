import { db } from "config/firebase";
import { useEffect, useState } from "react";
import {
  doc,
  onSnapshot,
  collection,
  orderBy,
  query,
  // where,
  limit,
} from "firebase/firestore";
import { Post } from "@models/Posts/Post";
// import { usePostReview } from "./usePostReviews";

export const useSessionPosts = (
  eventId: string,
  parentPostId?: string,
  numElements?: number
  // postId?: string
) => {
  const [posts, setSessionPosts] = useState<Post[]>([]);
  const [numPosts, setNumPosts] = useState<number>(
    numElements ? numElements : 1
  );
  const [nextExists, setNextExists] = useState<boolean>(false);

  //   const { postReviews } = usePostReview(eventId, postId);
  //   console.log("num", numPosts);
  // console.log("session", sessionId);

  useEffect(() => {
    try {
      if (parentPostId && numPosts && eventId) {
        const postRef = collection(
          doc(
            collection(doc(collection(db, "sbEvents"), eventId), "postsV2"),
            parentPostId
          ),
          "posts"
        );

        // const reviewRefs = collection(doc(postRef, sessionId), "posts");
        const q = query(postRef, orderBy("updatedOn", "desc"), limit(numPosts));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const reviews: Post[] = [];
          querySnapshot.forEach((doc) => {
            const rmTmp = doc.data() as Post;
            reviews.push(rmTmp);
          });

          setNextExists(reviews.length === numPosts);
          setSessionPosts(reviews);
        });

        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [eventId, parentPostId, numPosts]);

  const onNext = () => {
    // console.log("here");
    setNumPosts((prev) => prev + 5);
  };

  return {
    posts,
    onNext,
    nextExists,
  };
};
