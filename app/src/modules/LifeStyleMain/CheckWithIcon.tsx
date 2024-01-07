import { Text, TouchableOpacity, View } from "react-native";
import ImageWithURL from "@components/ImageWithURL";
import clsx from "clsx";
import {
  rightTickRedBgWhiteTickIcon,
  unTickIcon,
} from "@constants/imageKitURL";

interface Props {
  icon: string;
  text: string;
  isSelected: boolean;
  onPress: () => void;
  isMultiSelect?: boolean;
}

const CheckWithIcon: React.FC<Props> = ({
  icon,
  text,
  isSelected,
  onPress,
  isMultiSelect,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={clsx(
      "flex flex-row items-center justify-between p-4  mx-4 my-2 rounded-2xl",
      isSelected ? "bg-[#FFFFFF]" : "bg-[#343150]"
    )}
    disabled={isMultiSelect ? false : isSelected}
  >
    <View className="flex flex-row ">
      {icon ? (
        <ImageWithURL source={{ uri: icon }} className="w-8 aspect-square" />
      ) : null}
      <Text
        className={clsx(
          " text-lg  pl-2",
          isSelected ? "text-[#232136]" : "text-[#F1F1F1]"
        )}
        style={{ fontFamily: "Nunito-SemiBold" }}
      >
        {text}
      </Text>
    </View>
    {isSelected ? (
      <ImageWithURL
        source={{ uri: rightTickRedBgWhiteTickIcon }}
        className="w-8 aspect-square"
      />
    ) : (
      <ImageWithURL
        source={{ uri: unTickIcon }}
        className="w-8 aspect-square"
      />
    )}
  </TouchableOpacity>
);

export default CheckWithIcon;
