import { View, Text, TouchableOpacity } from "react-native";

import ImageWithURL from "@components/ImageWithURL";
import { rightArrowIconWhiteFrame14 } from "@constants/imageKitURL";
import clsx from "clsx";

interface Props {
  iconString: string;
  primaryString: string;
  secondaryString?: string;
  containerStyleTw?: string;
  showImg?: boolean;
  showImgIcon?: string;
  onPress: () => void;
}
const DietSettingListCard: React.FC<Props> = ({
  iconString,
  primaryString,
  secondaryString,
  containerStyleTw,
  showImg,
  showImgIcon,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={clsx(
      "flex flex-row  justify-between px-4 pb-3.5 py-2",
      containerStyleTw
    )}
  >
    <View className="flex flex-row items-center">
      <ImageWithURL
        className="w-5 aspect-square"
        source={{ uri: iconString }}
      />
      <Text
        className="text-[#FFFFFFCC] text-sm pl-2"
        style={{ fontFamily: "Nunito-SemiBold" }}
      >
        {primaryString}
      </Text>
    </View>
    <View className="flex flex-row items-center">
      {secondaryString ? (
        <Text
          className="text-[#FFFFFF66] text-sm pr-1.5"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          {secondaryString}
        </Text>
      ) : null}
      {showImg ? (
        <ImageWithURL
          className="w-4 aspect-square mr-2 "
          source={{ uri: showImgIcon }}
        />
      ) : null}
      <ImageWithURL
        className="w-1 aspect-[5/11] "
        source={{ uri: rightArrowIconWhiteFrame14 }}
      />
    </View>
  </TouchableOpacity>
);

export default DietSettingListCard;
