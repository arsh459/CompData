import ShowMore from "@components/ShowMore";
import { Text, View } from "react-native";

interface Props {
  activityName?: string;
  text?: string;
  userLevel?: number;
}

const PostDetails: React.FC<Props> = ({ activityName, text, userLevel }) => {
  return (
    <View className="m-4 bg-[#333240] rounded-lg">
      <Text
        numberOfLines={2}
        style={{ fontFamily: "BaiJamjuree-Bold" }}
        className="text-white flex-1 capitalize text-lg iphoneX:text-2xl p-3"
      >
        {activityName === "Terra" ? "Custom Workout" : activityName}
      </Text>
      <View className="h-px bg-[#100F1A]" />
      {text ? (
        <View className="p-3">
          <ShowMore
            text={text}
            textSize="text-sm iphoneX:text-base"
            textColor="text-[#ECE9FF]"
            fontFamily="BaiJamjuree-Regular"
          />
        </View>
      ) : null}
    </View>
  );
};

export default PostDetails;
