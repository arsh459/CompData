import MediaTile from "@components/MediaCard/MediaTile";
import { SubTask } from "@models/Tasks/Task";
import { View, Text, Pressable } from "react-native";

interface Props {
  subTask: SubTask;
  index: number;
  onPress?: (val: SubTask) => void;
}

const ExerciseCardV2: React.FC<Props> = ({ subTask, index, onPress }) => {
  return (
    <Pressable
      onPress={() => (onPress && subTask ? onPress(subTask) : undefined)}
      className="rounded-2xl overflow-hidden"
    >
      <View className="w-full aspect-[180/100]">
        <MediaTile
          media={subTask?.taskMedia}
          fluid={true}
          fluidResizeMode="cover"
        />
      </View>
      <View className="flex justify-center rounded-b-2xl bg-[#343447] px-4 py-2">
        <Text numberOfLines={1} className="text-white text-xs font-sans">
          {`${index + 1}. ${subTask?.taskName}`}
        </Text>
      </View>
    </Pressable>
  );
};

export default ExerciseCardV2;
