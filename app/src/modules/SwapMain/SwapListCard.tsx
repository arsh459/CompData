import { View, Text, Image } from "react-native";

import { Task } from "@models/Tasks/Task";
import { swapListIconFrame24 } from "@constants/imageKitURL";
import MediaTile from "@components/MediaCard/MediaTile";
import {
  getCardDetailsV2,
  getTaskIconV2,
} from "@modules/HomeScreen/MyPlan/utils";
import SvgIcons from "@components/SvgIcons";
import clsx from "clsx";

interface Props {
  singleTask: Task;
  rightSideIconUrl?: string;
  styleTw?: string;
}

const SwapListCard: React.FC<Props> = ({
  singleTask,
  rightSideIconUrl,
  styleTw,
}) => {
  const color = "#FFFFFF";
  const details = getCardDetailsV2(
    singleTask?.fitPoints ? singleTask.fitPoints : 0,

    singleTask.kcal
  );
  const data = getTaskIconV2(undefined);

  return (
    <View className="flex-1 w-full   rounded-2xl ">
      <View
        className={clsx(
          "bg-[#343150] p-4  flex flex-row items-center",
          styleTw
        )}
      >
        <View className="w-1/6 aspect-square rounded-xl">
          <MediaTile
            media={
              singleTask?.videoThumbnail
                ? singleTask.videoThumbnail
                : singleTask.thumbnails
            }
            fluid={true}
            fluidResizeMode="cover"
            roundedStr="rounded-lg"
          />
        </View>
        <View className="flex justify-end pl-3   flex-1  ">
          <View
            className="flex justify-end pr-2"
            style={{ backgroundColor: data?.bgColor }}
          >
            <Text
              numberOfLines={2}
              style={{ color, fontFamily: "Nunito-Bold" }}
              className="text-xs iphoneX:text-sm  pb-2 "
            >
              {singleTask.name}
            </Text>

            <View className="flex flex-row items-center">
              {details?.map((item) => (
                <View
                  key={item.icon}
                  className="flex flex-row justify-center  items-center mr-4"
                >
                  <View className="w-3 iphoneX:w-4 aspect-square mr-1 iphoneX:mr-2">
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
        <Image
          source={{
            uri: rightSideIconUrl ? rightSideIconUrl : swapListIconFrame24,
          }}
          className="w-6 aspect-square"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default SwapListCard;
