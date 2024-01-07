import ImageWithURL from "@components/ImageWithURL";
import { superwomenImage } from "@constants/imageKitURL";
import { View, Text, useWindowDimensions } from "react-native";

const Section5 = () => {
  const { height } = useWindowDimensions();

  return (
    <View style={{ height }}>
      <View className="flex-1 flex justify-center items-center p-4">
        <Text
          className="text-white text-4xl iphoneX:text-5xl"
          style={{ fontFamily: "Canela-Light" }}
        >
          Become a
          <Text style={{ fontFamily: "BaiJamjuree-Bold" }}> Superwoman</Text>
        </Text>
      </View>
      <ImageWithURL
        source={{ uri: superwomenImage }}
        className="w-full max-h-[70%] aspect-[426/592] object-bottom mx-auto"
        resizeMode="contain"
      />
    </View>
  );
};

export default Section5;
