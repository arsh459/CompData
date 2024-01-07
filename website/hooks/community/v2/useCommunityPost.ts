import { Post } from "@models/Posts/Post";
import { useActivityReview } from "../useActivityReview";
// import { useEventMembers } from "../useEventMembers";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
// import { useEvenMembersCount } from "../useEvenMembersCount";

export const useCommunityPost = (post: Post) => {
  // const isActivity: boolean = post.eventId ? true : false;
  const { fitPoints, activityName, adminReview } = useActivityReview(
    post.id,
    post.creatorId,
    true
  );
  // const { members } = useEventMembers(post?.eventId, undefined, undefined, 4);
  // const { membersCount } = useEvenMembersCount(post?.eventId);
  const { leader } = useLeaderboard(post.creatorId);
  return {
    isActivity: adminReview.length > 0,
    fitPoints,
    activityName,
    activity: adminReview[0],
    // members,
    // membersCount,
    userLevel: leader?.userLevelV2,
  };
};
