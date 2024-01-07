import { useEffect, useState } from "react";
// import { db } from "config/firebase";
import {
  // doc,
  onSnapshot,
  collection,
  DocumentReference,
} from "firebase/firestore";
import { Clapper } from "@models/Posts/Post";
import * as Sentry from "@sentry/browser";

export const useClaps = (
  fetch: boolean,
  postRef?: DocumentReference
  // eventId?: string,
  // sessionId?: string,
  // postId?: string,
  // childPostId?: string,
  // parentPostId?: string
) => {
  const [clappers, setClappers] = useState<Clapper[]>([]);

  useEffect(() => {
    try {
      if (fetch && postRef) {
        const clapperRef = collection(postRef, "clappers");

        const unsubscribe = onSnapshot(clapperRef, (clappers) => {
          const remoteClappers: Clapper[] = [];
          for (const clapper of clappers.docs) {
            remoteClappers.push(clapper.data() as Clapper);
          }
          setClappers(remoteClappers);
          // setClapper(doc.data() as Clapper);
        });

        return () => {
          unsubscribe();
        };
      }
    } catch (error) {
      console.log("error", error);
      Sentry.captureException(error);
    }
  }, [fetch, postRef]);

  return {
    clappers,
  };
};
