import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";
import { Post } from "@models/Post/Post";

export const usePinnedPost = (
  path: string
  // postId?: string,
  // viewLevel: viewLevelsTypes = "session"
) => {
  const [pinnedPost, setPinnedPost] = useState<{
    post: Post;
    ref: FirebaseFirestoreTypes.DocumentReference;
  }>();

  useEffect(() => {
    try {
      if (path) {
        // if (viewLevel === "session") {
        const splitPath = path.split("/");

        let q: FirebaseFirestoreTypes.DocumentReference | undefined = undefined;
        if (splitPath.length === 4) {
          q = firestore()
            .collection("sbEvents")
            .doc(splitPath[1])
            .collection("postsV3")
            .doc(splitPath[3]);
        } else if (splitPath.length === 6) {
          q = firestore()
            .collection("sbEvents")
            .doc(splitPath[1])
            .collection("postsV3")
            .doc(splitPath[3])
            .collection("posts")
            .doc(splitPath[5]);
        }

        if (q) {
          const unsub = q.onSnapshot((docs) => {
            if (docs.exists) {
              setPinnedPost({
                post: docs.data() as Post,
                ref: docs.ref,
              });
            }
          });

          q.get().catch(() => console.log("error in session", path));

          return () => {
            if (unsub) {
              unsub();
              setPinnedPost(undefined);
            }
          };
        }

        // } else {
        //   const q = firestore()
        //     .collectionGroup("posts")
        //     .where("id", "==", postId);

        //   console.log("CHECKING. CONSOLE REMOVE");
        //   q.get().catch((e) =>
        //     console.log("error in collection group", viewLevel, postId, e)
        //   );

        //   const unsub = q.onSnapshot((docs) => {
        //     if (docs?.docs.length) {
        //       setPinnedPost({
        //         post: docs.docs[0].data() as Post,
        //         ref: docs.docs[0].ref,
        //       });
        //     }
        //   });

        //   return () => {
        //     if (unsub) {
        //       unsub();
        //       setPinnedPost(undefined);
        //     }
        //   };
        // }
      }
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
    }
  }, [path]);

  return {
    pinnedPost,
  };
};
