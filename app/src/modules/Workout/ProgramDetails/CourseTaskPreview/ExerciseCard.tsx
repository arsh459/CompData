import MediaTile from "@components/MediaCard/MediaTile";
import { useSubTask } from "@providers/task/hooks/useSubtask";
import { View, Text } from "react-native";

interface Props {
  subTaskId: string;
  index: number;
}

const ExerciseCard: React.FC<Props> = ({ subTaskId, index }) => {
  const { subTask } = useSubTask(subTaskId);

  return (
    <View className="rounded-2xl overflow-hidden">
      <View className="w-full aspect-[180/111]">
        <MediaTile
          media={subTask?.taskMedia}
          fluid={true}
          fluidResizeMode="cover"
        />
      </View>
      <View className="flex justify-center rounded-b-2xl bg-[#343447] px-4 py-2.5">
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="text-white text-xs iphoneX:text-sm font-sans"
        >
          {`${index + 1}. ${subTask?.taskName}`}
        </Text>
      </View>
    </View>
  );
};

export default ExerciseCard;
