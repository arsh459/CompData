import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Post } from "@models/Post/Post";

export const usePostReview = (
  postRef?: FirebaseFirestoreTypes.DocumentReference,
  fetch?: boolean,
  numElements?: number
) => {
  const [postReviews, setPostReviews] = useState<Post[]>([]);
  const [numPosts, setNumPosts] = useState<number>(numElements || 1);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [nextExists, setNextExists] = useState<boolean>(false);

  useEffect(() => {
    if (postRef && fetch) {
      postRef
        .collection("posts")
        .countFromServer()
        .get()
        .then((res) => {
          const newNumPosts = res.data().count;
          setNextExists(newNumPosts < totalPosts);
          setTotalPosts(newNumPosts);
        })
        .catch((e) => console.log("error in here", postRef.path, fetch));
    }
  }, [postRef]);

  useEffect(() => {
    try {
      if (fetch && postRef && numPosts) {
        const q = postRef
          .collection("posts")
          .orderBy("updatedOn", "desc")
          .limit(numPosts);

        q.get().catch((e) => console.log("error in here", postRef.path));

        const unsubscribe = q.onSnapshot((querySnapshot) => {
          const reviews: Post[] = [];
          querySnapshot.forEach((doc) => {
            if (doc) {
              const rmTmp = doc.data() as Post;
              reviews.push(rmTmp);
            }
          });

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
  }, [fetch, postRef, numPosts, totalPosts]);

  const onNext = () => {
    const newNumPosts = numPosts + 5;
    setNextExists(newNumPosts < totalPosts);
    setNumPosts(newNumPosts);
  };

  return {
    postReviews,
    onNext,
    nextExists,
  };
};
