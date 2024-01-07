import { View, Text, Image } from "react-native";

interface Props {
  imgUrl?: string;
  text?: string;
}
const TextAndBody: React.FC<Props> = ({ imgUrl, text }) => {
  return (
    <View className="w-1/4 ">
      <Text
        className="text-xs text-center text-white p-1  w-1/2 mx-auto mb-2 bg-[#FFFFFF26] rounded-md"
        style={{ fontFamily: "BaiJamjuree-SemiBold" }}
      >
        {text}
      </Text>

      <Image
        source={{
          uri: imgUrl,
        }}
        className="aspect-[100/213] "
      />
    </View>
  );
};

export default TextAndBody;
