import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  //   doc,
  onSnapshot,
  //   collection,
  orderBy,
  limit,
  query,
  collectionGroup,
  getDocs,
  DocumentData,
  where,
  DocumentReference,
  startAfter,
} from "firebase/firestore";
import { Post } from "@models/Posts/Post";

export type postFilters = "all" | "byCoach" | "byMe";

export const useUserPosts = (uid?: string) => {
  const [posts, setPosts] = useState<{ post: Post; ref: DocumentReference }[]>(
    []
  );

  // const [top5Ids, setTop5Ids] = useState<{ [postId: string]: boolean }>({});
  // const [nextExists, setNextExists] = useState<boolean>(false);
  //   const [postFilter, setPostFilter] = useState<postFilters>("all");
  const [lastDoc, setLastDoc] = useState<DocumentData>();
  // const [newPosts, setNewPosts] = useState<number>(0);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const postRef = collectionGroup(db, "postsV2");

  //     const q = query(postRef, orderBy("updatedOn", "desc"), limit(5));

  //     // get docs
  //     const remotePostDocs = await getDocs(q);

  //     const remotePosts: Post[] = [];
  //     const initialTop5: { [postId: string]: boolean } = {};
  //     for (const remotePost of remotePostDocs.docs) {
  //       const remObj = remotePost.data() as Post;
  //       remotePosts.push(remObj);
  //       initialTop5[remObj.id] = true;
  //     }

  //     const lastVisible = remotePostDocs.docs[remotePostDocs.docs.length - 1];

  //     setLastDoc(lastVisible);
  //     setNextExists(remotePosts.length === 5);
  //     setPosts(remotePosts);
  //     setTop5Ids(initialTop5);
  //   };

  //   getPosts();
  // }, []);

  // const onLoadFirst = async () => {
  //   if (newPosts) {
  //     const postRef = collectionGroup(db, "postsV2");

  //     const q = query(postRef, orderBy("updatedOn", "desc"), limit(newPosts));

  //     // get docs
  //     const remotePostDocs = await getDocs(q);

  //     const remotePosts: Post[] = [];
  //     const initialTop5: { [remId: string]: boolean } = {};
  //     for (const remotePost of remotePostDocs.docs) {
  //       const remObj = remotePost.data() as Post;
  //       remotePosts.push(remObj);
  //       initialTop5[remObj.id] = true;
  //     }

  //     setPosts((prev) => [...remotePosts, ...prev]);
  //     setTop5Ids((prev) => {
  //       return { ...initialTop5, ...prev };
  //     });
  //   }
  // };
  //   console.log("event", eventId, postId);

  const onNext = async () => {
    if (lastDoc) {
      const postRef = collectionGroup(db, "postsV2");
      const q = uid
        ? query(
            postRef,
            where("creatorId", "==", uid),
            orderBy("updatedOn", "desc"),
            startAfter(lastDoc),
            limit(5)
          )
        : undefined;

      // console.log("q", q);

      if (q) {
        const remotePostDocs = await getDocs(q);

        const remotePosts: { post: Post; ref: DocumentReference }[] = [];
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

    // console.log("here");
    // setNumPosts((prev) => prev + 5);
  };

  // console.log("top", top5Ids);

  useEffect(() => {
    try {
      // if (Object.keys(top5Ids).length) {
      const postRef = collectionGroup(db, "postsV2");
      const q = uid
        ? query(
            postRef,
            where("creatorId", "==", uid),
            orderBy("updatedOn", "desc"),
            limit(5)
          )
        : query(postRef, orderBy("updatedOn", "desc"), limit(5));

      const unsub = onSnapshot(q, (querySnapshot) => {
        // let newPostCount: number = 0;
        const newRtPosts: { post: Post; ref: DocumentReference }[] = [];
        // const newIds: { [id: string]: boolean } = {};
        // let i: number = 0;
        for (const remPostDoc of querySnapshot.docs) {
          const realTimePost = remPostDoc.data() as Post;

          // if does not exist
          // if (top5Ids[realTimePost.id]) {
          // } else {
          newRtPosts.push({ post: realTimePost, ref: remPostDoc.ref });
          // newIds[realTimePost.id] = true;
          // newPostCount += 1;
          // }

          // i++;
        }

        // if (newRtPosts.length) {
        setPosts((prev) => {
          const tmp = [...newRtPosts, ...prev];

          const idsPresent: { [id: string]: boolean } = {};
          const finalList: { post: Post; ref: DocumentReference }[] = [];
          for (const pInList of tmp) {
            if (idsPresent[pInList.post.id]) {
            } else {
              finalList.push(pInList);
              idsPresent[pInList.post.id] = true;
            }
          }

          return finalList;
        });

        // set last doc
        setLastDoc((prev) =>
          !prev ? querySnapshot.docs[querySnapshot.docs.length - 1] : prev
        );

        //     const lastVisible = remotePostDocs.docs[remotePostDocs.docs.length - 1];

        //     setLastDoc(lastVisible);
        // setTop5Ids((prev) => {
        //   return { ...newIds, ...prev };
        // });
        // }
      });

      return () => {
        if (unsub) {
          unsub();
        }
      };
      // }
    } catch (error) {
      console.log("error", error);
    }
  }, [uid]);

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
