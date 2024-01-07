import { Pressable, Text, View } from "react-native";
import FeedPostCardTop from "./FeedPostCardTop";
import FeedPostCardBottom from "./FeedPostCardBottom";
import { PostT } from "@hooks/postsV3/usePosts";
import MediaCard from "@components/MediaCard";
import Autolink from "react-native-autolink";
import SvgIcons from "@components/SvgIcons";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import FeedPostCardMiddleBottom from "@modules/QuestFeedLike/FeedPostCardMiddleBottom";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";

const FeedPostCard: React.FC<{
  item: PostT;
  onPostRefresh: (deletePostId?: string) => void;
}> = ({ item, onPostRefresh }) => {
  const { post } = item;

  const blockedPostIds = useUserStore(({ user }) => user?.blockedPostIds);

  const isBlocked = blockedPostIds?.includes(post.id);
  const navigation = useNavigation();

  const onPostClick = () => {
    // navigation.navigate("User", { userId: item.post.creatorId });
    navigation.navigate("Reply", {
      viewLevel: "session",
      path: `sbEvents/${TEAM_ALPHABET_GAME}/postsV3/${post.id}`,
    });
    weEventTrack("post_clickContent", {});
  };

  return (
    <View className="bg-[#343150]">
      {isBlocked ? (
        <View className="flex flex-row items-center px-8 py-6">
          <View className="w-6 aspect-square bg-white rounded-full p-1.5 mr-4">
            <SvgIcons iconType="tickCheck" color="#343150" />
          </View>
          <Text
            className="flex-1 text-white text-sm"
            style={{ fontFamily: "Nunito-Medium" }}
          >
            This post has been reported. Our content moderation team is looking
            into it. Thank you
          </Text>
        </View>
      ) : (
        <>
          <FeedPostCardTop item={item} onPostRefresh={onPostRefresh} />
          <Pressable onPress={onPostClick}>
            <>
              <View className="px-8 py-2">
                <Autolink
                  text={post.text}
                  renderText={(text) => (
                    <Text className="text-white/70 text-sm">{text}</Text>
                  )}
                  linkStyle={{ color: "blue" }}
                />
              </View>

              {post.media[0] ? (
                <View className="w-full aspect-[150/88]">
                  <MediaCard media={post.media[0]} fluid={true} />
                </View>
              ) : null}
            </>
          </Pressable>
          <FeedPostCardMiddleBottom item={item} />
          <FeedPostCardBottom item={item} onPostRefresh={onPostRefresh} />
        </>
      )}
    </View>
  );
};

export default FeedPostCard;
