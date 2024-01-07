import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Post } from "@models/Post/Post";
import crashlytics from "@react-native-firebase/crashlytics";

export type postFilters = "all" | "byCoach" | "byMe";

export const useUserPosts = (uid?: string, gameId?: string) => {
  const [posts, setPosts] = useState<
    { post: Post; ref: FirebaseFirestoreTypes.DocumentReference }[]
  >([]);

  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();

  const onNext = async () => {
    if (lastDoc) {
      const postRef = firestore().collectionGroup("postsV2");
      // const postRef = collectionGroup(db, "postsV2");

      const q =
        uid && gameId
          ? postRef
              .where("creatorId", "==", uid)
              .where("gameId", "==", gameId)
              .orderBy("updatedOn", "desc")
              .startAfter(lastDoc)
              .limit(4)
          : // query(
          //     postRef,
          //     where("creatorId", "==", uid),
          //     where("gameId", "==", gameId),
          //     orderBy("updatedOn", "desc"),
          //     startAfter(lastDoc),
          //     limit(4)
          //   )
          uid
          ? postRef
              .where("creatorId", "==", uid)
              .orderBy("updatedOn", "desc")
              .startAfter(lastDoc)
              .limit(4)
          : // query(
            //     postRef,
            //     where("creatorId", "==", uid),
            //     orderBy("updatedOn", "desc"),
            //     startAfter(lastDoc),
            //     limit(4)
            //   )
            undefined;

      if (q) {
        const remotePostDocs = await q.get();

        const remotePosts: {
          post: Post;
          ref: FirebaseFirestoreTypes.DocumentReference;
        }[] = [];
        for (const remotePost of remotePostDocs.docs) {
          remotePosts.push({
            post: remotePost.data() as Post,
            ref: remotePost.ref,
          });
        }

        const lastVisible = remotePostDocs.docs[remotePostDocs.docs.length - 1];

        setLastDoc(lastVisible);

        setPosts((prev) => [...prev, ...remotePosts]);
      }
    }
  };

  useEffect(() => {
    try {
      const postRef = firestore().collectionGroup("postsV2");
      // const postRef = collectionGroup(db, "postsV2");
      const q =
        uid && gameId
          ? postRef
              .where("creatorId", "==", uid)
              .where("gameId", "==", gameId)
              .orderBy("updatedOn", "desc")
              .limit(4)
          : // query(
          //     postRef,
          //     where("creatorId", "==", uid),
          //     where("gameId", "==", gameId),
          //     orderBy("updatedOn", "desc"),
          //     limit(4)
          //   )
          uid
          ? postRef
              .where("creatorId", "==", uid)
              .orderBy("updatedOn", "desc")
              .limit(4)
          : // query(
            //     postRef,
            //     where("creatorId", "==", uid),
            //     orderBy("updatedOn", "desc"),
            //     limit(4)
            //   )
            postRef.orderBy("updatedOn", "desc").limit(4);
      // query(postRef, orderBy("updatedOn", "desc"), limit(4));

      const unsub = q.onSnapshot((querySnapshot) => {
        const newRtPosts: {
          post: Post;
          ref: FirebaseFirestoreTypes.DocumentReference;
        }[] = [];

        for (const remPostDoc of querySnapshot.docs) {
          const realTimePost = remPostDoc.data() as Post;

          newRtPosts.push({ post: realTimePost, ref: remPostDoc.ref });
        }

        setPosts(newRtPosts);
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      });

      return () => {
        if (unsub) {
          unsub();
        }
      };
      // }
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
    }
  }, [gameId, uid]);

  return {
    posts,
    // newPosts,
    onNext,
    nextExists: lastDoc ? true : false,
    // postFilter,
    // setPostFilter,
    // onLoadFirst,
  };
};
