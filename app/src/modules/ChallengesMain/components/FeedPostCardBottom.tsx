import { View, Text } from "react-native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useNavigation } from "@react-navigation/native";
import { useIsInteracted } from "@hooks/program/useIsInteracted";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { TouchableOpacity } from "react-native";
import { PostT } from "@hooks/postsV3/usePosts";
import HeartIcon from "@components/SvgIcons/HeartIcon";
import ReplyIcon from "@components/SvgIcons/ReplyIcon";
import { useEffect, useRef } from "react";
import { removeClapper, saveNewClap } from "@utils/postsV3/utils";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";

interface Props {
  item: PostT;
  onPostRefresh: () => void;
}

const FeedPostCardBottom: React.FC<Props> = ({ item, onPostRefresh }) => {
  const { uid, name, profileImage } = useUserStore(
    ({ user }) => ({
      uid: user?.uid,
      name: user?.name,
      profileImage: user?.profileImage,
    }),
    shallow
  );
  const navigation = useNavigation();
  const test = useRef<string>();
  const { post, ref, isSnapshot } = item;
  const { isClapped, isReplied, onRefreshIsInteracted } = useIsInteracted(
    ref,
    uid
  );

  // console.log("isClapped", isClapped);

  const handleClapClick = async () => {
    weEventTrack("community_clickClap", { postId: post.id });
    if (uid && ref) {
      if (isClapped) {
        await removeClapper(ref, uid);
      } else {
        await saveNewClap(
          ref,
          uid,
          post.creatorId,
          name,
          profileImage,
          post.creatorName,
          post.creatorImg
        );
      }
      if (!isSnapshot) {
        onPostRefresh();
        onRefreshIsInteracted();
      }
    }
  };

  const handleReplyClick = () => {
    test.current = post.id;
    weEventTrack("challengeFeed_clickReply", { postId: post.id });
    navigation.navigate("Reply", {
      viewLevel: "session",
      path: `sbEvents/${TEAM_ALPHABET_GAME}/postsV3/${post.id}`,
    });
  };

  useEffect(() => {
    const funcToRefresh = () => {
      if (!isSnapshot && !!test.current) {
        onPostRefresh();
        onRefreshIsInteracted();
        test.current = undefined;
      }
    };

    navigation.addListener("focus", funcToRefresh);

    return () => {
      navigation.removeListener("focus", funcToRefresh);
    };
  }, [navigation, onPostRefresh, onRefreshIsInteracted]);

  return (
    <View className="py-4 flex flex-row items-center justify-between ">
      <TouchableOpacity
        onPress={handleClapClick}
        className="flex flex-row items-center justify-center flex-[.5]"
      >
        <View className="w-6 aspect-square mr-2">
          <HeartIcon color={"#FF3FBE"} fill={isClapped && !!post.numClaps} />
        </View>
        <Text
          className="text-base text-white"
          style={{
            fontFamily: "Nunito-Regular",
            color: "#FF3FBE",
          }}
        >
          {post.numClaps || 0}
        </Text>
      </TouchableOpacity>

      <View className="w-px h-full bg-white/20" />

      <TouchableOpacity
        onPress={handleReplyClick}
        className="flex flex-row items-center justify-center flex-[.5]"
      >
        <View className="w-6 aspect-square mr-2">
          <ReplyIcon color={"#7972BB"} fill={isReplied && !!post.numCheckins} />
        </View>
        <Text
          className="text-base"
          style={{
            fontFamily: "Nunito-Regular",
            color: "#7972BB",
          }}
        >
          {post.numCheckins || 0}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedPostCardBottom;
