import { View, Text, TouchableOpacity } from "react-native";
import MediaTile from "@components/MediaCard/MediaTile";
import { MyPurchases } from "@models/MyPurchases/interface";
import { format } from "date-fns";
import StepperTimeLine from "./StepperTimeLine";

interface Props {
  item: MyPurchases;
  onPress: () => void;
}

const MyVoucherCard: React.FC<Props> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex bg-[#262630] rounded-xl mx-4"
    >
      <View className="flex-1 p-2">
        <View className="aspect-[318/165]">
          <MediaTile
            media={item.media}
            fluid={true}
            fluidResizeMode="cover"
            roundedStr="rounded-xl "
          />
        </View>
        <View className="">
          <Text
            className="px-2 text-[#E1E1E1] text-sm iphoneX:text-base py-2"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {item.name} worth INR {item.value}
          </Text>

          <View className="flex flex-row items-end  justify-between px-2 pb-2">
            {item.isRedeemed === "redeemed" ? (
              <Text
                className="text-[#31FFB5] text-xs iphoneX:text-sm "
                style={{ fontFamily: "BaiJamjuree-Bold" }}
              >
                {item.value ? `Purchased for : ${item.value} FP` : ""}
              </Text>
            ) : (
              <StepperTimeLine isRedeemed={item?.isRedeemed} />
            )}

            <Text
              className="text-[#9B9B9B] text-[10px] iphoneX:text-xs "
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              {format(
                new Date(item?.purchasedOn as number | string | Date),
                "d LLLL"
              )}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyVoucherCard;
