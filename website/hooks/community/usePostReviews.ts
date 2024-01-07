// import { db } from "config/firebase";
import { useEffect, useState } from "react";
import {
  // limit,
  onSnapshot,
  collection,
  orderBy,
  query,
  DocumentReference,
} from "firebase/firestore";
import { Post } from "@models/Posts/Post";

export const usePostReview = (
  postRef?: DocumentReference,
  fetch?: boolean,
  numElements?: number
) => {
  const [postReviews, setPostReviews] = useState<Post[]>([]);
  const [numPosts, setNumPosts] = useState<number>(
    typeof numElements === "number" ? numElements : 1
  );
  const [nextExists, setNextExists] = useState<boolean>(false);
  // console.log("postReviews", postReviews);

  useEffect(() => {
    // const getPostReviews = async () => {
    try {
      if (fetch && postRef && numPosts) {
        // console.log("numPosts", postRef.path);
        const q = query(
          collection(postRef, "posts"),
          orderBy("updatedOn", "desc")
          // limit(numPosts)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const reviews: Post[] = [];
          querySnapshot.forEach((doc) => {
            const rmTmp = doc.data() as Post;
            reviews.push(rmTmp);
          });

          setNextExists(reviews.length === numPosts);
          setPostReviews(reviews);
        });

        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      }
    } catch (error) {
      console.log("error here", error);
    }
    // };
  }, [fetch, postRef, numPosts]);

  const onNext = () => {
    // console.log("here");
    setNumPosts((prev) => prev + 5);
  };

  return {
    postReviews,
    onNext,
    nextExists,
  };
};
