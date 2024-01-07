import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Voucher } from "@models/Voucher/interface";
import { baseImageKit, springIconWhite } from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import MediaTile from "@components/MediaCard/MediaTile";
// import VoucheUnlocksAt from "./VoucheUnlocksAt";
// import { useUserContext } from "@providers/user/UserProvider";
import clsx from "clsx";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
// import { isLocked } from "../utils";
// import { getUserTotalFP } from "@modules/HomeScreen/utills/getUserTotalFP";

export const spacing = 16;

interface Props {
  item: Voucher;
}

const VoucherCard: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation();
  // const { user } = useUserContext();
  // const isLock = isLocked(
  //   getUserTotalFP(user?.fpCredit, user?.fpDebit),
  //   item.value
  // ).bool;
  const { width } = useWindowDimensions();
  const cardWidth = (width - spacing * 3) / 2;

  return (
    <TouchableOpacity
      style={{ width: cardWidth }}
      className="aspect-[148/193] "
      onPress={() => {
        weEventTrack("Shop_clickProduct", {});
        item &&
          navigation.navigate("VoucherPurchaseScreen", { voucherId: item.id });
      }}
    >
      <View className="flex bg-[#262630] rounded-xl">
        <View className="flex-1">
          <View className="aspect-[138/138] p-1.5">
            <MediaTile
              media={item.media}
              fluid={true}
              fluidResizeMode="cover"
              roundedStr="rounded-xl "
            />
          </View>
          <Text
            numberOfLines={2}
            className={clsx("px-2 text-[#8F8F8F] text-rounded-xl text-sm")}
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            {item.name}
          </Text>

          {/* {isLock ? ( */}
          <View className="flex flex-row items-center px-2 pt-1 pb-2">
            <Image
              // className="w-rounded-xl h-[11px] mr-2"
              className="h-4 w-3 mr-1.5"
              resizeMode="contain"
              source={{
                uri: `${baseImageKit}/tr:w-40,c-maintain_ratio,fo-auto/${springIconWhite}`,
              }}
            />
            <Text
              className="text-[#F1F1F1] text-xs iphoneX:text-sm "
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              {item.value ? `${item.value} FP` : ""}
            </Text>
          </View>
          {/* // ) : ( */}
          {/* //   <VoucheUnlocksAt fpString={item.value ? `${item.value} FP` : ""} /> */}
          {/* // )} */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VoucherCard;
