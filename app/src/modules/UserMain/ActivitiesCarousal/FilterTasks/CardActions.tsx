import ShareWrapper from "@components/ShareWrapper";
import {
  activityClapIcon,
  activityCommentIcon,
  activityShareIcon,
  // clapIcon,
  // replyIcon,
  // sharePostIcon,
} from "@constants/imageKitURL";
import { Post } from "@models/Post/Post";
// import { useGameContext } from "@providers/game/GameProvider";
// import { useProfileContext } from "@providers/profile/ProfileProvider";
// import { useTeamContext } from "@providers/team/TeamProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { saveNewClap } from "@utils/post/createUtils";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
// import CardActionCounts from "./CardActionCounts";

interface Props {
  post: Post;
  postRef: FirebaseFirestoreTypes.DocumentReference;
  activityName?: string;
  isLive?: boolean;
}

const CardAction: React.FC<Props> = ({
  post,
  postRef,
  activityName,
  isLive,
}) => {
  const { user } = useUserContext();
  //   const { game } = useGameContext();
  //   const { team, teamLeader } = useTeamContext();
  const navigation = useNavigation();

  const [claps, setClaps] = useState<number>(post.numClaps ? post.numClaps : 0);
  const [replies, setReplies] = useState<number>(
    post.numCheckins ? post.numCheckins : 0
  );

  useEffect(() => {
    if (post.numClaps && !isLive) setClaps(post.numClaps);
  }, [post.numClaps, isLive]);
  useEffect(() => {
    if (post.numCheckins && !isLive) setReplies(post.numCheckins);
  }, [post.numCheckins, isLive]);

  const handleClapClick = async () => {
    if (post && user && postRef) {
      await saveNewClap(
        postRef,
        user.uid,
        post.communityId,
        post.creatorId,
        user?.name,
        user?.profileImage,
        post.creatorName,
        post.creatorImg
      );
      setClaps((prev) => prev + 1);
    }
  };

  const handleReplyClick = () => {
    if (post.gameId && post.eventId) {
      navigation.navigate("Reply", {
        gameId: post.gameId,
        teamId: post.eventId,
        path: `${postRef.path}/posts/${post.id}`,
        viewLevel: "session",
      });
    }
  };

  return (
    <>
      <View className="flex flex-row  py-4">
        <View className="flex flex-row items-center justify-center w-1/3">
          <TouchableOpacity onPress={handleClapClick}>
            <Image
              source={{ uri: activityClapIcon }}
              className="w-4 h-4 iphoneX:w-5 iphoneX:h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text onPress={handleClapClick} className="pl-2 text-white">
            {claps > 0 ? claps : null}
            {/* {post.numClaps && post.numClaps > 0 ? post.numClaps : null} */}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-center w-1/3">
          <TouchableOpacity onPress={handleReplyClick}>
            <Image
              source={{ uri: activityCommentIcon }}
              className="w-4 h-[14px] iphoneX:w-6 iphoneX:h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text onPress={handleReplyClick} className="pl-2 text-white">
            {/* {post.numCheckins && post.numCheckins > 0 ? post.numCheckins : null} */}
            {replies > 0 ? replies : null}
          </Text>
        </View>

        <View className="flex items-center justify-center w-1/3">
          <TouchableOpacity>
            <ShareWrapper shareURL="https://socialboat.page.link/Game">
              <Image
                source={{ uri: activityShareIcon }}
                className="w-4 h-4 iphoneX:w-5 iphoneX:h-5"
                resizeMode="contain"
              />
            </ShareWrapper>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CardAction;
