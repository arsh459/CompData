import { View, Text, TouchableOpacity } from "react-native";
import ImageWithURL from "@components/ImageWithURL";
import SvgIcons from "@components/SvgIcons";

interface Props {
  item: string;
  image: string;
  isSelected: boolean;
  onPress: () => void;
  isInDb?: boolean;
  textColor?: string;
  tagColor?: string;
}

const SymptomCard: React.FC<Props> = ({
  onPress,
  item,
  image,
  isSelected,
  isInDb,
  textColor,
  tagColor,
}) => {
  const contentColor = tagColor || "#3ACFFF";
  return (
    <TouchableOpacity onPress={onPress} className="relative z-0">
      <View
        className="flex flex-row items-center px-4 py-2 m-2 border-2 rounded-full"
        style={{
          backgroundColor:
            image === "NO_IMG" ? "#FF3A8D40" : `${contentColor}40`,
          borderColor: isSelected
            ? image === "NO_IMG"
              ? "#FF3A8D"
              : contentColor
            : "#FFFFFF00",
        }}
      >
        {image === "NO_IMG" ? null : (
          <ImageWithURL source={{ uri: image }} className="w-6 h-6 mr-1" />
        )}
        <Text
          className="text-sm iphoneX:text-base capitalize"
          style={{
            fontFamily: "Nunito-Medium",
            color: textColor ? textColor : "#FFFFFF",
          }}
        >
          {item}
        </Text>
      </View>
      {isSelected && isInDb ? (
        <View
          className="absolute bottom-1 right-1 rounded-full flex justify-center items-center w-4 aspect-square"
          style={{
            backgroundColor: image === "NO_IMG" ? "#FF3A8D" : contentColor,
          }}
        >
          <View className="w-full p-1">
            <SvgIcons iconType="minus" color={"#000"} />
          </View>
        </View>
      ) : isSelected ? (
        <View
          className="absolute bottom-2 right-2 rounded-full flex justify-center items-center w-4 aspect-square"
          style={{
            backgroundColor: image === "NO_IMG" ? "#FF3A8D" : contentColor,
          }}
        >
          <View className="w-full p-1">
            <SvgIcons iconType="tickCheck" color={"#000"} />
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default SymptomCard;
