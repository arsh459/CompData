// import MediaCard from "@components/MediaCard";
import MediaTile from "@components/MediaCard/MediaTile";
// import { useActivityReview } from "@hooks/activity/useActivityReview";
// import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
// import { Post } from "@models/Post/Post";
import { useProfileContext } from "@providers/profile/ProfileProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { format } from "date-fns";
import { Text, useWindowDimensions, View } from "react-native";
import { EarnedTaskInterface } from "../FitPointExpanderMain/EarnedTaskCard";

export const Activity_Item_Height = 300;

interface Props {
  activity: EarnedTaskInterface;
  //   uid?: string;
}

const ActivityCardV3: React.FC<Props> = ({ activity }) => {
  const { width } = useWindowDimensions();
  const { user } = useUserContext();
  const { profile } = useProfileContext();
  //   const { task } = useWorkoutTask(post.taskId);
  //   const { activityName, fitPoints } = useActivityReview(post.id, uid, true);

  const isMe = user?.uid === profile?.uid;

  return (
    <View
      style={{
        width: width / 2,
        height: Activity_Item_Height,
        padding: 10,
      }}
    >
      <View className="flex-1 relative rounded-lg overflow-hidden">
        {/* <MediaCard
          media={task?.thumbnails}
          notPlayable={true}
          fluid={true}
          fluidResizeMode="cover"
        /> */}
        <MediaTile
          media={activity?.media}
          mediaWidth={width / 2}
          maxHeight={Activity_Item_Height}
          fluid={true}
          fluidResizeMode="cover"
        />
        <View className="absolute left-0 right-0 bottom-0 bg-white p-2">
          <Text
            className="text-[#FF5970] font-bold text-base text-center"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            {isMe ? "You" : ""} Earned {activity.fitPoints}
            {activity?.fitPoints && activity.taskType === "workout"
              ? `/${activity.totalFP} FPs`
              : " FPs"}
          </Text>
        </View>
      </View>
      <View className="p-1">
        <Text
          numberOfLines={1}
          className="text-white font-bold text-sm"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          {activity.name}
        </Text>
        <Text
          className="text-white/80 text-xs"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          {activity.unix
            ? `Posted on ${format(new Date(activity.unix), "do LLL")}`
            : ""}
        </Text>
      </View>
    </View>
  );
};

export default ActivityCardV3;
