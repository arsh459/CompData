import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Post } from "@models/Post/Post";

export const useTeamPosts = (eventId?: string) => {
  const [posts, setPosts] = useState<
    { post: Post; ref: FirebaseFirestoreTypes.DocumentReference }[]
  >([]);

  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();

  const onNext = () => {
    const getTeamPosts = async () => {
      const postRef = firestore().collectionGroup("postsV2");

      const q = postRef
        .where("eventId", "==", eventId)
        .orderBy("updatedOn", "desc")
        .startAfter(lastDoc)
        .limit(4);

      const remotePostDocs = await q.get();
      const lastVisible = remotePostDocs.docs[remotePostDocs.docs.length - 1];
      setLastDoc(lastVisible);

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

      setPosts((prev) => [...prev, ...remotePosts]);
    };
    if (lastDoc && eventId) {
      getTeamPosts();
    }
  };

  useEffect(() => {
    const getTeamPosts = async () => {
      if (eventId) {
        const postRef = firestore().collectionGroup("postsV2");

        const q = postRef
          .where("eventId", "==", eventId)
          .orderBy("updatedOn", "desc")
          .limit(8);

        const remotePostDocs = await q.get();
        const lastVisible = remotePostDocs.docs[remotePostDocs.docs.length - 1];
        setLastDoc(lastVisible);

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

        setPosts(remotePosts);
      }
    };
    getTeamPosts();
  }, [eventId]);

  return {
    posts,
    onNext,
  };
};
