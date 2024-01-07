import { Clapper } from "@models/Post/Post";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export const useIsInteracted = (
  postRef?: FirebaseFirestoreTypes.DocumentReference,
  userId?: string
) => {
  const [isClapped, setIsClapped] = useState<boolean>(false);
  const [isReplied, setIsReplied] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    if (postRef && userId) {
      const depth = postRef.path.split("/posts/");

      const getIsClapped = async () => {
        if (depth.length <= 3) {
          const clapDoc = await postRef
            .collection("clappers")
            .doc(`clapper-${userId}`)
            .get();

          if (clapDoc.data()) {
            const finalClapper = clapDoc.data() as Clapper;
            if (finalClapper.numClaps > 0) {
              setIsClapped(true);
            } else {
              setIsClapped(false);
            }
          } else {
            setIsClapped(false);
          }
        }
      };

      const getIsReplied = async () => {
        const depth = postRef.path.split("/posts/");

        if (depth.length <= 2) {
          const replyDocs = await postRef
            .collection("posts")
            .where("creatorId", "==", userId)
            .limit(1)
            .get();

          if (replyDocs.docs.length) {
            setIsReplied(true);
          }
        }
      };

      getIsClapped().catch((e) =>
        console.log("ERROR GET CLAPPED", postRef.path)
      );

      getIsReplied().catch((e) =>
        console.log("ERROR GET REPLIES", postRef.path)
      );
    }
  }, [postRef, userId, refreshCount]);

  const onRefreshIsInteracted = () => {
    if (!isClapped || !isReplied) {
      setRefreshCount((prev) => prev + 1);
    }
  };

  return {
    isClapped,
    isReplied,
    onRefreshIsInteracted,
  };
};
