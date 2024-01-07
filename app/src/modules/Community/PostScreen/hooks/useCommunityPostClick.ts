import { useActivityReview } from "@hooks/activity/useActivityReview";
import { usePinnedPost } from "@hooks/posts/usePinnedPost";
import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
import { useTaskDoneLists } from "@hooks/task/useTaskDoneLists";

export const useCommunityPostClick = (
  postId: string | undefined,
  fetch: boolean
) => {
  const { pinnedPost } = usePinnedPost(postId);

  const { adminReview } = useActivityReview(
    postId,
    pinnedPost?.post?.creatorId,
    fetch
  );

  const { task } = useWorkoutTask(adminReview[0]?.taskId, !fetch);

  const { taskDoneLists, onNext } = useTaskDoneLists(adminReview[0]?.taskId);

  return {
    pinnedPost,
    adminReview,
    task,
    taskDoneLists,
    onNextTaskDone: onNext,
  };
};
