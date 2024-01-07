// import { db } from "config/firebase";
import { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  where,
  DocumentReference,
} from "firebase/firestore";

export const useMyCheckin = (
  // eventId: string,
  postRef?: DocumentReference,
  viewerUID?: string,
  // postId?: string,
  // childPostId?: string,

  fetch?: boolean
  // parentPostId?: string
) => {
  const [checkedIns, setCheckedIn] = useState<number>(0);
  //   console.log("sessionId", sessionId);

  useEffect(() => {
    // const getMyCheckin = async () => {
    try {
      if (fetch && postRef && viewerUID) {
        // console.log("postRef", postRef.path);
        const q = query(
          collection(postRef, "posts"),
          where("creatorId", "==", viewerUID)
        );
        const unsubscribe = onSnapshot(q, (myPosts) => {
          // console.log("myPosts", postRef.path, myPosts.docs.length);
          if (myPosts.docs.length > 0) {
            setCheckedIn(myPosts.docs.length);
          } else {
            setCheckedIn(0);
          }
        });

        return () => {
          unsubscribe();
        };
      }
    } catch (error) {
      console.log("error", error);
    }
    // };

    // getMyCheckin();
  }, [postRef, viewerUID, fetch]);

  return {
    checkedIns,
  };
};
