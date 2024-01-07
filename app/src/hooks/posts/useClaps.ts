import { useEffect, useState } from "react";
// import { db } from "config/firebase";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
// import {
//   // doc,
//   onSnapshot,
//   collection,
//   DocumentReference,
import crashlytics from "@react-native-firebase/crashlytics";
import { Clapper } from "@models/Post/Post";
// import * as Sentry from "@sentry/browser";

export const useClaps = (
  fetch: boolean,
  postRef?: FirebaseFirestoreTypes.DocumentReference
  // eventId?: string,
  // sessionId?: string,
  // postId?: string,
  // childPostId?: string,
  // parentPostId?: string
) => {
  const [clappers, setClappers] = useState<Clapper[]>([]);
  console.log("inside useClaps hook");

  useEffect(() => {
    try {
      if (fetch && postRef) {
        const clapperRef = postRef.collection("clappers");

        // const clapperRef = collection(postRef, "clappers");

        const unsubscribe = clapperRef.onSnapshot((clappers) => {
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
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
    }
  }, [fetch, postRef]);

  return {
    clappers,
  };
};
