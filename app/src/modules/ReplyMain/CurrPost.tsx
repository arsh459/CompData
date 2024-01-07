import { Post } from "@models/Post/Post";
import { useUserContext } from "@providers/user/UserProvider";
import { saveNewClap } from "@utils/post/createUtils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { viewLevelsTypes } from "@utils/post/utils";
import { RootStackParamList } from "@routes/MainStack";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import SessionView from "./SessionView";
import NonSessionView from "./NonSessionView";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useIsInteracted } from "@hooks/program/useIsInteracted";

interface Props {
  gameId?: string;
  teamId?: string;
  currentPost: Post;
  postRef: FirebaseFirestoreTypes.DocumentReference;
  viewLevel: viewLevelsTypes;
  hideAction?: boolean;
}

const CurrPost: React.FC<Props> = ({
  gameId,
  teamId,
  currentPost,
  postRef,
  viewLevel,
  hideAction,
}) => {
  const { user } = useUserContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isClapped, isReplied } = useIsInteracted(postRef, user?.uid);

  const handleClap = () => {
    weEventTrack("Reply_clickClap", { postId: currentPost.id });
    if (user) {
      saveNewClap(
        postRef,
        user.uid,
        currentPost.communityId,
        currentPost.creatorId,
        user.name,
        user.profileImage,
        currentPost.creatorName,
        currentPost.creatorImg
      );
    }
  };

  const handleReply = () => {
    // console.log("THIIIIS CLICK REPLY");
    weEventTrack("Reply_clickReply", { postId: currentPost.id });
    navigation.push("Reply", {
      gameId: gameId,
      teamId: teamId,
      // parentPostId:

      viewLevel: "post",
      path: `${postRef.path}`,
    });
  };

  return (
    <>
      {viewLevel === "session" ? (
        <SessionView
          currentPost={currentPost}
          isOwner={user?.uid === currentPost.creatorId}
        />
      ) : (
        <NonSessionView
          currentPost={currentPost}
          viewLevel={viewLevel}
          handleClap={handleClap}
          handleReply={handleReply}
          hideAction={hideAction}
          isClapped={isClapped}
          isReplied={isReplied}
        />
      )}
    </>
  );
};

export default CurrPost;
