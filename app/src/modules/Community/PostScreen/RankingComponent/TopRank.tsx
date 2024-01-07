import UserProfile from "@components/UserProfile";
import { TaskDoneType } from "@hooks/task/useTaskDoneLists";
import { View, Text } from "react-native";

interface Props {
  taskDone: TaskDoneType;
  index: number;
}

const TopRank: React.FC<Props> = ({ taskDone, index }) => {
  return (
    <View className="flex flex-row items-center px-4 py-3">
      <View className="flex items-center mr-3">
        <Text
          className="text-white font-medium text-sm"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {index + 1}
        </Text>
      </View>

      <UserProfile user={taskDone.user} size={36} />
      <View className="px-3 flex-1 ">
        <View className="flex flex-row items-center">
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            numberOfLines={1}
            className="text-white font-medium text-base"
          >
            {taskDone.post.creatorName}
          </Text>
        </View>
        {taskDone.post.teamName ? (
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            numberOfLines={1}
            className="text-xs text-white"
          >
            {taskDone.post.teamName.length > 22
              ? `@${taskDone.post.teamName.slice(0, 22)}..`
              : `@${taskDone.post.teamName}`}
          </Text>
        ) : null}
      </View>
      <View className="flex flex-row">
        <View className=" pl-1 flex flex-row justify-between items-center">
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            className="text-white text-center text-lg font-medium"
          >
            {taskDone.earnedFP} FP
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TopRank;
