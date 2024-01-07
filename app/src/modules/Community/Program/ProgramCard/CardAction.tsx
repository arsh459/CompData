import SvgIcons from "@components/SvgIcons";
import { useIsInteracted } from "@hooks/program/useIsInteracted";
import { Post } from "@models/Post/Post";
import { useGameContext } from "@providers/game/GameProvider";
import { useTeamContext } from "@providers/team/TeamProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { saveNewClap } from "@utils/post/createUtils";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  post: Post;
  postRef: FirebaseFirestoreTypes.DocumentReference;
  isLive?: boolean;
  level?: "post";
  colors?: boolean;
}

const CardAction: React.FC<Props> = ({
  post,
  postRef,
  isLive,
  level,
  colors,
}) => {
  const { user } = useUserContext();
  const { game } = useGameContext();
  const { team } = useTeamContext();
  const navigation = useNavigation();
  const { isClapped, isReplied } = useIsInteracted(postRef, user?.uid);

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
    weEventTrack("community_clickClap", { postId: post.id });
    if (user && postRef) {
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
    weEventTrack("community_clickReply", { postId: post.id });
    if (game && team) {
      navigation.navigate("Reply", {
        gameId: game.id,
        teamId: team.id,

        path: `sbEvents/${game.id}/postsV3/${post.id}`,
        viewLevel: level ? level : "session",
      });
    }
  };

  // return <View />;

  return (
    <>
      <View className="h-px bg-[#100F1A]" />
      <View className="flex flex-row">
        <TouchableOpacity
          style={styles.TouchableOpacityStyle}
          onPress={handleClapClick}
        >
          <View className="h-full aspect-square mr-3 -mb-1">
            <SvgIcons
              iconType="clap"
              color={isClapped ? "#FF5970" : colors ? "#100F1A" : "#B7B6C5"}
            />
          </View>
          <Text
            className={clsx(
              colors ? "text-[#100F1A]" : "text-[#B7B6C5]",
              "text-base"
            )}
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            {`${claps ? claps : ""} ${claps && claps > 1 ? "Claps" : "Clap"}`}
          </Text>
        </TouchableOpacity>
        <View className="w-px bg-[#100F1A]" />
        <TouchableOpacity
          style={styles.TouchableOpacityStyle}
          onPress={handleReplyClick}
        >
          <View className="h-full aspect-square mr-3 -mb-1">
            <SvgIcons
              iconType="reply"
              color={isReplied ? "#59FFE8" : colors ? "#100F1A" : "#B7B6C5"}
            />
          </View>
          <Text
            className={clsx(
              colors ? "text-[#100F1A]" : "text-[#B7B6C5]",
              "text-base"
            )}
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            {`${replies ? replies : ""} ${
              replies && replies > 1 ? "Comments" : "Comment"
            }`}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    flex: 1,
    height: 40,
    padding: 10,
    marginBottom: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardAction;
