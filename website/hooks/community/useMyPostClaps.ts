import { useEffect, useState } from "react";
// import { db } from "config/firebase";
import { doc, onSnapshot, DocumentReference } from "firebase/firestore";
import { Clapper } from "@models/Posts/Post";

export const useMyPostClaps = (
  // eventId: string,
  postRef?: DocumentReference,
  uid?: string
  // sessionId?: string,
  // postId?: string,
  // childPostId?: string,
  // parentPostId?: string
) => {
  const [clapper, setClapper] = useState<Clapper>();

  useEffect(() => {
    try {
      if (postRef && uid) {
        const clapperRef = doc(postRef, "clappers", `clapper-${uid}`);

        const unsubscribe = onSnapshot(clapperRef, (doc) => {
          setClapper(doc.data() as Clapper);
        });

        return () => {
          unsubscribe();
        };
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [postRef, uid]);

  return {
    clapper,
  };
};
