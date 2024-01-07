import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { View, TouchableOpacity, Text } from "react-native";
import { PostT } from "@hooks/postsV3/usePosts";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
interface Props {
  item: PostT;
}

const FeedPostCardMiddleBottom: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation();
  const { post } = item;

  const onPostClick = () => {
    // navigation.navigate("User", { userId: item.post.creatorId });
    navigation.navigate("Reply", {
      viewLevel: "session",
      path: `sbEvents/${TEAM_ALPHABET_GAME}/postsV3/${post.id}`,
    });
    weEventTrack("post_clickReplyCount", {});
  };
  return (
    <View className="flex px-8 py-4 justify-around flex-row">
      <TouchableOpacity
        onPress={() => {
          weEventTrack("FeedLikesScreen_LikesButton", {
            postId: post.id,
          });

          // , { postRef: item.ref }
          navigation.navigate("FeedLikesScreen", {
            postFirebasePath: item.ref.path,
          });
        }}
      >
        <Text
          className="text-[#8C89AC] text-xs underline"
          style={{ fontFamily: "Poppins-Light" }}
        >
          {item?.post?.numClaps
            ? item.post.numClaps > 1
              ? `${item.post.numClaps} Likes`
              : `${item.post.numClaps} Like`
            : "0 Like"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPostClick}>
        <Text
          className="text-[#8C89AC] text-xs"
          style={{ fontFamily: "Poppins-Light" }}
        >
          {item?.post?.numCheckins
            ? item.post.numCheckins > 1
              ? `${item.post.numCheckins} Comments`
              : `${item.post.numCheckins} Comment`
            : "0 Comment"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedPostCardMiddleBottom;
