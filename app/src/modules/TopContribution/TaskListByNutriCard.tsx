import { View, Text } from "react-native";
import React from "react";
import { Activity } from "@models/Activity/Activity";
import clsx from "clsx";
import MediaTile from "@components/MediaCard/MediaTile";
import { useTask } from "@hooks/task/useTask";
import { selectedNutriType } from ".";
import ImageWithURL from "@components/ImageWithURL";
import { mealImage } from "@constants/imageKitURL";
interface Props {
  idx: number;
  item: Activity;
  nutriType: selectedNutriType;
}
const TaskListByNutriCard: React.FC<Props> = ({ idx, item, nutriType }) => {
  const { task } = useTask(item.taskId);
  const nutriValue = (item && item.macros && item.macros[nutriType]) || 0;
  const nutriKcal =
    item && item.totalKcalConsumed
      ? item && Math.round(item.totalKcalConsumed)
      : 0;

  return (
    <View
      className={clsx(
        idx % 2 === 0 ? "bg-[#343150b3]" : "bg-[#3B3855]",
        "w-full flex flex-row justify-between items-center px-6"
      )}
      style={{
        height: 100,
      }}
      key={item.id}
    >
      <View className="flex-[.7] flex-row items-center">
        <Text className="text-white/50 pr-4">{idx + 1}</Text>
        <View className="w-14 aspect-square rounded-lg overflow-hidden">
          {task?.thumbnails || task?.bgImage ? (
            <MediaTile
              fluid={true}
              media={task?.thumbnails || task?.bgImage}
              fluidResizeMode="cover"
              roundedStr="rounded-lg"
            />
          ) : (
            <ImageWithURL source={{ uri: mealImage }} resizeMode="contain" />
          )}
        </View>
        <View className="pl-4">
          <Text
            className="text-white text-sm pb-2"
            style={{ fontFamily: "Poppins-Regular" }}
            numberOfLines={2}
          >
            {item.activityName}
          </Text>
          <Text className="text-white/70">{nutriKcal}Kcal</Text>
        </View>
      </View>
      <Text className="text-white">{nutriValue.toFixed(1)}gm</Text>
    </View>
  );
};

export default TaskListByNutriCard;
