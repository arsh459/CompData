import MediaTile from "@components/MediaCard/MediaTile";
import SvgIcons from "@components/SvgIcons";
import {
  doubleTickWhite,
  rightArrowIconWhiteFrame14,
} from "@constants/imageKitURL";
import { Task } from "@models/Tasks/Task";
import {
  getCardDetailsV2,
  getTaskIconV2,
  statusTypes,
} from "@modules/HomeScreen/MyPlan/utils";
import clsx from "clsx";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface Props {
  onMealPress?: () => void;
  task?: Task;
  status?: statusTypes;
}

const MealCardV2: React.FC<Props> = ({ onMealPress, task, status }) => {
  const color = "#FFFFFF";
  const data = getTaskIconV2(undefined);

  const details = getCardDetailsV2(
    task?.fitPoints ? task.fitPoints : 0,
    task?.kcal
  );

  // console.log("task", task?.specialityIcon, task?.specialityText);

  return (
    <TouchableOpacity onPress={onMealPress}>
      <View
        className={clsx(
          "p-2 rounded-xl flex flex-row items-center relative z-0",
          status === "done" ? " bg-[#FFFFFF40]" : "bg-[#5D588C]",
          task?.specialityIcon && task.specialityText ? "rounded-b-none " : ""
        )}
      >
        <View className="w-1/6 aspect-square rounded-xl">
          <MediaTile
            media={
              task?.videoThumbnail ? task.videoThumbnail : task?.thumbnails
            }
            fluid={true}
            fluidResizeMode="cover"
            roundedStr="rounded-lg"
          />
        </View>
        <View className="flex justify-end   flex-1  pl-3 ">
          <View
            className="   flex justify-end  rounded-b-3xl"
            style={{ backgroundColor: data?.bgColor }}
          >
            <Text
              numberOfLines={2}
              style={{ color, fontFamily: "Nunito-Bold" }}
              className=" text-xs iphoneX:text-sm  pb-1 "
            >
              {task?.name}
            </Text>

            <View className="flex  flex-row items-center">
              {details?.map((item) => (
                <View
                  key={item.icon}
                  className="flex flex-row justify-center  items-center mr-4"
                >
                  <View className="w-3 iphoneX:w-3 aspect-square mr-1 iphoneX:mr-1">
                    <SvgIcons iconType={item.icon} color={color} />
                  </View>
                  <Text
                    style={{ color, fontFamily: "Nunito-SemiBold" }}
                    className="text-xs "
                  >
                    {item.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View className="flex  items-center">
          <Image
            source={{
              uri:
                status === "done"
                  ? doubleTickWhite
                  : rightArrowIconWhiteFrame14,
            }}
            className="w-4 aspect-square "
            resizeMode="contain"
          />
          {status === "done" ? (
            <Text
              style={{ fontFamily: "Nunito-Bold" }}
              className="text-xs text-[#FFFFFF]"
            >
              Done
            </Text>
          ) : null}
        </View>
      </View>
      {task?.specialityIcon && task.specialityText ? (
        <View
          className={clsx(
            "flex flex-row items-center justify-center py-1.5 rounded-b-xl border-2 border-[#FFFFFF26]",
            status == "done" ? "bg-[#FFFFFF4D]" : "bg-[#00B4EE] "
          )}
        >
          <View className="w-4 aspect-square">
            {task?.specialityIcon ? (
              <MediaTile fluid={true} media={task?.specialityIcon} />
            ) : null}
          </View>
          <Text
            className="text-[#202020] text-xs pl-1"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {task?.specialityText}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default MealCardV2;
