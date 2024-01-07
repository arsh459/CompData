import MediaCard from "@components/MediaCard";
import {
  baseImageKit,
  fPointsWhite,
  levelIcon,
  // timerIcon,
} from "@constants/imageKitURL";
import { Task } from "@models/Tasks/Task";
import { getTaskTotalFP } from "@utils/community/utils";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image } from "react-native";

interface Props {
  task: Task;
  challengeName?: string;
  maxHeight?: number;
}

const SuggestedTaskCard: React.FC<Props> = ({
  task,
  challengeName,
  maxHeight,
}) => {
  return (
    <View className="rounded-xl  overflow-hidden relative cursor-pointer z-0  bg-[#6e6e6e]">
      <MediaCard
        media={task.avatar}
        thumbnail={task.thumbnails}
        notPlayable={true}
        mediaFit="contain"
        maxHeight={maxHeight}
      />
      <LinearGradient
        colors={["black", "transparent", "transparent", "black"]}
        className="absolute left-0 right-0 top-0 bottom-0 z-10"
      />
      <View className="absolute bottom-0 left-0 right-0 z-20 p-2 flex flex-col justify-end">
        <View className="bg-[#B9B9B9]/30 p-2 rounded-t-md rounded-b-xl border border-[#C2C2C2]">
          <Text
            numberOfLines={1}
            className="font-semibold text-white italic text-sm iphoneX:text-base pb-2"
          >
            {task.name}
          </Text>
          <View className="flex flex-row justify-between items-center">
            {/* <View className="flex flex-row justify-center items-center">
              <Image
                source={{ uri: timerIcon }}
                className="w-2.5 h-2.5"
                resizeMode="contain"
              />
              <Text className="text-white italic text-[10px] iphoneX:text-xs pl-1">
                {task.durationMinutes} mins
              </Text>
            </View> */}
            <View className="flex flex-row justify-center items-center">
              <Image
                source={{ uri: levelIcon }}
                className="w-2.5 h-2.5"
                resizeMode="contain"
              />
              <Text className="text-white italic text-[10px] iphoneX:text-xs pl-1">
                Lvl {task.level ? task.level : 0}
              </Text>
            </View>
            <View className="flex flex-row justify-center items-center">
              <Image
                source={{ uri: `${baseImageKit}/${fPointsWhite}` }}
                className="w-2.5 h-2.5"
                resizeMode="contain"
              />
              <Text className="text-white italic text-[10px] iphoneX:text-xs pl-1">
                {getTaskTotalFP(task.awardLevels)} FP
              </Text>
            </View>
          </View>
        </View>
      </View>
      {challengeName ? (
        <View className="absolute top-0 left-0 right-0 z-20 m-2 bg-[#B9B9B9]/30 rounded-b-md rounded-t-xl border border-[#C2C2C2]">
          <Text
            numberOfLines={1}
            className="italic iphoneX:text-lg text-white text-center font-semibold p-2"
          >
            {challengeName}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default SuggestedTaskCard;
