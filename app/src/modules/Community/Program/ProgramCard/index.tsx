import { useActivityReview } from "@hooks/activity/useActivityReview";
import { useUserRank } from "@hooks/rank/useUserRank";
import { Post } from "@models/Post/Post";
import PrivatePostMedia from "@modules/PrivatePostMedia";
import { useGameContext } from "@providers/game/GameProvider";
import { isIButtonVisible } from "@utils/post/utils";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useState } from "react";
import DetailsModal from "../../DetailsModal";
import CardAction from "./CardAction";
import CardHeader from "./CardHeader";
import CardMedia from "./CardMedia";
import { useUserV2 } from "@hooks/auth/useUserV2";
import ClapperModal from "./ClapperModal";
import LastComment from "./LastComment";
import { LinearGradient } from "expo-linear-gradient";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  post: Post;
  postRef: FirebaseFirestoreTypes.DocumentReference;
  isLive?: boolean;
  isPostScreen?: boolean;
  colors?: string[];
}

const ProgramCard: React.FC<Props> = ({
  post,
  postRef,
  isLive,
  isPostScreen,
  colors,
}) => {
  const { game } = useGameContext();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const { fitPoints, activityName, adminReview } = useActivityReview(
    post.id,
    post.creatorId,
    true
  );

  const { myUserRank } = useUserRank(game?.id, post.creatorId);

  const { user: leader } = useUserV2(post.creatorId);

  const handleShowDetail = () => {
    weEventTrack("community_clickShowDetails", {
      postId: post.id,
      creatorId: post.creatorId,
    });
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <LinearGradient
        colors={colors ? colors : ["#FFFFFF1A", "#FFFFFF1A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="my-2.5 iphoneX:my-4"
      >
        <CardHeader
          post={post}
          leader={leader}
          teamName={myUserRank?.teamName}
          showDetailsModal={handleShowDetail}
          colors={colors ? true : false}
        />
        {post.view === "private" ? (
          <PrivatePostMedia
            post={post}
            activityName={activityName}
            fitPoints={fitPoints}
            iButtonVisible={isIButtonVisible(adminReview[0])}
          />
        ) : (
          <CardMedia
            post={post}
            isPostScreen={isPostScreen}
            iButtonVisible={isIButtonVisible(adminReview[0])}
            fitPoints={fitPoints}
            activityName={activityName}
            activity={adminReview[0]}
          />
        )}
        <CardAction
          post={post}
          postRef={postRef}
          isLive={isLive}
          colors={colors ? true : false}
        />
        <ClapperModal postRef={postRef} postId={post.id} />
        <LastComment postRef={postRef} />
      </LinearGradient>
      {myUserRank ? (
        <DetailsModal
          isOpen={isDetailModalOpen}
          onCloseModal={() => setIsDetailModalOpen(false)}
          rankObj={myUserRank}
          gameStarts={game?.configuration?.starts}
          sprints={game?.configuration?.sprints}
          blurAmount={18}
        />
      ) : null}
    </>
  );
};

export default ProgramCard;
