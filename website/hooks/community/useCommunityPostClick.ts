import { usePinnedPost } from "@hooks/community/usePinnedPost";
import { useActivityReview } from "@hooks/community/useActivityReview";
import { useWorkoutTask } from "@hooks/tasks/useWorkoutTask";
import { useTaskDoneLists } from "@hooks/community/useTaskDoneLists";

export const useCommunityPostClick = (
  postId: string | undefined,
  gameId: string,
  isPostClickOpen: boolean
) => {
  const { pinnedPost } = usePinnedPost(postId, gameId, isPostClickOpen);
  // console.log("pinnedPost", pinnedPost);

  const { adminReview } = useActivityReview(
    postId,
    pinnedPost?.post?.creatorId,
    isPostClickOpen
  );

  const { task } = useWorkoutTask(adminReview[0]?.taskId, !isPostClickOpen);

  // console.log(task);

  const { taskDoneLists, onNext } = useTaskDoneLists(adminReview[0]?.taskId);

  return {
    pinnedPost,
    adminReview,
    task,
    taskDoneLists,
    onNextTaskDone: onNext,
  };
};
