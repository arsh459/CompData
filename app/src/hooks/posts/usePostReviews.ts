// import { db } from "config/firebase";
import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
// import {
//   // limit,
//   onSnapshot,
//   collection,
//   orderBy,
//   query,
//   DocumentReference,
// } from "firebase/firestore";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

import { Post } from "@models/Post/Post";

export const usePostReview = (
  postRef?: FirebaseFirestoreTypes.DocumentReference,
  fetch?: boolean,
  numElements?: number
) => {
  const [postReviews, setPostReviews] = useState<Post[]>([]);
  const [numPosts, setNumPosts] = useState<number>(
    numElements ? numElements : 1
  );
  const [nextExists, setNextExists] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (fetch && postRef && numPosts) {
        const q = postRef
          .collection("posts")
          .orderBy("updatedOn", "desc")
          .limit(numPosts);

        const unsubscribe = q.onSnapshot((querySnapshot) => {
          const reviews: Post[] = [];
          querySnapshot.forEach((doc) => {
            if (doc) {
              const rmTmp = doc.data() as Post;
              reviews.push(rmTmp);
            }
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
    } catch (error: any) {
      console.log("error here", error);
      crashlytics().recordError(error);
    }
  }, [fetch, postRef, numPosts]);

  const onNext = () => {
    setNumPosts((prev) => prev + 5);
  };

  return {
    postReviews,
    onNext,
    nextExists,
  };
};
