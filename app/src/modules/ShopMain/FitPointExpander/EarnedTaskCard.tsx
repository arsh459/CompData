import { View, Text } from "react-native";

import { Task } from "@models/Tasks/Task";
import MediaTile from "@components/MediaCard/MediaTile";
import { format } from "date-fns";
interface Props {
  maxHeight?: number;
  task?: Task;
  cardWidth?: number;
}
const EarnedTaskCard: React.FC<Props> = ({ maxHeight, task, cardWidth }) => {
  return (
    <View className="flex flex-row bg-[#262630] p-4 rounded-xl aspect-[326/127]">
      <View
        className=" aspect-[85/102] rounded-[7px] "
        style={{ aspectRatio: 85 / 102 }}
      >
        {/* <MediaCard
          media={task?.avatar}
          thumbnail={task?.thumbnails}
          notPlayable={true}
          mediaFit="contain"
          maxHeight={102}
          fluid={true}
          roundedStr="rounded-[7px]"
        /> */}
        <MediaTile
          media={task?.avatar}
          fluid={true}
          roundedStr="rounded-[7px]"
          paused={true}
        />
      </View>
      <View className="flex-1 pl-4" style={{ flex: 4 }}>
        <Text
          className="text-white text-base iphoneX:text-lg"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          numberOfLines={1}
        >
          {task?.name}
        </Text>
        <Text
          className="text-[#C6C6C6] text-[13px] iphoneX:text-[15px] py-1 iphoneX:py-2"
          style={{ fontFamily: "BaiJamjuree-Medium" }}
        >
          {task?.fitPoints ? `Fitpoints Earned ${task.fitPoints}FP` : ""}
        </Text>
        <Text
          className="text-[#B4B4B4] after:text-sm iphoneX:text-base "
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          {format(new Date(task?.createdOn as number | string | Date), "d MMM")}
        </Text>
      </View>
    </View>
  );
};

export default EarnedTaskCard;
