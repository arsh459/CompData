import MediaCard from "@components/MediaCard";
import { useActivityReview } from "@hooks/activity/useActivityReview";
import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
import { Post } from "@models/Post/Post";
import { useUserContext } from "@providers/user/UserProvider";
import { format } from "date-fns";
import { Text, useWindowDimensions, View } from "react-native";

export const Activity_Item_Height = 300;

interface Props {
  post: Post;
  uid?: string;
}

const TeamActivityCard: React.FC<Props> = ({ post, uid }) => {
  const { width } = useWindowDimensions();
  const { user } = useUserContext();
  const { task } = useWorkoutTask(post.taskId);
  const { activityName, fitPoints } = useActivityReview(post.id, uid, true);

  const isMe = user?.uid === post?.creatorId;

  return (
    <View
      style={{
        width: width / 2,
        height: Activity_Item_Height,
        padding: 10,
      }}
    >
      <View className="flex-1 relative rounded-lg overflow-hidden">
        <MediaCard
          media={task?.thumbnails}
          notPlayable={true}
          fluid={true}
          fluidResizeMode="cover"
        />
        <View className="absolute left-0 right-0 bottom-0 flex flex-row justify-around bg-white p-1.5">
          <Text
            className="text-[#FF5970] text-[10px] iphoneX:text-xs "
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {isMe ? "You" : post.creatorName}
          </Text>
          <Text className="text-[#FF5970]  text-[10px] iphoneX:text-xs ">
            |
          </Text>
          <Text
            className="text-[#FF5970]  text-[10px] iphoneX:text-xs "
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {fitPoints}
            {task?.fitPoints && `/${task.fitPoints}`} FPs
          </Text>
        </View>
      </View>
      <View className="p-1">
        <Text
          numberOfLines={1}
          className="text-white  text-sm"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {activityName}
        </Text>
        <Text
          className="text-white/80 text-xs"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          {post.updatedOn
            ? `Posted on ${format(new Date(post.updatedOn), "do LLL")}`
            : ""}
        </Text>
      </View>
    </View>
  );
};

export default TeamActivityCard;
