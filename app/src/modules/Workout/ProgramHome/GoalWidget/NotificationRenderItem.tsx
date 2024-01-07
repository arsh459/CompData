import UserImage from "@components/UserImage";
import { Post } from "@models/Post/Post";
import { formatDistanceToNow } from "date-fns";
import { View, Text } from "react-native";
interface Props {
  post: Post;
}
const NotificationRenderItem: React.FC<Props> = ({ post }) => {
  return (
    <View className="bg-[#66666680] px-3 ">
      <View className="flex py-3 flex-row">
        <View className="iphoneX:w-12 iphoneX:h-12 w-10 h-10 rounded-full ">
          <UserImage
            image={post.creatorImg}
            name={post.creatorName}
            color="#313131"
          />
        </View>
        <View className="flex-1 font- ml-4 text-white ">
          <Text
            className="font-medium text-sm iphoneX:text-base  text-white"
            numberOfLines={1}
          >
            {post.creatorName} posted{" "}
            {post.media[0]?.resource_type === "image" && "a photo"}
            {post.media[0]?.resource_type === "video" && "a video"}
          </Text>
          <Text className="pt-1 text-xs text-white">
            {formatDistanceToNow(new Date(post.updatedOn), {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default NotificationRenderItem;
