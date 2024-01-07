import { View, Text } from "react-native";

import MediaTile from "@components/MediaCard/MediaTile";
import { format } from "date-fns";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { reviewStatus } from "@models/Activity/Activity";
import { TaskTypes } from "@models/Tasks/Task";
export interface EarnedTaskInterface {
  media?: AWSMedia | CloudinaryMedia;
  name: string;
  fitPoints: number;
  totalFP: number;
  unix?: number;
  id: string;
  reviewStatus?: reviewStatus;
  taskId: string;
  taskDay?: number;
  badgeId?: string;
  taskType: TaskTypes;
  progress?: number;
  attemptedDate: string;
}
const EarnedTaskCard: React.FC<EarnedTaskInterface> = ({
  media,
  name,
  fitPoints,
  unix,
  totalFP,
  taskType,
}) => {
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
          media={media}
          fluid={true}
          roundedStr="rounded-[7px]"
          paused={true}
        />
      </View>
      <View className="flex-1 pl-4 flex justify-between " style={{ flex: 4 }}>
        <Text
          className="text-white text-base iphoneX:text-lg"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          numberOfLines={1}
        >
          {taskType === "steps" ? "Daily Walk" : name}
        </Text>
        {taskType === "steps" ? (
          <Text
            className="text-[#FF5970] text-base "
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            {`Earned ${fitPoints} FP`}
          </Text>
        ) : (
          <Text
            className="text-[#FF5970] text-base "
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            {`Earned ${fitPoints}/${totalFP} FP`}
          </Text>
        )}
        {unix ? (
          <Text
            className="text-[#B4B4B4] after:text-sm iphoneX:text-base "
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            {format(new Date(unix), "d MMM")}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default EarnedTaskCard;
