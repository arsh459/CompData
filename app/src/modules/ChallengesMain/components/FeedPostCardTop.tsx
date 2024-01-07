import { View, Text, Pressable } from "react-native";
import { PostT } from "@hooks/postsV3/usePosts";
import UserImage from "@components/UserImage";
import { formatDistanceToNow } from "date-fns";
import MoreMenu from "./MoreMenu";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  item: PostT;
  onPostRefresh: (deletePostId?: string) => void;
}

const FeedPostCardTop: React.FC<Props> = ({ item, onPostRefresh }) => {
  const { post } = item;

  const navigation = useNavigation();

  const onProfilePress = () => {
    weEventTrack("post_clickProfile", {});
    navigation.navigate("User", { userId: item.post.creatorId });
  };

  return (
    <View className="p-4 flex flex-row justify-between items-center">
      <View className="flex flex-row items-center">
        <Pressable onPress={onProfilePress}>
          <UserImage
            image={post.creatorImg}
            name={post.creatorName}
            width="w-8"
            height="h-8"
          />
        </Pressable>

        <View className="pl-2.5">
          <Pressable onPress={onProfilePress}>
            <Text
              className="text-white text-sm"
              style={{ fontFamily: "Poppins-SemiBold" }}
            >
              {post.creatorName || "Unknown"}
            </Text>
          </Pressable>
          <Text
            className="text-[#5E5D71] text-xs"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            {formatDistanceToNow(post.updatedOn) + " ago"}
          </Text>
        </View>
      </View>

      <MoreMenu item={item} onPostRefresh={onPostRefresh} />
    </View>
  );
};

export default FeedPostCardTop;
