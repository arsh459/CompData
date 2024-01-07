import { deleteDoc, DocumentReference } from "@firebase/firestore";
import { postModals } from "@templates/community/Program/Post/Modals/PostModals";
import { useState } from "react";
import { useMyCheckin } from "./useMyCheckin";
import { useMyPostClaps } from "./useMyPostClaps";
// import { usePostRefs } from "./usePostRefs";
// import { usePostReview } from "./usePostReviews";

export const useSessionV3 = (
  currentPostRef?: DocumentReference,
  viewLevel?: "session" | "post" | "postReply",
  viewerUID?: string
) => {
  const [currentVisible, setCurrentVisibleModal] = useState<postModals>("none");

  const { clapper } = useMyPostClaps(currentPostRef, viewerUID);
  const { checkedIns } = useMyCheckin(
    currentPostRef,
    viewerUID,
    // postId,
    viewLevel !== "postReply"
    // parentPostId
  );

  const onCloseModal = () => setCurrentVisibleModal("none");
  const onShowClaps = () => setCurrentVisibleModal("claps");
  const onJoinRequest = () => setCurrentVisibleModal("joinRequest");
  const onAddNewPost = () => setCurrentVisibleModal("newPost");
  const onDeletePost = () => setCurrentVisibleModal("delete");
  const onEditPost = () => setCurrentVisibleModal("editPost");
  const onReviewPost = () => setCurrentVisibleModal("reviewPost");

  const deleteCurrentPost = async () => {
    if (currentPostRef) {
      // console.log("currentPostRef", currentPostRef);
      await deleteDoc(currentPostRef);
    }
  };

  return {
    // postReviews,
    clapper,
    checkedIns,
    currentVisible,
    onCloseModal,
    onShowClaps,
    onAddNewPost,
    onDeletePost,
    onEditPost,
    currentPostRef,
    deleteCurrentPost,
    onJoinRequest,
    onReviewPost,
  };
};
