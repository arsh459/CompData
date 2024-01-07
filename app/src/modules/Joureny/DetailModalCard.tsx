import { View, Text, Image, TouchableOpacity } from "react-native";
interface Props {
  icon?: string;
  text?: string;
  subText?: string;
  handlePress: () => void;
}
const DetailModalCard: React.FC<Props> = ({
  icon,
  text,
  subText,
  handlePress,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className=" flex justify-evenly w-[43%] m-2 py-4 bg-[#262630]  aspect-[161/161] rounded-3xl"
    >
      <View className="flex items-center pb-2">
        <Image
          source={{
            uri: icon,
          }}
          className="w-10 h-10 "
          resizeMode="contain"
        />
      </View>
      <Text
        className="text-[#FFFFFF] text-xl  text-center"
        style={{ fontFamily: "BaiJamjuree-SemiBold" }}
      >
        {text}
      </Text>
      <Text className="text-[#F1F1F1] text-xs  text-center font-normal">
        {subText}
      </Text>
      <Text
        className="pt-2 text-[#FF5970] text-sm text-center"
        style={{ fontFamily: "BaiJamjuree-Medium" }}
      >
        Edit
      </Text>
    </TouchableOpacity>
  );
};

export default DetailModalCard;
