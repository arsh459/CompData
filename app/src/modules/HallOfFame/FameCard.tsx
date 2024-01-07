import { View, Text } from "react-native";

import { Testimonial } from "@models/Testimonial/interface";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import MediaTile from "@components/MediaCard/MediaTile";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
interface Props {
  item: Testimonial;
}
const FameCard: React.FC<Props> = ({ item }) => {
  const { leader } = useLeaderboard(item.uid);
  return (
    <View className="  bg-[#595393] rounded-xl m-2">
      <View className="flex flex-row items-center justify-between p-3 iphoneX:p-4 ">
        <Text className=" text-base font-semibold text-white">
          {item.gameName}
        </Text>
        <Text className=" text-xs text-right text-white">
          {format(new Date(item?.createdOn as number | string | Date), "d MMM")}
        </Text>
      </View>

      <LinearGradient
        colors={[
          `rgba(19, 4, 47, 0.26)`,
          `rgba(142, 81, 255, 0.41)`,
          ` rgba(141, 122, 253, 0.61) `,
          `rgba(150, 167, 255, 0.8) `,
        ]}
        className="p-3 iphoneX:p-4 rounded-xl"
      >
        <View className="py-1 iphoneX:py-3  rounded-xl ">
          <View className="w-full h-32  rounded-xl">
            {/* <Image
              source={{
                uri: "https://ik.imagekit.io/socialboat/Group_496_aSd-fg285.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661249220784",
              }}
              className="w-full h-32 rounded-xl "
            /> */}
            <MediaTile
              media={item.awardImage}
              fluid={true}
              roundedStr="rounded-md"
            />
          </View>
        </View>
        <View className="flex flex-row">
          <View className="w-14 h-20 pr-2">
            <MediaTile
              media={item.media}
              fluid={true}
              roundedStr="rounded-md"
            />
          </View>
          <View className="flex-1">
            <View className=" bg-white rounded flex flex-row  items-center justify-between py-0.5 px-2">
              <Text className=" text-xs font-semibold  text-[#544296]">
                {leader?.name} &#8226; Lvl {leader?.userLevelV2}
              </Text>

              <Text className=" text-xs font-bold text-right text-[#544296]">
                {leader?.totalFitPointsV2} FP
              </Text>
            </View>
            <Text
              className=" text-xs text-white flex-1  pt-2 line-clamp-3"
              numberOfLines={3}
            >
              {item.quote}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default FameCard;
