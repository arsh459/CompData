import { View, Text, TouchableOpacity } from "react-native";

import { format } from "date-fns";
import { MyPurchases } from "@models/MyPurchases/interface";
import MediaTile from "@components/MediaCard/MediaTile";
import { useNavigation } from "@react-navigation/native";

const MyPurchaseListCard: React.FC<{
  item: MyPurchases;
}> = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PurchasedVoucherScreen", {
          voucherId: item.voucherId,
        })
      }
      className="flex flex-row items-center justify-between p-4 mx-4 rounded-2xl bg-[#343150]"
    >
      <View className="flex-1 flex flex-row items-center">
        <View className="w-full max-w-[42px] aspect-[42/42]  ">
          <MediaTile
            media={item.media}
            fluid={true}
            fluidResizeMode="cover"
            roundedStr="rounded-lg "
          />
        </View>

        <View className="flex-1 px-2">
          <Text
            numberOfLines={1}
            className="text-sm pl-1 text-[#F1F1F1] flex-1 iphoneX:text-base"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            className="text-xs pl-1 text-[#F1F1F1]/60 "
            style={{ fontFamily: "Nunito-Medium" }}
          >
            {item?.purchasedOn ? format(item.purchasedOn, "do MMM") : ""}
          </Text>
        </View>
      </View>
      <Text
        className="text-sm pl-1 text-[#FB3E82]  iphoneX:text-base"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        -{item.value} Fp
      </Text>
    </TouchableOpacity>
  );
};

export default MyPurchaseListCard;
