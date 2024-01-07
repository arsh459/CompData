// import MediaCard from "@components/MediaCard";
import HexaPercent from "@components/HexaPercent";
import MediaTile from "@components/MediaCard/MediaTile";
// import { useActivityReview } from "@hooks/activity/useActivityReview";
// import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
// import { Post } from "@models/Post/Post";
// import { useProfileContext } from "@providers/profile/ProfileProvider";
// import { useUserContext } from "@providers/user/UserProvider";
import { format } from "date-fns";
import { Pressable, Text, View } from "react-native";
import { EarnedTaskInterface } from "./FitPointExpanderMain/EarnedTaskCard";
import { useNavigation } from "@react-navigation/native";

export const Activity_Item_Height = 90;

interface Props {
  activity: EarnedTaskInterface;
  //   uid?: string;
}

const ActivityCardV4: React.FC<Props> = ({ activity }) => {
  // const { user } = useUserContext();
  // const { profile } = useProfileContext();
  //   const { task } = useWorkoutTask(post.taskId);
  //   const { activityName, fitPoints } = useActivityReview(post.id, uid, true);

  // const isMe = user?.uid === profile?.uid;
  const progress = activity?.progress;

  const gainedFp = activity?.fitPoints ? activity.fitPoints : 0;
  const totalFp = activity?.totalFP ? activity.totalFP : 35;

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("WorkoutDoneScreen", {
      taskId: activity.taskId,
      // actId: activity.id,
      attemptedDate: activity.attemptedDate,
    });
  };

  return (
    <Pressable
      onPress={onPress}
      className="flex flex-row flex-1 bg-[#343150] items-center rounded-2xl p-2 "
      style={{ height: Activity_Item_Height }}
    >
      <View className="w-1/4 relative rounded-xl overflow-hidden a ">
        <MediaTile
          media={activity.media}
          fluid={true}
          fluidResizeMode="cover"
          roundedStr="rounded-xl"
        />

        {/* <View className="absolute left-0 right-0 bottom-0 bg-white p-2">
          <Text
            className="text-[#FF5970] font-bold text-base text-center"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            {isMe ? "You" : ""} Earned {activity.fitPoints}
            {activity?.fitPoints && activity.taskType === "workout"
              ? `/${activity.totalFP} FPs`
              : " FPs"}
          </Text>
        </View> */}
      </View>
      <View className="pl-4 flex-1    py-1 ">
        <Text
          numberOfLines={2}
          ellipsizeMode={"tail"}
          className="text-white flex-1 w-2/3 tracking-wide   text-sm iphoneX:text-base "
          style={{ fontFamily: "Nunito-SemiBold", lineHeight: 18 }}
        >
          {activity.name}
        </Text>
        <Text
          className="text-white/80 text-xs "
          style={{ fontFamily: "Nunito-Medium" }}
        >
          {activity.unix ? `${format(new Date(activity.unix), "do LLL")}` : ""}
        </Text>
      </View>
      <View className="flex justify-center">
        <HexaPercent
          width={Activity_Item_Height - 16}
          height={Activity_Item_Height - 16}
          percent={progress ? progress : 0}
          activeColor={"#fff"}
          inActiveColor={"#00000033"}
          noAnimation={true}
        >
          <View className="flex items-center justify-center absolute  left-0 right-0 top-0 bottom-0">
            <Text
              className="text-sm   text-white "
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {`${gainedFp}/${totalFp}`}
            </Text>
            <Text
              className="text-xs   text-white "
              style={{ fontFamily: "Nunito-Light" }}
            >
              FPs
            </Text>
          </View>
        </HexaPercent>
      </View>
    </Pressable>
  );
};

export default ActivityCardV4;
