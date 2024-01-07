import ViewResult from "@components/Buttons/ViewResult";
import SvgIcons from "@components/SvgIcons";
import { Post } from "@models/Post/Post";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { Text, View } from "react-native";

interface Props {
  post: Post;
  activityName: string;
  fitPoints: number;
  iButtonVisible: boolean;
}

const Common: React.FC<Props> = ({
  post,
  activityName,
  fitPoints,
  iButtonVisible,
}) => {
  const navigation = useNavigation();

  return (
    <View className="bg-[#111111D6] border border-[#E0E0E0] rounded-3xl overflow-hidden italic">
      <View className="flex flex-row items-center border-b border-[#E0E0E0] px-3 py-2 iphoneX:px-4 iphoneX:py-2.5">
        <Text
          numberOfLines={1}
          className="text-white flex-1 text-base iphoneX:text-xl break-all font-bold"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {activityName === "Post"
            ? ""
            : activityName === "Terra"
            ? "Custom Workout"
            : activityName}
        </Text>
      </View>
      <View className="flex flex-row items-center justify-between">
        <View className="flex-1 flex flex-row justify-center items-center px-3 py-2 iphoneX:px-4 iphoneX:py-2.5">
          <View className="w-4 h-4 iphoneX:w-5 iphoneX:h-5">
            <SvgIcons iconType="fitpoint" color="#FFFFFF" />
          </View>
          <Text
            className="text-white text-base iphoneX:text-xl font-bold pl-2"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {!iButtonVisible ? "-" : `${fitPoints} FP`}
          </Text>
        </View>
        {iButtonVisible ? (
          <View className="flex-1 flex justify-center items-center px-2 py-2 iphoneX:px-4 iphoneX:py-2.5">
            <ViewResult
              text="View Results"
              onPress={() => {
                weEventTrack("community_clickResults", {});
                navigation.navigate("PostDetails", {
                  gameId: post.gameId ? post.gameId : "",
                  teamId: post.eventId ? post.eventId : "",
                  postId: post.id,
                });
              }}
            />
          </View>
        ) : (
          <View className="flex-1 flex justify-center items-center px-2 py-2 iphoneX:px-4 iphoneX:py-2.5">
            <ViewResult text="Pending AI Scan" onPress={() => {}} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Common;
