import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Post } from "@models/Post/Post";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useUserStore } from "@providers/user/store/useUserStore";

export type PostFiltersTypes = "Highlights" | "My Post" | "All posts";

export interface PostT {
  post: Post;
  ref: FirebaseFirestoreTypes.DocumentReference;
  isSnapshot: boolean;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<PostT[]>([]);
  const [postFilter, setPostFilter] = useState<PostFiltersTypes>("All posts");
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();
  const [fetched, setFetchStatus] = useState<boolean>(false);
  const [nextExists, setNextExists] = useState<boolean>(false);
  const [fetchingNext, setNextFetching] = useState<boolean>(false);

  const userId = useUserStore(({ user }) => user?.uid);

  useEffect(() => {
    try {
      const q = getInitialPostQuery(userId || "", postFilter, undefined);

      q.get().catch((e) => console.log(e));

      const unsub = q.onSnapshot((querySnapshot) => {
        if (querySnapshot?.docs) {
          const newRtPosts: PostT[] = [];
          for (const remPostDoc of querySnapshot.docs) {
            const realTimePost = remPostDoc.data() as Post | undefined;

            if (realTimePost) {
              newRtPosts.push({
                post: realTimePost,
                ref: remPostDoc.ref,
                isSnapshot: true,
              });
            }
          }

          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

          setLastDoc(lastVisible);
          setNextExists(querySnapshot.docs.length === 5);
          setPosts(newRtPosts);
          setFetchStatus(true);
        }
      });

      return () => {
        if (unsub) {
          setPosts([]);
          setFetchStatus(false);
          setNextExists(true);
          setLastDoc(undefined);
          unsub();
        }
      };
    } catch (error: any) {
      setFetchStatus(true);
      crashlytics().recordError(error);
      console.log("error", error);
    }
  }, [postFilter]);

  const onNext = async () => {
    if (fetched && !fetchingNext && nextExists) {
      setNextFetching(true);
      const q = getInitialPostQuery(userId || "", postFilter, lastDoc);

      const remotePostDocs = await q.get();

      const remotePosts: PostT[] = [];
      for (const remotePost of remotePostDocs.docs) {
        const realTimePost = remotePost.data() as Post | undefined;

        if (realTimePost) {
          remotePosts.push({
            post: realTimePost,
            ref: remotePost.ref,
            isSnapshot: false,
          });
        }
      }

      const lastVisible = remotePostDocs.docs[remotePostDocs.docs.length - 1];

      setLastDoc(lastVisible);
      setNextExists(remotePostDocs.docs.length === 5);
      setPosts((prev) => [...prev, ...remotePosts]);
      setNextFetching(false);
    }
  };

  const onPostRefresh = async (
    ref: FirebaseFirestoreTypes.DocumentReference,
    deletePostId?: string
  ) => {
    if (deletePostId) {
      setPosts((prev) => prev.filter((each) => each.post.id !== deletePostId));
    } else {
      const updatedPostDoc = await ref.get();
      const updatedPost = updatedPostDoc.data() as Post | undefined;

      if (updatedPost) {
        setPosts((prev) =>
          prev.map((each) =>
            each.post.id === updatedPost.id
              ? { ...each, post: updatedPost }
              : each
          )
        );
      }
    }
  };

  return {
    posts,
    onNext,
    nextExists,
    postFilter,
    setPostFilter,
    fetched,
    onPostRefresh,
  };
};

export const getInitialPostQuery = (
  uid: string,
  postFilter: PostFiltersTypes,
  lastDoc?: FirebaseFirestoreTypes.DocumentData
) => {
  let querry: FirebaseFirestoreTypes.Query = firestore()
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("postsV3");

  if (postFilter === "My Post") {
    querry = querry.where("creatorId", "==", uid);
  } else if (postFilter === "Highlights") {
    querry = querry.where("pinned", "==", true);
  }

  querry = querry.orderBy("updatedOn", "desc");

  if (lastDoc) {
    querry = querry.startAfter(lastDoc);
  }

  return querry.limit(5);
};
